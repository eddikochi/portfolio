(function () {
  "use strict";

  /* ---------- Mobile nav ---------- */
  var navToggle = document.getElementById("navToggle");
  var primaryNav = document.getElementById("primaryNav");
  if (navToggle && primaryNav) {
    navToggle.addEventListener("click", function () {
      var open = primaryNav.classList.toggle("open");
      navToggle.setAttribute("aria-expanded", open ? "true" : "false");
    });
    primaryNav.addEventListener("click", function (e) {
      if (e.target.tagName === "A" && window.innerWidth <= 720) {
        primaryNav.classList.remove("open");
        navToggle.setAttribute("aria-expanded", "false");
      }
    });
  }

  /* ---------- Case carousel (home only) ---------- */
  var track = document.getElementById("carouselTrack");
  if (!track) return;

  var slides = Array.prototype.slice.call(track.children);
  var dotsWrap = document.getElementById("carouselDots");
  var prevBtn = document.getElementById("prevBtn");
  var nextBtn = document.getElementById("nextBtn");
  var status = document.getElementById("carouselStatus");
  var carousel = document.getElementById("caseCarousel");
  var index = 0;
  var count = slides.length;
  var AUTO_MS = 6000;
  var timer = null;

  slides.forEach(function (_, i) {
    var dot = document.createElement("button");
    dot.className = "dot";
    dot.setAttribute("role", "tab");
    dot.setAttribute("aria-label", "Ir para case " + (i + 1));
    dot.addEventListener("click", function () { goTo(i); restart(); });
    dotsWrap.appendChild(dot);
  });
  var dots = Array.prototype.slice.call(dotsWrap.children);

  function render() {
    track.style.transform = "translateX(-" + index * 100 + "%)";
    dots.forEach(function (d, i) {
      d.setAttribute("aria-current", i === index ? "true" : "false");
    });
    if (status) status.textContent = "Mostrando case " + (index + 1) + " de " + count;
  }
  function goTo(i) { index = (i + count) % count; render(); }
  function next() { goTo(index + 1); }
  function prev() { goTo(index - 1); }
  function start() { timer = window.setInterval(next, AUTO_MS); }
  function stop() { if (timer) { window.clearInterval(timer); timer = null; } }
  function restart() { stop(); start(); }

  if (nextBtn) nextBtn.addEventListener("click", function () { next(); restart(); });
  if (prevBtn) prevBtn.addEventListener("click", function () { prev(); restart(); });

  if (carousel) {
    carousel.addEventListener("keydown", function (e) {
      if (e.key === "ArrowRight") { next(); restart(); }
      if (e.key === "ArrowLeft") { prev(); restart(); }
    });
    carousel.addEventListener("mouseenter", stop);
    carousel.addEventListener("mouseleave", start);
    carousel.addEventListener("focusin", stop);
    carousel.addEventListener("focusout", start);
  }

  var touchStartX = null;
  track.addEventListener("touchstart", function (e) {
    touchStartX = e.changedTouches[0].clientX; stop();
  }, { passive: true });
  track.addEventListener("touchend", function (e) {
    if (touchStartX === null) return;
    var dx = e.changedTouches[0].clientX - touchStartX;
    if (Math.abs(dx) > 40) { dx < 0 ? next() : prev(); }
    touchStartX = null; start();
  }, { passive: true });

  render();
  if (!window.matchMedia("(prefers-reduced-motion: reduce)").matches) start();
})();
