(function(){
  var navLinks = document.querySelectorAll('.uxph-nav-link-anchor');
  var navLinkEvent = function (e) {
    // check parent
    var el = e.target;
    while (el && el.className.split(' ').indexOf('uxph-nav-link-anchor') < 0) {
      el = el.parentNode;
    }
    // not the most efficient way but it works
    for (var i in navLinks) {
      if (navLinks[i].addEventListener) {
        navLinks[i].className = navLinks[i].className.replace('uxph-nav-link-anchor-active', '').trim();
      }
    }
    if (el && el.className.split(' ').indexOf('uxph-nav-link-anchor-active') < 0) {
      el.className += ' uxph-nav-link-anchor-active'
    }
  }.bind(this);
  for (var i in navLinks) {
    if (navLinks[i].addEventListener) {
      navLinks[i].addEventListener('click', navLinkEvent)
    }
  }
}());
