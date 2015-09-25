(function() {
  var Component, Video,
    bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

  Component = require("./component");

  Video = (function() {
    Video.prototype.classes = {
      main: "redactor__body__component__video",
      input: "redactor__body__component__video__input"
    };

    function Video(redactor, url) {
      var media;
      this.redactor = redactor;
      this.onPaste = bind(this.onPaste, this);
      this.component = new Component(this.redactor);
      this.createNodes();
      this.createEvents();
      media = this.parseUrl(url);
      if (media) {
        this.insertMedia(media);
      } else {
        this.error();
      }
    }

    Video.prototype.createNodes = function() {
      this.nodes = {
        main: $("<div/>", {
          "class": this.classes.main
        }),
        input: $("<input>", {
          type: 'text',
          "class": this.classes.input,
          placeholder: "Paste video link here"
        }),
        data: $("<input>", {
          type: "hidden",
          name: "video"
        }),
        iframe: $("<iframe/>", {
          width: "100%",
          height: "100%",
          frameborder: "0",
          allowfullscreen: true
        })
      };
      this.component.nodes.container.append(this.nodes.main);
      return this.nodes.input.appendTo(this.nodes.main).focus();
    };

    Video.prototype.createEvents = function() {
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

    Video.prototype.onPaste = function() {
      var media;
      media = this.parseUrl(this.nodes.input.val());
      if (media) {
        return this.insertMedia(media);
      } else {
        return this.error();
      }
    };

    Video.prototype.parseUrl = function(url) {
      var playmd, vimeo, youtube;
      youtube = /(?:https?:\/\/|www\.|m\.|^)youtu(?:be\.com\/watch\?(?:.*?&(?:amp;)?)?v=|\.be\/)([\w‌​\-]+)(?:&(?:amp;)?[\w\?=]*)?/;
      playmd = /https?:\/\/(?:www\.)?(?:play.md)\/(?:(?:[A-z0-9-]+)\/(?:videos)\/)?([0-9]+)*/;
      vimeo = /https?:\/\/(?:www\.)?(?:vimeo\.com\/)(?:(?:channels\/[A-z]+\/)|(?:groups\/[A-z]+\/videos\/))?([0-9]+)*/;
      if (youtube.test(url)) {
        return {
          "type": "youtube",
          id: url.match(youtube)[1]
        };
      } else if (vimeo.test(url)) {
        return {
          "type": "vimeo",
          id: url.match(vimeo)[1]
        };
      } else if (playmd.test(url)) {
        return {
          "type": "playmd",
          id: url.match(playmd)[1]
        };
      } else {
        return false;
      }
    };

    Video.prototype.insertMedia = function(media) {
      var src;
      if (media.type === "youtube") {
        src = "https://www.youtube.com/embed/" + media.id;
      } else if (media.type === "vimeo") {
        src = "https://player.vimeo.com/video/" + media.id;
      } else if (media.type === "playmd") {
        src = "https://play.md/embed/" + media.id;
      } else {
        return false;
      }
      return this.done(src);
    };

    Video.prototype.error = function() {
      return this.component.error();
    };

    Video.prototype.done = function(src) {
      this.component.done();
      this.nodes.iframe.attr("src", src).appendTo(this.nodes.main);
      this.nodes.data.val(this.nodes.input.val()).appendTo(this.nodes.main);
      return this.nodes.input.remove();
    };

    return Video;

  })();

  module.exports = Video;

}).call(this);
