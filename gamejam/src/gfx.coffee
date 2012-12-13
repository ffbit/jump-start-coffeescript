gfx =
  tileW: 24
  tileH: 24
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
  drawSprite: (col, row, x, y) ->
    @ctx.drawImage @sprites,
                   col * @tileW, row * @tileH,
                   @tileW, @tileH,
                   x, y,
                   @tileW, @tileH
  drawSpriteFancy: (col, row, x, y, w, h, scale) ->

