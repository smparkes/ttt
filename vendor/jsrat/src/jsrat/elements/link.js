(function($){

  jsrat.Link = function Link() {
    jsrat.Element.apply(this,arguments);
  };

  jsrat.Link.load = jsrat.Element.load;

  jsrat.Link.jquery_selector = function jquery_selector(){
    return "a[href]";
  };

  jsrat.Link.prototype = new jsrat.Element;
  
  $.extend(jsrat.Link.prototype, {
    click: function click(options) {
      $(this._element).click();
    }
  });

})(jQuery);