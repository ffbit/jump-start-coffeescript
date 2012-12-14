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
      # gfx.drawSprite 0, 0, 50, 50

      makeLevel = (ascii) ->
        # 1. Define the tile-to-symbol map
        tiles =
          "@": [4, 1]
          "O": [4, 0]
          "*": [5, 1]
          "#": [5, 0]
        # 2. Cut up the ASCII
        asciiMap = (row.split "" for row in ascii.split "\n")
        # 3. Map the character to their tiles
        (for row in asciiMap
          for col in row
            tiles[col])

      level1 = """
        .............
        ...........*.
        ....@#@@@@#@.
        .....#....#..
        .....#....#..
        ..*..#...@@@.
        ..@@@@@...#..
        ...#......#..
        ...#......#..
        ...#......#..
        .OOOOOOOOOOOO
      """

      # Create a map from the ASCII
      level = makeLevel level1

      setInterval ->
        # run the things
        player.update()

        gfx.clear()

        # Draw the level
        for row, y in level
          for tile, x in row
            continue unless tile
            xPos = x * gfx.tileW
            yPos = y * gfx.tileH
            gfx.drawSprite tile[0], tile[1],
                           xPos, yPos

        player.render gfx
      , 33

# Start the game running
game.init()
