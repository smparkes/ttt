(function($){

  var Field = jsrat.Field = function Field() {
    jsrat.Element.apply(this,arguments);
    this._value = this.default_value();
  };

  Field.load = function load(session, element) {
    var undefined;
    if(!element) {
      return undefined;
    }
    return new (this.field_class(element))(session, element);
  };

  Field.field_class = function field_class(element) {
    switch(element.tagName){
     case "BUTTON": return ButtonField;
     case "SELECT":
      if( element.attributes["multiple"].nil() ){
        return SelectField;
      } else {
        return MultipleSelectField;
      }
     case "TEXTAREA":
      return TextareaField;
    default:
      switch(element["type"]) {
       case "CHECKBOX": return CheckboxField;
       case "HIDDEN":   return HiddenField;
       case "RADIO":    return RadioField;
       case "PASSWORD": return PasswordField;
       case "FILE":     return FileField;
       case "RESET":    return ResetField;
       case "SUBMIT":   return ButtonField;
       case "BUTTON":   return ButtonField;
       case "IMAGE":    return ButtonField;
      default: return  jsrat.TextField;
      }
    }
  };


  Field.jquery_selector = function jquery_selector(){
    return "button, input, textarea, select";
  };

  Field.jquery_selector_excluding_hidden = function jquery_selector(){
    return "button, input[type!=hidden], textarea, select";
  };

  Field.prototype = new jsrat.Element;
  Field.prototype.constructor = Field;
  
  $.extend(Field.prototype, {
    default_value: function default_value() {
      var undefined;
      return undefined;
    },
    disabled_p: function disabled_p() {
      return $(this._element).attr("disabled");
    },
    raise_error_if_disabled: function raise_error_if_disabled() {
      if(this.disabled_p()){
        throw new Error( "Cannot interact with disabled form element (" + this + ")" );
      }
    },
    set: function set(value) {
      $(this._element).val(value);
    }
  });

  jsrat.TextField = function TextField() {
    Field.apply(this,arguments);
  };
  jsrat.TextField.prototype = new Field;
  jsrat.TextField.prototype.constructor = jsrat.TextField;
  $.extend(jsrat.TextField,{
    jquery_selector: function jquery_selector() {
      return "input[type=text], input:not([type])";
    }
  });

})(jQuery);