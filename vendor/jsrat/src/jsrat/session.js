(function($){
  var global = (function(){return this;}());
  jsrat.Session = function Session() {
    this.reset();
  };
  jsrat.Session.prototype = {
    current_dom: function current_dom() {
      var self = (this === global)?jsrat:this;
      return self.current_scope().dom();
    },
    scopes: function scopes() {
      var self = (this === global)?jsrat:this;
      return ( self._scopes = ( self._scopes || [] ) );
    },
    page_scope: function page_scope() {
      var self = (this === global)?jsrat:this;
      return ( self._page_scope = ( self._page_scope || jsrat.Scope.from_page( this ) ) );
    },
    current_scope: function current_scope() {
      var self = (this === global)?jsrat:this;
      return self.scopes()[-1] || self.page_scope();
    },
    click_link: function click_link() {
      var self = (this === global)?jsrat:this;
      return self.current_scope().
        click_link.apply(self.current_scope(),arguments);
    },
    fill_in: function fill_in() {
      var self = (this === global)?jsrat:this;
      return self.current_scope().
        fill_in.apply(self.current_scope(),arguments);
    },
    elements: function elememnts() {
      var self = (this === global)?jsrat:this;
      return self._elements;
    },
    reset: function reset() {
      var undefined;
      var self = (this === global)?jsrat:this;
      self._elements = {};
      self._scopes = undefined;
      self._page_scope = undefined;
    },
    _wait_for: function _wait_for() {
      var self = (this === global)?jsrat:this;
      return self.current_scope().
        wait_for.apply(self.current_scope(),arguments);
    }
  };
  $.extend(jsrat,jsrat.Session.prototype);
})(jQuery);