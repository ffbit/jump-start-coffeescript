// Generated by CoffeeScript 1.4.0
var game, gfx, keys, player;

gfx = {
  tileW: 24,
  tileH: 24,
  init: function() {
    var canvas;
    canvas = document.querySelector("#game");
    this.ctx = canvas != null ? typeof canvas.getContext === "function" ? canvas.getContext("2d") : void 0 : void 0;
    if (!this.ctx) {
      return false;
    }
    this.w = canvas.width;
    this.h = canvas.height;
    return true;
  },
  clear: function() {
    return this.ctx.clearRect(0, 0, this.w, this.h);
  },
  load: function(onload) {
    this.sprites = new Image();
    this.sprites.src = "resources/sprites.png";
    return this.sprites.onload = function() {
      return onload();
    };
  },
  drawSprite: function(col, row, x, y, w, h, scale) {
    if (w == null) {
      w = 1;
    }
    if (h == null) {
      h = 1;
    }
    if (scale == null) {
      scale = 1;
    }
    w *= this.tileW;
    h *= this.tileH;
    return this.ctx.drawImage(this.sprites, col * w, row * h, w, h, x, y, w * scale, h * scale);
  }
};

keys = {
  up: false,
  down: false,
  left: false,
  right: false,
  space: false,
  reset: function() {
    return this.up = this.down = this.left = this.right = this.space = false;
  },
  trigger: function(keyCode, isDown) {
    switch (keyCode) {
      case 37:
        this.left = isDown;
        break;
      case 39:
        this.right = isDown;
        break;
      case 38:
        this.up = isDown;
        break;
      case 40:
        this.down = isDown;
        break;
      case 32:
        if (isDown) {
          console.log("Fire away!");
        }
        this.space = isDown;
    }
    if (isDown) {
      return console.log(keyCode);
    }
  }
};

document.addEventListener("keydown", function(e) {
  return keys.trigger(e.keyCode, true);
}, false);

document.addEventListener("keyup", function(e) {
  return keys.trigger(e.keyCode, false);
}, false);

player = {
  x: gfx.tileW * 3,
  y: gfx.tileH * 5,
  speed: 4,
  update: function() {
    if (keys.left) {
      this.x -= this.speed;
    }
    if (keys.right) {
      this.x += this.speed;
    }
    if (keys.up) {
      this.y -= this.speed;
    }
    if (keys.down) {
      return this.y += this.speed;
    }
  },
  render: function(gfx) {
    return gfx.drawSprite(0, 0, this.x, this.y);
  }
};

game = {
  init: function() {
    if (!gfx.init()) {
      alert("Could not set up game canvas!");
      return;
    }
    gfx.clear();
    return gfx.load(function() {
      var c, level, level1, makeLevel, rand;
      c = gfx.ctx;
      rand = function(max) {
        return Math.floor(Math.random() * max);
      };
      makeLevel = function(ascii) {
        var asciiMap, col, row, tiles, _i, _len, _results;
        tiles = {
          "@": [4, 1],
          "O": [4, 0],
          "*": [5, 1],
          "#": [5, 0]
        };
        asciiMap = (function() {
          var _i, _len, _ref, _results;
          _ref = ascii.split("\n");
          _results = [];
          for (_i = 0, _len = _ref.length; _i < _len; _i++) {
            row = _ref[_i];
            _results.push(row.split(""));
          }
          return _results;
        })();
        _results = [];
        for (_i = 0, _len = asciiMap.length; _i < _len; _i++) {
          row = asciiMap[_i];
          _results.push((function() {
            var _j, _len1, _results1;
            _results1 = [];
            for (_j = 0, _len1 = row.length; _j < _len1; _j++) {
              col = row[_j];
              _results1.push(tiles[col]);
            }
            return _results1;
          })());
        }
        return _results;
      };
      level1 = ".............\n...........*.\n....@#@@@@#@.\n.....#....#..\n.....#....#..\n..*..#...@@@.\n..@@@@@...#..\n...#......#..\n...#......#..\n...#......#..\n.OOOOOOOOOOOO";
      level = makeLevel(level1);
      return setInterval(function() {
        var row, tile, x, xPos, y, yPos, _i, _j, _len, _len1;
        player.update();
        gfx.clear();
        for (y = _i = 0, _len = level.length; _i < _len; y = ++_i) {
          row = level[y];
          for (x = _j = 0, _len1 = row.length; _j < _len1; x = ++_j) {
            tile = row[x];
            if (!tile) {
              continue;
            }
            xPos = x * gfx.tileW;
            yPos = y * gfx.tileH;
            gfx.drawSprite(tile[0], tile[1], xPos, yPos);
          }
        }
        return player.render(gfx);
      }, 33);
    });
  }
};

game.init();
