(function() {
  var Component;

  Component = (function() {
    Component.prototype.classes = {
      main: "redactor__body__component",
      menu: "redactor__body__component__menu",
      container: "redactor__body__component__placeholder",
      buttons: {
        "delete": "redactor__body__component__menu__button redactor__body__component__menu__button-delete ion-trash-a",
        drag: "redactor__body__component__menu__button redactor__body__component__menu__button-drag redactor-sort-handle ion-arrow-move"
      },
      states: {
        error: "redactor__component-error",
        done: "redactor__component-done",
        loading: "redactor__component-loading"
      }
    };

    function Component(redactor) {
      this.redactor = redactor;
      this.createNodes();
      this.createEvents();
    }

    Component.prototype.createNodes = function() {
      this.redactor.slider.main.hide();
      this.nodes = {
        main: $("<div/>", {
          "class": this.classes.main
        }),
        menu: $("<div/>", {
          "class": this.classes.menu
        }),
        container: $("<div/>", {
          "class": this.classes.container
        }),
        buttons: {
          "delete": $("<span/>", {
            "class": this.classes.buttons["delete"]
          }),
          drag: $("<span/>", {
            "class": this.classes.buttons.drag
          })
        }
      };
      this.nodes.menu.append(this.nodes.buttons["delete"], this.nodes.buttons.drag);
      this.nodes.main.append(this.nodes.menu, this.nodes.container);
      return this.redactor.body.container.prepend(this.nodes.main);
    };

    Component.prototype.createEvents = function() {
      return this.nodes.buttons["delete"].on("click", (function(_this) {
        return function(event) {
          event.preventDefault();
          _this.nodes.main.remove();
          if (_this.redactor.body.container.children().length === 0) {
            _this.redactor.slider.main.show();
          }
          return delete _this;
        };
      })(this));
    };

    Component.prototype.error = function() {
      return this.nodes.main.addClass(this.classes.states.error).removeClass(this.classes.states.done).removeClass(this.classes.states.loading);
    };

    Component.prototype.loading = function() {
      return this.nodes.main.addClass(this.classes.states.loading);
    };

    Component.prototype.done = function() {
      return this.nodes.main.addClass(this.classes.states.done).removeClass(this.classes.states.error).removeClass(this.classes.states.loading);
    };

    return Component;

  })();

  module.exports = Component;

}).call(this);
