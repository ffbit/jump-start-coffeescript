lives = 3
collided = false

# ... after some game logic
if collided
  lives = lives - 1
  console.log "Game over" if lives is 0
