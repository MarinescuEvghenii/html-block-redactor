(function() {
  var Body;

  Body = (function() {
    Body.prototype.classes = {
      main: "redactor__body",
      container: "redactor__body__container",
      dropPlaceholder: "redactor__body__drop-placeholder"
    };

    function Body(redactor1) {
      this.redactor = redactor1;
      this.main = $("<div/>", {
        "class": this.classes.main
      }).appendTo(this.redactor);
      this.container = $("<div/>", {
        "class": this.classes.container
      }).appendTo(this.main);
      this.container.sortable({
        handle: ".redactor-sort-handle",
        axis: "y",
        placeholder: this.classes.dropPlaceholder,
        start: function(e, ui) {
          return ui.placeholder.height(ui.item.height());
        }
      });
    }

    return Body;

  })();

  module.exports = function(redactor) {
    return new Body(redactor);
  };

}).call(this);
