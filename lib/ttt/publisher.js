"use strict";
(function () {
  var Publisher = TTT.Publisher =
    new TTT.Class(function Publisher() {
    }, {
      add_subscription: function add_subscription(callback, options) {
        options = options || {};
        this.subscriptions = this.subscriptions || []; 
        this.subscriptions.push(callback);
        if (options.initial && this.update) {
          this.update();
        }
      },
      notify: function notify(state) {
        var i, subs = this.subscriptions;
        for (i in subs) {
          var object = subs[i][0], method = subs[i][1];
          object[method].call(object,state);
        }
      }
    });
}());