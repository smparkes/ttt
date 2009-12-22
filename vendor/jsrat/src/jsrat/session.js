(function($){
  jsrat.Session = function Session() {
    this.reset();
  };
  jsrat.Session.prototype = {
    current_dom: function current_dom() {
      return this.current_scope().dom();
    },
    scopes: function scopes() {
      return ( this._scopes = ( this._scopes || [] ) );
    },
    page_scope: function page_scope() {
      return ( this._page_scope = ( this._page_scope || jsrat.Scope.from_page( this ) ) );
    },
    current_scope: function current_scope() {
      return this.scopes()[-1] || this.page_scope();
    },
    click_link: function click_link() {
      return this.current_scope().
        click_link.apply(this.current_scope(),arguments);
    },
    fill_in: function fill_in() {
      return this.current_scope().
        fill_in.apply(this.current_scope(),arguments);
    },
    elements: function elememnts() {
      return this._elements;
    },
    reset: function reset() {
      var undefined;
      this._elements = {};
      this._scopes = undefined;
      this._page_scope = undefined;
    }
  };
  $.extend(jsrat,jsrat.Session.prototype);
})(jQuery);