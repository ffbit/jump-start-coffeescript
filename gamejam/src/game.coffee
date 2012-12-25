game =
  running: false
  init: ->
    unless gfx.init()
      alert "Sorry, no canvas"
      return
    gfx.load ->
      game.reset()
  stop: ->
    @running = false
  start: ->
    @running = true

    # Trying to reach an invalid location
    console.log @level.getBlock -10, 30
  reset: ->
    @player = new Player
    @level = new Level levels[0], @
    keys.reset()
    unless @running
      @start()
      @tick()
  tick: ->
    return unless @running
    gfx.clear()
    @update()
    @render()
    self = @
    setTimeout (=> @tick()), 33
  update: ->
    @level.update()
    @player.update()
  render: ->
    @level.render gfx
    @player.render gfx

    backX = 1 - (@player.x / gfx.w) * 100
    backY = 1 - (@player.y / gfx.h) * 100
    gfx.ctx.canvas.style.backgroundPosition = "#{backX}px #{backY}px"
  setPlayer: (x, y, level) ->
    @player.level = level
    @player.x = x
    @player.y = y
