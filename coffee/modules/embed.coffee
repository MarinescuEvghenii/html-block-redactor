Component = require "./component"

class Embed
  classes:
    node        : "redactor__body__component__embed"
    input       : "redactor__body__component__embed__input"
    placeholder : "redactor__body__component__embed__placeholder"

  constructor: ( @redactor ) ->

    @component = new Component( @redactor )

    @node   = $( "<div/>" , {class: @classes.node} ).appendTo( @component.placeholder )
    @input  = $( "<textarea/>", {type: 'text', class: @classes.input, placeholder:"Type code here"} ).appendTo( @node ).focus()

    @events()

  events: ->
    @input.on "keydown", ( event ) =>
      if event.keyCode == 13 # key press Enter
        event.preventDefault()
        @renderIframe()

  escapeHtml: ( string ) ->
    entities = {
      "&": "&amp;",
      "<": "&lt;",
      ">": "&gt;",
      '"': '&quot;',
      "'": '&#39;',
      "/": '&#x2F;'
    }

    return String(string).replace(/[&<>"'\/]/g, (s) -> 
      return entities[s] )

  renderIframe: ->
    code = @escapeHtml( @input.val() )
    console.log code
    @placeholder = $( "<div/>", {class: @classes.placeholder}).html(code).appendTo( @node )
    @input.remove()

module.exports = ( redactor ) -> new Embed( redactor )