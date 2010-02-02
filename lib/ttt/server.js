"use strict";
(function($){
  var debug = window.console && window.console.debug || window.debug;

  var Server = TTT.Server = new TTT.Class( function Server(dom) {
    this._players = [];
    this._new_view( dom );
  }, [ TTT.Publisher ], {
    name: function name(fn) {
      if (fn) { fn(this); }
      return this;
    },

    stop: function stop() {
      if (this.view) { this.view.stop(); }
    },

    join: function(player,cb) {
      if (this.on_deck) {
        this._games = this._games || [];
        this._players.push(player);
        this._players.push(this.on_deck.player);
        var game = this._new_game(player,this.on_deck.player);
        this._games.push(game);
        if (cb) { cb(game, 1); }
        var on_deck_cb =this.on_deck.cb;
        if (on_deck_cb) { on_deck_cb(game, 0); }
        delete this.on_deck;
      } else {
        this.on_deck = { player: player, cb: cb };
      }
      this.update();
    },

    leave: function(player,cb) {
      if( cb ) { window.setTimeout(function(){cb();},0); }
    },

    players: function(cb) {
      var v = this._players.length + ( this.on_deck ? 1 : 0 ); 
      if (cb) { cb(v); }
      return v;
    },

    update: function update() {
      this.notify( { players: this._players.length + (this.on_deck ? 1 : 0 ),
                     games: this._games } );
    },

    _new_game: function _new_game( player_1, player_2 ) {
      return new TTT.Game( player_1, player_2 );
    },

    _new_view: function _new_view( dom ) {
      if(dom){
        this.view = new Server.View(this.name(),dom);
      }
    }

  });

  (TTT.Class.Subscope( Server ));
}(jQuery));