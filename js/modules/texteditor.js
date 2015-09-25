(function() {
  var Component, MediumEditor, TextEditor;

  Component = require("./component");

  MediumEditor = require("medium-editor");

  TextEditor = (function() {
    TextEditor.prototype.classes = {
      main: "redactor__body__component__text-editor",
      input: "redactor__body__component__text-editor__input"
    };

    function TextEditor(redactor, data) {
      this.redactor = redactor;
      this.data = data;
      this.component = new Component(this.redactor);
      this.createNodes();
      this.initEditor();
    }

    TextEditor.prototype.createNodes = function() {
      this.nodes = {
        main: $("<div/>", {
          "class": this.classes.node
        }),
        input: $("<textarea/>", {
          "class": this.classes.input,
          placeholder: "Type your text here",
          contentEditable: "true",
          name: "richtext",
          text: this.data
        })
      };
      this.component.nodes.container.append(this.nodes.main);
      return this.nodes.input.appendTo(this.nodes.main);
    };

    TextEditor.prototype.initEditor = function() {
      var options;
      options = {
        placeholder: {
          text: this.nodes.input.attr("placeholder")
        },
        toolbar: {
          buttons: ['h2', 'h3', 'bold', 'italic', 'underline', 'quote', 'anchor']
        }
      };
      return this.editor = new MediumEditor(this.nodes.input, options);
    };

    return TextEditor;

  })();

  module.exports = TextEditor;

}).call(this);
