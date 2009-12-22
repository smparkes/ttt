(function($){

  jsrat.Scope = function Scope(session, fn) {
    this._session = session;

    if(fn){
      fn.call(this);
    }

    if(this._selector && !this.scoped_dom()) {
      throw new jsrat.NotFoundError("The scope was not found on the page: "+
                                     this_selector.to_s);
    }
  };

  jsrat.Scope.from_page = function from_page(session) {
    var scope = new jsrat.Scope(session);
    return scope;
  };

  jsrat.Scope.prototype = {
    click_link: function click_link(text_or_title_or_id, options) {
      options = options || {};
      return this.find_link(text_or_title_or_id).click(options);
    },
    fill_in: function fill_in(field_locator, options) {
      options = options || {};
      var field = this.locate_field(field_locator, jsrat.TextField,
                                                    jsrat.TextareaField,
                                                    jsrat.PasswordField);
      field.raise_error_if_disabled();
      return field.set(options["with"]);
    },
    dom: function dom() {
      if(this._dom) {
          return this._dom;
      }
      if(this._selector) {
        this._dom = this.scoped_dom();
      } else {
        this._dom = this.page_dom();
      }
      return this._dom;
    },
    page_dom: function page_dom() {
      return $(document);
    },
    locate_field: function locate_field(field_locator /*, *field_types*/) {
      if(field_locator instanceof jsrat.Field) {
        return field_locator();
      } else {
        return this.field.apply(this,arguments); 
      }
    }
  };

  $.extend(jsrat.Scope.prototype,jsrat.Locators);

})(jQuery);