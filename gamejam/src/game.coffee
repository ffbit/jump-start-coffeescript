@game =
  screen: null
  init: ->
    unless gfx.init()
      alert "Sorry, no canvas"
      return
    gfx.load ->
      game.reset()
  stop: -> @running = false
  start: -> @running = true

  reset: ->
    @screen = new TitleScreen()
    keys.reset()
    unless @running
      @start()
      @tick()

  tick: ->
    return unless @running
    @update()
    @render()
    setTimeout (=> @tick()), 33

  update: ->
    @screen.update()

  render: ->
    gfx.clear()
    @screen.render gfx
