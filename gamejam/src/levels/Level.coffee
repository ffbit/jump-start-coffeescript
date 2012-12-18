class Level
  w: 0
  h: 0
  treasures: 0
  ninjas: []
  constructor: (level, @game) ->
    @load level

    # 
    @addNinja 1, 1
    ninja = @ninjas[0]
    console.log  "Ninja 1 at: #{ninja.x}, #{ninja.y}"
  load: (level) ->
    # 1. Clear level items
    @ninjas = []
    @treasures = 0
    # 2. Parse the level string into a map
    asciiMap = (row.split "" \
      for row in level.data.split "\n")
    # 3. Loop over the map and create the blocks
    @map = for col, x in row
      switch col
        when "@" then new Dirt()
        when "X"
          @addNinja x, y
          new Block()
        else new Block()

    # 4. Set the level height and width
    @h = @map.length
    @w = @map[0].length
  addNinja: (x, y) ->
    xPos = x * gfx.tileW
    yPos = y * gfx.tileH
    ninja = new Ninja @, xPos, yPos
    @ninjas.push ninja
  update: ->
    # Update the level blocks
    for row in @map
      for block in row
        block.update()

    ninja.update() for ninja in @ninjas
  render: (gfx) ->
    # Render the level block
    for row, y in @map
      for block, x in row
        block.render gfx, x * gfx.tileW, y * gfx.tileH

    ninja.render gfx for ninja in @ninjas
