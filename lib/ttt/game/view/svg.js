(function($){

  var View = TTT.Game.View;

  var debug = window.console && window.console.debug || window.debug;

  var callbacks = [];
  var template;
  var load_svg = function( callback ) {
    $.getScript("jquery.svg.js",function(){
      var div = $("<div id='ttt-template'></div>");
      div.css({width:0, height:0});
      $(document.body).append(div);
      div.svg({ loadURL: "plain.svg",
                onLoad: function(svg) {
                  div.find("svg path").css({display:"none"});
                  div.find("#ttt-board").css({display:"block"});
                  template = div;
                  for(var i=0; i<callbacks.length; i++){
                    callbacks[i]();
                  }
                  var undefined;
                  callbacks = undefined;
                  load_svg = function(callback){callback && callback();};
                }
              });
    });
    (load_svg = function(callback){callback && callbacks.push(callback);})(callback);
  };
  
  var board = function board() {
    var div = $("<div class='game'></div>").
      append(template.clone().
             removeAttr("id").
             css({width:"10em", height:"10em"}));
    div.find("svg").css({width:"100%", height:"100%"});
    var table = $("<table class='ttt'><tbody></tbody></table>"); //.appendTo(div);
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

  var SVG = View.SVG =
    new View.Class( function SVG(game,player,dom) {
      View.apply(this,arguments);
      var self = this;
      load_svg( function(){
        self.subscribe({to: game, call: "update", initial: true});
      } );
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
          for(var i=0; i<2; i++) {
            var player = this.div.find(".player."+i);
            if(i == state.current_player) {
              player.addClass("turn");
            } else {
              player.removeClass("turn");
            }
            if(i == this.player){
              player.addClass("current");
            } else {
              player.removeClass("current");
            }
          }
          if(append) {
            this.div.appendTo(this.dom);
          }
        }
      }
    });
  
})(jQuery);