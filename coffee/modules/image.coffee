Component = require "./component"

class Image
  paths:
    upload: "https://i.simpalsmedia.com/upload/?template=34233a1b243a9132e7b6dccacf42ae1cc5c0eba0cd26b6fb9336f84bb59eed1fE23HJoh5cjm1msz5XtrKLTfqwm6XvnotF7dBm3xTjj2ICS%2FiGoqDPPQco1nMsoNKJLBA34g1UlLfGA8OILUcQwxNxrcXJjFljtlg4HutJ9PSxkKkjH6XUrZhSAaezxaW9GH%2FKYZ9AwH0hB7dSc6v6iQtfAf9lC%2FMIG9AICa1w%2F4%3DOPteuc7aEeUpyV67ojgQHLCO56VneaLj72pIBgRf5uPwqpPSlh8KjptxtdUufU6UVq3n%2BrxqiwP%2BI2saOZXjuAAAClQCd6Hbio8p9%2BfIbgMNui%2FLoG5nRiEy21qmH6toiMfdMjDsLl%2FwX2JMt6wyXKDeRxXsMOGr2PidYuB2zYs%3Dfepku89HLf8jPcgpTBj2T2U6Pylutz%2BQTtuJyrAYzkogvfGT9NpjTMwbot2c93dUo%2FNMviveFb4cCG0Q7ifuPHYCJnX%2F2hIBqeKK6USN%2Fp5IST%2BwROUtYqmIehcrb8h9wmZWPvY5V%2BF7zXW5LHrTjMkgsFOrO6NUVCgJ4mX3Zpc%3D"
    image : "https://i.simpalsmedia.com/sporter.md/posts/thumbs/"
  
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

  
