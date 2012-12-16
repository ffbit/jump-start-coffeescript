#!/bin/bash

xargs coffee -w -b -j script/main.js \
             -c << EOF
                src/gfx.coffee
                src/keys.coffee
                src/entities/
                src/game.coffee
