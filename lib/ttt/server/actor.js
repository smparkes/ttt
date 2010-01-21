(function($){

  var debug = window.console && window.console.debug || window.debug;

  var Actor = TTT.Server.Actor =
    new Dramatis.Actor.Type(
      new TTT.Server.Class( function Actor(/*...*/) {
        Dramatis.Actor.Behavior.call(this,arguments);
        TTT.Server.apply(this,arguments);
      }, TTT.Server, {
        name: function name(fn) {
          return this.__dramatis__.name(fn);
        },
        _new_game: function _new_game( player_1, player_2 ) {
          return new TTT.Game.Actor( player_1, player_2 );
        }

      })
    );

})(jQuery);