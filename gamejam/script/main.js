// Generated by CoffeeScript 1.4.0
(function() {
  var gfx;

  gfx = {
    init: function() {
      var canvas;
      canvas = canvas != null ? canvas : document.querySelector("#game");
      this.ctx = canvas != null ? typeof canvas.getContext === "function" ? canvas.getContext("2d") : void 0 : void 0;
      return this.ctx != null;
    }
  };

  alert("Game loaded!");

}).call(this);