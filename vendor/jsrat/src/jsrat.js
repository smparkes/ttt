(function($,_){

  var Element = function Element() {
  };

  var Link = function Link() {
  };

  Link.prototype = new Element;

  var Locator = function Locator(/*session, dom, value, *field_types*/) {
    this.sessions = Array.shift.call( arguments );
    this.dom = Array.shift.call( arguments );
    this.value = Array.shift.call( arguments );
    this.field_types = arguments;
  };

  Locator.prototype = {
    locate_: function locate_() {
      var l = this.locate();
      if(!l) {
        throw new Error( error_message() );
      }
      return l;
    }
  };

  var LinkLocator = function LinkLocator() {
    Locator.apply(this,arguments);
  };

  LinkLocator.prototype = new Locator;
  $.extend(LinkLocator.prototype, {
    locate: function locate() {
      return Link.load(this.session, this.link_element());
    },
    matching_links: function matching_links() {
      var self = this;
      this._matching_links = this.matching_links || _(this.link_elements()).select(function(link_element){
        console.debug(this,link_element);
        return self.matches_text_p(link_element) ||
                self.matches_id_p(link_element);
      });
      return this._matching_links;
    },
    link_element: function link_element() {
      return _( this.matching_links() ).min( function( a, b ) {
        return $(a).text().length - $(b).text().length;
      } );
    }

  });

  var find_link = function find_link(text_or_title_or_id) {
    return new LinkLocator(this.session, this, text_or_title_or_id).locate_();
  };

  var locate_field = function(field_locator /*, *field_types*/){
    if(field_locator instanceof Field) {
      return field_locator;
    } else {
      return field.appy(this,arguments);
    }
  };

  var jsrat = {
    xclick_link: function click_link(text){
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
    },
    click_link: function click_link(text_or_title_or_id, options) {
      options = options || {};
      return find_link.call(this,text_or_title_or_id).click(options);
    },
    fill_in: function fill_in(field_locator, options){
      if(this === $){
        $(document).fill_in(field_locator, options);
      } else {
        var field = locate_field.call( this, field_locator, TextField, TextareaField, PasswordField );
        field.raise_error_if_disabled();
        field.set(options["with"]);
      }
    }

  };

  $.fn.extend({ jsrat: jsrat});
  
  // FIX: Make optional
  $.extend(jsrat);
  $.fn.extend(jsrat);

})(jQuery,_);