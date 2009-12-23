jazrb_root = this.jazrb_root || ".";
include(jazrb_root + "/spec/lib/ttt/spec_helper.js");

(function(){

  describe("ttt",function(){
    describe("server",function(){
      describe("view",function(){

        it("should be creatable from a server w/o a dom element",function(){
          expect(view = new TTT.Server.View(new TTT.Server)).toBeDefined();
        });

        it("should be creatable from a server w/a dom element",function(){
          var div = $("<div></div>");
          expect(new TTT.Server.View(new TTT.Server,div)).toBeDefined();
        });

        it("should fill in the given element",function(){
          var div = $("<div></div>");
          new TTT.Server.View(new TTT.Server,div);
          expect(div.children().length).toBe(1);
          for(var c in {ttt: true, server: true, view: true }) {
            expect(div.children().first().hasClass(c)).toBe(true);
          }
        });

        it("should clear the given element on stop",function(){
          var div = $("<div></div>");
          var view = new TTT.Server.View(new TTT.Server,div);
          expect(div.children().length).toBe(1);
          view.stop();
          expect(div.children().length).toBe(0);
        });

        describe("view of running server",function(){

          beforeEach(function(){
            this.div = $("<div></div>");
            this.view = new TTT.Server.View(this.server = new TTT.Server,this.div);
          });

          afterEach(function(){
            this.server.stop();
          });

          it("should show no players before anyone joins",function(){
            expect(this.div.find(".players").text()).toBe("0");
          });

        });
        
      });
    });
  });

})();