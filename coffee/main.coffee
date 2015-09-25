Toolbar 	= require "./modules/toolbar"
Body    	= require "./modules/body"
Slider  	= require "./modules/slider"
DataParser 	= require "./modules/dataparser"

$.fn.redactor = (@options) ->

  @toolbar  = new Toolbar( @ )
  @body     = new Body( @ )
  @slider   = new Slider( @ )

  if @options.data then new DataParser( @, @options.data )
  
  return @