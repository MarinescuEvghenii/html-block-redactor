(function() {
  var Component, Map,
    bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

  Component = require("./component");

  Map = (function() {
    Map.prototype.classes = {
      main: "redactor__body__component__map",
      search: "redactor__body__component__map__search",
      canvas: "redactor__body__component__map__canvas"
    };

    function Map(redactor, initdata) {
      this.redactor = redactor;
      this.centerChanged = bind(this.centerChanged, this);
      this.boundsChanged = bind(this.boundsChanged, this);
      this.typeChanged = bind(this.typeChanged, this);
      this.placeChange = bind(this.placeChange, this);
      this.component = new Component(this.redactor);
      this.initdata = JSON.parse(initdata);
      this.data = {};
      this.markers = [];
      this.createNodes();
      this.loadGoogleApi();
    }

    Map.prototype.loadGoogleApi = function() {
      if (!window.google) {
        $.getScript("https://maps.googleapis.com/maps/api/js?v=3.exp&signed_in=true&libraries=places&callback=onGoogleMapApiReady");
        return window.onGoogleMapApiReady = (function(_this) {
          return function() {
            return _this.init();
          };
        })(this);
      } else {
        return this.init();
      }
    };

    Map.prototype.init = function() {
      var options;
      options = {
        scrollwheel: false,
        streetViewControl: false,
        mapTypeId: google.maps.MapTypeId.ROADMAP
      };
      window.map = this.map = new google.maps.Map(this.nodes.canvas.get(0), options);
      this.fitBounds();
      this.creataSearchBox();
      return this.createEvents();
    };

    Map.prototype.fitBounds = function() {
      var bounds, defaultBounds;
      defaultBounds = new google.maps.LatLngBounds(new google.maps.LatLng(47.10517333842259, 28.606881182922393), new google.maps.LatLng(46.91789761539953, 29.11911873175052));
      bounds = new google.maps.LatLngBounds(new google.maps.LatLng(this.initdata.bounds.southWest.lat, this.initdata.bounds.southWest.lng), new google.maps.LatLng(this.initdata.bounds.northEast.lat, this.initdata.bounds.northEast.lng));
      bounds = $.extend(defaultBounds, bounds);
      return this.map.fitBounds(bounds);
    };

    Map.prototype.creataSearchBox = function() {
      this.map.controls[google.maps.ControlPosition.TOP_LEFT].push(this.nodes.search.get(0));
      return this.searchBox = new google.maps.places.SearchBox(this.nodes.search.get(0));
    };

    Map.prototype.placeChange = function() {
      var bounds, i, item, j, k, len, len1, len2, marker, markerOptions, place, places, ref, ref1;
      places = this.searchBox.getPlaces();
      if (places.length === 0) {
        return;
      }
      ref = this.markers;
      for (i = 0, len = ref.length; i < len; i++) {
        marker = ref[i];
        marker.setMap(null);
      }
      this.markers = [];
      bounds = new google.maps.LatLngBounds();
      for (j = 0, len1 = places.length; j < len1; j++) {
        place = places[j];
        markerOptions = {
          map: this.map,
          title: place.name,
          position: place.geometry.location
        };
        marker = new google.maps.Marker(markerOptions);
        this.markers.push(marker);
        bounds.extend(place.geometry.location);
      }
      this.map.fitBounds(bounds);
      this.data.markers = [];
      ref1 = this.markers;
      for (k = 0, len2 = ref1.length; k < len2; k++) {
        marker = ref1[k];
        item = {
          lat: marker.position.lat(),
          lng: marker.position.lng()
        };
        this.data.markers.push(item);
      }
      return this.nodes.data.val(JSON.stringify(this.data));
    };

    Map.prototype.typeChanged = function() {
      this.data.mapType = this.map.getMapTypeId();
      return this.nodes.data.val(JSON.stringify(this.data));
    };

    Map.prototype.boundsChanged = function() {
      var bounds;
      bounds = this.map.getBounds();
      this.searchBox.setBounds(bounds);
      this.data.bounds = {
        northEast: {
          lat: bounds.getNorthEast().lat(),
          lng: bounds.getNorthEast().lng()
        },
        southWest: {
          lat: bounds.getSouthWest().lat(),
          lng: bounds.getSouthWest().lng()
        }
      };
      return this.nodes.data.val(JSON.stringify(this.data));
    };

    Map.prototype.centerChanged = function() {};

    Map.prototype.createNodes = function() {
      this.nodes = {
        main: $("<div/>", {
          "class": this.classes.main
        }),
        canvas: $("<div/>", {
          "class": this.classes.canvas
        }),
        search: $("<input>", {
          type: 'text',
          "class": this.classes.search,
          placeholder: "Map search"
        }),
        data: $("<input>", {
          type: 'hidden',
          name: "map"
        })
      };
      this.nodes.main.appendTo(this.component.nodes.container);
      this.nodes.canvas.appendTo(this.nodes.main);
      this.nodes.search.appendTo(this.nodes.main);
      return this.nodes.data.appendTo(this.nodes.main);
    };

    Map.prototype.createEvents = function() {
      google.maps.event.addListener(this.map, 'center_changed', this.centerChanged);
      google.maps.event.addListener(this.map, 'bounds_changed', this.boundsChanged);
      google.maps.event.addListener(this.map, 'maptypeid_changed', this.typeChanged);
      google.maps.event.addListener(this.searchBox, 'places_changed', this.placeChange);
      return this.nodes.search.on("keydown", function(event) {
        if (event.keyCode === 13) {
          return event.preventDefault();
        }
      });
    };

    return Map;

  })();

  module.exports = Map;

}).call(this);
