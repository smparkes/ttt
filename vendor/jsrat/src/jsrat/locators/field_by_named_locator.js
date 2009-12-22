(function($){

  jsrat.Locators.FieldByNamedLocator = function FieldByNamedLocator() {
    jsrat.Locators.Locator.apply(this,arguments);
  };

  jsrat.Locators.FieldByNamedLocator.prototype = new jsrat.Locators.Locator;

  $.extend(jsrat.Locators.FieldByNamedLocator.prototype,{
    locate: function locate() {
      return jsrat.Field.load(this._sesssion, this.field_element());
    },
    field_element: function field_element() {
      var self = this;
      var matcher;
      if(this._value instanceof RegExp) {
        matcher = function(t) { return self._value.exec(t); };
      } else {
        matcher = function(t) { return ( t === (self._value+"") ); };
      }
      return _(this.field_elements()).detect(function(field_element){
        named = $(field_element).attr("named");
        return matcher( named );
      });
    },
    field_elements: function field_elements() {
      return $.makeArray(this._dom.find(jsrat.Field.jquery_selector()));
    },
    error_message: function error_message() {
      return "Could not find field with named " + this._value;
    }
  });

  jsrat.Locators.field_with_named =
    function field_with_named(named, field_types) {
      return new jsrat.Locators.FieldByNamedLocator( this._session,
                                                   this.dom(),
                                                   named, field_types ).locate_b();
    };

})(jQuery);