class Ninja extends Entity
  speed: 3
  state: "CRUISING"
  subState: "IDLE"
  constructor: (level, x, y, @player) ->
    super level, x, y
  render: ->
    gfx.drawSprite 0, 1, @x, @y
  cruise: (px, py) ->
    x = y = 0
    # Do cruising logic
    [x, y]
  hunt: (px, py) ->
    x = y = 0
    # Do hunting logic
