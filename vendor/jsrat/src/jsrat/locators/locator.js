(function($){

  jsrat.Locators.Locator =
    function Locator(session, dom, value, field_types) {
      this._session = session;
      this._dom = dom;
      this._value = value;
      this._field_types = field_types;
    };

  jsrat.Locators.Locator.prototype = {
    locate_b: function locate_b() {
      var l = this.locate();
      if(l){
        return l;
      } else {
        throw new Error( this.error_message() );
      }
    }
  };

})(jQuery);