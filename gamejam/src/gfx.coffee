gfx =
  init: ->
    canvasDOM = document.getElementById "game"
    @ctx = canvasDOM.getContext "2d" if canvasDOM != null
    return @ctx != null
