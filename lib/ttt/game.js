(function($){
  var Game = TTT.Game =
    new TTT.Class(function Game(){
      // FIXME
      this.player_names = [ arguments[0]._name, arguments[1]._name ];
      this.current = 0;
    }, [ Dramatis.Publisher ], {
      update: function update() {
        this.notify( { player_names: this.player_names,
                       current_player: this.current } );
      }
    }
    );

  TTT.Class.Subscope( Game );

})(jQuery);

