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

/* Vídeos dos cases (vitrine) — performance + hover.
   - Poster (foto) carrega lazy quando o card se aproxima da viewport.
   - O vídeo (.mp4) só é baixado no hover/foco (preload sob demanda) e toca
     em loop, sem áudio. Respeita prefers-reduced-motion: mantém só o poster. */
(function () {
  var videos = document.querySelectorAll('.case-cover__video[data-poster]');
  if (!videos.length) return;

  var reduce = window.matchMedia &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  function setPoster(v) {
    if (v.dataset.poster && !v.getAttribute('poster')) v.setAttribute('poster', v.dataset.poster);
  }

  // 1) poster lazy via IntersectionObserver (margem p/ carregar um pouco antes)
  if ('IntersectionObserver' in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) { setPoster(entry.target); io.unobserve(entry.target); }
      });
    }, { rootMargin: '300px' });
    videos.forEach(function (v) { io.observe(v); });
  } else {
    videos.forEach(setPoster);
  }

  // 2) vídeo sob demanda: baixa o src só no hover/foco e toca
  videos.forEach(function (v) {
    var card = v.closest('.case-card');
    if (!card) return;

    function play() {
      if (reduce) { setPoster(v); return; }      // movimento reduzido: só o poster
      setPoster(v);
      if (!v.getAttribute('src') && v.dataset.src) v.setAttribute('src', v.dataset.src);
      var p = v.play();
      if (p && p.catch) p.catch(function () {});  // ignora rejeição sem gesto/autoplay
    }
    function stop() { try { v.pause(); } catch (e) {} }

    card.addEventListener('mouseenter', play);
    card.addEventListener('mouseleave', stop);
    card.addEventListener('focusin', play);
    card.addEventListener('focusout', stop);
  });
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
