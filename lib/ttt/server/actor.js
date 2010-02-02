"use strict";
(function(){
  var Actor = TTT.Server.Actor =
    new Dramatis.Actor.Type(
      new TTT.Server.Class( function Actor(/*...*/) {
        Dramatis.Actor.Behavior.call(this,arguments);
        Dramatis.Publisher.apply(this);
        TTT.Server.apply(this,arguments);
      }, TTT.Server, [ Dramatis.Publisher ], {

        name: function name(fn) {
          return this.__dramatis__.name(fn);
        },

        _new_game: function _new_game( player_1, player_2 ) {
          return new TTT.Game.Actor( player_1, player_2 );
        },

        _new_view: function _new_view( dom ) {
          if(dom){
            this.view = new TTT.Server.View.Actor(this.name(),dom);
          }
        }

      })
    );
}());