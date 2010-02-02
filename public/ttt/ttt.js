/*jslint evil: true*/
"use strict";
(function(){
  var global = (function(){return this;}());
  global.ttt_top = global.ttt_top || "../..";
  if(!this.jQuery) {
      document.write("<script src='"+global.ttt_top+"/vendor/jquery/dist/jquery.js' type='text/javascript'></script>");
  }
  document.write("<script src='"+global.ttt_top+"/lib/ttt.js' type='text/javascript'></script>");
  document.write("<script src='"+global.ttt_top+"/lib/ttt/class.js' type='text/javascript'></script>");
  document.write("<script src='"+global.ttt_top+"/lib/ttt/publisher.js' type='text/javascript'></script>");
  document.write("<script src='"+global.ttt_top+"/lib/ttt/subscriber.js' type='text/javascript'></script>");
  document.write("<script src='"+global.ttt_top+"/lib/ttt/game.js' type='text/javascript'></script>");
  document.write("<script src='"+global.ttt_top+"/lib/ttt/game/view.js' type='text/javascript'></script>");
  document.write("<script src='"+global.ttt_top+"/lib/ttt/game/view/table.js' type='text/javascript'></script>");
  document.write("<script src='"+global.ttt_top+"/lib/ttt/game/view/svg.js' type='text/javascript'></script>");
  document.write("<script src='"+global.ttt_top+"/lib/ttt/server.js' type='text/javascript'></script>");
  document.write("<script src='"+global.ttt_top+"/lib/ttt/server/view.js' type='text/javascript'></script>");
  document.write("<script src='"+global.ttt_top+"/lib/ttt/player.js' type='text/javascript'></script>");
  document.write("<script src='"+global.ttt_top+"/vendor/strophejs/src/core.js' type='text/javascript'></script>");
}());

/*
  document.write("<script src='"+global.ttt_top+"/vendor/dramatis/lib/dramatis.js' type='text/javascript'></script>");
  document.write("<script src='"+global.ttt_top+"/vendor/dramatis/lib/dramatis/class.js' type='text/javascript'></script>");
  document.write("<script src='"+global.ttt_top+"/vendor/dramatis/lib/dramatis/runtime.js' type='text/javascript'></script>");
  document.write("<script src='"+global.ttt_top+"/vendor/dramatis/lib/dramatis/runtime/callable.js' type='text/javascript'></script>");
  document.write("<script src='"+global.ttt_top+"/vendor/dramatis/lib/dramatis/runtime/callable/method.js' type='text/javascript'></script>");
  document.write("<script src='"+global.ttt_top+"/vendor/dramatis/lib/dramatis/continuation.js' type='text/javascript'></script>");
  document.write("<script src='"+global.ttt_top+"/vendor/dramatis/lib/dramatis/actor.js' type='text/javascript'></script>");
  document.write("<script src='"+global.ttt_top+"/vendor/dramatis/lib/dramatis/actor/behavior.js' type='text/javascript'></script>");
  document.write("<script src='"+global.ttt_top+"/vendor/dramatis/lib/dramatis/actor/interface.js' type='text/javascript'></script>");
  document.write("<script src='"+global.ttt_top+"/vendor/dramatis/lib/dramatis/actor/name.js' type='text/javascript'></script>");
  document.write("<script src='"+global.ttt_top+"/vendor/dramatis/lib/dramatis/actor/type.js' type='text/javascript'></script>");
  document.write("<script src='"+global.ttt_top+"/vendor/dramatis/lib/dramatis/actor/name/type.js' type='text/javascript'></script>");
  document.write("<script src='"+global.ttt_top+"/vendor/dramatis/lib/dramatis/director.js' type='text/javascript'></script>");
  document.write("<script src='"+global.ttt_top+"/vendor/dramatis/lib/dramatis/runtime/reactor.js' type='text/javascript'></script>");
  document.write("<script src='"+global.ttt_top+"/vendor/dramatis/lib/dramatis/runtime/reactor/channel.js' type='text/javascript'></script>");
  document.write("<script src='"+global.ttt_top+"/vendor/dramatis/lib/dramatis/runtime/reactor/channel/xmpp.js' type='text/javascript'></script>");
  document.write("<script src='"+global.ttt_top+"/vendor/dramatis/lib/dramatis/subscriber.js' type='text/javascript'></script>");
  document.write("<script src='"+global.ttt_top+"/vendor/dramatis/lib/dramatis/publisher.js' type='text/javascript'></script>");
*/