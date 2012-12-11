gfx =
  init: ->
    canvas = document.querySelector "#game"
    @ctx = canvas?.getContext? "2d"
    return false unless @ctx
    @w = canvas.width
    @h = canvas.height
    true
  clear: ->
    @ctx.clearRect 0, 0, @w, @h
  load: (onload) ->
    @sprites = new Image();
    @sprites.src = "resources/sprites.png"
    @sprites.onload = ->
      onload()
