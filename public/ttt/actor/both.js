"use strict";
(function($){
  var debug = window.console && window.console.debug || window.debug;
  $(function(){

    window.vendor = "../../../vendor";

    var start_server = "a:contains('Start server')";
    var stop_server = "a:contains('Stop server')";
    var join_game = "a:contains('Join a game')";
    var player_name = "label:contains('Player name') input";

    $(join_game).hide();

    $(start_server).live("click",function start_server(){
      $(this).text("Stop server");
      $("#server").data("server",new TTT.Server.Actor($("#server .view")));
      $(join_game).show();
      return false;
    });

    $(stop_server).live("click",function stop_server(){
      var undef;
      var server = $("#server").data("server");
      server.stop();
      $("#server").data("server",undef);
      $(join_game).hide();
      $(this).text("Start server");
      return false;
    });

    var on_player_name_change = function on_player_name_change(){
      var val = $(this).val();
      if(val && !val.match(/^\s*$/)){
        $(join_game).attr("href","#");
      } else {
        $(join_game).removeAttr("href");
      }
    };
    
    $(player_name).change(on_player_name_change).keyup(on_player_name_change);

    $(join_game).click(function join_game(){
      var div = $("#games");
      var player = new TTT.Player.Actor( $(player_name).val() );
      // debug("new player");
      $("#server").data("server").join( player, function(game, index){
        (new TTT.Game.View.SVG( game, index, div ));
      } );
      return false;
    });

    // set initial state, e.g., for browser-prefill

    $(player_name).change();

  });
}(jQuery));