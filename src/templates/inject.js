//ES5!!!
(function() {

  var origin = (typeof injectParams !== 'undefined' && injectParams.origin) || '';
  origin = origin.replace(/\/$/, '');

  var scripts = [
    origin + '<%= htmlWebpackPlugin.options.container %>',
    origin + '<%= htmlWebpackPlugin.options.container %>'
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


