(function($){

  jsrat.Locators.FieldNamedLocator = function FieldNamedLocator() {
    jsrat.Locators.Locator.apply(this,arguments);
  };

  jsrat.Locators.FieldNamedLocator.prototype = new jsrat.Locators.Locator;

  $.extend(jsrat.Locators.FieldNamedLocator.prototype,{
    locate: function locate() {
      return jsrat.Field.load(this._sesssion, this.field_element());
    },
    field_element: function field_element() {
      return $(this.field_elements()).find("name["+this._value+"]").get(0);
    },
    field_elements: function field_elements() {
      return this._dom.find(jsrat.Field.jquery_selector());
    },
    error_message: function error_message() {
      return "Could not find field named " + this._value;
    }
  });

  jsrat.Locators.field_named =
    function field_named(named, field_types) {
      return new jsrat.Locators.FieldNamedLocator( this._session,
                                                   this.dom(),
                                                   named, field_types ).locate_b();
    };

})(jQuery);