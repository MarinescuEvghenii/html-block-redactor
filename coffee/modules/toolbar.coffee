Video      = require "./video"
TextEditor = require "./texteditor"
Embed      = require "./embed"
Image      = require "./image"
Audio      = require "./audio"
Map        = require "./map"


class Toolbar
  classes:
    toolbar       : "redactor__toolbar"
    buttonVideo   : "redactor__toolbar__button redactor__toolbar__button-video ion-ios-videocam"
    buttonAudio   : "redactor__toolbar__button redactor__toolbar__button-audio ion-mic-a"
    buttonText    : "redactor__toolbar__button redactor__toolbar__button-text ion-edit"
    buttonEmbed   : "redactor__toolbar__button redactor__toolbar__button-embed ion-code"
    buttonImage   : "redactor__toolbar__button redactor__toolbar__button-image ion-images"
    buttonMap     : "redactor__toolbar__button redactor__toolbar__button-map ion-ios-location"


  constructor: ( @redactor ) ->

    @toolbar     = $("<div/>"   , {class: @classes.toolbar}).appendTo(@redactor)
    @buttonText  = $("<button/>", {class: @classes.buttonText,  text: "Text", tabindex: -1}).appendTo(@toolbar)
    @buttonImage = $("<button/>", {class: @classes.buttonImage, text: "Image", tabindex: -1}).appendTo(@toolbar)
    @buttonVideo = $("<button/>", {class: @classes.buttonVideo, text: "Video", tabindex: -1}).appendTo(@toolbar)
    @buttonAudio = $("<button/>", {class: @classes.buttonAudio, text: "Audio", tabindex: -1}).appendTo(@toolbar)
    @buttonMap   = $("<button/>", {class: @classes.buttonMap,   text: "Map", tabindex: -1}).appendTo(@toolbar)
    # @buttonEmbed = $("<button/>", {class: @classes.buttonEmbed, text: "Embed"}).appendTo(@toolbar)

    @events()

  events: ->

    @buttonVideo.on "click", (event) =>
      event.preventDefault()
      new Video( @redactor )


    @buttonText.on "click", (event) =>
      event.preventDefault()
      new TextEditor( @redactor )

    @buttonImage.on "click", (event) =>
      event.preventDefault()
      new Image( @redactor )

    @buttonAudio.on "click", (event) =>
      event.preventDefault()
      new Audio( @redactor )

    @buttonMap.on "click", (event) =>
      event.preventDefault()
      new Map( @redactor )


module.exports = Toolbar