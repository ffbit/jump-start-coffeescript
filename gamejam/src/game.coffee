game =
  init: ->
    alert "Could not set up game canvas!" unless gfx.init()
    return # abort the game

# Start the game running
game.init()
