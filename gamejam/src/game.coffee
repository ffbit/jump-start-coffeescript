game =
  init: ->
    unless gfx.init()
      alert "Could not set up game canvas!" 
      return # abort the game

    # Ready to play!
    gfx.clear()
    gfx.load ->
      c = gfx.ctx
      rand = (max) ->
        Math.floor Math.random() * max
      gfx.drawSprite 0, 0, 50, 50
      gfx.drawSprite 0, 0, 74, 50, 1, 1, 2

# Start the game running
game.init()
