class Entity
  x: 0
  y: 0
  w: 18
  h: 24
  speed: 4
  dir: "LEFT"
  constructor: (@level, @x, @y) ->
  update: ->
  render: (gfx) ->
    gfx.ctx.fillText "?", @x, @y
  move: (dx, dy) ->
    # 1. Determine the intended position we'll move to
    xo = dx
    yo = dy
    xv = @x + xo
    yv = @y + yo
    # 2. Check possible block collisions due to vertical movement
    [tl, bl, tr, br] = level.getBlocks [
                          [@x, yv]
                          [@x, yv + (@h - 1)]
                          [@x + (@w - 1), yv]
                          [@x + (@w - 1), yv + (@h - 1)]
                        ]
    # 3. If collision occurs, move entity back to the edge
    if dy < 0 and (tl.solid of tr.solid)
      yo = @level.getBlockEdge(@y, "VERT") - @y
    if dy > 0 and (bl.solid or br.solid)
      yo = @level.getBlockEdge(@y + (@h - 1), "VERT") - @y - @h
    # 4. Check possible block collisions due to horizontal movement
    [tl, bl, tr, br] = level.getBlocks [
                          [xv, @y],
                          [xv, @y + (@h -1)],
                          [xv + (@w - 1), @y],
                          [xv + (@w - 1), @y + (@h - 1)]
                        ]
    # 5. If edges overlap, move entity back a little
    if dx < 0 and (tl.solid or bl.solid)
      xo = @level.getBlockEdge(@x) - @x
    if dx > 0 and (tr.solid or br.solid)
      xo = @level.getBlockEdge(xv + (@w - 1)) - @x - @w
    # 6. Finally, add the allowed movement to the current position
    @x += xo
    @y += yo
