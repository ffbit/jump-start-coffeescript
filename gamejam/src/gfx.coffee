gfx =
  init: ->
    canvas = canvas ? document.querySelector "#game"
    @ctx = canvas?.getContext? "2d"
    @ctx?
