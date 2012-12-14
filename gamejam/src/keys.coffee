keys =
  up:    false
  down:  false
  left:  false
  right: false
  space: false

  reset: -> 
    @up = @down = @left = @right = @space = false

  trigger: (keyCode, isDown) ->
    # Handle the key event

