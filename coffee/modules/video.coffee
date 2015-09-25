Component = require "./component"

class Video
  classes:
    main        : "redactor__body__component__video"
    input       : "redactor__body__component__video__input"
    
  constructor: ( @redactor, url ) ->
    @component = new Component( @redactor )

    @createNodes()
    @createEvents()

    media = @parseUrl( url )
    if media then @insertMedia( media ) else @error()

  createNodes: ->
    @nodes =
      main   : $( "<div/>" , {class: @classes.main} ) #.appendTo( @component.placeholder )
      input  : $( "<input>", {type: 'text', class: @classes.input, placeholder: "Paste video link here"} ) #.appendTo( @node ).focus()
      data   : $( "<input>", {type: "hidden", name: "video" })
      iframe : $( "<iframe/>", { width: "100%", height: "100%", frameborder: "0", allowfullscreen: true })

    @component.nodes.container.append( @nodes.main )
    @nodes.input.appendTo( @nodes.main ).focus()
    

  createEvents: ->
    @nodes.input.on "paste", ( event ) =>
      setTimeout( @onPaste, 100 )

    @nodes.input.on "keydown", ( event ) ->
      if event.keyCode == 13 then event.preventDefault()

  onPaste: =>
    media = @parseUrl( @nodes.input.val() )
    if media then @insertMedia( media ) else @error()
      
  parseUrl: ( url ) ->
    youtube = /(?:https?:\/\/|www\.|m\.|^)youtu(?:be\.com\/watch\?(?:.*?&(?:amp;)?)?v=|\.be\/)([\w‌​\-]+)(?:&(?:amp;)?[\w\?=]*)?/
    playmd  = /https?:\/\/(?:www\.)?(?:play.md)\/(?:(?:[A-z0-9-]+)\/(?:videos)\/)?([0-9]+)*/
    vimeo   = /https?:\/\/(?:www\.)?(?:vimeo\.com\/)(?:(?:channels\/[A-z]+\/)|(?:groups\/[A-z]+\/videos\/))?([0-9]+)*/
    
    if youtube.test( url )
      return {"type": "youtube", id: url.match( youtube )[1] }
    
    else if vimeo.test( url )
      return {"type": "vimeo", id: url.match( vimeo )[1] }

    else if playmd.test( url )
      return {"type": "playmd", id: url.match( playmd )[1] }

    else return false

  insertMedia: ( media ) ->
    if media.type == "youtube"
      src = "https://www.youtube.com/embed/#{media.id}"

    else if media.type == "vimeo"
      src = "https://player.vimeo.com/video/#{media.id}"

    else if media.type == "playmd"
      src = "https://play.md/embed/#{media.id}"

    else return false
    
    @done( src )

  error: ->
    @component.error()

  done: ( src ) ->
    @component.done()
    @nodes.iframe.attr( "src", src ).appendTo( @nodes.main )
    @nodes.data.val( @nodes.input.val() ).appendTo( @nodes.main )
    @nodes.input.remove()

module.exports = Video

  