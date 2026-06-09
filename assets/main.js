/* Eddi Kochi — portfólio MVP · JS mínimo */

// Menu mobile
(function () {
  var toggle = document.querySelector('.nav-toggle');
  var links = document.querySelector('.nav-links');
  if (toggle && links) {
    toggle.addEventListener('click', function () {
      var open = links.classList.toggle('open');
      toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
    });
  }
})();

/* Timeline do método — desenha a linha + revela etapas ao entrar na viewport.
   Usa IntersectionObserver (não no load). Respeita prefers-reduced-motion
   e navegadores sem suporte: nesses casos mostra a timeline completa na hora. */
(function () {
  var method = document.querySelector('.method');
  if (!method) return;

  var reduce = window.matchMedia &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  if (reduce || !('IntersectionObserver' in window)) {
    method.classList.add('is-visible');
    return;
  }

  var io = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        io.unobserve(entry.target); // anima uma única vez
      }
    });
  }, { threshold: 0.3 });

  io.observe(method);
})();

/* Tracking leve — sem dependência externa.
   Hoje só registra no console (placeholder). Quando você plugar
   GTM/GA4/Clarity, troque o corpo de track() pela chamada real,
   ex.: window.dataLayer.push({event: name, ...detail}).
   Os nomes seguem o destilado: click_view_cases, click_download_resume,
   click_contact, click_linkedin, view_case, scroll_case_75. */
(function () {
  function track(name, detail) {
    // TODO: integrar com GTM/GA4/Clarity
    if (window.console) console.log('[track]', name, detail || '');
  }
  window.track = track;

  // data-track="evento" em qualquer link/botão
  document.querySelectorAll('[data-track]').forEach(function (el) {
    el.addEventListener('click', function () {
      track(el.getAttribute('data-track'));
    });
  });

  // view_case: dispara em páginas de case
  if (document.body.dataset.page === 'case') {
    track('view_case', { slug: document.body.dataset.slug || '' });

    // scroll_case_75: uma vez, ao passar de 75% da página
    var fired = false;
    window.addEventListener('scroll', function () {
      if (fired) return;
      var h = document.documentElement;
      var pct = (h.scrollTop + window.innerHeight) / h.scrollHeight;
      if (pct >= 0.75) { fired = true; track('scroll_case_75', { slug: document.body.dataset.slug || '' }); }
    }, { passive: true });
  }
})();
