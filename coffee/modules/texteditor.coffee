Component    = require "./component"
MediumEditor = require "medium-editor"

class TextEditor
  classes:
    main     : "redactor__body__component__text-editor"
    input    : "redactor__body__component__text-editor__input"

  constructor: ( @redactor, @data ) ->

    @component = new Component( @redactor )
    
    @createNodes()
    @initEditor()

  createNodes: ->
    @nodes =
      main  : $( "<div/>" , {class: @classes.node} )
      input : $( "<textarea/>", {class: @classes.input, placeholder:"Type your text here", contentEditable:"true", name:"richtext", text: @data} )
    
    @component.nodes.container.append( @nodes.main )
    @nodes.input.appendTo( @nodes.main )

  initEditor: ->
    options = 
      placeholder: 
        text: @nodes.input.attr("placeholder")
        
      toolbar:
        buttons: ['h2', 'h3', 'bold', 'italic', 'underline', 'quote', 'anchor']

    @editor = new MediumEditor( @nodes.input, options )

module.exports = TextEditor