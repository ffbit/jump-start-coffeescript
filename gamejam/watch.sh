#!/bin/bash

xargs coffee -w -b -j script/main.js \
             -c < files
