"use strict";
(function(){
  var Actor = TTT.Game.View.Table.Actor =
    new Dramatis.Actor.Type(
      new TTT.Game.View.Table.Class( function Actor(/*...*/) {
        Dramatis.Actor.Behavior.call(this,arguments);
        TTT.Game.View.Table.apply(this,arguments);
      }, TTT.Game.View.Table, {
        name: function name(fn) {
          return this.__dramatis__.name(fn);
        }
      })
    );
}());