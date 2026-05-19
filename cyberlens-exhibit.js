(function () {
  const exhibits = {
    passwords: {
      kicker: "Password Playground",
      title: "Why does length beat cleverness?",
      summary:
        "Explore how a password grows from a tiny guessing space into something much harder to search.",
      duration: "4 minute explore",
      question: "What should I notice?",
      questionCopy:
        "The biggest jump usually comes from length first, then variety. Familiar patterns pull the score back down.",
      watch: [
        "Longer phrases make the search space expand quickly.",
        "Repeated characters and common words reduce unpredictability.",
        "Symbols help, but they are not magic if the password is short.",
      ],
      everyday:
        "A passphrase like three unrelated words is often easier to remember and harder to guess than a short decorated word.",
      plain:
        "A password is stronger when it creates more possible guesses. Length increases those possibilities quickly because every extra character adds another position an attacker has to discover.",
      interaction:
        "Try adding whole words, then try adding one symbol. Notice that length changes the shape more dramatically than a single decorative character.",
      mistake:
        "Many people make one short word look complex, such as P@ssw0rd!. Attackers know those substitutions, so the password is still predictable.",
      takeaways: [
        "Length gives attackers more possibilities to search.",
        "Predictable substitutions like pa55word are still predictable.",
        "A password manager helps every account have its own strong password.",
      ],
      levels: [
        {
          label: "Level 1",
          title: "Length",
          summary: "Longer passwords create more possible guesses.",
          detail:
            "Every extra character adds another position an attacker has to guess. A short password with symbols can still be weaker than a longer passphrase because there are fewer total combinations to try.",
        },
        {
          label: "Level 2",
          title: "Unpredictability",
          summary: "Random or unrelated words are harder to guess than familiar phrases.",
          detail:
            "Attackers do not only try random guesses. They use wordlists, leaked passwords, names, dates, keyboard patterns, and common substitutions. Unrelated words are stronger because they avoid obvious patterns.",
        },
        {
          label: "Level 3",
          title: "Uniqueness",
          summary: "A strong password should not be reused across accounts.",
          detail:
            "If one website leaks a reused password, attackers may try it on email, banking, shopping, and social accounts. This is called credential stuffing, and it is why password managers are so useful.",
        },
      ],
      advanced: renderPasswordAdvanced,
      render: renderPasswordDetail,
    },
    hashing: {
      kicker: "Hashing Sandbox",
      title: "Why does one tiny edit change everything?",
      summary:
        "Compare two messages and watch their digital fingerprints split apart character by character.",
      duration: "3 minute explore",
      question: "What should I notice?",
      questionCopy:
        "Hashes are designed to look unrelated even when the original messages are almost identical.",
      watch: [
        "The output has a fixed shape even when the input changes length.",
        "A tiny input change creates a large visible output change.",
        "Matching hashes are useful for checking integrity.",
      ],
      everyday:
        "Downloads often publish checksums so you can verify that a file was not changed or corrupted.",
      plain:
        "A hash is like a fingerprint for data. It is not trying to hide the message. It is trying to create a reliable summary that changes when the data changes.",
      interaction:
        "Change one letter, add punctuation, or remove a space. The hash should still be the same length, but most of the characters should change.",
      mistake:
        "Hashing and encryption are often confused. Encryption is meant to be unlocked. Hashing is normally used for checking, not reversing.",
      takeaways: [
        "Hashing is not encryption because it is not meant to be reversed.",
        "The same input should produce the same hash.",
        "Different-looking hashes help reveal changes.",
      ],
      levels: [
        {
          label: "Level 1",
          title: "Fingerprint",
          summary: "A hash gives data a fixed-size fingerprint.",
          detail:
            "A hash function takes input of almost any length and produces a fixed-length output. The output is designed to be easy to recompute but difficult to reverse back into the original input.",
        },
        {
          label: "Level 2",
          title: "Integrity",
          summary: "If a file changes, its hash should change too.",
          detail:
            "Integrity checks compare an expected hash with a newly calculated hash. If they match, the file is probably unchanged. If they do not match, the file may be corrupted, tampered with, or not the file you expected.",
        },
        {
          label: "Level 3",
          title: "Password storage",
          summary: "Systems store password hashes so the original password is not kept directly.",
          detail:
            "Good systems add a unique salt and use slow password-hashing functions such as bcrypt, scrypt, or Argon2. This makes stolen password databases much harder to attack at scale.",
        },
      ],
      render: renderHashDetail,
    },
    encryption: {
      kicker: "Encryption Visualiser",
      title: "How does a message become unreadable?",
      summary:
        "Move through a gentle lock-and-key simulation that shifts readable text into protected text.",
      duration: "4 minute explore",
      question: "What should I notice?",
      questionCopy:
        "Encryption is a reversible transformation when the right key is available.",
      watch: [
        "Plaintext is readable before protection is applied.",
        "The key controls the transformation.",
        "Decryption reverses the process when the key is known.",
      ],
      everyday:
        "Messaging apps and HTTPS use stronger versions of this idea to keep data private in transit.",
      plain:
        "Encryption takes readable information and transforms it so someone without the key cannot understand it. The important idea is controlled reversibility.",
      interaction:
        "Move the key slider and watch the ciphertext change. The key is not decoration; it controls how the message is transformed.",
      mistake:
        "This exhibit uses a simple letter shift so the idea is visible. Real encryption is much stronger and should not be invented from scratch.",
      takeaways: [
        "Encryption protects meaning from people without the key.",
        "The same key can lock and unlock in this simplified model.",
        "Real encryption uses much stronger mathematics than a letter shift.",
      ],
      levels: [
        {
          label: "Level 1",
          title: "Shift cipher",
          summary: "This exhibit uses a simple letter shift so the idea is visible.",
          detail:
            "A Caesar-style shift cipher moves each letter by the same amount. It is useful for learning the idea of transformation, but it is easy to break because there are only a small number of possible shifts.",
        },
        {
          label: "Level 2",
          title: "Symmetric encryption",
          summary: "One shared secret key locks and unlocks the message.",
          detail:
            "Modern symmetric encryption, such as AES, uses the same secret key to encrypt and decrypt. It is fast and widely used, but both sides need a safe way to share or derive the key.",
        },
        {
          label: "Level 3",
          title: "Asymmetric encryption",
          summary: "A public key can lock data, while a private key unlocks it.",
          detail:
            "Asymmetric encryption uses a key pair. The public key can be shared openly, while the private key is kept secret. It helps solve the problem of agreeing on secrets across the internet.",
        },
      ],
      advanced: renderOtpAdvanced,
      render: renderEncryptionDetail,
    },
    phishing: {
      kicker: "Phishing Spotter",
      title: "How do suspicious messages guide your attention?",
      summary:
        "Compare a calm message with a pressure message and reveal the tactics hidden in plain sight.",
      duration: "3 minute explore",
      question: "What should I notice?",
      questionCopy:
        "The risky message combines pressure, generic wording, and an unfamiliar link.",
      watch: [
        "Urgent consequences can push rushed decisions.",
        "Generic greetings may signal a broad scam attempt.",
        "Link text can sound official while pointing elsewhere.",
      ],
      everyday:
        "When a message asks for urgent action, open the official website yourself instead of following the email link.",
      plain:
        "Phishing works by guiding attention. A message may combine a believable sender name, an urgent consequence, a generic greeting, and a link that sounds official.",
      interaction:
        "Select each clue in the message. Notice how no single clue has to prove everything; the risk comes from the pattern they form together.",
      mistake:
        "A polished email can still be unsafe. Design quality is not proof that the sender, link, or request is legitimate.",
      takeaways: [
        "Phishing awareness is pattern recognition, not paranoia.",
        "You can slow down without ignoring real responsibilities.",
        "Independent verification is often the safest next step.",
      ],
      levels: [
        {
          label: "Level 1",
          title: "Clues",
          summary: "Spot sender, greeting, pressure, and link clues.",
          detail:
            "Useful phishing clues include mismatched sender domains, generic greetings, urgent consequences, unexpected attachments, shortened links, and requests to sign in from an email.",
        },
        {
          label: "Level 2",
          title: "Pattern",
          summary: "One clue may be harmless, but several clues together matter.",
          detail:
            "A single generic greeting is not proof of phishing. A generic greeting plus a strange sender address plus a threat plus an unfamiliar link is a much stronger pattern.",
        },
        {
          label: "Level 3",
          title: "Verification",
          summary: "Use a trusted channel instead of replying or clicking.",
          detail:
            "Verification means leaving the message and checking through a known path: typing the official website, using a saved app, calling a known number, or asking internal IT through their normal channel.",
        },
      ],
      advanced: renderPhishingAdvanced,
      render: renderPhishingDetail,
    },
    wifi: {
      kicker: "Public WiFi Simulator",
      title: "What changes when traffic is protected?",
      summary:
        "Compare readable café network traffic with a protected connection that hides useful details.",
      duration: "3 minute explore",
      question: "What should I notice?",
      questionCopy:
        "The observer does not disappear, but protected traffic becomes much less useful to them.",
      watch: [
        "Open networks can allow nearby observation.",
        "HTTPS protects content moving between you and a website.",
        "A VPN can add another protected tunnel on untrusted networks.",
      ],
      everyday:
        "On public WiFi, prefer HTTPS websites and avoid sending sensitive data through unknown captive portals.",
      plain:
        "Public WiFi is shared space. Protection does not stop data moving through the network, but it can stop nearby observers from reading useful details.",
      interaction:
        "Switch between open and protected traffic. The path still exists, but the visible information changes.",
      mistake:
        "A lock icon does not mean every website or network is trustworthy. It means the connection to that site is protected.",
      takeaways: [
        "Public WiFi is not automatically dangerous, but it is shared space.",
        "Encrypted traffic hides the useful content of messages.",
        "Look for secure connections before logging in.",
      ],
      levels: [
        {
          label: "Level 1",
          title: "Shared space",
          summary: "Other devices may be nearby on the same network.",
          detail:
            "Public WiFi is a shared environment. The risk depends on the network setup, the sites you visit, and whether your traffic is protected, not simply on being in a café.",
        },
        {
          label: "Level 2",
          title: "HTTPS",
          summary: "Encrypted sites hide the useful content of traffic.",
          detail:
            "HTTPS protects the contents of the connection between your browser and the website. Observers may still see that traffic exists, but they should not be able to read passwords or page contents.",
        },
        {
          label: "Level 3",
          title: "VPNs",
          summary: "A VPN can add a protected tunnel on networks you do not trust.",
          detail:
            "A VPN encrypts traffic between your device and the VPN provider. It can help on untrusted networks, but it does not make unsafe websites safe or remove the need for good account security.",
        },
      ],
      advanced: renderWifiAdvanced,
      render: renderWifiDetail,
    },
    footprint: {
      kicker: "Digital Footprint Explorer",
      title: "How do small clues become a profile?",
      summary:
        "Layer everyday data points and watch a simple profile become more detailed.",
      duration: "4 minute explore",
      question: "What should I notice?",
      questionCopy:
        "No single clue tells the whole story, but combined clues can reveal patterns.",
      watch: [
        "Location, browsing, social, and shopping data each add a layer.",
        "Convenience settings often trade data for personalisation.",
        "Privacy controls can reduce unnecessary sharing.",
      ],
      everyday:
        "Review app permissions, cookie choices, and public profile information every so often.",
      plain:
        "A digital footprint is built from small traces: places, interests, searches, purchases, and public posts. The combined pattern is more revealing than each trace alone.",
      interaction:
        "Turn layers on and off. Watch how each extra data type makes the profile feel more specific.",
      mistake:
        "Privacy is not about hiding everything. It is about choosing which information needs to be shared and which does not.",
      takeaways: [
        "Your footprint is built from many small interactions.",
        "Less sharing can mean less profiling.",
        "Privacy settings are a practical habit, not a one-time task.",
      ],
      levels: [
        {
          label: "Level 1",
          title: "Data points",
          summary: "Apps and websites collect small pieces of activity.",
          detail:
            "A data point might be a location ping, search, click, purchase, like, device type, or time of day. Alone, it may seem small. Stored over time, it becomes more meaningful.",
        },
        {
          label: "Level 2",
          title: "Patterns",
          summary: "Repeated activity can reveal habits and routines.",
          detail:
            "Repeated locations can suggest home, work, school, or regular social places. Repeated browsing can suggest interests, concerns, plans, or major life events.",
        },
        {
          label: "Level 3",
          title: "Profiling",
          summary: "Combined data can shape recommendations, adverts, and assumptions.",
          detail:
            "Profiling combines signals to predict interests or behaviour. This can power useful personalisation, but it can also feel invasive or lead to incorrect assumptions.",
        },
      ],
      advanced: renderFootprintAdvanced,
      render: renderFootprintDetail,
    },
    scenarios: {
      kicker: "Social Engineering Scenarios",
      title: "How do people get nudged into risky choices?",
      summary:
        "Try three low-pressure response paths and see the tactic behind each request.",
      duration: "5 minute explore",
      question: "What should I notice?",
      questionCopy:
        "The safest answer usually creates a pause and moves the conversation to a trusted channel.",
      watch: [
        "Authority can make a request feel more legitimate.",
        "Urgency can make verification feel inconvenient.",
        "Reporting protects other people too.",
      ],
      everyday:
        "If someone asks for a code, password, payment, or remote access, pause and verify independently.",
      plain:
        "Social engineering targets human habits: wanting to help, trusting authority, avoiding conflict, or responding quickly under pressure.",
      interaction:
        "Try each scenario type. Look for the emotional nudge before deciding what action is safest.",
      mistake:
        "Being cautious is not rude. You can be polite and still refuse to share codes, passwords, payments, or remote access.",
      takeaways: [
        "You do not need to prove politeness by complying immediately.",
        "Trusted channels matter more than confident voices.",
        "A pause is a security tool.",
      ],
      levels: [
        {
          label: "Level 1",
          title: "The request",
          summary: "Notice what the person is asking you to do.",
          detail:
            "The risky part is often the action: sharing a code, sending money, installing remote access software, opening a file, or bypassing a normal process.",
        },
        {
          label: "Level 2",
          title: "The pressure",
          summary: "Look for urgency, authority, secrecy, or reward.",
          detail:
            "Social engineering works by creating a reason not to think slowly. Pressure can sound like a deadline, a boss, a crisis, a favour, a prize, or a request to keep something secret.",
        },
        {
          label: "Level 3",
          title: "The pause",
          summary: "Move to a trusted channel before acting.",
          detail:
            "A safe pause changes the situation. You can contact the person through a known number, check with a colleague, report the request, or use an official helpdesk instead of the channel that contacted you.",
        },
      ],
      render: renderScenarioDetail,
    },
  };

  const $ = (selector) => document.querySelector(selector);

  function getTopic() {
    const params = new URLSearchParams(window.location.search);
    return exhibits[params.get("topic")] ? params.get("topic") : "passwords";
  }

  function setText(selector, text) {
    $(selector).textContent = text;
  }

  function scorePassword(value) {
    const length = value.length;
    const normalized = value.trim().toLowerCase();
    const characterGroups = [
      /[a-z]/.test(value),
      /[A-Z]/.test(value),
      /\d/.test(value),
      /[^a-zA-Z0-9]/.test(value),
    ].filter(Boolean).length;
    const patterns = [
      /(.)\1{2,}/.test(value),
      /password|qwerty|letmein|admin|welcome/i.test(value),
      /1234|0000|1111/.test(value),
    ].filter(Boolean).length;
    const commonPassword = /^(password|password1|123456|12345678|qwerty|letmein|admin|welcome)$/i.test(
      normalized
    );
    const searchSpace = Math.max(1, length) * Math.max(1, characterGroups) * 12;
    return {
      length,
      characterGroups,
      patterns,
      commonPassword,
      score: Math.max(8, Math.min(100, searchSpace - patterns * 18 - (commonPassword ? 70 : 0))),
    };
  }

  function renderPasswordDetail(container) {
    container.innerHTML = `
      <label class="lens-label" for="detail-password">Try a password shape</label>
      <input class="lens-input" id="detail-password" value="river museum lantern 42" autocomplete="off" />
      <div class="password-orbit" id="password-orbit" aria-hidden="true"></div>
      <div class="detail-metrics">
        <div><strong id="detail-password-length">0</strong><span>characters</span></div>
        <div><strong id="detail-password-groups">0</strong><span>character groups</span></div>
        <div><strong id="detail-password-patterns">0</strong><span>predictable patterns</span></div>
      </div>
      <p class="result-copy" id="detail-password-copy"></p>
    `;

    const input = $("#detail-password");
    const update = () => {
      const result = scorePassword(input.value);
      $("#detail-password-length").textContent = result.length;
      $("#detail-password-groups").textContent = result.characterGroups;
      $("#detail-password-patterns").textContent = result.patterns;
      $("#password-orbit").style.setProperty("--password-score", `${result.score}%`);
      $("#detail-password-copy").textContent =
        result.commonPassword
          ? "This is a common password pattern, so attackers would try it very early. Common passwords stay weak even when they are not extremely short."
          : result.patterns > 0
          ? "The password is growing, but familiar patterns make it easier to guess than it first appears."
          : "This shape is stronger because it gives attackers a much wider set of possibilities to search.";
    };
    input.addEventListener("input", update);
    update();
  }

  async function sha256(value) {
    const data = new TextEncoder().encode(value);
    const digest = await window.crypto.subtle.digest("SHA-256", data);
    return Array.from(new Uint8Array(digest))
      .map((byte) => byte.toString(16).padStart(2, "0"))
      .join("");
  }

  function hashCells(first, second) {
    return first
      .slice(0, 32)
      .split("")
      .map((char, index) => `<span class="${char === second[index] ? "" : "changed"}">${char}</span>`)
      .join("");
  }

  function renderHashDetail(container) {
    container.innerHTML = `
      <div class="hash-compare-grid">
        <div>
          <label class="lens-label" for="detail-hash-a">First message</label>
          <input class="lens-input" id="detail-hash-a" value="museum ticket" />
        </div>
        <div>
          <label class="lens-label" for="detail-hash-b">Second message</label>
          <input class="lens-input" id="detail-hash-b" value="museum ticket!" />
        </div>
      </div>
      <div class="hash-cell-grid" id="detail-hash-cells"></div>
      <p class="result-copy" id="detail-hash-copy"></p>
    `;

    const update = async () => {
      const first = await sha256($("#detail-hash-a").value);
      const second = await sha256($("#detail-hash-b").value);
      const changed = first.split("").filter((char, index) => char !== second[index]).length;
      $("#detail-hash-cells").innerHTML = hashCells(first, second);
      $("#detail-hash-copy").textContent = `${Math.round((changed / first.length) * 100)}% of hash characters changed across the full fingerprint.`;
    };
    $("#detail-hash-a").addEventListener("input", update);
    $("#detail-hash-b").addEventListener("input", update);
    update();
  }

  function shiftCharacter(char, key) {
    const code = char.charCodeAt(0);
    const isUpper = code >= 65 && code <= 90;
    const isLower = code >= 97 && code <= 122;
    if (!isUpper && !isLower) return char;
    const base = isUpper ? 65 : 97;
    return String.fromCharCode(((code - base + key) % 26) + base);
  }

  function renderEncryptionDetail(container) {
    container.innerHTML = `
      <label class="lens-label" for="detail-plain">Message</label>
      <textarea class="lens-input lens-textarea" id="detail-plain">Meet by the quiet window.</textarea>
      <label class="lens-label" for="detail-key">Key</label>
      <input id="detail-key" type="range" min="1" max="25" value="9" />
      <div class="encryption-steps">
        <div><span>1</span><strong>Plaintext</strong><p id="detail-step-plain"></p></div>
        <div><span>2</span><strong>Key shift</strong><p id="detail-step-key"></p></div>
        <div><span>3</span><strong>Ciphertext</strong><p id="detail-step-cipher"></p></div>
      </div>
    `;

    const update = () => {
      const key = Number($("#detail-key").value);
      const plain = $("#detail-plain").value;
      const cipher = plain.split("").map((char) => shiftCharacter(char, key)).join("");
      $("#detail-step-plain").textContent = plain;
      $("#detail-step-key").textContent = `Each letter moves ${key} places.`;
      $("#detail-step-cipher").textContent = cipher;
    };
    $("#detail-plain").addEventListener("input", update);
    $("#detail-key").addEventListener("input", update);
    update();
  }

  function renderPhishingDetail(container) {
    container.innerHTML = `
      <div class="comparison-mail phishing-comparison">
        <article>
          <span>Pressure message</span>
          <p><strong>From:</strong> Bank Support<br /><button class="clue detail-clue" data-detail="sender">alerts@bank-secure-review.example</button></p>
          <p><button class="clue detail-clue" data-detail="greeting">Hello customer</button>,</p>
          <p>Your account <button class="clue detail-clue" data-detail="threat">closes today</button>.</p>
          <p>Tap <button class="clue detail-clue" data-detail="link">bank-secure-review.example</button> and <button class="clue detail-clue" data-detail="verify">verify now</button>.</p>
        </article>
        <div class="clue-panel">
          <h3 id="detail-clue-title">Select a clue</h3>
          <p id="detail-clue-copy">Compare the tone, the link, and the requested action.</p>
        </div>
        <article class="calmer-message">
          <span>Calmer message</span>
          <p>Your monthly statement is ready. Open your banking app or visit our website directly to review it.</p>
        </article>
      </div>
    `;
    const clueCopy = {
      sender: ["Unfamiliar email address", "The display name sounds helpful, but the email address uses an unfamiliar domain. A sender name can be chosen by the attacker."],
      greeting: ["Impersonal greeting", "'Hello customer' is generic. It can suggest the message was sent broadly rather than from an organisation that knows the account holder."],
      threat: ["Scare tactic", "'Closes today' is designed to create fear and urgency. That pressure shortens the time spent checking."],
      link: ["Lookalike destination", "The link sounds bank-like, but it is not a familiar bank domain."],
      verify: ["Pressure action", "The phrase asks for immediate verification instead of encouraging independent checking."],
    };
    document.querySelectorAll(".detail-clue").forEach((button) => {
      button.addEventListener("click", () => {
        const [title, copy] = clueCopy[button.dataset.detail];
        $("#detail-clue-title").textContent = title;
        $("#detail-clue-copy").textContent = copy;
      });
    });
  }

  function renderWifiDetail(container) {
    container.innerHTML = `
      <div class="wifi-detail-scene" id="detail-wifi-layers">
        <div class="wifi-scene-header">
          <div>
            <p class="eyebrow">Network View</p>
            <h3 id="detail-wifi-title">Open café WiFi</h3>
          </div>
          <button class="button secondary lens-secondary" id="detail-wifi-toggle" type="button">Switch to protected traffic</button>
        </div>
        <div class="wifi-route" aria-label="Public WiFi traffic path">
          <div class="wifi-device">
            <span>You</span>
            <strong>Laptop</strong>
          </div>
          <div class="wifi-path">
            <div class="packet-line">
              <span data-open="login" data-safe="•••••">login</span>
              <span data-open="bank page" data-safe="encrypted">bank page</span>
              <span data-open="message" data-safe="hidden">message</span>
            </div>
            <small id="detail-wifi-copy">On open traffic, useful words can be easier to observe.</small>
          </div>
          <div class="wifi-device">
            <span>Website</span>
            <strong>Service</strong>
          </div>
        </div>
        <div class="wifi-observer">
          <div>
            <span>Nearby observer sees</span>
            <strong id="observer-sees">Readable clues</strong>
            <p id="observer-copy">Words like “login” and page names can reveal what you are doing.</p>
          </div>
          <div>
            <span>Best habit</span>
            <strong id="wifi-habit">Check the connection</strong>
            <p>Use HTTPS, avoid suspicious captive portals, and save sensitive tasks for trusted networks where possible.</p>
          </div>
        </div>
      </div>
    `;
    $("#detail-wifi-toggle").addEventListener("click", () => {
      const layers = $("#detail-wifi-layers");
      layers.classList.toggle("is-secure");
      const isSecure = layers.classList.contains("is-secure");
      layers.querySelectorAll(".packet-line span").forEach((packet) => {
        packet.textContent = isSecure ? packet.dataset.safe : packet.dataset.open;
      });
      $("#detail-wifi-toggle").textContent = layers.classList.contains("is-secure")
        ? "Switch to open traffic"
        : "Switch to protected traffic";
      $("#detail-wifi-title").textContent = isSecure ? "Protected connection" : "Open café WiFi";
      $("#detail-wifi-copy").textContent = layers.classList.contains("is-secure")
        ? "With protection, the observer sees movement but not readable detail."
        : "On open traffic, useful words can be easier to observe.";
      $("#observer-sees").textContent = isSecure ? "Traffic shape, not content" : "Readable clues";
      $("#observer-copy").textContent = isSecure
        ? "They may notice a connection exists, but the sensitive contents are wrapped."
        : "Words like “login” and page names can reveal what you are doing.";
      $("#wifi-habit").textContent = isSecure ? "Still verify the site" : "Check the connection";
    });
  }

  function renderFootprintDetail(container) {
    container.innerHTML = `
      <div class="footprint-controls">
        <p class="visual-caption">
          Turn on data sources to see how separate traces start forming a more
          complete profile.
        </p>
        <div class="toggle-list">
          <label><input type="checkbox" data-profile="places" checked /> Places</label>
          <label><input type="checkbox" data-profile="interests" checked /> Interests</label>
          <label><input type="checkbox" data-profile="friends" /> Connections</label>
          <label><input type="checkbox" data-profile="spending" /> Spending</label>
        </div>
      </div>
      <div class="footprint-visual" aria-live="polite">
        <div class="profile-core">
          <span>Profile</span>
          <strong id="profile-count">2</strong>
          <small>active signals</small>
        </div>
        <div class="profile-orbits" id="profile-stack"></div>
      </div>
    `;
    const labels = {
      places: ["Regular places", "commute, cafés, usual locations"],
      interests: ["Topics and habits", "searches, articles, watch history"],
      friends: ["Social graph", "contacts, tags, shared groups"],
      spending: ["Purchasing patterns", "receipts, wishlists, loyalty data"],
    };
    const update = () => {
      const active = Array.from(document.querySelectorAll("[data-profile]:checked"));
      $("#profile-count").textContent = active.length;
      $("#profile-stack").innerHTML = active
        .map((input, index) => {
          const [title, copy] = labels[input.dataset.profile];
          return `
            <div class="profile-node" style="--node-index:${index}">
              <strong>${title}</strong>
              <span>${copy}</span>
            </div>
          `;
        })
        .join("");
    };
    document.querySelectorAll("[data-profile]").forEach((input) => input.addEventListener("change", update));
    update();
  }

  function renderScenarioDetail(container) {
    container.innerHTML = `
      <div class="scenario-paths">
        <button data-path="authority" type="button">Fake authority</button>
        <button data-path="urgency" type="button">Urgent favour</button>
        <button data-path="reward" type="button">Too-good offer</button>
      </div>
      <div class="clue-panel">
        <h3 id="path-title">Pick a scenario type</h3>
        <p id="path-copy">CyberLens will show the nudge and a safer pause.</p>
      </div>
    `;
    const paths = {
      authority: ["Fake authority", "Someone borrows trust from a role, such as IT, delivery support, or a manager."],
      urgency: ["Urgent favour", "A deadline makes checking feel socially awkward or inconvenient."],
      reward: ["Too-good offer", "A tempting benefit can distract from unusual requests or unfamiliar links."],
    };
    document.querySelectorAll("[data-path]").forEach((button) => {
      button.addEventListener("click", () => {
        const [title, copy] = paths[button.dataset.path];
        $("#path-title").textContent = title;
        $("#path-copy").textContent = copy;
      });
    });
  }

  function renderPasswordAdvanced(container) {
    container.innerHTML = `
      <div class="advanced-card">
        <div>
          <p class="eyebrow">Advanced Activity</p>
          <h2>Common password trap</h2>
          <p>
            A password can look long enough and still be weak if it appears in
            attacker wordlists. Try comparing a common password with a short
            passphrase.
          </p>
        </div>
        <div class="password-example-grid">
          <div>
            <span>Common</span>
            <strong>password</strong>
            <p>Tried very early by attackers.</p>
          </div>
          <div>
            <span>Better shape</span>
            <strong>river museum lantern</strong>
            <p>Longer and less predictable.</p>
          </div>
        </div>
        <p class="result-copy">
          The goal is not to make a password look complicated. The goal is to
          make it hard to predict, unique to one account, and safe to store in a
          password manager.
        </p>
      </div>
    `;
  }

  function renderPhishingAdvanced(container) {
    container.innerHTML = `
      <div class="advanced-card phishing-forms-card">
        <div>
          <p class="eyebrow">Advanced Examples</p>
          <h2>Phishing is not only email.</h2>
          <p>
            The same manipulation patterns can appear in texts, phone calls,
            social media messages, QR codes, and fake support chats.
          </p>
        </div>
        <div class="phishing-form-grid">
          <article>
            <span>Smishing</span>
            <h3>Text message</h3>
            <p>“Your parcel is held. Pay a £1.20 redelivery fee now.”</p>
          </article>
          <article>
            <span>Vishing</span>
            <h3>Phone call</h3>
            <p>“This is IT support. Read out the login code on your screen.”</p>
          </article>
          <article>
            <span>Impersonation</span>
            <h3>Social DM</h3>
            <p>“I lost access to my account. Can you receive a code for me?”</p>
          </article>
        </div>
        <p class="result-copy">
          The channel changes, but the pattern is similar: pressure, trust,
          unusual requests, and a push to act before verifying.
        </p>
      </div>
    `;
  }

  function renderWifiAdvanced(container) {
    container.innerHTML = `
      <div class="advanced-card wifi-advanced-card">
        <div>
          <p class="eyebrow">Advanced Example</p>
          <h2>Tricks that are not solved by a padlock alone.</h2>
          <p>
            The simulator above is about what traffic looks like on the wire.
            These café moments are different: the network itself, or the login
            page, may be the trap.
          </p>
        </div>
        <div class="wifi-example-grid">
          <article>
            <span>Evil twin</span>
            <h3>Right name, wrong network</h3>
            <p>
              “River Café WiFi” appears in the list, but nobody at the counter
              recognises it. An attacker can broadcast a convincing copy.
            </p>
          </article>
          <article>
            <span>Captive portal</span>
            <h3>Sign in to get online</h3>
            <p>
              A pop-up asks for an email password or card details before you
              browse. A real venue usually wants a room code, voucher, or terms
              tick — not your main account password.
            </p>
          </article>
          <article>
            <span>Fake login page</span>
            <h3>Looks like your bank</h3>
            <p>
              Even on encrypted WiFi, you can still be sent to a convincing
              copy of a login screen. The padlock protects the connection, not
              whether the site is genuine.
            </p>
          </article>
        </div>
        <p class="result-copy">
          A useful pause: confirm the network with staff, avoid reusing important
          passwords on “free WiFi” forms, and open banking or email through an
          app or bookmark you already trust — not through a link that appeared
          after joining.
        </p>
      </div>
    `;
  }

  function renderFootprintAdvanced(container) {
    container.innerHTML = `
      <div class="advanced-card footprint-advanced-card">
        <div>
          <p class="eyebrow">Advanced Example</p>
          <h2>Clues you did not mean to share.</h2>
          <p>
            The activity above shows how separate signals combine. These
            examples are easy to miss because they do not always feel like a
            “data setting” at the moment they happen.
          </p>
        </div>
        <div class="wifi-example-grid">
          <article>
            <span>Inference</span>
            <h3>Guessed categories</h3>
            <p>
              A shop visit, a search, and a liked post can be combined into a
              label you never typed, such as “new parent” or “job seeker.”
            </p>
          </article>
          <article>
            <span>Cross-app linking</span>
            <h3>Same person, many profiles</h3>
            <p>
              Sign-in with email, device identifiers, or ad networks can tie
              activity across apps into one broader picture.
            </p>
          </article>
          <article>
            <span>Other people's posts</span>
            <h3>Tagged without posting</h3>
            <p>
              A friend’s photo, check-in, or group tag can reveal your location
              or relationships even when your own account looks quiet.
            </p>
          </article>
        </div>
        <p class="result-copy">
          A practical review: untag old photos, check what is public on social
          accounts, trim app permissions you no longer need, and remember that
          “delete” on one app may not remove copies elsewhere.
        </p>
      </div>
    `;
  }

  function renderOtpAdvanced(container) {
    container.innerHTML = `
      <div class="advanced-card">
        <div>
          <p class="eyebrow">Advanced Example</p>
          <h2>One-time pad idea</h2>
          <p>
            A one-time pad combines a message with a truly random key that is the
            same length as the message and never reused. When those conditions
            are met, it can be perfectly secret in theory.
          </p>
        </div>
        <div class="otp-grid" aria-label="One-time pad example">
          <div><span>Message</span><strong>H E L L O</strong></div>
          <div><span>Random key</span><strong>X M C K L</strong></div>
          <div><span>Combined</span><strong>E Q N V Z</strong></div>
        </div>
        <p class="result-copy">
          The catch is practical: the key must be genuinely random, kept secret,
          shared safely, as long as the message, and never used again. Reusing a
          one-time pad can leak patterns.
        </p>
      </div>
    `;
  }

  function bindLevelCards() {
    document.querySelectorAll(".level-card").forEach((card) => {
      card.addEventListener("click", () => {
        document.querySelectorAll(".level-card").forEach((otherCard) => {
          otherCard.setAttribute("aria-selected", "false");
        });
        card.setAttribute("aria-selected", "true");
        $("#level-detail-title").textContent = card.dataset.title;
        $("#level-detail-summary").textContent = card.dataset.summary;
        $("#level-detail-copy").textContent = card.dataset.detail;
      });
    });
  }

  function renderPage() {
    const topic = getTopic();
    const exhibit = exhibits[topic];
    document.title = `${exhibit.kicker} | CyberLens`;
    setText("#detail-kicker", exhibit.kicker);
    setText("#detail-title", exhibit.title);
    setText("#detail-summary", exhibit.summary);
    setText("#detail-duration", exhibit.duration);
    setText("#detail-question", exhibit.question);
    setText("#detail-question-copy", exhibit.questionCopy);
    $("#watch-list").innerHTML = exhibit.watch.map((item) => `<li>${item}</li>`).join("");
    setText("#everyday-copy", exhibit.everyday);
    $("#level-up-grid").innerHTML = exhibit.levels
      .map(
        (level, index) => `
          <button
            class="level-card"
            type="button"
            aria-selected="${index === 0 ? "true" : "false"}"
            data-title="${level.title}"
            data-summary="${level.summary}"
            data-detail="${level.detail}"
          >
            <span>${level.label}</span>
            <h3>${level.title}</h3>
            <p>${level.summary}</p>
          </button>
        `
      )
      .join("") + `
        <article class="level-detail-panel">
          <span>Selected Detail</span>
          <h3 id="level-detail-title">${exhibit.levels[0].title}</h3>
          <p id="level-detail-summary">${exhibit.levels[0].summary}</p>
          <div>
            <strong>Go deeper</strong>
            <p id="level-detail-copy">${exhibit.levels[0].detail}</p>
          </div>
        </article>
      `;
    $("#takeaway-grid").innerHTML = exhibit.takeaways
      .map((item) => `<article><h3>Remember</h3><p>${item}</p></article>`)
      .join("");
    exhibit.render($("#detail-experiment"));
    bindLevelCards();

    const advancedSection = $("#advanced-exhibit");
    if (exhibit.advanced) {
      advancedSection.hidden = false;
      exhibit.advanced($("#advanced-content"));
    } else {
      advancedSection.hidden = true;
      $("#advanced-content").innerHTML = "";
    }
  }

  document.addEventListener("DOMContentLoaded", renderPage);
})();
