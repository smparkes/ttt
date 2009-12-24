(function($){

  describe("ttt",function(){
    describe("both",function(){

      beforeEach(function(){
        var undefined;
        with($.jsrat){
          fill_in("Player name", {with: ""});
        }
      });

      afterEach(function(){
        $("a:contains('Stop server')").each(function(){
          $(this).click();
        });
      });

      it("should start w/o a server",function(){
        expect($("a[href]:contains('Start server')").length).toBe(1);
      });

      it("should create a server",function(){
        $.jsrat.click_link("Start server");
        expect($("a[href]:contains('Start server')").length).toBe(0);
        expect($("a:contains('Stop server')").length).toBe(1);
      });

      it("should stop a server",function(){
        $.jsrat.click_link("Start server");
        $.jsrat.click_link("Stop server");
        expect($("a[href]:contains('Start server')").length).toBe(1);
      });

      it("should have a server view",function(){
        $.jsrat.click_link("Start server");
        expect($("#server .ttt.server.view").length).toBe(1);
      });

      it("should not allow joining w/o a name",function(){
        with($.jsrat){
          click_link("Start server");
          expect(function(){click_link("Join a game");}).toThrow();
        }
      });

      describe("two player senario", function(){

        beforeEach(function(){
          $("#games .game").remove();
          with($.jsrat){
            click_link("Start server");
            fill_in("Player name", {with: "Tom"});
            click_link("Join a game");
            fill_in("Player name", {with: "Jerry"});
            click_link("Join a game");
          }
        });

        it("should create a game view for each player",function(){
          expect($("#games .game").length).toBe(2);
        });

        it("should create a game view for the server view",function(){
          expect($("#server .game").length).toBe(1);
        });

        it("should allow the first player to make the first move",function(){
          pending();
          expect( $("#game .game.0 .position.0").click().hasClass("X") ).toBe(true);
        });

        it("should allow the second player to make the second move",function(){
          pending();
          $("#game .game.0 .position.0").jsrat.click();
          $("#game .game.1 .position.1").jsrat.click();
        });

        it("should now allow the second player to repeate the first player move",function(){
          pending();
          $("#game .game.0 .position.0").jsrat.click();
          expect(function(){$("#game .game.1 .position.0").jsrat.click();}).toThrow();
        });

        it("should play a server",function(){
          with($.jsrat){
            pending();
            for(var move = 0, player = 0; move < 9; move++, player = 1-player) {
              $(".game").eq(player).find(".move "+move).jsrat.click();
            }
          }
        });

      });

    });
  });

})(jQuery);