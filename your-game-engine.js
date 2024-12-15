class GameEngine {
    constructor(canvasId, width, height) {
      this.canvas = document.getElementById(canvasId);
      this.ctx = this.canvas.getContext('2d');
      this.canvas.width = width;
      this.canvas.height = height;
      this.gameObjects = [];
      this.lastTimestamp = 0;
    }
}