(function () {
  const carousel = document.querySelector("[data-exhibit-carousel]");
  if (!carousel) return;

  const track = carousel.querySelector("[data-carousel-track]");
  const slides = Array.from(carousel.querySelectorAll("[data-carousel-slide]"));
  const prevButton = carousel.querySelector("[data-carousel-prev]");
  const nextButton = carousel.querySelector("[data-carousel-next]");
  const dotsContainer = carousel.querySelector("[data-carousel-dots]");
  const status = carousel.querySelector("[data-carousel-status]");

  if (!track || slides.length === 0) return;

  let activeIndex = 0;
  let isAnimating = false;

  slides.forEach((slide, index) => {
    slide.setAttribute("aria-hidden", index === 0 ? "false" : "true");

    const dot = document.createElement("button");
    dot.type = "button";
    dot.className = "exhibit-carousel-dot";
    dot.setAttribute("role", "tab");
    dot.setAttribute("aria-label", `Show exhibit ${index + 1} of ${slides.length}`);
    dot.setAttribute("aria-selected", index === 0 ? "true" : "false");
    dot.addEventListener("click", () => goTo(index));
    dotsContainer.appendChild(dot);
  });

  const dots = Array.from(carousel.querySelectorAll(".exhibit-carousel-dot"));

  function slideLabel(slide) {
    const heading = slide.querySelector("figcaption strong");
    return heading ? heading.textContent.trim() : "Exhibit";
  }

  function normalizeIndex(index) {
    const total = slides.length;
    return ((index % total) + total) % total;
  }

  function update() {
    track.style.transform = `translate3d(-${activeIndex * 100}%, 0, 0)`;

    slides.forEach((slide, index) => {
      slide.setAttribute("aria-hidden", index === activeIndex ? "false" : "true");
    });

    dots.forEach((dot, index) => {
      dot.setAttribute("aria-selected", index === activeIndex ? "true" : "false");
    });

    status.textContent = `${slideLabel(slides[activeIndex])} · ${activeIndex + 1} / ${slides.length}`;
  }

  function goTo(index) {
    const nextIndex = normalizeIndex(index);
    if (nextIndex === activeIndex || isAnimating) return;

    isAnimating = true;
    activeIndex = nextIndex;
    update();

    window.setTimeout(() => {
      isAnimating = false;
    }, 360);
  }

  function step(direction) {
    goTo(activeIndex + direction);
  }

  prevButton.addEventListener("click", () => step(-1));
  nextButton.addEventListener("click", () => step(1));

  carousel.addEventListener("keydown", (event) => {
    if (event.key === "ArrowLeft") {
      event.preventDefault();
      step(-1);
    }
    if (event.key === "ArrowRight") {
      event.preventDefault();
      step(1);
    }
  });

  update();
})();
