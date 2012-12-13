// Generated by CoffeeScript 1.4.0
(function() {
  var game, gfx;

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
        var c, drawANinja, leftNinjas, makeANinja, n, ninjas, rand, _i, _len, _results;
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
        leftNinjas = (function() {
          var _i, _len, _results;
          _results = [];
          for (_i = 0, _len = ninjas.length; _i < _len; _i++) {
            n = ninjas[_i];
            if (n.x < gfx.w / 2) {
              _results.push(n);
            }
          }
          return _results;
        })();
        _results = [];
        for (_i = 0, _len = leftNinjas.length; _i < _len; _i++) {
          n = leftNinjas[_i];
          _results.push(drawANinja(n));
        }
        return _results;
      });
    }
  };

  game.init();

}).call(this);
