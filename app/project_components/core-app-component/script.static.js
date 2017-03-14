Polymer({
  is: "{{name}}",

  showMessage: function (message, opt_tapHandler, opt_action, opt_actionHandler, opt_duration) {
    this.$$('#toast').showMessage(message, opt_tapHandler, opt_action, opt_actionHandler, opt_duration);
  }
})
