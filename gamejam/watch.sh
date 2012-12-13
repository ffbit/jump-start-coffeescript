#!/bin/bash

coffee -w -j script/main.js \
       -c src/gfx.coffee src/keys.coffee \
          src/player.coffee src/game.coffee
