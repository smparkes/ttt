"use strict";
(function(){
  var Actor = TTT.Server.View.Actor =
    new Dramatis.Actor.Type(
      new TTT.Server.View.Class( function Actor() {
        Dramatis.Actor.Behavior.call(this,arguments);
        TTT.Server.View.apply(this,arguments);
      }, TTT.Server.View, {
        name: function name(fn) {
          return this.__dramatis__.name(fn);
        }
      })
    );
}());
