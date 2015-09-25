Component = require "./component"

class Audio
  classes:
    node     : "redactor__body__component__audio"
    input    : "redactor__body__component__audio__input"
    iframe   : "redactor__body__component__audio__iframe"

  constructor: ( @redactor, url ) ->
    @component = new Component( @redactor )

    @createNodes()
    @createEvents()

    if @valid( url ) then @loadContent( url ) else @component.error()

  createNodes: ->
    @nodes =
      main  : $( "<div/>" , {class: @classes.node} )
      input : $( "<input>", {type: 'text', class: @classes.input, placeholder: "Type your link here"} )
      data  : $( "<input>", {type: "hidden", name: "audio" } )

    @nodes.main.appendTo( @component.nodes.container )
    @nodes.input.appendTo( @nodes.main ).focus()
    @nodes.data.appendTo( @nodes.main )

  createEvents: ->
    @nodes.input.on "paste", ( event ) =>
      setTimeout( @onPaste, 100 )

    @nodes.input.on "keydown", ( event ) ->
      if event.keyCode == 13 then event.preventDefault()

  onPaste: =>
    url = @nodes.input.val()
    if @valid( url ) then @loadContent( url ) else @component.error()

  valid: ( url ) ->
    soundcloud = /https?:\/\/(?:www\.)?(?:soundcloud.com\/)(?:(?:[A-z0-9-]+\/)(?:[A-z0-9-]+)\/?)*/
    return soundcloud.test( url )

  loadContent: ( url ) ->
    @component.loading()
    $.ajax
      url: "https://soundcloud.com/oembed"
      data: 
        url: url
        format: "json"

      success: ( result ) =>
        @nodes.iframe = $( result.html ).appendTo(@nodes.main).addClass(@classes.iframe)
        @nodes.data.val( url )
        @done()

      error: =>
        @component.error()


  done:  ->
    @nodes.input.remove()
    @component.done()

module.exports = Audio