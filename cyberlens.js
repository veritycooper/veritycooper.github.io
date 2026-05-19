(function () {
  const $ = (selector) => document.querySelector(selector);
  const $$ = (selector) => Array.from(document.querySelectorAll(selector));

  function scorePassword(value) {
    const length = value.length;
    const normalized = value.trim().toLowerCase();
    const types = [
      /[a-z]/.test(value),
      /[A-Z]/.test(value),
      /\d/.test(value),
      /[^a-zA-Z0-9]/.test(value),
    ].filter(Boolean).length;
    const patterns = [
      /(.)\1{2,}/.test(value),
      /123|abc|qwerty|password|letmein/i.test(value),
      value.length > 0 && new Set(value.toLowerCase()).size <= Math.max(2, value.length / 3),
    ].filter(Boolean).length;
    const commonPassword = /^(password|password1|123456|12345678|qwerty|letmein|admin|welcome)$/i.test(
      normalized
    );

    const raw = Math.min(100, length * 4 + types * 12 - patterns * 16 - (commonPassword ? 45 : 0));
    const score = Math.max(8, raw);
    const crackTime =
      commonPassword
        ? "almost immediately"
        : score > 82
        ? "centuries in this simplified model"
        : score > 62
          ? "years"
          : score > 42
            ? "days or weeks"
            : "minutes or hours";

    return { length, types, patterns, score, crackTime, commonPassword };
  }

  function updatePassword() {
    const input = $("#password-input");
    const result = scorePassword(input.value);
    $("#strength-fill").style.width = `${result.score}%`;
    $("#length-score").textContent = result.length;
    $("#variety-score").textContent = result.types;
    $("#pattern-score").textContent = result.patterns;
    $("#password-breakdown").innerHTML = input.value
      .slice(0, 36)
      .split("")
      .map((char) => {
        const kind = /[a-z]/.test(char)
          ? "lower"
          : /[A-Z]/.test(char)
            ? "upper"
            : /\d/.test(char)
              ? "number"
              : "symbol";
        return `<span class="${kind}">${char === " " ? "space" : char}</span>`;
      })
      .join("");
    $("#password-summary").textContent =
      result.commonPassword
        ? "This is a very common password. Attackers try words like this early, so it should be treated as weak even if it has several characters."
        : result.patterns > 0
        ? `This password has helpful length, but repeated or familiar patterns could reduce its strength. Estimated cracking time: ${result.crackTime}.`
        : `Nice shape. More length and variety increase the search space. Estimated cracking time: ${result.crackTime}.`;
  }

  async function sha256(value) {
    if (window.crypto && window.crypto.subtle) {
      const data = new TextEncoder().encode(value);
      const digest = await window.crypto.subtle.digest("SHA-256", data);
      return Array.from(new Uint8Array(digest))
        .map((byte) => byte.toString(16).padStart(2, "0"))
        .join("");
    }

    let hash = 0;
    for (let index = 0; index < value.length; index += 1) {
      hash = (hash << 5) - hash + value.charCodeAt(index);
      hash |= 0;
    }
    return Math.abs(hash).toString(16).padStart(64, "0").slice(0, 64);
  }

  async function updateHashes() {
    const first = await sha256($("#hash-a").value);
    const second = await sha256($("#hash-b").value);
    $("#hash-a-output").textContent = first;
    $("#hash-b-output").textContent = second;

    const changed = first
      .split("")
      .filter((char, index) => char !== second[index]).length;
    $("#avalanche-score").textContent = `${Math.round((changed / first.length) * 100)}%`;
  }

  function shiftCharacter(char, key) {
    const code = char.charCodeAt(0);
    const isUpper = code >= 65 && code <= 90;
    const isLower = code >= 97 && code <= 122;

    if (!isUpper && !isLower) {
      return char;
    }

    const base = isUpper ? 65 : 97;
    return String.fromCharCode(((code - base + key) % 26) + base);
  }

  function updateEncryption() {
    const key = Number($("#key-slider").value);
    const plainText = $("#plain-text").value;
    $("#key-value").textContent = key;
    $("#cipher-output").textContent = plainText
      .split("")
      .map((char) => shiftCharacter(char, key))
      .join("");
  }

  const clues = {
    sender: {
      title: "Unfamiliar email address",
      copy:
        "The name says Account Support, but the email address uses an unfamiliar domain. Sender names are easy to fake, so the address is the part to inspect.",
    },
    greeting: {
      title: "Impersonal greeting",
      copy:
        "'Hello customer' is impersonal. It can suggest the message was sent broadly rather than from a service that knows who you are.",
    },
    threat: {
      title: "Scare tactic",
      copy:
        "'Closed today' is a scare tactic. It creates fear and pressure so you act before checking the message properly.",
    },
    urgency: {
      title: "Urgency pressure",
      copy:
        "Scam messages often rush people because calm users are more likely to verify details first.",
    },
    link: {
      title: "Unfamiliar link",
      copy:
        "The link sounds official, but it is not a known organisation domain. Open services directly instead of trusting email links.",
    },
  };

  function bindClues() {
    $$(".clue").forEach((button) => {
      button.addEventListener("click", () => {
        const clue = clues[button.dataset.clue];
        $("#clue-title").textContent = clue.title;
        $("#clue-copy").textContent = clue.copy;
      });
    });
  }

  function bindWifi() {
    const lab = $(".wifi-lab");
    const observer = $("#observer");
    $("#wifi-toggle").addEventListener("click", () => {
      lab.classList.toggle("is-secure");
      observer.textContent = lab.classList.contains("is-secure")
        ? "Observer sees: encrypted shapes, not readable details"
        : "Observer sees: passwords and pages";
    });
  }

  const footprintLabels = {
    location: "Location patterns: commute, cafés, regular places",
    cookies: "Ad profile: interests, repeated visits, browsing habits",
    social: "Social signals: relationships, events, opinions",
    shopping: "Purchase clues: budget, routines, preferences",
  };

  function updateFootprint() {
    const active = $$("[data-footprint]:checked").map((input) => input.dataset.footprint);
    $("#footprint-map").innerHTML = active
      .map((key) => `<div class="footprint-node">${footprintLabels[key]}</div>`)
      .join("");
  }

  const scenarioResponses = {
    share: {
      title: "Risky response",
      copy:
        "Login codes are designed to prove identity. A real support team should not need you to read one out over the phone.",
    },
    verify: {
      title: "Safer response",
      copy:
        "Good choice. Pause the conversation and contact IT through a known channel, such as the official helpdesk page.",
    },
    ignore: {
      title: "Partly safe",
      copy:
        "Ending the call protects you, but reporting it helps protect other people who may receive the same attempt.",
    },
  };

  function bindScenarios() {
    $$("[data-response]").forEach((button) => {
      button.addEventListener("click", () => {
        const response = scenarioResponses[button.dataset.response];
        $("#scenario-title").textContent = response.title;
        $("#scenario-copy").textContent = response.copy;
      });
    });
  }

  function bindSettings() {
    $("#reduce-motion").addEventListener("change", (event) => {
      document.body.classList.toggle("reduce-motion", event.target.checked);
    });

    $("#high-contrast").addEventListener("change", (event) => {
      document.body.classList.toggle("high-contrast", event.target.checked);
    });
  }

  function bindInputs() {
    $("#password-input").addEventListener("input", updatePassword);
    $("#hash-a").addEventListener("input", updateHashes);
    $("#hash-b").addEventListener("input", updateHashes);
    $("#plain-text").addEventListener("input", updateEncryption);
    $("#key-slider").addEventListener("input", updateEncryption);
    $$("[data-footprint]").forEach((input) => {
      input.addEventListener("change", updateFootprint);
    });
  }

  document.addEventListener("DOMContentLoaded", () => {
    bindInputs();
    bindClues();
    bindWifi();
    bindScenarios();
    bindSettings();
    updatePassword();
    updateHashes();
    updateEncryption();
    updateFootprint();
  });
})();
