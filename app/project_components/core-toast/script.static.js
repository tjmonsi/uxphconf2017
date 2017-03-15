Polymer({
  is: "{{name}}",
  properties: {
    app: {
      type: Object
    },
    action: {
      type: String,
      value: null,
      observer: '_actionChanged'
    },
    duration: {
      type: Number,
      value: 6000
    },
    _actionHandler: {
      value: null
    },
    _handledAction: {
      type: Boolean,
      value: false
    },
    _listeners: {
      value: function () {
        return [];
      }
    },
    _tapHandler: {
      value: null
    }
  },

  listeners: {
    'iron-overlay-closed': '_handleOverlayClosed'
  },

  _actionChanged: function () {
    Polymer.dom(this).textContent = this.action ? this.action : null;
  },

  show: function () {
    this.$.internalToast.show();
  },

  close: function () {
    this.$.internalToast.close();
  },

  showMessage: function (message, opt_tapHandler, opt_action,
                          opt_actionHandler, opt_duration) {
    this.close();
    // Override duration just for this toast.
    var originalDuration = this.duration;
    if (typeof opt_duration !== 'undefined') {
      this.duration = opt_duration;
    }
    this.text = message;
    this._tapHandler = opt_tapHandler;
    this.action = opt_action;
    this._actionHandler = opt_actionHandler;
    this.$.internalToast.show();
    this.fire('toast-message', {message: message});
    this.duration = originalDuration; // reset site-wide duration.
  },

  _handleTap: function () {
    if (typeof this._tapHandler == 'function' && !this._handledAction) {
      this._tapHandler();
      this.$.internalToast.close();
    }
    this._handledAction = false;
  },

  _handleAction: function (e, detail) {
    if (typeof this._actionHandler == 'function') {
      e.stopPropagation();
      this._actionHandler();
      this._handledAction = true;
      // Need because handleTap will also be called from a tap.
      // This handle is a click.
      this.$.internalToast.close();
    }
  },

  _handleOverlayClosed: function () {
    this._tapHandler = null;
  },

  _computeClass: function (tapHandler) {
    return tapHandler ? 'clickable' : '';
  }
})
