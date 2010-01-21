(function($){

  var debug = window.console && window.console.debug || window.debug;

  var Actor = TTT.Player.Actor =
    new Dramatis.Actor.Type(
      new TTT.Player.Class( function Actor(/*...*/) {
        Dramatis.Actor.Behavior.call(this,arguments);
        TTT.Player.apply(this,arguments);
      }, TTT.Player, {
        name: function name(fn) {
          return this.__dramatis__.name(fn);
        }
      })
    );

})(jQuery);