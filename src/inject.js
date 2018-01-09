//ES5!!!
(function() {

  var origin = (typeof injectParams !== 'undefined' && injectParams.origin) || '';
  origin = origin.replace(/\/$/, '');

  var scripts = [
    'https://maps.googleapis.com/maps/api/js?key=AIzaSyA5V0jwTZEozaLZld3JLqd9LGVSUkSrw1U',
    origin + '<<<vendor>>>',
    origin + '<<<app>>>'
  ];

  loadScripts(scripts);

  function loadScripts(srcList) {
    f(0);
    function f(i) {
      if(i >= srcList.length) return;
      loadScript(srcList[i], function() {
        f(++i);
      });
    }
  }

  function loadScript(src, onLoad) {
    var $script = document.createElement('script');
    $script.type = "text/javascript";
    $script.src = src;
    $script.onload = onLoad;
    document.head.appendChild($script);
  }
})();


