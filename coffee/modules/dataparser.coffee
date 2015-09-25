Video      = require "./video"
TextEditor = require "./texteditor"
Embed      = require "./embed"
Image      = require "./image"
Audio      = require "./audio"
Map        = require "./map"

class DataParser
	constructor: ( @redactor, @data ) ->
		
		for item in @data.slice(0).reverse()
			if item.name == "richtext"
				new TextEditor( @redactor, item.value )

			else if item.name == "image"
				new Image( @redactor, item.value )

			else if item.name == "video"
				new Video( @redactor, item.value )

			else if item.name == "audio"
				new Audio( @redactor, item.value )

			else if item.name == "map"
				new Map( @redactor, item.value )

module.exports = DataParser