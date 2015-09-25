(function() {
  var Audio, Embed, Image, Map, TextEditor, Toolbar, Video;

  Video = require("./video");

  TextEditor = require("./texteditor");

  Embed = require("./embed");

  Image = require("./image");

  Audio = require("./audio");

  Map = require("./map");

  Toolbar = (function() {
    Toolbar.prototype.classes = {
      toolbar: "redactor__toolbar",
      buttonVideo: "redactor__toolbar__button redactor__toolbar__button-video ion-ios-videocam",
      buttonAudio: "redactor__toolbar__button redactor__toolbar__button-audio ion-mic-a",
      buttonText: "redactor__toolbar__button redactor__toolbar__button-text ion-edit",
      buttonEmbed: "redactor__toolbar__button redactor__toolbar__button-embed ion-code",
      buttonImage: "redactor__toolbar__button redactor__toolbar__button-image ion-images",
      buttonMap: "redactor__toolbar__button redactor__toolbar__button-map ion-ios-location"
    };

    function Toolbar(redactor) {
      this.redactor = redactor;
      this.toolbar = $("<div/>", {
        "class": this.classes.toolbar
      }).appendTo(this.redactor);
      this.buttonText = $("<button/>", {
        "class": this.classes.buttonText,
        text: "Text",
        tabindex: -1
      }).appendTo(this.toolbar);
      this.buttonImage = $("<button/>", {
        "class": this.classes.buttonImage,
        text: "Image",
        tabindex: -1
      }).appendTo(this.toolbar);
      this.buttonVideo = $("<button/>", {
        "class": this.classes.buttonVideo,
        text: "Video",
        tabindex: -1
      }).appendTo(this.toolbar);
      this.buttonAudio = $("<button/>", {
        "class": this.classes.buttonAudio,
        text: "Audio",
        tabindex: -1
      }).appendTo(this.toolbar);
      this.buttonMap = $("<button/>", {
        "class": this.classes.buttonMap,
        text: "Map",
        tabindex: -1
      }).appendTo(this.toolbar);
      this.events();
    }

    Toolbar.prototype.events = function() {
      this.buttonVideo.on("click", (function(_this) {
        return function(event) {
          event.preventDefault();
          return new Video(_this.redactor);
        };
      })(this));
      this.buttonText.on("click", (function(_this) {
        return function(event) {
          event.preventDefault();
          return new TextEditor(_this.redactor);
        };
      })(this));
      this.buttonImage.on("click", (function(_this) {
        return function(event) {
          event.preventDefault();
          return new Image(_this.redactor);
        };
      })(this));
      this.buttonAudio.on("click", (function(_this) {
        return function(event) {
          event.preventDefault();
          return new Audio(_this.redactor);
        };
      })(this));
      return this.buttonMap.on("click", (function(_this) {
        return function(event) {
          event.preventDefault();
          return new Map(_this.redactor);
        };
      })(this));
    };

    return Toolbar;

  })();

  module.exports = Toolbar;

}).call(this);
