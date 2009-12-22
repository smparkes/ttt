(function($){

  jsrat.Locators.FieldLocator = function FieldLocator() {
    jsrat.Locators.Locator.apply(this,arguments);
  };

  jsrat.Locators.FieldLocator.prototype = new jsrat.Locators.Locator;
  jsrat.Locators.FieldLocator.prototype.constructor = jsrat.Locators.FieldLocator;

  $.extend(jsrat.Locators.FieldLocator.prototype,{
    locate: function locate() {
      return ( new jsrat.Locators.FieldByIdLocator(this._session,this._dom,this._value).locate() ||
                new jsrat.Locators.FieldNamedLocator(this._session,this._dom,this._value, this._field_types).locate() ||
                new jsrat.Locators.FieldLabeledLocator(this._session,this._dom,this._value, this._field_types).locate() );
    },
    error_message: function error_message() {
      return "Could not find field: " + this._value;
    }
  });

  jsrat.Locators.field =
    function field(value, field_types) {
      return new jsrat.Locators.FieldLocator( this._session,
                                               this.dom(),
                                               value, field_types ).locate_b();
    };

})(jQuery);