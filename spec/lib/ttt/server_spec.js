jazrb_root = this.jazrb_root || ".";
include(jazrb_root + "/spec/lib/ttt/spec_helper.js");

(function(){

  describe("ttt",function(){
    describe("server",function(){

      it("should be default creatable",function(){
        expect(new TTT.Server).toBeDefined();
      });

      it("should be stoppable",function(){
        expect((new TTT.Server).stop()).toBeUndefined();
      });

      it("should provide a scope",function(){
        expect(TTT.Server.Class(function F(){})).toBeDefined();
      });

      it("should create a default view if given constructor argument",function(){
        var div = $("<div></div>");
        var server = new TTT.Server(div);
        expect(div.find(".ttt.server.view").length).toBe(1);
      });

      it("should delete the view on stop if given constructor argument",function(){
        var div = $("<div></div>");
        var server = new TTT.Server(div);
        expect(div.find(".ttt.server.view").length).toBe(1);
        server.stop();
        expect(div.find(".ttt.server.view").length).toBe(0);
      });

      it("should support pub/sub",function(){
        var server =  new TTT.Server;
        server.add_subscription(new Dramatis.Continuation({},"method"));
        server.stop();
      });

      describe("running games",function(){

        beforeEach(function(){
          this.server = new TTT.Server;
        });

        it("should allow players to join a game",function(){
          expect(this.server.join({})).toBeUndefined();
        });

        it("should place a player on deck until paired",function(){
          var player = {};
          var game;
          this.server.join(player, function(_game) {
            game = _game;
          });
          this.server.leave(player,function(){
            expect(game).toBeUndefined();
            complete();
          });
          incomplete();
        });

        it("should return the game to the players",function(){
          var tom = { player_name: function(){ return "tom"; }};
          var jerry = { player_name: function(){ return "tom"; }};
          var toms_game;
          var jerrys_game;
          this.server.join(tom, function(game) {
            toms_game = game;
            if (jerrys_game) {
              expect(toms_game).toBe(jerrys_game);
              complete();
            }
          });
          this.server.join(jerry, function(game) {
            jerrys_game = game;
            if (toms_game) {
              expect(toms_game).toBe(jerrys_game);
              complete();
            }
          });
          incomplete();
        });
        
        it("should count active players",function(){
          this.server.join({player_name: function(){ return "player"; }});
          this.server.join({player_name: function(){ return "player"; }});
          this.server.join({player_name: function(){ return "player"; }});
          this.server.players(function(players){
            expect(players).toBe(3);
            complete();
          });
          incomplete();
        });

      });
    });
  });

})();