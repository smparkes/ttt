(function($){

  jsrat.Label = function Label() {
    jsrat.Element.apply(this,arguments);
  };

  jsrat.Label.load = jsrat.Element.load;

  jsrat.Label.jquery_selector = function jquery_selector(){
    return "label";
  };

  jsrat.Label.prototype = new jsrat.Element;
  
  $.extend(jsrat.Label.prototype, {
    for_id: function for_id() {
      return $(this._element).find("for").get(0);
    },
    field: function field() {
      return jsrat.Field.load(this._session,this.field_element());
    },
    field_element: function field_element() {
      var id = this.for_id(); 
      var undefined;
      if(id === null || id === undefined || (id+"").match( /^\s*$/ )){
        return $(this._element).find(jsrat.Field.jquery_selector_excluding_hidden()).get(0);
      } else {
        return jsrat.current_dom().find("#"+id).get(0);
      }
    }
  });

})(jQuery);