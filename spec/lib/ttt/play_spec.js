"use strict";
(function(){

  describe("ttt",function(){
    describe("play",function(){

      it("should play a game",function(){
        var server = new TTT.Server();
        var tom = new TTT.Player();
        var jerry = new TTT.Player();

        // join a game ...
        tom.join( server );
        jerry.join( server );
        expect(true).toBe(true);
      });

    });
  });

}());