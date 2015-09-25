class Component
  classes:
    main      : "redactor__body__component"
    menu      : "redactor__body__component__menu"
    container : "redactor__body__component__placeholder"

    buttons :
      delete : "redactor__body__component__menu__button redactor__body__component__menu__button-delete ion-trash-a"
      drag   : "redactor__body__component__menu__button redactor__body__component__menu__button-drag redactor-sort-handle ion-arrow-move"
    
    states :  
      error   : "redactor__component-error"
      done    : "redactor__component-done"
      loading : "redactor__component-loading"


  constructor: ( @redactor ) ->
    @createNodes()
    @createEvents()

  createNodes: ->
    @redactor.slider.main.hide()
    
    @nodes =
      main      : $( "<div/>" , { class: @classes.main } )
      menu      : $( "<div/>" , { class: @classes.menu } )
      container : $( "<div/>" , { class: @classes.container } )
      
      buttons:
        delete : $( "<span/>" , {class: @classes.buttons.delete} )
        drag   : $( "<span/>" , {class: @classes.buttons.drag} )

    @nodes.menu.append( @nodes.buttons.delete, @nodes.buttons.drag )
    @nodes.main.append( @nodes.menu, @nodes.container )
    @redactor.body.container.prepend( @nodes.main )

  createEvents: ->
    @nodes.buttons.delete.on "click", ( event ) =>
      event.preventDefault()
      @nodes.main.remove()
      if @redactor.body.container.children().length == 0 then @redactor.slider.main.show()
      delete @

  error: ->
    @nodes.main.addClass( @classes.states.error ).removeClass( @classes.states.done ).removeClass( @classes.states.loading )

  loading: ->
    @nodes.main.addClass( @classes.states.loading )

  done: ->
    @nodes.main.addClass( @classes.states.done ).removeClass( @classes.states.error ).removeClass( @classes.states.loading )

module.exports = Component