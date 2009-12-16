(function($){

  describe("ttt",function(){
    describe("both",function(){

      it("should play a server",function(){
        $.click_link("Start server");
        $.fill_in("Player name", {with: "Tom Jones"});
        $.click_link("Join a game");
        $.click_link("Join a game");
        for(var move = 0, player = 0; move < 9; move++, player = 1-player) {
          $(".game").eq(player).click_link(move);
        }
      });

    });
  });

})(jQuery);