(function() {
  var Tips;

  Tips = (function() {
    Tips.prototype.classes = {
      node: "redactor__body__tips"
    };

    function Tips(redactor) {
      this.redactor = redactor;
      this.node = $("<div/>", {
        "class": this.classes.node
      }).appendTo(this.redactor.body.main);
    }

    return Tips;

  })();

  module.exports = Tips;

}).call(this);
