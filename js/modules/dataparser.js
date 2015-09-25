(function() {
  var Audio, DataParser, Embed, Image, Map, TextEditor, Video;

  Video = require("./video");

  TextEditor = require("./texteditor");

  Embed = require("./embed");

  Image = require("./image");

  Audio = require("./audio");

  Map = require("./map");

  DataParser = (function() {
    function DataParser(redactor, data) {
      var i, item, len, ref;
      this.redactor = redactor;
      this.data = data;
      ref = this.data.slice(0).reverse();
      for (i = 0, len = ref.length; i < len; i++) {
        item = ref[i];
        if (item.name === "richtext") {
          new TextEditor(this.redactor, item.value);
        } else if (item.name === "image") {
          new Image(this.redactor, item.value);
        } else if (item.name === "video") {
          new Video(this.redactor, item.value);
        } else if (item.name === "audio") {
          new Audio(this.redactor, item.value);
        } else if (item.name === "map") {
          new Map(this.redactor, item.value);
        }
      }
    }

    return DataParser;

  })();

  module.exports = DataParser;

}).call(this);
