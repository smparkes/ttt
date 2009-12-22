(function($){

  jsrat.Locators.LinkLocator = function LinkLocator() {
    jsrat.Locators.Locator.apply(this,arguments);
  };

  jsrat.Locators.LinkLocator.prototype = new jsrat.Locators.Locator;

  $.extend(jsrat.Locators.LinkLocator.prototype,{
    locate: function locate() {
      return jsrat.Link.load(this._session, this.link_element());
    },
    link_element: function link_element() {
      return _(this.matching_links()).min(function(a,b){
        return $(a).text().length - $(b).text().length;
      });
    },
    matching_links: function matching_links() {
      var self = this;
      return ( this._matching_links =
               ( this._matching_links ||
                 _(this.link_elements()).select(function(link_element){
                   return self.matches_text_p(link_element) ||
                           self.matches_id_p(link_element);
                 })));
    },
    link_elements: function link_elements() {
      return $.makeArray(this._dom.find(jsrat.Link.jquery_selector()));
    },
    matches_text_p: function matches_text_p(link) {
      link = $(link);
      var self = this;
      var matcher;
      if(this._value instanceof RegExp) {
        matcher = function(t) { return self._value.exec(t); };
      } else {
        matcher = function(t) { return t.indexOf( self._value ) != -1; };
      }
      return matcher( this.replace_nbsp(link.text()) ) ||
              matcher( this.replace_nbsp_ref(link.text()) ) ||
              matcher( link.attr("title") );
    },
    replace_nbsp: function replace_nbsp(str) {
      return str.replace(/\u00A0/g," ");
    }, 
    replace_nbsp_ref: function replace_nbsp_ref(str) {
      return str.replace( /&#xA0;/g, "  " );
    },
    matches_id_p: function matches_id_p(link) {
      id = $(link).attr("id");
      var self = this;
      var matcher;
      if(this._value instanceof RegExp) {
        matcher = function(t) { return self._value.exec(t); };
      } else {
        matcher = function(t) { return ( t === self._value ); };
      }
      return matcher( id );
    }
  });

  jsrat.Locators.find_link =
    function find_link(text_or_title_or_id) {
      return new jsrat.Locators.LinkLocator( this._session,
                                              this.dom(),
                                              text_or_title_or_id ).locate_b();
    };

})(jQuery);