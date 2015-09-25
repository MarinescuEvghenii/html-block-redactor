class Body
  classes:
    main       		  : "redactor__body"
    container       : "redactor__body__container"
    dropPlaceholder : "redactor__body__drop-placeholder"

  constructor: ( @redactor ) ->

    @main      = $( "<div/>", { class: @classes.main }).appendTo( @redactor )
    @container = $( "<div/>", { class: @classes.container }).appendTo( @main )
   	
   	@container.sortable(
   		handle 	: ".redactor-sort-handle"
   		axis 		: "y"
   		placeholder : @classes.dropPlaceholder
   		start 		: (e, ui) -> ui.placeholder.height( ui.item.height() )
   	)

module.exports = ( redactor ) -> new Body( redactor )