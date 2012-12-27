#!/bin/bash

xargs coffee -w -b -j script/main.js \
             -c << EOF
                src/_utils.coffee
                src/sound.coffee
                src/gfx.coffee
                src/keys.coffee
                src/entities/
                src/blocks/
                src/levels/
                src/screens/
                src/dialogs/
                src/game.coffee
