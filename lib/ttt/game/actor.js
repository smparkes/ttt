"use strict";
(function($){
  var debug = window.console && window.console.debug || window.debug;

  var Future = Dramatis.Future;

  var Actor = TTT.Game.Actor =
    new Dramatis.Actor.Type(
      new TTT.Game.Class( function Actor(/*...*/) {
        Dramatis.Actor.Behavior.call(this,arguments);

        var self = this;

        var proxy = function(player_name){
          return { player_name: function() { return player_name; } };
        };

        Future.using( arguments[0].player_name( Future ),
                      arguments[1].player_name( Future ),
                      function( first_name, second_name ) {
                        TTT.Game.apply(self, [
                          proxy( first_name ),
                          proxy( second_name )
                        ]);
                      });

      }, TTT.Game, {
        name: function name(fn) {
          return this.__dramatis__.name(fn);
        }
      })
    );

}(jQuery));