(function() {
  var Body, DataParser, Slider, Toolbar;

  Toolbar = require("./modules/toolbar");

  Body = require("./modules/body");

  Slider = require("./modules/slider");

  DataParser = require("./modules/dataparser");

  $.fn.redactor = function(options) {
    this.options = options;
    this.toolbar = new Toolbar(this);
    this.body = new Body(this);
    this.slider = new Slider(this);
    if (this.options.data) {
      new DataParser(this, this.options.data);
    }
    return this;
  };

}).call(this);
