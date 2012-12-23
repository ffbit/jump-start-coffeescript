class Ninja extends Entity
  speed: 3
  time: 0
  state: "CRUISING"
  subState: "IDLE"
  constructor: (level, x, y, @player) ->
    super level, x, y
  render: ->
    gfx.drawSprite 0, 1, @x, @y
  update: ->
    [xo, yo] = if @falling then [0, 0] else 
      {x: px, y: py} = @player
      switch @state
        when "CRUISING" then @cruise px, py
        when "HUNTING"  then @hunt px, py

    @move xo, yo
  cruise: (px, py) ->
    x = y = 0

    # Do cruising logic
    switch @subState
      when "RIGHT"
        x += @speed
        @dir = "RIGHT"
      when "LEFT"
        x -= @speed
        @dir = "LEFT"

    if --@time < 0
      newMode = utils.rand 5
      @time = utils.rand 20, 40
      @subState = switch newMode
                    when 1, 0 then "LEFT"
                    when 2, 3 then "RIGHT"
                    else "IDLE"

    # Just touched a ladder
    if @onLadder and not @wasOnLadder
      @state = "HUNTING" if py = @y

    [x, y]
  hunt: (px, py) ->
    x = y = 0
    # Do hunting logic
