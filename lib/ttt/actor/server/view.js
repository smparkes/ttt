(function($){

  var debug = window.console && window.console.debug || window.debug;

  var Server = TTT.Server;

  var View = Server.View = new Server.Class( function View(server,dom){
    Dramatis.Subscriber.apply(this);
    this.server = server;
    if(dom){
      this.dom = $(dom);
      // debug("add",this.dom.find(".game").length);
      this.div = $("<div class='ttt server view'></div>").appendTo(this.dom);
      this.div.append("<div class='players'>players: <span class='count'></span></div>");
      this.div.append("<div class='games clear'></div>");
      // debug("start AXXA",$("#server .game").length);
    }
    this.subscribe( { to: server, call: "update", initial: true } );
  }, {

    stop: function stop() {
      // debug("remove");
      this.dom && this.dom.children().remove();
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
      var undefined;
      if(this.games){
        if(this.games.length > this.dom.find(".game").length){
          for(var i=this.dom.find(".game").length; i<this.games.length; i++){
            /// debug("add game");
            // debug("start AXXAZ",$("#server .game").length);
            new TTT.Game.View.Table(this.games[i],undefined,this.dom.find(".games"));
            // debug("start AXXAZZ",$("#server .game").length);
          }
        }
      }
    }
  });

  $.extend(View.prototype, Dramatis.Subscriber.prototype);

})(jQuery);