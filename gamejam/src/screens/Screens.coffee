class Screen
  constructor: ->
  update: ->
  render: (gfx) ->


class GameScreen extends Screen
  levelNumber: 0

  constructor: ->
    @player = new Player()
    @startLevel()

  setPlayer: (x, y, level) ->
    # Set the player to the correct level position
    @player.level = level
    @player.x = x
    @player.y = y

  update: ->
    # Update level, player, and check collisions
    @level.update()
    @player.update()

  startLevel: ->
    @level = new Level levels[@levelNumber], @

  levelComplete: ->
    if ++@levelNumber >= levels.length
      game.win()
    else
      @startLevel()

  render: (gfx) ->
    gfx.ctx.save()

    gfx.ctx.scale 1.3, 1.3

    leftEdge = 210
    offx = if @player.x > leftEdge then -@player.x + leftEdge else 0
    gfx.ctx.translate offx, -@player.y + 130

    @level.render gfx
    @player.render gfx

    gfx.ctx.restore()

    backX = 1 - (@player.x / gfx.w) * 100
    backY = 1 - (@player.y / gfx.h) * 100
    gfx.ctx.canvas.style.backgroundPosition = "#{backX}px #{backY}px"


class TitleScreen extends Screen
  min: 20
  update: ->
    return if @min-- > 0
    game.screen = new GameScreen() if keys.space
  render: (gfx) ->
    c = gfx.ctx
          
    gfx.clear()
    c.drawImage gfx.title, 180, 10

    # Some instructions
    c.fillStyle = "#e0e0e0"
    c.font = "14pt monospace"

    gfx.drawSprite 5, 1, 480, 180

    c.fillText "Collect all \"Pig’s Boffin\" particles.", 50, 210
    c.fillText "Press space to start...", 50, 240 
