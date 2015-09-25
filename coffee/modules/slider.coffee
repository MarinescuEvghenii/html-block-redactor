class Slider
  classes:
    main      : "redactor__body__slider"
    slide     : "redactor__body__slider__slide"
    container : "redactor__body__slider__container"

    buttons:
      forw: "redactor__body__slider__next ion-chevron-right"
      back: "redactor__body__slider__prev ion-chevron-left"

  slides: [
    {
      icon: "ion-edit"
      headding: "Html redacor"
      decription: "There is no need to compromise. Redactor allows you to save both time and money."

    }
    {
      icon: "ion-images"
      headding: "Upload images"
      decription: "There is no need to compromise. Redactor allows you to save both time and money."
    }
    {
      icon: "ion-ios-videocam"
      headding: "Insert video"
      decription: "There is no need to compromise. Redactor allows you to save both time and money."
    }
    {
      icon: "ion-mic-a"
      headding: "Insert audio"
      decription: "There is no need to compromise. Redactor allows you to save both time and money."
    }
    {
      icon: "ion-ios-location"
      headding: "Add location"
      decription: "There is no need to compromise. Redactor allows you to save both time and money."
    }
  ]

  constructor: ( @redactor ) ->
    @current    = 0
    @main       = $( "<div/>" , {class: @classes.main } ).appendTo( @redactor.body.main )
    @container  = $( "<div/>" , {class: @classes.container } ).appendTo( @main )
    @forw       = $( "<button/>" , {class: @classes.buttons.forw } ).appendTo( @main )
    @back       = $( "<button/>" , {class: @classes.buttons.back } ).appendTo( @main  )
    
    @createSlides()
    @createEvents()

  createEvents: ->
    @forw.on "click", ( event ) =>
      event.preventDefault()
      @moveForw()

    @back.on "click", ( event ) =>
      event.preventDefault()
      @moveBack()

  createSlides: ->
    for slide, index in @slides
      $slide     = $( "<div/>",{class: @classes.slide} )
      icon       = $( "<i/>",  {class: slide.icon })
      headding   = $( "<h2/>", {text:  slide.headding })
      decription = $( "<p/>", {text:  slide.decription })

      $slide.append(icon, headding, decription ).appendTo( @container )

  moveForw: ->
    if @current < @slides.length - 1
      @current++
      @container.css( "left": - ( 100 * @current ) + "%" )

  moveBack: ->
    if @current > 0
      @current--
      @container.css( "left": - ( 100 * @current ) + "%")

  hide: ->
    @main.hide()
   
module.exports = Slider

  
