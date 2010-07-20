"use strict";
(function($){
  describe("ttt",function(){
    describe("pubsub",function(){

      beforeEach(function(){
        this.subscriber = function(){};
        $.extend(this.subscriber.prototype,TTT.Subscriber.prototype);
        this.publisher = function(){};
        $.extend(this.publisher.prototype,TTT.Publisher.prototype);
        this.sub = new this.subscriber();
        this.sub2 = new this.subscriber();
        this.pub = new this.publisher();
      });

      it("should be possible to subscribe to a publisher",function(){
        this.sub.subscribe({to: this.pub, call: "method"});
      });

      it("should receive callbacks on publisher changes",function(){
        var hash = {a: "b"};
        this.sub.subscribe({to: this.pub, call: "method"});
        this.sub.method = function method(state) {
          expect(state).toEqual(hash);
          complete();
        };
        this.pub.notify(hash);
        incomplete();
      });

      it("should receive an initial state", function() {
        var hash = {a: "b"};
        this.sub.method = function method(state) {
          expect(state).toEqual(hash);
          complete();
        };
        this.pub.notify(hash);
        this.sub.subscribe({to: this.pub, call: "method"});
        incomplete();
      });

      it("should not receive an initial state if there is none", function() {
        var hash = {a: "b"};
        this.sub.method = function method(state) {
          expect(false).toBe(true);
        };
        window.setTimeout(function(){
          complete();
        },100);
        this.pub.notify(hash);
        this.sub.subscribe({to: this.pub, call: "method", state_id: 1});
        incomplete();
      });

      it("should get first state", function() {
        var hash = {a: "b"};
        this.sub.method = function method(state) {
          expect(state).toEqual(hash);
          complete();
        };
        this.sub.subscribe({to: this.pub, call: "method"});
        this.pub.notify(hash);
        incomplete();
      });

      it("should only send state to new object on init request", function() {
        var hash = {a: "b"};
        this.sub2.method = function method(state) {
          expect(state).toEqual(hash);
          this.method = function(state) {
            expect(true).toBe(false);
          };
        };
        this.sub.method = function method(state) {
          expect(state).toEqual(hash);
        };
        window.setTimeout(function(){
          complete();
        },100);
        this.sub2.subscribe({to: this.pub, call: "method"});
        this.pub.notify(hash);
        this.sub.subscribe({to: this.pub, call: "method"});
        incomplete();
      });

      it("should be possible to unsubscribe", function() {
        this.sub.unsubscribe({to: this.pub, call: "method"});
      });

      it("should not receive callbacks after unsub", function() {
        var hash = {a: "b"};
        this.sub.method = function method(state) {
          expect(state).toBe(hash);
          this.method = function (state) {
            expect(false).toBe(true);
          };
        };
        window.setTimeout(function(){
          complete();
        },100);
        this.sub.subscribe({to: this.pub, call: "method"});
        this.pub.notify(hash);
        this.sub.unsubscribe({to: this.pub, call: "method"});
        this.pub.notify(hash);
        incomplete();
      });

    });
  });
}(jQuery));