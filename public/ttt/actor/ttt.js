/*jslint evil: true*/
"use strict";
(function(){
  var document = window.document;
  if (!(function(){return this;}()).jQuery) {
    document.write("<script src='../../../vendor/jquery/dist/jquery.js' type='text/javascript'></script>");
  }
  document.write("<script src='../../../vendor/dramatis/lib/dramatis.js' type='text/javascript'></script>");
  document.write("<script src='../../../vendor/dramatis/lib/dramatis/class.js' type='text/javascript'></script>");
  document.write("<script src='../../../vendor/dramatis/lib/dramatis/runtime.js' type='text/javascript'></script>");
  document.write("<script src='../../../vendor/dramatis/lib/dramatis/runtime/callable.js' type='text/javascript'></script>");
  document.write("<script src='../../../vendor/dramatis/lib/dramatis/runtime/callable/method.js' type='text/javascript'></script>");
  document.write("<script src='../../../vendor/dramatis/lib/dramatis/continuation.js' type='text/javascript'></script>");
  document.write("<script src='../../../vendor/dramatis/lib/dramatis/actor.js' type='text/javascript'></script>");
  document.write("<script src='../../../vendor/dramatis/lib/dramatis/future.js' type='text/javascript'></script>");
  document.write("<script src='../../../vendor/dramatis/lib/dramatis/actor/behavior.js' type='text/javascript'></script>");
  document.write("<script src='../../../vendor/dramatis/lib/dramatis/actor/interface.js' type='text/javascript'></script>");
  document.write("<script src='../../../vendor/dramatis/lib/dramatis/actor/name.js' type='text/javascript'></script>");
  document.write("<script src='../../../vendor/dramatis/lib/dramatis/actor/type.js' type='text/javascript'></script>");
  document.write("<script src='../../../vendor/dramatis/lib/dramatis/actor/name/type.js' type='text/javascript'></script>");
  document.write("<script src='../../../vendor/dramatis/lib/dramatis/director.js' type='text/javascript'></script>");
  document.write("<script src='../../../vendor/dramatis/lib/dramatis/runtime/reactor.js' type='text/javascript'></script>");
  document.write("<script src='../../../vendor/dramatis/lib/dramatis/runtime/reactor/channel.js' type='text/javascript'></script>");
  document.write("<script src='../../../vendor/dramatis/lib/dramatis/runtime/reactor/channel/xmpp.js' type='text/javascript'></script>");
  document.write("<script src='../../../vendor/dramatis/vendor/strophejs/src/core.js' type='text/javascript'></script>");
  document.write("<script src='../../../vendor/dramatis/lib/dramatis/subscriber.js' type='text/javascript'></script>");
  document.write("<script src='../../../vendor/dramatis/lib/dramatis/publisher.js' type='text/javascript'></script>");
  document.write("<script src='../../../lib/ttt.js' type='text/javascript'></script>");
  document.write("<script src='../../../lib/ttt/class.js' type='text/javascript'></script>");
  document.write("<script src='../../../lib/ttt/game.js' type='text/javascript'></script>");
  document.write("<script src='../../../lib/ttt/game/view.js' type='text/javascript'></script>");
  document.write("<script src='../../../lib/ttt/game/view/table.js' type='text/javascript'></script>");
  document.write("<script src='../../../lib/ttt/game/view/svg.js' type='text/javascript'></script>");
  document.write("<script src='../../../lib/ttt/game/view/svg/actor.js' type='text/javascript'></script>");
  document.write("<script src='../../../lib/ttt/server.js' type='text/javascript'></script>");
  document.write("<script src='../../../lib/ttt/server/view.js' type='text/javascript'></script>");
  document.write("<script src='../../../lib/ttt/server/view/actor.js' type='text/javascript'></script>");
  document.write("<script src='../../../lib/ttt/player.js' type='text/javascript'></script>");
  document.write("<script src='../../../lib/ttt/server/actor.js' type='text/javascript'></script>");
  document.write("<script src='../../../lib/ttt/player/actor.js' type='text/javascript'></script>");
  document.write("<script src='../../../lib/ttt/game/actor.js' type='text/javascript'></script>");
}());