ctx = document.getElementById("game")
  .getContext "2d"

canvas = ctx.canvas
ctx.fillStyle = "#000"
ctx.fillRect 0, 0, canvas.width, canvas.height
