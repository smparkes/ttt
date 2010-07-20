"use strict";
(function($){
  var console = window.console || { debug: window.debug };

  var wins = [ [ "00", "01", "02" ],
               [ "10", "11", "12" ], 
               [ "20", "21", "22" ],
               [ "00", "10", "20" ],
               [ "01", "11", "21" ], 
               [ "02", "12", "22" ],
               [ "00", "11", "22" ],
               [ "20", "11", "02" ] ];
               
  var Game = TTT.Game =
    new TTT.Class(function Game(){
      if(arguments.length){
        this.player_names = [ arguments[0].player_name(), arguments[1].player_name() ];
        this.current = 0;
        this.board = {};
      }
    }, [ TTT.Publisher ], {
      move: function move(string) {
        var undef;
        if(this.board[string] !== undef) {
          return;
        }
        if(!this.winner){
          //console.debug("!!",string);
          this.board[string] = this.current;
          this.current = 1 - this.current;
          for(var win = 0; !this.winner && win < wins.length; win++ ) {
            if( this.board[wins[win][0]] !== undef &&
                this.board[wins[win][0]]===this.board[wins[win][1]] && 
                this.board[wins[win][0]]===this.board[wins[win][2]] ) {
              this.winner = this.board[wins[win][0]];
            }
          }
          var len = 0;
          for(var key in this.board) { len++; }
          if(len === 9){
            this.winner = -1;
          }
        }
        this.update();
      },
      update: function update() {
        this.notify( { player_names: this.player_names,
                       current_player: this.current,
                       board: this.board,
                       winner: this.winner } );
      }
    }
    );

  (TTT.Class.Subscope( Game ));

}(jQuery));

