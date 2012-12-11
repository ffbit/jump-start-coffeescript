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

fillSomeText = ->
  c = gfx.ctx
  c.fillStyle = "#202020"
  c.font = "14pt monospace"
  c.fillText "Professor Digman-Rüdnner", 30, 50

fillAndStrokeARectangle()

fillSomeText()
