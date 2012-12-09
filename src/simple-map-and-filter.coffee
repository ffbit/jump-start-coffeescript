[45, 135, 225, 315].map (degrees) ->
    degrees * (Math.PI / 180)
  .filter (radians) ->
    radians % (2 * Math.PI) < Math.PI
