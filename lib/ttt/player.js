"use strict";
(function($){
  var Player = TTT.Player =
    new TTT.Class(function Player( name ){
      this._player_name = name;
      this._game_callbacks = [];
    }, {
      name: function name(fn) {
        if (fn) { fn(this); }
        return this;
      },
      player_name: function player_name(fn) {
        if (fn) { fn( this._player_name ); }
        return this._player_name;
      },
      join: function(server){
        var self = this;
        if(self.server){ throw "implement"; }
        (self.server = server).join(self.name(),function(game){
          self.current_game = game;
          if(self._game_callbacks){
            var cb;
            while((cb = self._game_callbacks.shift())){
              cb(game);
            }
            delete self._game_callbacks;
          }
        });
      },
      game: function(cb){
        if(this.current_game){
          cb(this.current_game);
        } else {
          this._game_callbacks = this._game_callbacks || [];
          this._game_callbacks.push(cb);
        }
      }
    });

  (TTT.Class.Subscope( Player ));

}(jQuery));