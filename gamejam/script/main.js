// Generated by CoffeeScript 1.4.0
var Entity, Level, Ninja, Player, game, gfx, keys,
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

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

  Entity.prototype.speed = 4;

  Entity.prototype.dir = "LEFT";

  function Entity(x, y) {
    this.x = x;
    this.y = y;
  }

  Entity.prototype.update = function() {};

  Entity.prototype.render = function(gfx) {
    return gfx.ctx.fillText("?", this.x, this.y);
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
    return Player.__super__.constructor.apply(this, arguments);
  }

  Player.prototype.update = function() {
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
  };

  Player.prototype.render = function(gfx) {
    return gfx.drawSprite(0, 0, this.x, this.y);
  };

  return Player;

})(Entity);

Level = (function() {

  Level.prototype.w = 0;

  Level.prototype.h = 0;

  Level.prototype.treasures = 0;

  Level.prototype.ninjas = [];

  function Level(level, game) {
    this.game = game;
    this.load(level);
  }

  Level.prototype.load = function(level) {};

  Level.prototype.update = function() {};

  Level.prototype.render = function(gfx) {};

  return Level;

})();

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
    return this.running = true;
  },
  reset: function() {
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
  update: function() {},
  render: function() {
    var ninja, player;
    player = new Player(50, 50);
    ninja = new Ninja(80, 50);
    player.render(gfx);
    return ninja.render(gfx);
  }
};
