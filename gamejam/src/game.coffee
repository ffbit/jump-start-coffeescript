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
      for y in [0..19]
        for x in [0..23]
          col = rand 7
          row = rand 2
          gfx.drawSprite col, row,
                         x * gfx.tileSize, y * gfx.tileSize

# Start the game running
game.init()
