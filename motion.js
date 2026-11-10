/* Motion compartilhado (home PT/EN): troca de idioma suave + reveal nas demais seções */
(function(){
  var ok=window.matchMedia('(prefers-reduced-motion: no-preference)').matches;

  /* Troca PT/EN: a pílula desliza, a página esmaece e só então navega */
  document.querySelectorAll('.lang').forEach(function(g){
    g.querySelectorAll('a:not(.active)').forEach(function(a){
      a.addEventListener('click',function(e){
        if(!ok||e.metaKey||e.ctrlKey||e.shiftKey) return;
        e.preventDefault();
        g.classList.add('switching');
        document.body.classList.add('leaving');
        setTimeout(function(){ location.href=a.href; },380);
      });
    });
  });
  /* Volta pelo histórico (bfcache) sem ficar esmaecida */
  window.addEventListener('pageshow',function(){
    document.body.classList.remove('leaving');
    document.querySelectorAll('.lang.switching').forEach(function(g){ g.classList.remove('switching'); });
  });

  if(!ok) return;
  /* Reveal (sobe de baixo) nas seções fora de #work */
  var sel='.sec:not(#work) .head, .cap, .process .step, .about > *, .cta .w > *, .toolstrip, .sys';
  var els=[].slice.call(document.querySelectorAll(sel)).filter(function(el){ return !el.classList.contains('reveal'); });
  if(!els.length||!('IntersectionObserver' in window)) return;
  els.forEach(function(el){
    el.classList.add('reveal');
    var sibs=[].slice.call(el.parentNode.children).filter(function(s){ return s.matches(sel); });
    var i=sibs.indexOf(el); if(i>0) el.style.transitionDelay=Math.min(i,5)*80+'ms';
  });
  var io=new IntersectionObserver(function(entries){
    entries.forEach(function(e){ if(e.isIntersecting){ e.target.classList.add('is-visible'); io.unobserve(e.target); } });
  },{threshold:.12,rootMargin:'0px 0px -8% 0px'});
  els.forEach(function(el){ io.observe(el); });
})();
