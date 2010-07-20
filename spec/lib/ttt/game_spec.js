"use strict";
(function(){

  describe("ttt",function ttt(){
    describe("game",function game(){

      it("should be default creatable with players",function(){
        expect(new TTT.Game(
          {player_name: function(){ return "player"; }},
          {player_name: function(){ return "player"; }}
        )).toBeDefined();
      });

      describe("play",function play(){

        beforeEach(function beforeEach(){
          this.tom = {};
          this.jerry = {};
          this.game = new TTT.Game(this.tom,this.jerry);
        });

      });
    });
  });

}());