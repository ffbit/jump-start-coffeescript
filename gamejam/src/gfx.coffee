gfx =
  init: ->
    canvas = document.querySelector "#game"
    @ctx = canvas?.getContext? "2d"
    return false unless @ctx
    @w = canvas.width
    @h = canvas.height
    true
