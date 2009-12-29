(function($){
  var debug = window.console && window.console.debug || window.debug;
  var View = TTT.Game.View;

  var board = function board() {
    var div = $("<div class='game'></div>");
    var table = $("<table class='ttt'><tbody></tbody></table>").appendTo(div);
    for(var i=0; i<3; i++) {
      var row = [ "<tr>" ];
      for(var j=0; j<3; j++) {
        row.push("<td class='move_"+(i*3+j)+"'></td>");
      }
      row.push("</tr>");
      $(row.join("")).appendTo(table);
    }
    $("<div class='caption'><div class='player 0'>first</div> vs. <div class='player 1'>second</div></div>").appendTo(div);
    return div;
  };

  var Table = View.Table =
    new View.Class( function Table(game,player,dom) {
      View.apply(this,arguments);
      this.subscribe({to: game, call: "update", initial: true});
    },
    View,
    [ Dramatis.Subscriber ], {
      update: function update( state ) {
        if(this.dom){
          var self = this;
          var append = false;
          if(!this.div) {
            this.div = board();
            this.div.find(".player.0").text(state.player_names[0]);
            this.div.find(".player.1").text(state.player_names[1]);
            append = true;
          }
          this.div.find(".player."+state.current_player).addClass("turn");
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
          if(append) {
            this.div.appendTo(this.dom);
          }
        }
      }
    });
  
})(jQuery);