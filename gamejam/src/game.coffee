game =
  init: ->
    unless gfx.init()
      alert "Could not set up game canvas!" 
      return # abort the game

    # Ready to play!
    gfx.clear()

# Start the game running
game.init()

fillAndStrokeARectangle = ->
  c = gfx.ctx
  c.fillStyle = "orange"
  c.fillRect 10, 10, 300, 80

fillAndStrokeARectangle()
