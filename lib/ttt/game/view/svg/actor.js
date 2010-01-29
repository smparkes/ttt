"use strict";
(function(){
  var Actor = TTT.Game.View.SVG.Actor =
    new Dramatis.Actor.Type(
      new TTT.Game.View.SVG.Class( function Actor(/*...*/) {
        Dramatis.Actor.Behavior.call(this,arguments);
        TTT.Game.View.SVG.apply(this,arguments);
      }, TTT.Game.View.SVG, {
        name: function name(fn) {
          return this.__dramatis__.name(fn);
        }
      })
    );
}());