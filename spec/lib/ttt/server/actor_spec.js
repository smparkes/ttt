"use strict";
var jazrb_root = (function(){return this;}()).jazrb_root || ".";
include(jazrb_root + "/spec/lib/ttt/spec_helper.js");

(function($){
  var Server = TTT.Server.Actor;

  describe("ttt",function(){
    describe("server",function(){

      var any = jasmine.any;

      it("should be default creatable",function(){
        // debug($.print(new Server));
        // debug((new Server) instanceof function(){});
        // debug((new Server) instanceof Dramatis.Actor.Name);
        // debug((new Server) instanceof Server.Name);
        //debug("X",$.print(Server.prototype));
        expect(new Server()).toBeDefined();
      });

      it("should return an actor name",function(){
        // debug($.print(new Server));
        expect(new Server()).toEqual(any(Server.Name));
      });

      it("should be stoppable",function(){
        expect((new Server()).stop()).toBeUndefined();
      });

      xit("should create a default view if given constructor argument",function(){
        var div = $("<div></div>");
        var server = new Server(div);
        expect(div.find(".ttt.server.view").length).toBe(1);
      });

      xit("should delete the view on stop if given constructor argument",function(){
        var div = $("<div></div>");
        var server = new Server(div);
        expect(div.find(".ttt.server.view").length).toBe(1);
        server.stop();
        expect(div.find(".ttt.server.view").length).toBe(0);
      });

      xit("should support pub/sub",function(){
        var server =  new Server();
        server.add_subscription(new Dramatis.Continuation({},"method"));
        server.stop();
      });

      describe("running games",function(){

        beforeEach(function(){
          this.server = new Server();
        });

        xit("should allow players to join a game",function(){
          expect(this.server.join({})).toBeUndefined();
        });

        xit("should place a player on deck until paired",function(){
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

        xit("should return the game to the players",function(){
          var tom = {};
          var jerry = {};
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
        
        xit("should count active players",function(){
          this.server.join({});
          this.server.join({});
          this.server.join({});
          this.server.players(function(players){
            expect(players).toBe(3);
            complete();
          });
          incomplete();
        });

      });
    });
  });

}(jQuery));