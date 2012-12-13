// Generated by CoffeeScript 1.4.0
(function() {
  var game, gfx, longNames, name, people;

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

  game = {
    init: function() {
      if (!gfx.init()) {
        alert("Could not set up game canvas!");
        return;
      }
      gfx.clear();
      return gfx.load(function() {
        var c, drawANinja, makeANinja, n, ninjas, rand, _i, _len, _ref, _results;
        c = gfx.ctx;
        rand = function(max) {
          return Math.floor(Math.random() * max);
        };
        gfx.drawSprite(0, 0, 50, 50);
        makeANinja = function() {
          return {
            x: rand(gfx.w),
            y: rand(gfx.h)
          };
        };
        drawANinja = function(n) {
          return gfx.drawSprite(0, 1, n.x, n.y);
        };
        ninjas = (function() {
          var _i, _results;
          _results = [];
          for (_i = 0; _i < 20; _i++) {
            _results.push(makeANinja());
          }
          return _results;
        })();
        _ref = (function() {
          var _j, _len, _results1;
          _results1 = [];
          for (_j = 0, _len = ninjas.length; _j < _len; _j++) {
            n = ninjas[_j];
            if (n.x < gfx.w / 2) {
              _results1.push(n);
            }
          }
          return _results1;
        })();
        _results = [];
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
          n = _ref[_i];
          _results.push(drawANinja(n));
        }
        return _results;
      });
    }
  };

  game.init();

  people = ["Smith", "Jones", "Castledine-Carlin"];

  longNames = (function() {
    var _i, _len, _results;
    _results = [];
    for (_i = 0, _len = people.length; _i < _len; _i++) {
      name = people[_i];
      if (name.length > 10) {
        _results.push("Validation error for person: " + name);
      }
    }
    return _results;
  })();

  alert(longNames.join("\n"));

}).call(this);
