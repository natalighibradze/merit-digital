(function(){
  function loadWidgets(){
    document.querySelectorAll('script.tv-widget-config').forEach(function(cfg){
      if (cfg.dataset.loaded) return;
      cfg.dataset.loaded = '1';
      var s = document.createElement('script');
      s.type = 'text/javascript';
      s.async = true;
      s.src = cfg.dataset.src;
      s.textContent = cfg.textContent;
      cfg.parentElement.insertBefore(s, cfg);
      var fallback = cfg.parentElement.querySelector('.tv-widget-fallback');
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
})();
