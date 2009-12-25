(function($){

  var Server = TTT.Server = new TTT.Class( function Server(node) {
    this._players = [];
    if(node){
      this.view = new Server.View(this,node);
    }
  }, {

    stop: function stop() {
      this.view && this.view.stop();
    },

    join: function(player,cb) {
      if (this.on_deck) {
        this._games = this._games || [];
        this._players.push(player);
        this._players.push(this.on_deck.player);
        var game = new TTT.Game(player,this.on_deck.player);
        this._games.push(game);
        cb && cb(game, 1);
        var on_deck_cb =this.on_deck.cb;
        on_deck_cb && on_deck_cb(game, 0);
        delete this.on_deck;
      } else {
        this.on_deck = { player: player, cb: cb };
      }
      this.update();
    },

    leave: function(player,cb) {
      cb && setTimeout(function(){cb();},0);
    },

    players: function(cb) {
      var v = this._players.length + ( this.on_deck ? 1 : 0 ); 
      cb && cb(v);
      return v;
    },

    update: function update() {
      this.notify( { players: this._players.length + (this.on_deck ? 1 : 0 ),
                     games: this._games } );
    }

  });

  $.extend(Server.prototype, Dramatis.Publisher.prototype);

  TTT.Class.Subscope( Server );

})(jQuery);

