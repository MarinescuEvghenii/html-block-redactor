(function() {
  var Component, Image,
    bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

  Component = require("./component");

  Image = (function() {
    Image.prototype.paths = {
      upload: "https://i.simpalsmedia.com/upload/?template=34233a1b243a9132e7b6dccacf42ae1cc5c0eba0cd26b6fb9336f84bb59eed1fE23HJoh5cjm1msz5XtrKLTfqwm6XvnotF7dBm3xTjj2ICS%2FiGoqDPPQco1nMsoNKJLBA34g1UlLfGA8OILUcQwxNxrcXJjFljtlg4HutJ9PSxkKkjH6XUrZhSAaezxaW9GH%2FKYZ9AwH0hB7dSc6v6iQtfAf9lC%2FMIG9AICa1w%2F4%3DOPteuc7aEeUpyV67ojgQHLCO56VneaLj72pIBgRf5uPwqpPSlh8KjptxtdUufU6UVq3n%2BrxqiwP%2BI2saOZXjuAAAClQCd6Hbio8p9%2BfIbgMNui%2FLoG5nRiEy21qmH6toiMfdMjDsLl%2FwX2JMt6wyXKDeRxXsMOGr2PidYuB2zYs%3Dfepku89HLf8jPcgpTBj2T2U6Pylutz%2BQTtuJyrAYzkogvfGT9NpjTMwbot2c93dUo%2FNMviveFb4cCG0Q7ifuPHYCJnX%2F2hIBqeKK6USN%2Fp5IST%2BwROUtYqmIehcrb8h9wmZWPvY5V%2BF7zXW5LHrTjMkgsFOrO6NUVCgJ4mX3Zpc%3D",
      image: "https://i.simpalsmedia.com/sporter.md/posts/thumbs/"
    };

    Image.prototype.classes = {
      main: "redactor__body__component__image",
      img: "redactor__body__component__image__img",
      input: "redactor__body__component__image__input",
      buttons: {
        upload: "redactor__body__component__image__upload"
      }
    };

    function Image(redactor, imgUrl) {
      this.redactor = redactor;
      this.onPaste = bind(this.onPaste, this);
      this.component = new Component(this.redactor);
      this.createNodes();
      this.createEvents();
      if (this.valid(imgUrl)) {
        this.done(imgUrl);
      } else {
        this.error();
      }
    }

    Image.prototype.createNodes = function() {
      this.nodes = {
        main: $("<div/>", {
          "class": this.classes.main
        }),
        input: $("<input>", {
          type: 'text',
          "class": this.classes.input,
          placeholder: "Paste image link here"
        }),
        img: $("<img>", {
          "class": this.classes.img
        }),
        data: $("<input>", {
          type: "hidden",
          name: "image"
        }),
        buttons: {
          upload: $("<button/>", {
            type: 'text',
            "class": this.classes.buttons.upload,
            text: "Upload"
          }),
          file: $("<input>", {
            type: 'file',
            accept: 'image/*',
            title: "Maximum file size 2Mb"
          })
        }
      };
      this.component.nodes.container.append(this.nodes.main);
      this.nodes.input.appendTo(this.nodes.main).focus();
      return this.nodes.buttons.upload.append(this.nodes.buttons.file).appendTo(this.nodes.main);
    };

    Image.prototype.createEvents = function() {
      this.nodes.input.on("paste", (function(_this) {
        return function(event) {
          return setTimeout(_this.onPaste, 100);
        };
      })(this));
      this.nodes.input.on("keydown", function(event) {
        if (event.keyCode === 13) {
          return event.preventDefault();
        }
      });
      return this.nodes.buttons.file.on("change", (function(_this) {
        return function(event) {
          return _this.upload();
        };
      })(this));
    };

    Image.prototype.onPaste = function() {
      var url;
      url = this.nodes.input.val();
      if (this.valid(url)) {
        return this.done(url);
      } else {
        return this.error();
      }
    };

    Image.prototype.valid = function(url) {
      var regex;
      regex = /^https?:\/\/(?:[a-z\-]+\.)+[a-z]{2,6}(?:\/[^\/#?]+)+\.(?:jpe?g|gif|png)$/;
      return regex.test(url);
    };

    Image.prototype.done = function(url) {
      this.nodes.img.attr("src", url);
      this.nodes.data.val(url);
      this.nodes.main.append(this.nodes.img, this.nodes.data);
      this.nodes.input.remove();
      this.nodes.buttons.upload.remove();
      return this.component.done();
    };

    Image.prototype.error = function() {
      return this.component.error();
    };

    Image.prototype.upload = function() {
      var formData;
      this.component.loading();
      formData = new FormData();
      formData.append('file', this.nodes.buttons.file[0].files[0]);
      if (this.xhr) {
        this.xhr.abort();
      }
      return this.xhr = $.ajax({
        url: this.paths.upload,
        type: 'POST',
        data: formData,
        processData: false,
        contentType: false,
        success: (function(_this) {
          return function(result) {
            if (result.success) {
              return _this.done(_this.paths.image + result.id + ".jpg");
            } else {
              return _this.component.error();
            }
          };
        })(this),
        error: (function(_this) {
          return function() {
            return _this.component.error();
          };
        })(this)
      });
    };

    return Image;

  })();

  module.exports = Image;

}).call(this);
