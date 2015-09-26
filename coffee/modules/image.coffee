Component = require "./component"

class Image
  paths:
    upload: ""
    image : ""
  
  classes:
    main  : "redactor__body__component__image"
    img   : "redactor__body__component__image__img"
    input : "redactor__body__component__image__input"

    buttons :
      upload : "redactor__body__component__image__upload"

  constructor: ( @redactor, imgUrl ) ->
    @component = new Component( @redactor )

    @createNodes()
    @createEvents()
    
    if @valid( imgUrl ) then @done( imgUrl ) else @error()

  createNodes: ->
    @nodes =
      main  : $( "<div/>" , {class: @classes.main} )
      input : $( "<input>" , {type: 'text', class: @classes.input, placeholder: "Paste image link here"} )
      img   : $( "<img>" , {class: @classes.img })
      data  : $( "<input>" , {type: "hidden", name: "image" })

      buttons:
        upload : $( "<button/>", {type: 'text', class: @classes.buttons.upload, text:"Upload"} )
        file   : $( "<input>",   {type: 'file', accept: 'image/*', title: "Maximum file size 2Mb"} )

    @component.nodes.container.append( @nodes.main )
    @nodes.input.appendTo( @nodes.main ).focus()
    @nodes.buttons.upload.append( @nodes.buttons.file ).appendTo( @nodes.main )

  createEvents: ->
    @nodes.input.on "paste", ( event ) =>
      setTimeout( @onPaste, 100 )

    @nodes.input.on "keydown", ( event ) ->
      if event.keyCode == 13 then event.preventDefault()

    @nodes.buttons.file.on "change", ( event ) =>
      @upload()

  onPaste: =>
    url = @nodes.input.val()
    if @valid( url ) then @done( url ) else @error()

  valid: ( url ) ->
    regex = /^https?:\/\/(?:[a-z\-]+\.)+[a-z]{2,6}(?:\/[^\/#?]+)+\.(?:jpe?g|gif|png)$/
    return regex.test( url )

  done: ( url ) ->
    @nodes.img.attr( "src", url )
    @nodes.data.val( url )
    @nodes.main.append( @nodes.img, @nodes.data )
    @nodes.input.remove()
    @nodes.buttons.upload.remove()
    @component.done()

  error: ->
    @component.error()

  upload: ->
    @component.loading()

    formData = new FormData()
    formData.append 'file', @nodes.buttons.file[0].files[0]
    
    @xhr.abort() if @xhr
    @xhr =
      $.ajax
        url: @paths.upload
        type: 'POST'
        data: formData
        processData: false
        contentType: false

        success: ( result ) =>
          
          if result.success
            @done( @paths.image + result.id + ".jpg" )
          else
            @component.error()

        error: =>
          @component.error()

module.exports = Image

  
