(function($){

  jsrat.Element = function Element(session, element) {
    this._session = session;
    this._element = element;
  };

  jsrat.Element.load = function load(session, element) {
    var undefined;
    if(!element) {
      return undefined;
    }
    return new this(session, element);
  };

  jsrat.Element.prototype = {
  };
  
})(jQuery);