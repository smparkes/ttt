(function($){

  jsrat.Locators.FieldByIdLocator = function FieldByIdLocator() {
    jsrat.Locators.Locator.apply(this,arguments);
  };

  jsrat.Locators.FieldByIdLocator.prototype = new jsrat.Locators.Locator;

  $.extend(jsrat.Locators.FieldByIdLocator.prototype,{
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
        id = $(field_element).attr("id");
        return matcher( id );
      });
    },
    field_elements: function field_elements() {
      return $.makeArray(this._dom.find(jsrat.Field.jquery_selector()));
    },
    error_message: function error_message() {
      return "Could not find field with id " + this._value;
    }
  });

  jsrat.Locators.field_with_id =
    function field_with_id(id, field_types) {
      return new jsrat.Locators.FieldByIdLocator( this._session,
                                                   this.dom(),
                                                   id, field_types ).locate_b();
    };

})(jQuery);