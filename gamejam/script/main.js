// Generated by CoffeeScript 1.4.0
var Block, Dialog, Dirt, Entity, GameScreen, Gravel, Ladder, Level, LevelDialog, Ninja, Player, Rock, Screen, TitleScreen, Treasure, gfx, keys, levels, sound, utils,
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  __slice = [].slice;

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
  },
  counter: function(max, speed) {
    if (speed == null) {
      speed = 100;
    }
    return Math.floor(this.now() / speed % max);
  }
};

sound = {
  audio: {},
  list: {
    dig: "dig.wav",
    fall: "falling.wav",
    particle: "particle.wav",
    dead: "dead.wav"
  },
  init: function() {
    var name, url, _ref, _results;
    _ref = this.list;
    _results = [];
    for (name in _ref) {
      url = _ref[name];
      _results.push(this.audio[name] = new Audio("resources/" + url));
    }
    return _results;
  },
  play: function(name) {
    var _ref, _ref1;
    if ((_ref = this.audio[name]) != null) {
      _ref.currentTime = 0;
    }
    return (_ref1 = this.audio[name]) != null ? _ref1.play() : void 0;
  }
};

sound.init();

gfx = {
  tileW: 24,
  tileH: 24,
  init: function() {
    var canvas;
    canvas = $("#game")[0];
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
    this.sprites.onload = function() {
      return onload();
    };
    this.title = new Image();
    return this.title.src = "resources/title.png";
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
        this.space = isDown;
    }
    if (isDown) {
      return console.log(keyCode);
    }
  }
};

$(document).keydown(function(e) {
  return keys.trigger(e.keyCode, true);
});

$(document).keyup(function(e) {
  return keys.trigger(e.keyCode, false);
});

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
    this.falling = true;
    this.wasFalling = true;
    this.onLadder = false;
    this.wasOnLadder = false;
    this.onTopOfLadder = false;
  }

  Entity.prototype.update = function() {};

  Entity.prototype.render = function(gfx) {
    return gfx.ctx.fillText("?", this.x, this.y);
  };

  Entity.prototype.move = function(dx, dy) {
    var bl, br, tl, tr, xo, xv, yo, yv, _ref, _ref1;
    if (this.falling) {
      dy += this.speed * 2;
    }
    this.wasFalling = this.falling;
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
      this.falling = false;
    }
    _ref1 = this.level.getBlocks([xv, this.y], [xv, this.y + (this.h - 1)], [xv + (this.w - 1), this.y], [xv + (this.w - 1), this.y + (this.h - 1)]), tl = _ref1[0], bl = _ref1[1], tr = _ref1[2], br = _ref1[3];
    if (dx < 0 && (tl.solid || bl.solid)) {
      xo = this.level.getBlockEdge(this.x) - this.x;
    }
    if (dx > 0 && (tr.solid || br.solid)) {
      xo = this.level.getBlockEdge(xv + (this.w - 1)) - this.x - this.w;
    }
    this.x += xo;
    this.y += yo;
    return this.checkNewPos(dx, dy);
  };

  Entity.prototype.checkNewPos = function(dx, dy) {
    var bl, block, br, nearBlocks, snapAmount, tl, touchingALadder, tr, _i, _len, _ref;
    this.wasOnLadder = this.onLadder;
    nearBlocks = (_ref = this.level.getBlocks([this.x, this.y], [this.x, this.y + this.h], [this.x + (this.w - 1), this.y], [this.x + (this.w - 1), this.y + this.h]), tl = _ref[0], bl = _ref[1], tr = _ref[2], br = _ref[3], _ref);
    for (_i = 0, _len = nearBlocks.length; _i < _len; _i++) {
      block = nearBlocks[_i];
      if (block.touchable) {
        block.touch(this);
      }
    }
    this.onLadder = false;
    touchingALadder = nearBlocks.some(function(block) {
      return block.climbable;
    });
    if (touchingALadder) {
      this.onLadder = true;
      this.falling = false;
    }
    if (dy !== 0) {
      snapAmount = utils.snap(this.x, gfx.tileW);
      if (!(bl.climbable || tl.climbable)) {
        this.x = snapAmount + gfx.tileW;
      }
      if (!(br.climbable || tr.climbable)) {
        this.x = snapAmount;
      }
    }
    this.onTopOfLadder = this.onLadder && !(tl.climbable || tr.climbable) && (this.y + this.h) % gfx.tileH === 0;
    if (!this.onLadder && !this.falling) {
      return this.falling = !(bl.solid || br.solid || bl.climbable || br.climbable);
    }
  };

  return Entity;

})();

Ninja = (function(_super) {

  __extends(Ninja, _super);

  Ninja.prototype.speed = 3;

  Ninja.prototype.time = 0;

  Ninja.prototype.state = "CRUISING";

  Ninja.prototype.subState = "IDLE";

  function Ninja(level, x, y, player) {
    this.player = player;
    Ninja.__super__.constructor.call(this, level, x, y);
  }

  Ninja.prototype.render = function() {
    var fx;
    fx = this.dir === "LEFT" ? 2 : 0;
    fx += utils.counter(2);
    return gfx.drawSprite(fx, 1, this.x, this.y);
  };

  Ninja.prototype.update = function() {
    var px, py, xo, yo, _ref;
    _ref = (function() {
      var _ref;
      if (this.falling) {
        return [0, 0];
      } else {
        _ref = this.player, px = _ref.x, py = _ref.y;
        switch (this.state) {
          case "CRUISING":
            return this.cruise(px, py);
          case "HUNTING":
            return this.hunt(px, py);
        }
      }
    }).call(this), xo = _ref[0], yo = _ref[1];
    return this.move(xo, yo);
  };

  Ninja.prototype.cruise = function(px, py) {
    var newMode, x, y;
    x = y = 0;
    switch (this.subState) {
      case "RIGHT":
        x += this.speed;
        this.dir = "RIGHT";
        break;
      case "LEFT":
        x -= this.speed;
        this.dir = "LEFT";
    }
    if (--this.time < 0) {
      newMode = utils.rand(5);
      this.time = utils.rand(20, 40);
      this.subState = (function() {
        switch (newMode) {
          case 1:
          case 0:
            return "LEFT";
          case 2:
          case 3:
            return "RIGHT";
          default:
            return "IDLE";
        }
      })();
    }
    if (this.onLadder && !this.wasOnLadder) {
      if (Math.random() < 0.5) {
        this.state = "HUNTING";
      }
    }
    if (py === this.y) {
      this.state = "HUNTING";
    }
    return [x, y];
  };

  Ninja.prototype.hunt = function(px, py) {
    var x, y;
    x = y = 0;
    if (py === this.y || this.onTopOfLadder) {
      if (px > this.x) {
        x += this.speed;
        this.dir = "RIGHT";
      } else {
        x -= this.speed;
        this.dir = "LEFT";
      }
    } else if (this.onLadder) {
      if (!this.onTopOfLadder && py < this.y) {
        y -= this.speed;
      }
      if (py > this.y) {
        y += this.speed;
      }
    } else {
      this.state = "CRUISING";
      this.subState = "LEFT";
    }
    return [x, y];
  };

  return Ninja;

})(Entity);

Player = (function(_super) {

  __extends(Player, _super);

  Player.prototype.lastDig = utils.now();

  function Player() {
    Player.__super__.constructor.apply(this, arguments);
    this.dir = "RIGHT";
  }

  Player.prototype.update = function() {
    var xo, yo;
    xo = yo = 0;
    if (!this.falling) {
      if (keys.left) {
        xo -= this.speed;
        this.dir = "LEFT";
      }
      if (keys.right) {
        xo += this.speed;
        this.dir = "RIGHT";
      }
    }
    if (keys.down && this.onLadder) {
      yo += this.speed;
    }
    if (keys.up && this.onLadder && !this.onTopOfLadder) {
      yo -= this.speed;
    }
    if (keys.space) {
      this.dig();
    }
    return this.move(xo, yo);
  };

  Player.prototype.render = function(gfx) {
    var fx, fy, isLeft;
    fy = fx = 0;
    isLeft = this.dir === "LEFT";
    if (this.falling) {
      if (isLeft) {
        fx = 1;
      }
      fy = 2;
    } else {
      if (isLeft) {
        fx = 2;
      }
      if (keys.left || keys.right) {
        fx += utils.counter(2);
      }
    }
    return gfx.drawSprite(fx, fy, this.x, this.y);
  };

  Player.prototype.dig = function() {
    var delay;
    delay = 6 * 1000;
    if (utils.now() - this.lastDig < delay) {
      return;
    }
    this.level.digAt(this.dir, this.x, this.y);
    return this.lastDig = utils.now();
  };

  return Player;

})(Entity);

Block = (function() {

  Block.prototype.solid = false;

  Block.prototype.climbable = false;

  Block.prototype.touchable = false;

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
    var oldAlpha;
    oldAlpha = gfx.ctx.globalAlpha;
    gfx.ctx.globalAlpha = 1 - this.digTime / 80;
    gfx.drawSprite(4, 1, x, y);
    return gfx.ctx.globalAlpha = oldAlpha;
  };

  Dirt.prototype.digIt = function() {
    this.digTime = 80;
    return this.solid = false;
  };

  Dirt.prototype.update = function() {
    if (--this.digTime === 50) {
      return this.solid = true;
    }
  };

  return Dirt;

})(Block);

Gravel = (function(_super) {

  __extends(Gravel, _super);

  function Gravel() {
    return Gravel.__super__.constructor.apply(this, arguments);
  }

  Gravel.prototype.solid = true;

  Gravel.prototype.digTime = 100;

  Gravel.prototype.update = function(x, y, level) {
    if (--this.digTime < 0) {
      return level.removeBlock(x, y, this);
    }
  };

  Gravel.prototype.render = function(gfx, x, y) {
    var oldAlpha;
    oldAlpha = gfx.ctx.globalAlpha;
    gfx.ctx.globalAlpha = this.ditTime / 50;
    gfx.drawSprite(4, 2, x, y);
    return gfx.ctx.globalAlpha = oldAlpha;
  };

  return Gravel;

})(Block);

Ladder = (function(_super) {

  __extends(Ladder, _super);

  Ladder.prototype.climbable = true;

  function Ladder(top) {
    this.top = top;
    this.frame = top ? 6 : 5;
  }

  Ladder.prototype.render = function(gfx, x, y) {
    return gfx.drawSprite(this.frame, 0, x, y);
  };

  return Ladder;

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

  Treasure.prototype.touchable = true;

  Treasure.prototype.collected = false;

  function Treasure() {
    this.yOff = Math.random() * Math.PI;
  }

  Treasure.prototype.update = function(x, y, level) {
    this.yOff += Math.PI / 24;
    if (this.collected) {
      level.removeBlock(x, y, this);
      return sound.play("particle");
    }
  };

  Treasure.prototype.render = function(gfx, x, y) {
    var ySine;
    ySine = Math.floor(Math.sin(this.yOff) * 4);
    return gfx.drawSprite(5, 1, x, y + ySine);
  };

  Treasure.prototype.touch = function(entity) {
    return this.collected = entity.constructor === Player;
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
      var _i, _len, _ref, _results;
      _ref = level.data.split("\n");
      _results = [];
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        row = _ref[_i];
        _results.push(row.split(""));
      }
      return _results;
    })();
    this.map = (function() {
      var _i, _len, _results;
      _results = [];
      for (y = _i = 0, _len = asciiMap.length; _i < _len; y = ++_i) {
        row = asciiMap[y];
        _results.push((function() {
          var _j, _len1, _results1;
          _results1 = [];
          for (x = _j = 0, _len1 = row.length; _j < _len1; x = ++_j) {
            col = row[x];
            switch (col) {
              case "@":
                _results1.push(new Dirt());
                break;
              case "O":
                _results1.push(new Rock());
                break;
              case "#":
                _results1.push(new Ladder());
                break;
              case "-":
                _results1.push(new Ladder(true));
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
    ninja = new Ninja(this, xPos, yPos, this.game.player);
    return this.ninjas.push(ninja);
  };

  Level.prototype.update = function() {
    var block, ninja, row, x, y, _i, _j, _k, _l, _len, _len1, _len2, _len3, _ref, _ref1, _ref2, _results;
    _ref = this.map;
    for (y = _i = 0, _len = _ref.length; _i < _len; y = ++_i) {
      row = _ref[y];
      for (x = _j = 0, _len1 = row.length; _j < _len1; x = ++_j) {
        block = row[x];
        block.update(x, y, this);
      }
    }
    _ref1 = this.ninjas;
    for (_k = 0, _len2 = _ref1.length; _k < _len2; _k++) {
      ninja = _ref1[_k];
      ninja.update();
    }
    _ref2 = this.ninjas;
    _results = [];
    for (_l = 0, _len3 = _ref2.length; _l < _len3; _l++) {
      ninja = _ref2[_l];
      _results.push(this.checkCollision(this.game.player, ninja));
    }
    return _results;
  };

  Level.prototype.checkCollision = function(player, ninja) {
    if (player.x + player.w >= ninja.x && player.x <= ninja.x + ninja.w && player.y + player.h >= ninja.y && player.y <= ninja.y + ninja.h) {
      alert("You are dead");
      return this.game.reset();
    }
  };

  Level.prototype.render = function(gfx) {
    var block, ninja, row, x, y, _i, _j, _k, _len, _len1, _len2, _ref, _ref1, _results;
    _ref = this.map;
    for (y = _i = 0, _len = _ref.length; _i < _len; y = ++_i) {
      row = _ref[y];
      for (x = _j = 0, _len1 = row.length; _j < _len1; x = ++_j) {
        block = row[x];
        block.render(gfx, x * gfx.tileW, y * gfx.tileH);
      }
    }
    _ref1 = this.ninjas;
    _results = [];
    for (_k = 0, _len2 = _ref1.length; _k < _len2; _k++) {
      ninja = _ref1[_k];
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
    var coords, x, y, _i, _len, _ref, _results;
    coords = 1 <= arguments.length ? __slice.call(arguments, 0) : [];
    _results = [];
    for (_i = 0, _len = coords.length; _i < _len; _i++) {
      _ref = coords[_i], x = _ref[0], y = _ref[1];
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

  Level.prototype.removeBlock = function(x, y, block) {
    this.map[y][x] = new Block();
    if (block.constructor === Treasure) {
      if (--this.treasures === 0) {
        alert("Level Complete!");
        return this.game.reset();
      }
    }
  };

  Level.prototype.digAt = function(dir, x, y) {
    var block, xb, yb, _ref;
    _ref = this.getBlockIndex(x, y), xb = _ref[0], yb = _ref[1];
    xb = xb + (dir === "RIGHT" ? 1 : -1);
    if (yb + 1 > this.h || xb < 0 || xb > this.w - 1) {
      return;
    }
    block = this.map[yb + 1][xb];
    if (block.digIt != null) {
      block.digIt();
    }
    if (block.constructor === Block) {
      return this.map[yb + 1][xb] = new Gravel();
    }
  };

  return Level;

})();

levels = [
  {
    name: "DIG and BUILD",
    data: ".P................X.....\n@-@@.........@@@@@@@-@..\n.#..@@@.............#...\n.#.....@@.@@.....X..#...\n@OO#.........#@@...O#..^\n...#.........#......#.^O\n...#..@@-@@@@#..-@@@@@OO\n...#....#....#..#.......\n...#....#....#..#.......\n...#....#....#..#.......\n@-@@OOOOO.#.@@@@@#@@-@@@\n.#.X......#......#..#...\n.#...*....#......#..#...\n####..@@#@@..-@@@@@@@..*\n####....#....#.........#\n####....#....#.........#\nOOOOOOOOOOOOOOOOOOOOOOOO"
  }
];

Screen = (function() {

  function Screen() {}

  Screen.prototype.update = function() {};

  Screen.prototype.render = function(gfx) {};

  return Screen;

})();

GameScreen = (function(_super) {

  __extends(GameScreen, _super);

  GameScreen.prototype.levelNumber = 0;

  function GameScreen() {
    this.player = new Player();
    this.startLevel();
  }

  GameScreen.prototype.setPlayer = function(x, y, level) {
    this.player.level = level;
    this.player.x = x;
    return this.player.y = y;
  };

  GameScreen.prototype.update = function() {
    this.level.update();
    return this.player.update();
  };

  GameScreen.prototype.startLevel = function() {
    this.level = new Level(levels[this.levelNumber], this);
    return game.dialog = new LevelDialog(levels[this.levelNumber].name);
  };

  GameScreen.prototype.levelComplete = function() {
    if (++this.levelNumber >= levels.length) {
      return game.win();
    } else {
      return this.startLevel();
    }
  };

  GameScreen.prototype.render = function(gfx) {
    var backX, backY, leftEdge, offx;
    gfx.ctx.save();
    gfx.ctx.scale(1.3, 1.3);
    leftEdge = 210;
    offx = this.player.x > leftEdge ? -this.player.x + leftEdge : 0;
    gfx.ctx.translate(offx, -this.player.y + 130);
    this.level.render(gfx);
    this.player.render(gfx);
    gfx.ctx.restore();
    backX = 1 - (this.player.x / gfx.w) * 100;
    backY = 1 - (this.player.y / gfx.h) * 100;
    return gfx.ctx.canvas.style.backgroundPosition = "" + backX + "px " + backY + "px";
  };

  return GameScreen;

})(Screen);

TitleScreen = (function(_super) {

  __extends(TitleScreen, _super);

  function TitleScreen() {
    return TitleScreen.__super__.constructor.apply(this, arguments);
  }

  TitleScreen.prototype.min = 20;

  TitleScreen.prototype.update = function() {
    if (this.min-- > 0) {
      return;
    }
    if (keys.space) {
      return game.screen = new GameScreen();
    }
  };

  TitleScreen.prototype.render = function(gfx) {
    var c;
    c = gfx.ctx;
    gfx.clear();
    c.drawImage(gfx.title, 180, 10);
    c.fillStyle = "#e0e0e0";
    c.font = "14pt monospace";
    gfx.drawSprite(5, 1, 480, 180);
    c.fillText("Collect all \"Pig’s Boffin\" particles.", 50, 210);
    return c.fillText("Press space to start...", 50, 240);
  };

  return TitleScreen;

})(Screen);

Dialog = (function() {

  function Dialog() {}

  Dialog.prototype.update = function() {};

  Dialog.prototype.render = function(gfx) {};

  return Dialog;

})();

LevelDialog = (function(_super) {

  __extends(LevelDialog, _super);

  LevelDialog.prototype.time = 50;

  function LevelDialog(level) {
    this.level = level;
  }

  LevelDialog.prototype.update = function() {
    if (--this.time === 0) {
      return game.dialog = null;
    }
  };

  LevelDialog.prototype.render = function(gfx) {
    var c;
    c = gfx.ctx;
    c.save();
    c.translate(100, 150);
    c.fillStyle = "hsla(205, 40%, 50%, 0.8)";
    c.fillRect(0, 0, 350, 200);
    c.fillStyle = "#e0e0e0";
    c.fillText("" + this.level, 50, 100);
    return c.restore();
  };

  return LevelDialog;

})(Dialog);

this.game = {
  screen: null,
  dialog: null,
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
    return this.running = true;
  },
  reset: function() {
    this.screen = new TitleScreen();
    this.dialog = null;
    keys.reset();
    if (!this.running) {
      this.start();
      return this.tick();
    }
  },
  tick: function() {
    var _this = this;
    if (!this.running) {
      return;
    }
    this.update();
    this.render();
    return setTimeout((function() {
      return _this.tick();
    }), 33);
  },
  update: function() {
    if (this.dialog != null) {
      return this.dialog.update();
    } else {
      return this.screen.update();
    }
  },
  render: function() {
    gfx.clear();
    this.screen.render(gfx);
    if (this.dialog) {
      return this.dialog.render(gfx);
    }
  }
};
