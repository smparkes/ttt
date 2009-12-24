(function($){

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
          var append = false;
          if(!this.div) {
            this.div = board();
            this.div.find(".player.0").text(state.player_names[0]);
            this.div.find(".player.1").text(state.player_names[1]);
            append = true;
          }
          this.div.find(".player."+state.current_player).addClass("turn");
          this.div.find(".player."+(1-state.current_player)).removeClass("turn");
          if(append) {
            this.div.appendTo(this.dom);
          }
        }
      }
    });
  
})(jQuery);