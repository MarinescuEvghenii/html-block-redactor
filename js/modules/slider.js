(function() {
  var Slider;

  Slider = (function() {
    Slider.prototype.classes = {
      main: "redactor__body__slider",
      slide: "redactor__body__slider__slide",
      container: "redactor__body__slider__container",
      buttons: {
        forw: "redactor__body__slider__next ion-chevron-right",
        back: "redactor__body__slider__prev ion-chevron-left"
      }
    };

    Slider.prototype.slides = [
      {
        icon: "ion-edit",
        headding: "Html redacor",
        decription: "There is no need to compromise. Redactor allows you to save both time and money."
      }, {
        icon: "ion-images",
        headding: "Upload images",
        decription: "There is no need to compromise. Redactor allows you to save both time and money."
      }, {
        icon: "ion-ios-videocam",
        headding: "Insert video",
        decription: "There is no need to compromise. Redactor allows you to save both time and money."
      }, {
        icon: "ion-mic-a",
        headding: "Insert audio",
        decription: "There is no need to compromise. Redactor allows you to save both time and money."
      }, {
        icon: "ion-ios-location",
        headding: "Add location",
        decription: "There is no need to compromise. Redactor allows you to save both time and money."
      }
    ];

    function Slider(redactor) {
      this.redactor = redactor;
      this.current = 0;
      this.main = $("<div/>", {
        "class": this.classes.main
      }).appendTo(this.redactor.body.main);
      this.container = $("<div/>", {
        "class": this.classes.container
      }).appendTo(this.main);
      this.forw = $("<button/>", {
        "class": this.classes.buttons.forw
      }).appendTo(this.main);
      this.back = $("<button/>", {
        "class": this.classes.buttons.back
      }).appendTo(this.main);
      this.createSlides();
      this.createEvents();
    }

    Slider.prototype.createEvents = function() {
      this.forw.on("click", (function(_this) {
        return function(event) {
          event.preventDefault();
          return _this.moveForw();
        };
      })(this));
      return this.back.on("click", (function(_this) {
        return function(event) {
          event.preventDefault();
          return _this.moveBack();
        };
      })(this));
    };

    Slider.prototype.createSlides = function() {
      var $slide, decription, headding, i, icon, index, len, ref, results, slide;
      ref = this.slides;
      results = [];
      for (index = i = 0, len = ref.length; i < len; index = ++i) {
        slide = ref[index];
        $slide = $("<div/>", {
          "class": this.classes.slide
        });
        icon = $("<i/>", {
          "class": slide.icon
        });
        headding = $("<h2/>", {
          text: slide.headding
        });
        decription = $("<p/>", {
          text: slide.decription
        });
        results.push($slide.append(icon, headding, decription).appendTo(this.container));
      }
      return results;
    };

    Slider.prototype.moveForw = function() {
      if (this.current < this.slides.length - 1) {
        this.current++;
        return this.container.css({
          "left": -(100 * this.current) + "%"
        });
      }
    };

    Slider.prototype.moveBack = function() {
      if (this.current > 0) {
        this.current--;
        return this.container.css({
          "left": -(100 * this.current) + "%"
        });
      }
    };

    Slider.prototype.hide = function() {
      return this.main.hide();
    };

    return Slider;

  })();

  module.exports = Slider;

}).call(this);
