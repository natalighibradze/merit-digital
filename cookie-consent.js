(function(){
  var STORAGE_KEY = 'md_cookie_consent';

  function getConsent(){
    try { return localStorage.getItem(STORAGE_KEY); } catch(e){ return null; }
  }
  function setConsent(value){
    try { localStorage.setItem(STORAGE_KEY, value); } catch(e){}
    hideBanner();
    window.dispatchEvent(new CustomEvent('md-consent-change', { detail: { value: value } }));
  }

  var style = document.createElement('style');
  style.textContent = [
    '#mdCookieBanner{position:fixed;left:0;right:0;bottom:0;z-index:500;',
    'background:rgba(6,8,11,.97);backdrop-filter:blur(14px);-webkit-backdrop-filter:blur(14px);',
    'border-top:1px solid rgba(255,255,255,.1);padding:20px 24px;',
    'display:flex;align-items:center;justify-content:center;gap:20px;flex-wrap:wrap;',
    'font-family:"Helvetica Neue",Arial,Helvetica,sans-serif;',
    'transform:translateY(110%);transition:transform .35s ease;}',
    '#mdCookieBanner.open{transform:translateY(0);}',
    '#mdCookieBanner p{margin:0;color:#9fb0ac;font-size:.85rem;line-height:1.6;max-width:560px;}',
    '#mdCookieBanner a{color:#5d6bee;text-decoration:underline;}',
    '#mdCookieBanner .md-cookie-actions{display:flex;gap:10px;flex-wrap:wrap;}',
    '#mdCookieBanner button{font-size:.82rem;padding:10px 18px;border-radius:8px;cursor:pointer;font-family:inherit;font-weight:600;}',
    '#mdCookieBanner .md-accept{background:#5d6bee;color:#ffffff;border:none;}',
    '#mdCookieBanner .md-accept:hover{background:#4650c4;}',
    '#mdCookieBanner .md-essential{background:transparent;color:#f3f6f5;border:1px solid rgba(255,255,255,.1);}',
    '#mdCookieBanner .md-essential:hover{border-color:#5d6bee;}'
  ].join('');
  document.head.appendChild(style);

  var banner = document.createElement('div');
  banner.id = 'mdCookieBanner';
  banner.setAttribute('role', 'dialog');
  banner.setAttribute('aria-label', 'Cookie preferences');
  banner.innerHTML =
    '<p>We use essential cookies to run this site, and, with your consent, non-essential cookies for embedded market data tools. See our <a href="/cookie-policy">Cookie Policy</a> for details.</p>' +
    '<div class="md-cookie-actions">' +
      '<button type="button" class="md-essential" id="mdCookieEssential">Essential Only</button>' +
      '<button type="button" class="md-accept" id="mdCookieAccept">Accept All</button>' +
    '</div>';

  function mount(){
    document.body.appendChild(banner);
    document.getElementById('mdCookieAccept').addEventListener('click', function(){ setConsent('all'); });
    document.getElementById('mdCookieEssential').addEventListener('click', function(){ setConsent('essential'); });
  }
  if (document.body) mount();
  else document.addEventListener('DOMContentLoaded', mount);

  function showBanner(){ banner.classList.add('open'); }
  function hideBanner(){ banner.classList.remove('open'); }

  // Show automatically on first visit (no stored choice yet).
  if (!getConsent()){
    setTimeout(showBanner, 600);
  }

  window.MDCookieConsent = {
    get: getConsent,
    set: setConsent,
    openBanner: showBanner
  };
})();
