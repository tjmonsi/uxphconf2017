UXPHCONF2017.Elements = (function () {
  'use strict';

  function init() {
    UXPHCONF2017.Elements.Template = document.getElementById('uxphconf-app');
    UXPHCONF2017.Elements.Loader = document.getElementById('showbox');
  }

  return {
    init: init
  };
}());