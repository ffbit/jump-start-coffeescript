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
  reset: ->
    keys.reset()
    unless @running
      @start()
      @tick()
  tick: ->
    return unless @running
    gfx.clear()
    @update()
    @render()
    setTimeout (-> game.tick()), 33
  update: ->
  render: ->
    # player = new Player null, 50, 50
    # ninja = new Ninja null, 80, 50

    # player.render gfx
    # ninja.render gfx

    # d = new Dirt()
    # d.render gfx, 10, 10

    myLevel = new Level levels[0]
    myLevel.render()
