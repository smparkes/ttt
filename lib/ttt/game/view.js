"use strict";
(function($){

  var Game = TTT.Game;
  var View = Game.View =
    new Game.Class( function View(game,player,dom){
      this.game = game;
      this.player = player;
      this.dom = dom;
    } );

  Game.Class.Subscope( View );

}(jQuery));