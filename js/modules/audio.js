(function() {
  var Audio, Component,
    bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

  Component = require("./component");

  Audio = (function() {
    Audio.prototype.classes = {
      node: "redactor__body__component__audio",
      input: "redactor__body__component__audio__input",
      iframe: "redactor__body__component__audio__iframe"
    };

    function Audio(redactor, url) {
      this.redactor = redactor;
      this.onPaste = bind(this.onPaste, this);
      this.component = new Component(this.redactor);
      this.createNodes();
      this.createEvents();
      if (this.valid(url)) {
        this.loadContent(url);
      } else {
        this.component.error();
      }
    }

    Audio.prototype.createNodes = function() {
      this.nodes = {
        main: $("<div/>", {
          "class": this.classes.node
        }),
        input: $("<input>", {
          type: 'text',
          "class": this.classes.input,
          placeholder: "Type your link here"
        }),
        data: $("<input>", {
          type: "hidden",
          name: "audio"
        })
      };
      this.nodes.main.appendTo(this.component.nodes.container);
      this.nodes.input.appendTo(this.nodes.main).focus();
      return this.nodes.data.appendTo(this.nodes.main);
    };

    Audio.prototype.createEvents = function() {
      this.nodes.input.on("paste", (function(_this) {
        return function(event) {
          return setTimeout(_this.onPaste, 100);
        };
      })(this));
      return this.nodes.input.on("keydown", function(event) {
        if (event.keyCode === 13) {
          return event.preventDefault();
        }
      });
    };

    Audio.prototype.onPaste = function() {
      var url;
      url = this.nodes.input.val();
      if (this.valid(url)) {
        return this.loadContent(url);
      } else {
        return this.component.error();
      }
    };

    Audio.prototype.valid = function(url) {
      var soundcloud;
      soundcloud = /https?:\/\/(?:www\.)?(?:soundcloud.com\/)(?:(?:[A-z0-9-]+\/)(?:[A-z0-9-]+)\/?)*/;
      return soundcloud.test(url);
    };

    Audio.prototype.loadContent = function(url) {
      this.component.loading();
      return $.ajax({
        url: "https://soundcloud.com/oembed",
        data: {
          url: url,
          format: "json"
        },
        success: (function(_this) {
          return function(result) {
            _this.nodes.iframe = $(result.html).appendTo(_this.nodes.main).addClass(_this.classes.iframe);
            _this.nodes.data.val(url);
            return _this.done();
          };
        })(this),
        error: (function(_this) {
          return function() {
            return _this.component.error();
          };
        })(this)
      });
    };

    Audio.prototype.done = function() {
      this.nodes.input.remove();
      return this.component.done();
    };

    return Audio;

  })();

  module.exports = Audio;

}).call(this);
