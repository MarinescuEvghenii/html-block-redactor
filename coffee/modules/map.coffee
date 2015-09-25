Component = require "./component"

class Map

  classes:
    main        : "redactor__body__component__map"
    search      : "redactor__body__component__map__search"
    canvas      : "redactor__body__component__map__canvas"

  constructor: ( @redactor, initdata ) ->
    @component = new Component( @redactor )
    
    @initdata = JSON.parse( initdata )
    @data     = {}
    @markers  = []
    @createNodes()
    @loadGoogleApi()

  loadGoogleApi: ->
    if !window.google 
      $.getScript("https://maps.googleapis.com/maps/api/js?v=3.exp&signed_in=true&libraries=places&callback=onGoogleMapApiReady")

      window.onGoogleMapApiReady = =>
        @init()
    
    else
      @init()


  init: ->
    
    options = 
      scrollwheel       : false
      streetViewControl : false  
      mapTypeId         : google.maps.MapTypeId.ROADMAP

    window.map = @map = new google.maps.Map( @nodes.canvas.get(0), options );

    @fitBounds()
    @creataSearchBox()
    @createEvents()

  fitBounds: ->
    defaultBounds = new google.maps.LatLngBounds(
      new google.maps.LatLng(47.10517333842259, 28.606881182922393),
      new google.maps.LatLng(46.91789761539953, 29.11911873175052)
    )

    bounds = new google.maps.LatLngBounds(
      new google.maps.LatLng(@initdata.bounds.southWest.lat, @initdata.bounds.southWest.lng),
      new google.maps.LatLng(@initdata.bounds.northEast.lat, @initdata.bounds.northEast.lng)
    )

    bounds = $.extend(defaultBounds, bounds)
  
    @map.fitBounds( bounds )

  creataSearchBox: ->
    @map.controls[google.maps.ControlPosition.TOP_LEFT].push(@nodes.search.get(0));
    @searchBox = new google.maps.places.SearchBox((@nodes.search.get(0)))

  placeChange: =>
    places = @searchBox.getPlaces()

    if places.length == 0 then return

    for marker in @markers
      marker.setMap(null);

    @markers = []

    bounds = new google.maps.LatLngBounds()
    
    for place in places
      markerOptions =
        map: @map
        title: place.name
        position: place.geometry.location
      
      marker = new google.maps.Marker( markerOptions )

      @markers.push( marker )

      bounds.extend( place.geometry.location )

    @map.fitBounds(bounds)

    @data.markers = []
    for marker in @markers
      item = 
        lat: marker.position.lat()
        lng: marker.position.lng()
      
      @data.markers.push( item )
    @nodes.data.val( JSON.stringify( @data ) )

  typeChanged: =>
    @data.mapType = @map.getMapTypeId()
    @nodes.data.val( JSON.stringify( @data ) )

  boundsChanged: =>
    bounds = @map.getBounds();
    @searchBox.setBounds(bounds);

    @data.bounds =
      northEast: 
        lat: bounds.getNorthEast().lat()
        lng: bounds.getNorthEast().lng()
      
      southWest: 
        lat: bounds.getSouthWest().lat()
        lng: bounds.getSouthWest().lng()

    @nodes.data.val( JSON.stringify( @data ) )

  centerChanged: =>


  createNodes: ->
    @nodes =
      main   : $( "<div/>" , {class: @classes.main} )
      canvas : $( "<div/>" , {class: @classes.canvas} )
      search : $( "<input>", {type: 'text', class: @classes.search, placeholder:"Map search"} )
      data   : $( "<input>", {type: 'hidden', name: "map"})

    @nodes.main.appendTo( @component.nodes.container )
    @nodes.canvas.appendTo( @nodes.main )
    @nodes.search.appendTo( @nodes.main )
    @nodes.data.appendTo( @nodes.main )

  createEvents: ->
    google.maps.event.addListener( @map, 'center_changed', @centerChanged)
    google.maps.event.addListener( @map, 'bounds_changed', @boundsChanged)
    google.maps.event.addListener( @map, 'maptypeid_changed', @typeChanged)
    google.maps.event.addListener( @searchBox, 'places_changed', @placeChange )

    @nodes.search.on "keydown", ( event ) ->
      if event.keyCode == 13 then event.preventDefault()

module.exports = Map