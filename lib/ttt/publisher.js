"use strict";
(function () {
  var Publisher = TTT.Publisher =
    new TTT.Class(function Publisher() {
    }, {
      add_subscription: function add_subscription(callback, options) {
        options = options || {};
        this.subscriptions = this.subscriptions || []; 
        var record = [ callback, options.state_id ];
        this.subscriptions.push( record );
        this._call(record, this.state);
        if (options.initial && this.update) {
          this.update();
        }
      },

      remove_subscription: function remove_subscription(callback, options) {
        options = options || {};
        this.subscriptions = this.subscriptions || []; 
        for(var i in this.subscriptions) {
          var record = this.subscriptions[i];
          if (record[0][0] === callback[0] && record[0][1] === callback[1]) {
            delete this.subscriptions[i];
            break;
          }
        }
      },

      notify: function notify(state) {
        this.state_id = ( this.state_id && this.state_id+1 ) || 1;
        this._call_all(state);
        this.state = state;
      },

      _call_all: function _call_all(new_state) {
        var i, records = this.subscriptions;
        for (i in records) {
          var record = records[i]; 
          this._call(record, new_state);
        }
      },

      _call: function _call(record, new_state) {
        var object, method;
        if (record[1] !== this.state_id) {
          if (record[1] && record[1] === this.state_id-1) {
            record[1] = this.state_id;
            object = record[0][0];
            method = record[0][1];
            object[method].call(object,new_state);
            // throw new Error("implement incremental");
          } else {
            record[1] = this.state_id;
            object = record[0][0];
            method = record[0][1];
            object[method].call(object,new_state);
          }
        }
      }

    });
}());