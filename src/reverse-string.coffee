# Simple string reversal function
reverse = (sentence) ->
  sentence
    .split("")
    .reverse()
    .join("")

text = "rats live on"
backwards = reverse text

console.log "#{text} - #{backwards}" 
