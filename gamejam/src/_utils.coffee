utils =
  now: -> new Date().getTime()
  snap: (value, snapSize) ->
    Math.floor(value / snapSize) * snapSize
  rand: (min, max) ->
    if not max?
      max = min
      min = 0
    range = max - min
    Math.floor (Math.random()) * range + min

console.log utils.now()

# More splats
leaderboard = ["ERC", "AMY", "BOB", "AAA", "STU"]
[winner, others..., loser] = leaderboard

console.log """
            First place: #{winner}.
            Last place: #{loser}.
            """
