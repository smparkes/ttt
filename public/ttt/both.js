(function(){
  $(function(){

    var start_server = "a:contains('Start server')";
    var join_game = "a:contains('Join a game')";

    $(join_game).hide();

    $(start_server).click(function start_server(){
      $("#server").data("server",new TTT.Server);
      $(join_game).show();
      return false;
    });

    $(join_game).click(function join_game(){
      var div = $("<div class='game'></div>").appendTo($("#games"));
      $("#server").data("server").join(function(seat){
        throw new Error("Implement join game");
      });
      return false;
    });

  });
})();