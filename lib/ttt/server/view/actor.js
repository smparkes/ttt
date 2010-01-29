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
        },

        _new_game_view: function _new_game_view(i) {
          var undef;
          (new TTT.Game.View.Table.Actor(this.games[i],undef,this.dom.find(".games")));
        }
      })
    );
}());
