(function($){

  // FIXME
  RegExp.escape = RegExp.escape || function(text) {
    if (!arguments.callee.sRE) {
          var specials = [
            '/', '.', '*', '+', '?', '|',
            '(', ')', '[', ']', '{', '}', '\\'
          ];
      arguments.callee.sRE = new RegExp(
        '(\\' + specials.join('|\\') + ')', 'g'
      );
    }
    return text.replace(arguments.callee.sRE, '\\$1');
  };

  // FIXME
  _.detect_mapped = function(obj, iterator, context) {
    var result;
    _.each(obj, function(value, index, list) {
      var mapped;
      if ((mapped = iterator.call(context, value, index, list))) {
        result = mapped;
        _.breakLoop();
      }
    });
    return result;
  };
  

  jsrat.Locators.FieldLabeledLocator = function FieldLabeledLocator() {
    jsrat.Locators.Locator.apply(this,arguments);
  };

  jsrat.Locators.FieldLabeledLocator.prototype = new jsrat.Locators.Locator;

  $.extend(jsrat.Locators.FieldLabeledLocator.prototype,{
    locate: function locate() {
      return _(this.matching_labels()).any() &&
        _.detect_mapped(this.matching_labels(),function(label){
          return label.field(); 
        });
    },
    matching_labels: function matching_labels() {
      var self = this;
      return _(this.matching_label_elements()).
        sortBy(function(label_element){return self.text(label_element).length;}).
        map(function(label_element){return jsrat.Label.load(self._session,label_element);});
    },
    matching_label_elements: function matching_label_elements() {
      var self = this;
      return _(this.label_elements()).select(function(label_element){
        return self.text(label_element).match( new RegExp("^\\W*"+RegExp.escape(self._value+"")+"(\\b|\\Z)","i") );
      });
    },
    label_elements: function label_elements() {
      return $.makeArray(this._dom.find(jsrat.Label.jquery_selector()));
    },
    text: function text(element) {
      var str = $(element).text();
      str = str.replace( /\n/i, "" ).replace(/^\s+/, "").replace(/\s+$/, "").replace( /\s+/, " " );
      return str;
    },
    error_message: function error_message() {
      return "Could not find field labeled " + this._value;
    }
  });

  jsrat.Locators.field_labeled =
    function field_labeled(labeled, field_types) {
      return new jsrat.Locators.FieldLabeledLocator( this._session,
                                                     this.dom(),
                                                     labeled, field_types ).locate_b();
    };

})(jQuery);