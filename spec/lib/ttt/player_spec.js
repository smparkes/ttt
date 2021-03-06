"use strict";
(function(){

  describe("ttt",function(){
    describe("player",function(){

      it("should be default creatable",function(){
        expect(new TTT.Player()).toBeDefined();
      });

      describe("game interaction",function(){

        beforeEach(function(){
          this.server = new TTT.Server();
          this.tom = new TTT.Player();
          this.jerry = new TTT.Player();
        });

        it("game should be null before joining",function(){
          this.tom.game(function(game){
            expect(game).toBeUndefined();
          });
        });

        it("should join a game on a server",function(){
          var self = this;
          this.tom.join(this.server);
          this.jerry.join(this.server);
          window.setTimeout(function(){
            self.tom.game(function(game){
              expect(game).toBeDefined();
              complete();
            });
            self.jerry.game(function(game){
              expect(game).toBeDefined();
              complete();
            });
          },0);
          incomplete();
          incomplete();
        });

      });

    });
  });

}());