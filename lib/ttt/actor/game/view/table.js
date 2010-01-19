(function($){
  var debug = window.console && window.console.debug || window.debug;
  var View = TTT.Game.View;

  var wins = [ [ "00", "01", "02", [ 0, 1, 2 ]  ],
               [ "10", "11", "12", [ 3, 4, 5 ] ], 
               [ "20", "21", "22", [ 6, 7, 8 ] ],
               [ "00", "10", "20", [ 0, 3, 6 ] ],
               [ "01", "11", "21", [ 1, 4, 7 ] ], 
               [ "02", "12", "22", [ 2, 5, 8 ] ],
               [ "00", "11", "22", [ 0, 4, 8 ] ],
               [ "20", "11", "02", [ 2, 4, 6 ] ] ];

  var board = function board() {
    // debug("nb");
    var div = $("<div class='game'></div>");
    var table = $("<table class='ttt'><tbody></tbody></table>").appendTo(div);
    // debug("nb0");
    for(var i=0; i<3; i++) {
      var row = [ "<tr>" ];
      for(var j=0; j<3; j++) {
        row.push("<td class='move_"+(i*3+j)+"'></td>");
        // debug("nb1");
      }
      row.push("</tr>");
      // debug("nb2");
      $(row.join("")).appendTo(table);
      // debug("nb3");
    }
    $("<div class='caption'><div class='player 0'>first</div> vs. <div class='player 1'>second</div></div>").appendTo(div);
    // debug("nbz");
    return div;
  };

  var index = 0;

  var Table = View.Table =
    new View.Class( function Table(game,player,dom) {
      this._index = index++;
      // debug("<", this._index);
      View.apply(this,arguments);
      // debug(">",this.dom,this.div);
      this.subscribe({to: game, call: "update", initial: true});
    },
    View,
    [ Dramatis.Subscriber ], {
      update: function update( state ) {
        // debug("up",this._index,this.dom,this.div,this.player);
        var undefined;
        if(this.dom){
          var self = this;
          var append = false;
          if(!this.div) {
            this.div = board();
            // debug("nbx");
            this.div.find(".player.0").text(state.player_names[0]);
            this.div.find(".player.1").text(state.player_names[1]);
            append = true;
          }
          if(state.winner === undefined) {
            this.div.find(".player."+state.current_player).addClass("turn");
          } else {
            this.div.find(".player."+state.current_player).removeClass("turn");
          }
          this.div.find(".player."+(1-state.current_player)).removeClass("turn");
          $.each(state.board,function(k,v){
            var move;
            switch(k) {
              case "00": move = 0; break;
              case "01": move = 1; break;
              case "02": move = 2; break;
              case "10": move = 3; break;
              case "11": move = 4; break;
              case "12": move = 5; break;
              case "20": move = 6; break;
              case "21": move = 7; break;
              case "22": move = 8; break;
            };
            self.div.find(".move_"+move).text( v == 0 ? "X" : "O" );
          });
          if(state.winner !== undefined){
            for(var win = 0; win < wins.length; win++ ) {
              if( state.board[wins[win][0]] !== undefined &&
                  state.board[wins[win][0]]===state.board[wins[win][1]] && 
                  state.board[wins[win][0]]===state.board[wins[win][2]] ) {
                $.each(wins[win][3],function(){
                  self.div.find(".move_"+this).addClass("winner");
                });
                break;
              }
            }
          }
          if(append) {
            this.div.appendTo(this.dom);
          }
        }
        // debug("pu",this._index,this.dom,this.div,this.player);
      }
    });
  
})(jQuery);