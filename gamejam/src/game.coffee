game =
  init: ->
    unless gfx.init()
      alert "Could not set up game canvas!" 
      return # abort the game

    # Ready to play!
    gfx.clear()
    gfx.load ->
      c = gfx.ctx
      gfx.drawSprite 0, 0, 100, 50

# Start the game running
game.init()
