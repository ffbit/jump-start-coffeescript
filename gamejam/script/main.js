// Generated by CoffeeScript 1.4.0
var Block, Dirt, Entity, Level, Ninja, Player, Rock, Treasure, game, gfx, keys, leaderboard, levels, loser, others, utils, winner, _i,
  __slice = [].slice,
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

utils = {
  now: function() {
    return new Date().getTime();
  },
  snap: function(value, snapSize) {
    return Math.floor(value / snapSize) * snapSize;
  },
  rand: function(min, max) {
    var range;
    if (max == null) {
      max = min;
      min = 0;
    }
    range = max - min;
    return Math.floor((Math.random()) * range + min);
  }
};

console.log(utils.now());

leaderboard = ["ERC", "AMY", "BOB", "AAA", "STU"];

winner = leaderboard[0], others = 3 <= leaderboard.length ? __slice.call(leaderboard, 1, _i = leaderboard.length - 1) : (_i = 1, []), loser = leaderboard[_i++];

console.log("First place: " + winner + ".\nLast place: " + loser + ".");

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

Entity = (function() {

  Entity.prototype.x = 0;

  Entity.prototype.y = 0;

  Entity.prototype.w = 18;

  Entity.prototype.h = 24;

  Entity.prototype.speed = 4;

  Entity.prototype.dir = "LEFT";

  function Entity(level, x, y) {
    this.level = level;
    this.x = x;
    this.y = y;
  }

  Entity.prototype.update = function() {};

  Entity.prototype.render = function(gfx) {
    return gfx.ctx.fillText("?", this.x, this.y);
  };

  Entity.prototype.move = function(dx, dy) {
    var bl, br, tl, tr, xo, xv, yo, yv, _ref, _ref1;
    xo = dx;
    yo = dy;
    xv = this.x + xo;
    yv = this.y + yo;
    _ref = this.level.getBlocks([this.x, yv], [this.x, yv + (this.h - 1)], [this.x + (this.w - 1), yv], [this.x + (this.w - 1), yv + (this.h - 1)]), tl = _ref[0], bl = _ref[1], tr = _ref[2], br = _ref[3];
    if (dy < 0 && (tl.solid || tr.solid)) {
      yo = this.level.getBlockEdge(this.y, "VERT") - this.y;
    }
    if (dy > 0 && (bl.solid || br.solid)) {
      yo = this.level.getBlockEdge(yv + (this.h - 1), "VERT") - this.y - this.h;
    }
    _ref1 = this.level.getBlocks([xv, this.y], [xv, this.y + (this.h - 1)], [xv + (this.w - 1), this.y], [xv + (this.w - 1), this.y + (this.h - 1)]), tl = _ref1[0], bl = _ref1[1], tr = _ref1[2], br = _ref1[3];
    if (dx < 0 && (tl.solid || bl.solid)) {
      xo = this.level.getBlockEdge(this.x) - this.x;
    }
    if (dx > 0 && (tr.solid || br.solid)) {
      xo = this.level.getBlockEdge(xv + (this.w - 1)) - this.x - this.w;
    }
    this.x += xo;
    return this.y += yo;
  };

  return Entity;

})();

Ninja = (function(_super) {

  __extends(Ninja, _super);

  function Ninja() {
    return Ninja.__super__.constructor.apply(this, arguments);
  }

  Ninja.prototype.render = function() {
    return gfx.drawSprite(0, 1, this.x, this.y);
  };

  return Ninja;

})(Entity);

Player = (function(_super) {

  __extends(Player, _super);

  function Player() {
    Player.__super__.constructor.apply(this, arguments);
    this.dir = "RIGHT";
  }

  Player.prototype.update = function() {
    var xo, yo;
    xo = yo = 0;
    if (keys.left) {
      xo -= this.speed;
    }
    if (keys.right) {
      xo += this.speed;
    }
    if (keys.down) {
      yo += this.speed;
    }
    if (keys.up) {
      yo -= this.speed;
    }
    return this.move(xo, yo);
  };

  Player.prototype.render = function(gfx) {
    return gfx.drawSprite(0, 0, this.x, this.y);
  };

  return Player;

})(Entity);

Block = (function() {

  Block.prototype.solid = false;

  function Block() {}

  Block.prototype.update = function() {};

  Block.prototype.render = function(gfx, x, y) {};

  return Block;

})();

Dirt = (function(_super) {

  __extends(Dirt, _super);

  function Dirt() {
    return Dirt.__super__.constructor.apply(this, arguments);
  }

  Dirt.prototype.solid = true;

  Dirt.prototype.render = function(gfx, x, y) {
    return gfx.drawSprite(4, 1, x, y);
  };

  return Dirt;

})(Block);

Rock = (function(_super) {

  __extends(Rock, _super);

  function Rock() {
    return Rock.__super__.constructor.apply(this, arguments);
  }

  Rock.prototype.solid = true;

  Rock.prototype.render = function(gfx, x, y) {
    return gfx.drawSprite(4, 0, x, y);
  };

  return Rock;

})(Block);

Treasure = (function(_super) {

  __extends(Treasure, _super);

  function Treasure() {
    this.yOff = Math.random() * Math.PI;
  }

  Treasure.prototype.update = function() {
    return this.yOff += Math.PI / 24;
  };

  Treasure.prototype.render = function(gfx, x, y) {
    var ySine;
    ySine = Math.floor(Math.sin(this.yOff) * 4);
    return gfx.drawSprite(5, 1, x, y + ySine);
  };

  return Treasure;

})(Block);

Level = (function() {

  Level.prototype.w = 0;

  Level.prototype.h = 0;

  Level.prototype.treasures = 0;

  Level.prototype.ninjas = [];

  function Level(level, game) {
    this.game = game;
    this.load(level);
  }

  Level.prototype.load = function(level) {
    var asciiMap, col, row, x, y;
    this.ninjas = [];
    this.treasures = 0;
    asciiMap = (function() {
      var _j, _len, _ref, _results;
      _ref = level.data.split("\n");
      _results = [];
      for (_j = 0, _len = _ref.length; _j < _len; _j++) {
        row = _ref[_j];
        _results.push(row.split(""));
      }
      return _results;
    })();
    this.map = (function() {
      var _j, _len, _results;
      _results = [];
      for (y = _j = 0, _len = asciiMap.length; _j < _len; y = ++_j) {
        row = asciiMap[y];
        _results.push((function() {
          var _k, _len1, _results1;
          _results1 = [];
          for (x = _k = 0, _len1 = row.length; _k < _len1; x = ++_k) {
            col = row[x];
            switch (col) {
              case "@":
                _results1.push(new Dirt());
                break;
              case "O":
                _results1.push(new Rock());
                break;
              case "*":
                this.treasures++;
                _results1.push(new Treasure());
                break;
              case "X":
                this.addNinja(x, y);
                _results1.push(new Block());
                break;
              case "P":
                this.addPlayer(x, y);
                _results1.push(new Block());
                break;
              default:
                _results1.push(new Block());
            }
          }
          return _results1;
        }).call(this));
      }
      return _results;
    }).call(this);
    this.h = this.map.length;
    return this.w = this.map[0].length;
  };

  Level.prototype.addPlayer = function(x, y) {
    return this.game.setPlayer(x * gfx.tileW, y * gfx.tileH, this);
  };

  Level.prototype.addNinja = function(x, y) {
    var ninja, xPos, yPos;
    xPos = x * gfx.tileW;
    yPos = y * gfx.tileH;
    ninja = new Ninja(this, xPos, yPos);
    return this.ninjas.push(ninja);
  };

  Level.prototype.update = function() {
    var block, ninja, row, _j, _k, _l, _len, _len1, _len2, _ref, _ref1, _results;
    _ref = this.map;
    for (_j = 0, _len = _ref.length; _j < _len; _j++) {
      row = _ref[_j];
      for (_k = 0, _len1 = row.length; _k < _len1; _k++) {
        block = row[_k];
        block.update();
      }
    }
    _ref1 = this.ninjas;
    _results = [];
    for (_l = 0, _len2 = _ref1.length; _l < _len2; _l++) {
      ninja = _ref1[_l];
      _results.push(ninja.update());
    }
    return _results;
  };

  Level.prototype.render = function(gfx) {
    var block, ninja, row, x, y, _j, _k, _l, _len, _len1, _len2, _ref, _ref1, _results;
    _ref = this.map;
    for (y = _j = 0, _len = _ref.length; _j < _len; y = ++_j) {
      row = _ref[y];
      for (x = _k = 0, _len1 = row.length; _k < _len1; x = ++_k) {
        block = row[x];
        block.render(gfx, x * gfx.tileW, y * gfx.tileH);
      }
    }
    _ref1 = this.ninjas;
    _results = [];
    for (_l = 0, _len2 = _ref1.length; _l < _len2; _l++) {
      ninja = _ref1[_l];
      _results.push(ninja.render(gfx));
    }
    return _results;
  };

  Level.prototype.getBlockIndex = function(x, y) {
    return [Math.floor(x / gfx.tileW), Math.floor(y / gfx.tileH)];
  };

  Level.prototype.getBlock = function(x, y) {
    var xBlock, yBlock, _ref, _ref1;
    _ref = this.getBlockIndex(x, y), xBlock = _ref[0], yBlock = _ref[1];
    return ((_ref1 = this.map[yBlock]) != null ? _ref1[xBlock] : void 0) || new Rock();
  };

  Level.prototype.getBlocks = function() {
    var coords, x, y, _j, _len, _ref, _results;
    coords = 1 <= arguments.length ? __slice.call(arguments, 0) : [];
    _results = [];
    for (_j = 0, _len = coords.length; _j < _len; _j++) {
      _ref = coords[_j], x = _ref[0], y = _ref[1];
      _results.push(this.getBlock(x, y));
    }
    return _results;
  };

  Level.prototype.getBlockEdge = function(position, forVertical) {
    var snapTo;
    if (forVertical == null) {
      forVertical = false;
    }
    snapTo = forVertical ? gfx.tileH : gfx.tileW;
    return utils.snap(position, snapTo);
  };

  return Level;

})();

levels = [
  {
    name: "DIG and BUILD",
    data: ".P................X.....\n@-@@.........@@@@@@@-@..\n.#..@@@.............#...\n.#.....@@.@@.....X..#...\n@OO#.........#@@...O#..^\n...#.........#......#.^O\n...#..@@-@@@@#..-@@@@@OO\n...#....#....#..#.......\n...#....#....#..#.......\n...#....#....#..#.......\n@-@@OOOOO.#.@@@@@#@@-@@@\n.#.X......#......#..#...\n.#...*....#......#..#...\n####..@@#@@..-@@@@@@@..*\n####....#....#.........#\n####....#....#.........#\nOOOOOOOOOOOOOOOOOOOOOOOO"
  }
];

game = {
  running: false,
  init: function() {
    if (!gfx.init()) {
      alert("Sorry, no canvas");
      return;
    }
    return gfx.load(function() {
      return game.reset();
    });
  },
  stop: function() {
    return this.running = false;
  },
  start: function() {
    this.running = true;
    return console.log(this.level.getBlock(-10, 30));
  },
  reset: function() {
    this.player = new Player;
    this.level = new Level(levels[0], this);
    keys.reset();
    if (!this.running) {
      this.start();
      return this.tick();
    }
  },
  tick: function() {
    if (!this.running) {
      return;
    }
    gfx.clear();
    this.update();
    this.render();
    return setTimeout((function() {
      return game.tick();
    }), 33);
  },
  update: function() {
    this.level.update();
    return this.player.update();
  },
  render: function() {
    this.level.render(gfx);
    return this.player.render(gfx);
  },
  setPlayer: function(x, y, level) {
    this.player.level = level;
    this.player.x = x;
    return this.player.y = y;
  }
};
