(function($){

  var Server = TTT.Server;

  var View = Server.View = new Server.Class( function View(server,dom){
    Dramatis.Subscriber.apply(this);
    this.server = server;
    if(dom){
      this.dom = $(dom);
      this.div = $("<div class='ttt server view'></div>").appendTo(this.dom);
      this.div.append("<div>players: <span class='players'></span></div>");
    }
    if(true){
      this.subscribe( { to: server, call: "update" } );
    }
  }, {
    stop: function stop() {
      this.dom && this.dom.children().remove();
    },
    update: function update() {
      this.dom && this.dom.find(".players").html(this.players);
    }
  });

  $.extend(View.prototype, Dramatis.Subscriber.prototype);

})(jQuery);