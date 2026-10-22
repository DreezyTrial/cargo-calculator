(function () {
  var MESSAGE_TYPE = 'cargo-calculator:resize';
  var script = document.currentScript;
  if (!script) {
    return;
  }

  var origin = new URL(script.src).origin;
  var src = script.getAttribute('data-src') || origin + '/?embed=1';
  var frameOrigin = new URL(src, origin).origin;
  var targetSelector = script.getAttribute('data-target');
  var host = targetSelector ? document.querySelector(targetSelector) : null;

  if (!host) {
    host = document.createElement('div');
    host.className = 'cc-embed-host';
    script.parentNode.insertBefore(host, script);
  }

  var frame = document.createElement('iframe');
  frame.src = src;
  frame.title = script.getAttribute('data-title') || 'Калькулятор вантажоперевезень';
  frame.loading = 'lazy';
  frame.setAttribute('allow', 'clipboard-write');
  frame.style.cssText =
    'display:block;width:100%;max-width:100%;min-width:100%;min-height:640px;height:640px;border:0;background:#f3f4f6;color-scheme:light;transform:none;filter:none;';

  window.addEventListener('message', function (event) {
    if (event.origin !== frameOrigin) {
      return;
    }
    var data = event.data;
    if (!data || data.type !== MESSAGE_TYPE || typeof data.height !== 'number') {
      return;
    }
    frame.style.height = Math.max(640, data.height) + 'px';
  });

  host.appendChild(frame);
})();
