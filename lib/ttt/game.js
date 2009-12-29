(function($){
  var debug = window.console && window.console.debug || window.debug;
  var Game = TTT.Game =
    new TTT.Class(function Game(){
      // FIXME
      this.player_names = [ arguments[0]._name, arguments[1]._name ];
      this.current = 0;
      this.board = {};
    }, [ Dramatis.Publisher ], {
      move: function move(string) {
        this.board[string] = this.current;
        this.current = 1 - this.current;
        this.update();
      },
      update: function update() {
        this.notify( { player_names: this.player_names,
                       current_player: this.current,
                       board: this.board } );
      }
    }
    );

  TTT.Class.Subscope( Game );

})(jQuery);

