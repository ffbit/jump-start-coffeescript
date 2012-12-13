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
      for y in [0...20]
        for x in [0...24]
          col = rand 7
          row = rand 2
          gfx.drawSprite col, row,
                         x * gfx.tileW, y * gfx.tileH

# Start the game running
game.init()

# Some CoffeeScript examples
square = (x) -> x * x

distance = (x1, y1, x2, y2) ->
  Math.sqrt square(x1 - x2) + square(y1 - y2)

test = -> alert distance(2, 3, 5, 5)

test()
