"use strict";
(function($){
  var wins = [ [ "00", "01", "02", ".ttt-win-r0" ],
               [ "10", "11", "12", ".ttt-win-r1" ], 
               [ "20", "21", "22", ".ttt-win-r2" ],
               [ "00", "10", "20", ".ttt-win-c0" ],
               [ "01", "11", "21", ".ttt-win-c1" ], 
               [ "02", "12", "22", ".ttt-win-c2" ],
               [ "00", "11", "22", ".ttt-win-dullr" ],
               [ "20", "11", "02", ".ttt-win-dllur" ] ];

  var View = TTT.Game.View;

  var debug = window.console && window.console.debug || window.debug;

  var callbacks = [];
  var template;
  var load_svg = function( callback ) {
    $.ajax({url: window.vendor + "/jquery.svg/jquery.svg.js",
            dataType: "script",
            error: function() {
              throw new Error("could not fetch jquery.svg.js");
            },
            success: function(){
              $.ajax({url: window.vendor + "/jquery.svg/jquery.svgdom.js",
                      dataType: "script",
                      error: function() {
                        throw new Error("could not fetch jquery.svgdom.js");
                      },
                      success: function(){
                        var div = $("<div id='ttt-template'></div>");
                        div.css({width:0, height:0});
                        $(window.document.body).append(div);
                        div.svg({ loadURL: "plain.svg",
                                  onLoad: function(svg) {
                                    // debug("svg",div.get(0).innerHTML);
                                    div.find("[id]").removeAttr("id");
                                    div.find("svg path").css({display:"none"});
                                    div.find(".ttt-board").css({display:"block"});
                                    div.find(".ttt-cell").css({display:"block"});
                                    if(false){
                                      debug("HH0",$.print(div.find("rect")));
                                      debug("HH1",div.find("rect").get(0).xml);
                                      debug("HH1",div.find("rect").get(0).constructor+"");
                                      debug("HH1",div.find("rect").get(0).className+"");
                                      debug("HH2",div.find("rect").get(0).getAttribute("class"));
                                      debug("HH3",div.find("rect").get(0).className);
                                      debug("HHX",div.find("rect").eq(0).hasClass);
                                      debug("HH4",div.find("rect").eq(0).hasClass("ttt-cell"));
                                      debug("&&",$.print(div.find(".ttt-cell")));
                                    }
                                    div.find(".ttt-cell").each(function(){
                                      var v = $(this).get(0);
                                      //debug("v",$.print(v),v.className,v.className && v.className.baseVal,$(v).attr("class"),v.getAttribute("class"));
                                      var classes = v.getAttribute("class");
                                      if(classes) {
                                        classes = classes.split(/\s+/);
                                        for(var cls in classes){
                                          //debug("aa",$.print(cls));
                                          if(classes[cls].match(/\d\d/)){
                                            //debug("a",$.print(v));
                                            $(v).attr("index",classes[cls]);
                                          }
                                        }
                                      }
                                    });
                                    div.xes = [];
                                    div.oes = [];
                                    div.find(".ttt-move").each(function(){
                                      var v = $(this).get(0);
                                      if($(v).hasClass("x")){
                                        div.xes.push(v);
                                      } else {
                                        div.oes.push(v);
                                      }
                                    });
                                    template = div;
                                    for(var i=0; i<callbacks.length; i++){
                                      callbacks[i]();
                                    }
                                    var undef;
                                    callbacks = undef;
                                    load_svg = function (callback) { if (callback) {callback();} };
                                  }
                                });
                      }});
            }});
    load_svg = function(callback){ if (callback) { callbacks.push(callback);} };
    load_svg(callback);
  };
  
  var board = function board() {
    var div = $("<div class='game'></div>").
      append(template.clone().
             removeAttr("id").
             css({width:"10em", height:"10em"}));
    div.find("svg").css({width:"100%", height:"100%"});
    $("<div class='caption'><div class='player 0'>first</div> vs. <div class='player 1'>second</div></div>").
      appendTo(div);
    return div;
  };

  var SVG = View.SVG =
    new View.Class( function SVG(game,player,dom) {
      View.apply(this,arguments);
      var self = this;
      load_svg( function(){
        self.subscribe({to: game, call: "update", initial: true});
      } );
    }, View, [ Dramatis.Subscriber ], {
      update: function update( state ) {
        //debug("u",$.print(state));
        var undef;
        if(this.dom){
          var self = this;
          var append = false;
          if(!this.div) {
            this.div = board();
            this.div.find(".player.0").text(state.player_names[0]);
            this.div.find(".player.1").text(state.player_names[1]);
            append = true;
          }
          for(var i=0; i<2; i++) {
            var player = this.div.find(".player."+i);
            if(state.winner === undef && i === state.current_player) {
              player.addClass("turn");
            } else {
              player.removeClass("turn");
            }
            if(i === this.player){
              player.addClass("current");
            } else {
              player.removeClass("current");
            }
            if(state.winner === i){
              player.addClass("winner");
            }
          }
          //debug("sb",$.print(state.board));
          $.each(state.board,function(k,v){
            if(!self.div.find(".ttt-cell."+k).hasClass("taken")){
              var first = self.div.find(".ttt-cell.00");
              //debug("f",$.print(first));
              var cell = self.div.find(".ttt-cell."+k);
              //debug("c",k,$.print(cell));
              cell.addClass( "taken" ).addClass( v === 0 ? "by_X" : "by_O" );

              var first_box = first.get(0).getBBox();
              var cell_box = cell.get(0).getBBox();

              var scale_x = cell_box.width / first_box.width;
              var scale_y = cell_box.height / first_box.height;

              var down_x = -(first_box.x + 0.5*first_box.width);
              var down_y = -(first_box.y + 0.5*first_box.height);
              
              var up_x = cell_box.x + 0.5*cell_box.width;
              var up_y = cell_box.y + 0.5*cell_box.height;
              
              var markers = ( v === 0 ? template.xes : template.oes );
              var index = Math.floor( Math.random() * markers.length );
              var marker = markers[ index ];
              marker = $(marker).clone();
              marker.addClass("cloned");
              marker.css("display","");
              var t =  [
                "translate(" + [ up_x, up_y ].join(",") + ")",
                "scale(" + [ scale_x, scale_y ].join(",") + ")",
                "translate(" + [ down_x, down_y ].join(",") + ")"
              ].join(",");
              marker.attr("transform", t);
              self.div.find("g").append(marker);
            }
          });
          if(state.winner !== undef){
            for(var win = 0; win < wins.length; win++ ) {
              if( state.board[wins[win][0]] !== undef &&
                  state.board[wins[win][0]]===state.board[wins[win][1]] && 
                  state.board[wins[win][0]]===state.board[wins[win][2]] ) {
                this.div.find(wins[win][3]).css("display","");
                break;
              }
            }
          }
          if(append) {
            this.div.appendTo(this.dom);
            //debug("cl",$.print(this.div)/*,this.div.html()*/,$.print(this.div.find(".ttt-cell")));
          }
        }
        this.watch(state);
      },
      watch: function watch(state) {
        var undef;
        if(!this._watcher) {
          var self = this;
          this._watcher = function _watcher() {
            //debug("??",$.print(this));
            self.game.move($(this).attr("index"));
            return false;
          };
        }
        if(state.winner === undef && this.player === state.current_player) {
          this.div.find(".ttt-cell:not(.taken)").click(this._watcher);
        } else {
          this.div.find(".ttt-cell").unbind("click",this._watcher);
        }
      }
    });
  
}(jQuery));