(function() {
  var Component, Embed;

  Component = require("./component");

  Embed = (function() {
    Embed.prototype.classes = {
      node: "redactor__body__component__embed",
      input: "redactor__body__component__embed__input",
      placeholder: "redactor__body__component__embed__placeholder"
    };

    function Embed(redactor1) {
      this.redactor = redactor1;
      this.component = new Component(this.redactor);
      this.node = $("<div/>", {
        "class": this.classes.node
      }).appendTo(this.component.placeholder);
      this.input = $("<textarea/>", {
        type: 'text',
        "class": this.classes.input,
        placeholder: "Type code here"
      }).appendTo(this.node).focus();
      this.events();
    }

    Embed.prototype.events = function() {
      return this.input.on("keydown", (function(_this) {
        return function(event) {
          if (event.keyCode === 13) {
            event.preventDefault();
            return _this.renderIframe();
          }
        };
      })(this));
    };

    Embed.prototype.escapeHtml = function(string) {
      var entities;
      entities = {
        "&": "&amp;",
        "<": "&lt;",
        ">": "&gt;",
        '"': '&quot;',
        "'": '&#39;',
        "/": '&#x2F;'
      };
      return String(string).replace(/[&<>"'\/]/g, function(s) {
        return entities[s];
      });
    };

    Embed.prototype.renderIframe = function() {
      var code;
      code = this.escapeHtml(this.input.val());
      console.log(code);
      this.placeholder = $("<div/>", {
        "class": this.classes.placeholder
      }).html(code).appendTo(this.node);
      return this.input.remove();
    };

    return Embed;

  })();

  module.exports = function(redactor) {
    return new Embed(redactor);
  };

}).call(this);
