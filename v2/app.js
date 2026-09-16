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

  /* ---------- Reveal ao rolar ---------- */
  var reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (!reduce && "IntersectionObserver" in window) {
    document.documentElement.classList.add("reveal-on");
    var items = document.querySelectorAll(
      ".section-head, .area-card, .stack-col, .cases-grid .case-card, .cta-band, .prose > *, .case-stats, .compare, .itemgrid, .flow, .handoff-fig, .artifact, .artifact-scroll"
    );
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) { e.target.classList.add("in"); io.unobserve(e.target); }
      });
    }, { threshold: 0.12, rootMargin: "0px 0px -6% 0px" });
    items.forEach(function (el, i) {
      el.classList.add("reveal");
      var parent = el.parentElement;
      if (parent && /areas-grid|stack-grid|cases-grid/.test(parent.className)) {
        var sibs = Array.prototype.indexOf.call(parent.children, el);
        el.style.transitionDelay = (sibs % 3) * 80 + "ms";
      }
      io.observe(el);
    });
  }

  /* ---------- Timeline "Como trabalho" ---------- */
  var method = document.querySelector(".method");
  if (method) {
    if (reduce || !("IntersectionObserver" in window)) {
      method.classList.add("is-visible");
    } else {
      var mio = new IntersectionObserver(function (entries) {
        entries.forEach(function (e) { if (e.isIntersecting) { method.classList.add("is-visible"); } });
      }, { threshold: 0.3 });
      mio.observe(method);
    }
  }

  /* ---------- Case carousel (home only): loop contínuo p/ frente ---------- */
  var track = document.getElementById("carouselTrack");
  if (!track) return;

  var real = Array.prototype.slice.call(track.children);
  var count = real.length;
  var dotsWrap = document.getElementById("carouselDots");
  var prevBtn = document.getElementById("prevBtn");
  var nextBtn = document.getElementById("nextBtn");
  var status = document.getElementById("carouselStatus");
  var carousel = document.getElementById("caseCarousel");
  var AUTO_MS = 8000;
  var timer = null;
  var index = 0;       // 0..count (count = clone do primeiro slide)
  var animating = false;

  // clone do primeiro slide ao fim → o loop nunca "volta" atravessando os slides
  var clone = real[0].cloneNode(true);
  clone.setAttribute("aria-hidden", "true");
  track.appendChild(clone);

  real.forEach(function (_, i) {
    var dot = document.createElement("button");
    dot.className = "dot";
    dot.setAttribute("role", "tab");
    dot.setAttribute("aria-label", "Ir para case " + (i + 1));
    dot.addEventListener("click", function () { goTo(i); restart(); });
    dotsWrap.appendChild(dot);
  });
  var dots = Array.prototype.slice.call(dotsWrap.children);

  function paint() {
    track.style.transform = "translateX(-" + index * 100 + "%)";
    var r = index % count;
    dots.forEach(function (d, i) { d.setAttribute("aria-current", i === r ? "true" : "false"); });
    if (status) status.textContent = "Mostrando case " + (r + 1) + " de " + count;
  }
  function jumpTo(i) {                 // reposiciona sem animar
    track.classList.add("no-anim");
    index = i;
    track.style.transform = "translateX(-" + index * 100 + "%)";
    void track.offsetHeight;           // força reflow
    track.classList.remove("no-anim");
  }
  function next() {
    if (animating) return;
    animating = true; index++; paint();
  }
  function prev() {
    if (animating) return;
    animating = true;
    if (index === 0) jumpTo(count);    // salta p/ o clone e desliza p/ o último
    index--; paint();
  }
  function goTo(i) {
    if (animating || i === index % count) return;
    animating = true; index = i; paint();
  }

  track.addEventListener("transitionend", function (e) {
    if (e.propertyName !== "transform") return;
    if (index === count) jumpTo(0);    // chegou no clone → volta ao 0 sem o usuário ver
    animating = false;
  });

  function start() { if (!timer) timer = window.setInterval(next, AUTO_MS); }
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
  track.addEventListener("touchstart", function (e) { touchStartX = e.changedTouches[0].clientX; stop(); }, { passive: true });
  track.addEventListener("touchend", function (e) {
    if (touchStartX === null) return;
    var dx = e.changedTouches[0].clientX - touchStartX;
    if (Math.abs(dx) > 40) { dx < 0 ? next() : prev(); }
    touchStartX = null; start();
  }, { passive: true });

  paint();
  if (!reduce) start();
})();
