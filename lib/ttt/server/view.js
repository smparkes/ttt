"use strict";
(function($){
  var Server = TTT.Server;

  var View = Server.View = new Server.Class( function View(server,dom){
    if(arguments.length){
      TTT.Subscriber.apply(this);
      this.server = server;
      if(dom){
        this.dom = $(dom);
        this.div = $("<div class='ttt server view'></div>").appendTo(this.dom);
        this.div.append("<div class='players'>players: <span class='count'></span></div>");
        this.div.append("<div class='games clear'></div>");
      }
      this.subscribe( { to: server, call: "update", initial: true } );
    }
  }, [ TTT.Subscriber ], {

    stop: function stop() {
      if (this.dom) { this.dom.children().remove(); }
    },

    update: function update( state ) {
      this.players = state.players;
      this.games = state.games;
      if(this.dom) {
        this.dom.find(".players .count").html(this.players);
        this.add_games();
      }
    },

    add_games: function add_games() {
      if(this.games){
        if(this.games.length > this.dom.find(".game").length){
          for(var i=this.dom.find(".game").length; i<this.games.length; i++){
            this._new_game_view(i);
          }
        }
      }
    },

    _new_game_view: function _new_game_view(i) {
      var undef;
      (new TTT.Game.View.Table(this.games[i],undef,this.dom.find(".games")));
    }
  });

  (TTT.Class.Subscope( View ));
}(jQuery));