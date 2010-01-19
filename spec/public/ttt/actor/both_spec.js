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
          click_link("Start server");
          expect($("a[href]:contains('Start server')").length).toBe(0);
          expect($("a:contains('Stop server')").length).toBe(1);
        });

        it("should stop a server",function(){
          click_link("Start server");
          click_link("Stop server");
          expect($("a[href]:contains('Start server')").length).toBe(1);
        });

        it("should have a server view",function(){
          click_link("Start server");
          // debug("start");
          expect($("#server .ttt.server.view").length).toBe(1);
        });

        it("should not allow joining w/o a name",function(){
          click_link("Start server");
          // debug("start");
          expect(function(){click_link("Join a game");}).toThrow();
        });

        describe("two player senario", function(){

          var index = 0;
          beforeEach(function(){
            click_link("Start server");
            fill_in("Player name", {with: "Tom"+index++});
            click_link("Join a game");
            fill_in("Player name", {with: "Jerry"+index});
            click_link("Join a game");
            wait_for( function(){ return $("#games .game").length == 2;} );
          });

          afterEach(function(){
            $("#games .game").remove();
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
          
          it("game views should reflect turn",function(){
            eventually(function(){
              expect($("#games .game .turn.current").length).toBe(1);
            });
          });

          it("should allow the first player to make the first move",function(){
            var cell = $("#games .game .ttt-cell.01").eq(1).click();
            expect( cell.hasClass("taken") ).toBe(true);
            expect( cell.hasClass("by_X") ).toBe(true);
          });

          it("should allow the second player to make the second move",function(){
            var cell = $("#games .game .ttt-cell.01").eq(1).click();
            expect( cell.hasClass("taken") ).toBe(true);
            expect( cell.hasClass("by_X") ).toBe(true);

            cell = $("#games .game .ttt-cell.00").eq(0).click();
            expect( cell.hasClass("taken") ).toBe(true);
            expect( cell.hasClass("by_O") ).toBe(true);
          });

          it("should now allow the second player to repeat the first player move",function(){
            expect( $("#games .game .caption .player").eq(1).hasClass("turn") ).toBe(false);

            var cell = $("#games .game .ttt-cell.01").eq(1).click();
            expect( cell.hasClass("taken") ).toBe(true);
            expect( cell.hasClass("by_X") ).toBe(true);

            expect( $("#games .game .caption .player").eq(1).hasClass("turn") ).toBe(true);

            cell = $("#games .game .ttt-cell.01").eq(0).click();
            expect( cell.hasClass("taken") ).toBe(true);
            expect( cell.hasClass("by_X") ).toBe(true);

            expect( $("#games .game .caption .player").eq(1).hasClass("turn") ).toBe(true);

            cell = $("#games .game .ttt-cell.00").eq(0).click();
            expect( cell.hasClass("taken") ).toBe(true);
            expect( cell.hasClass("by_O") ).toBe(true);

            expect( $("#games .game .caption .player").eq(1).hasClass("turn") ).toBe(false);
          });

          it("should play a game to a winner",function(){
            var moves = [ "01", "00", "11", "10", "20", "12", "02" ];
            var games = [ $("#games .game").eq(1), $("#games .game").eq(0) ];
            var player = 1;
            for(var move in moves) {
              games[player].find(".ttt-cell."+moves[move]).click();
              player = 1-player;
            }
            for(var game in games){
              expect(games[game].find(".turn").length).toBe(0);
              expect(games[game].find(".player").eq(0).hasClass("winner")).toBe(false);
              expect(games[game].find(".player").eq(1).hasClass("winner")).toBe(true);
            }
          });

          it("should play a game to a draw",function(){
            var moves = [ "01", "00", "11", "21", "20", "02", "12", "10", "22"];
            var games = [ $("#games .game").eq(1), $("#games .game").eq(0) ];
            var player = 0;
            for(var move in moves) {
              games[player].find(".ttt-cell."+moves[move]).click();
              player = 1-player;
            }
            for(var game in games){
              expect(games[game].find(".turn").length).toBe(0);
              expect(games[game].find(".player").eq(0).hasClass("winner")).toBe(false);
              expect(games[game].find(".player").eq(1).hasClass("winner")).toBe(false);
            }
          });
        });

      });
    });

  };

})(jQuery);