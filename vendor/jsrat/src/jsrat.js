(function($){

  var jsrat = {
    click_link: function click_link(text){
      if(this === $){
        $(document).click_link(text);
      } else {
        if(text instanceof RegExp) {
          throw new Error("implement click link on regex");
        }
        var links = $(this).find("a:contains("+text+")");
        if(links.length == 0){
          links = $(this).find("a[title*="+text+"]");
        }
        if(links.length == 0){
          links = $(this).find("#"+text);
        }
        if(links.length == 0){
          throw new Error("no link '"+text+"' to click");
        }
        links.eq(0).click();
      }
    }
  };

  $.extend({ jsrat: jsrat});
  $.fn.extend({ jsrat: jsrat});
  
  // FIX: Make optional
  $.extend(jsrat);
  $.fn.extend(jsrat);

})(jQuery);