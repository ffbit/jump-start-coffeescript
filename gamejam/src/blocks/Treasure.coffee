class Treasure extends Block
  touchable: true
  collected: false
  constructor: ->
    @yOff = Math.random() * Math.PI
  update: ->
    @yOff += Math.PI / 24
  render: (gfx, x, y) ->
    ySine = Math.floor Math.sin(@yOff) * 4
    gfx.drawSprite 5, 1, x, y + ySine
