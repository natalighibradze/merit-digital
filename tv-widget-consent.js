(function(){
  function isHidden(cfg){
    // Walk up the ancestor chain rather than checking only the immediate
    // parent: a widget can be hidden by a wrapper further up (e.g. the
    // mobile mini-chart grid), not just its own direct container.
    var el = cfg.parentElement;
    while (el) {
      if (getComputedStyle(el).display === 'none') return true;
      el = el.parentElement;
    }
    return false;
  }
  function loadWidgets(){
    document.querySelectorAll('script.tv-widget-config').forEach(function(cfg){
      if (cfg.dataset.loaded) return;
      if (isHidden(cfg)) return;
      cfg.dataset.loaded = '1';
      var s = document.createElement('script');
      s.type = 'text/javascript';
      s.async = true;
      s.src = cfg.dataset.src;
      s.textContent = cfg.textContent;
      cfg.parentElement.insertBefore(s, cfg);
      var card = cfg.closest('.dashboard-full-frame, .dashboard-frame') || cfg.parentElement.parentElement;
      var fallback = card && card.querySelector('.tv-widget-fallback');
      if (fallback) fallback.style.display = 'none';
    });
  }
  function showFallbacks(){
    document.querySelectorAll('.tv-widget-fallback').forEach(function(el){ el.style.display = 'flex'; });
  }
  function applyConsent(value){
    if (value === 'all') loadWidgets();
    else showFallbacks();
  }

  var existing = window.MDCookieConsent && window.MDCookieConsent.get();
  if (existing) applyConsent(existing);
  else showFallbacks();

  window.addEventListener('md-consent-change', function(e){ applyConsent(e.detail.value); });

  // If the desktop/mobile widget swap changes which container is visible
  // (e.g. rotating the phone, resizing the window across the breakpoint),
  // load whichever variant just became visible.
  var resizeTimer;
  window.addEventListener('resize', function(){
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(function(){
      if (window.MDCookieConsent && window.MDCookieConsent.get() === 'all') loadWidgets();
    }, 250);
  });
})();
