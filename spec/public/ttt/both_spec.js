(function($){

  var debug = window.console && window.console.debug || window.debug;

  with($.jsrat){

    describe("ttt",function(){
      describe("both",function(){

        beforeEach(function(){
          var undefined;
          fill_in("Player name", {with: ""});
        });

        afterEach(function(){
          // debug("stop?",$("a:contains('Stop server')").length);
          $("a:contains('Stop server')").each(function(){
            // debug("stop");
            $(this).click();
            wait_for(function(){ return $("#serve .game").length == 0; });
            // debug("start AXX",$("#server .game").length);
          });
        });

        it("should start w/o a server",function(){
          eventually(function(){
            expect($("a[href]:contains('Start server')").length).toBe(1);
          });
        });

        it("should create a server",function(){
          // debug("start");
          click_link("Start server");
          expect($("a[href]:contains('Start server')").length).toBe(0);
          expect($("a:contains('Stop server')").length).toBe(1);
        });

        it("should stop a server",function(){
          // debug("start");
          click_link("Start server");
          // debug("stop");
          click_link("Stop server");
          expect($("a[href]:contains('Start server')").length).toBe(1);
        });

        xit("should have a server view",function(){
          click_link("Start server");
          // debug("start");
          expect($("#server .ttt.server.view").length).toBe(1);
        });

        xit("should not allow joining w/o a name",function(){
          click_link("Start server");
          // debug("start");
          expect(function(){click_link("Join a game");}).toThrow();
        });

        describe("two player senario", function(){

          var index = 0;
          beforeEach(function(){
            // debug("start A",$("#server .game").length);
            click_link("Start server");
            fill_in("Player name", {with: "Tom"+index++});
            click_link("Join a game");
            fill_in("Player name", {with: "Jerry"+index});
            click_link("Join a game");
            // debug("start AA",$("#server .game").length);
          });

          afterEach(function(){
            wait_for(function(){ return $("#games .game").length == 2; },
                     function(){ $("#games .game").remove(); });
          });

          it("should create a game view for each player",function(){
            eventually(function(){
              expect($("#games .game").length).toBe(2);
            });
          });
          
          it("should create a game view for the server view",function(){
            // debug($("#server .game").length,$("#server").html());
            expect($("#server .game").length).toBe(1);
          });
          
          xit("game views should reflect turn",function(){
            eventually(function(){
              expect($("#games .game .turn.current").length).toBe(1);
            });
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

          xit("should now allow the second player to repeate the first player move",function(){
            pending();
            $("#game .game.0 .position.0").jsrat.click();
            expect(function(){$("#game .game.1 .position.0").jsrat.click();}).toThrow();
          });

          xit("should play a server",function(){
            pending();
            for(var move = 0, player = 0; move < 9; move++, player = 1-player) {
              $(".game").eq(player).find(".move "+move).jsrat.click();
            }
          });

        });

      });
    });

  };

})(jQuery);