import './style.css'

const canvas = document.querySelector("#game-canvas");
const ctx = canvas.getContext("2d");

// Set canvas size
canvas.width = 320;
canvas.height = 180;

class Vector2 {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }
}

class Sprite {
  constructor({
    resource,
    frameSize,
    hFrames = 1,
    vFrames = 1,
    frame = 0,
    scale = 1,
    position = new Vector2(0, 0)
  }) {
    this.resource = resource;
    this.frameSize = frameSize;
    this.hFrames = hFrames;
    this.vFrames = vFrames;
    this.frame = frame;
    this.frameMap = new Map();
    this.scale = scale;
    this.position = position;
    this.buildFrameMap();
  }

  buildFrameMap() {
    let frameCount = 0;
    for (let v = 0; v < this.vFrames; v++) {
      for (let h = 0; h < this.hFrames; h++) {
        this.frameMap.set(
          frameCount,
          { x: h * this.frameSize.x, y: v * this.frameSize.y }
        );
        frameCount++;
      }
    }
  }

  drawImage(ctx, x, y) {
    const frame = this.frameMap.get(this.frame % (this.hFrames * this.vFrames));
    const frameCoordX = frame ? frame.x : 0;
    const frameCoordY = frame ? frame.y : 0;
    const frameSizeX = this.frameSize.x;
    const frameSizeY = this.frameSize.y;

    ctx.drawImage(
      this.resource,
      frameCoordX,
      frameCoordY,
      frameSizeX,
      frameSizeY,
      x,
      y,
      frameSizeX * this.scale,
      frameSizeY * this.scale
    );
  }
}

const resource = {
  images: {
    sky: new Image(),
    ground: new Image(),
    hero: new Image(),
    shadow: new Image()
  }
};

// Load images
resource.images.sky.src = 'path/to/sky.png';
resource.images.ground.src = 'path/to/ground.png';
resource.images.hero.src = 'path/to/hero.png';
resource.images.shadow.src = 'path/to/shadow.png';

let assetsLoaded = 0;
const totalAssets = Object.keys(resource.images).length;

function onAssetLoad() {
  assetsLoaded++;
  if (assetsLoaded === totalAssets) {
    initGame();
  }
}

Object.values(resource.images).forEach(img => {
  img.onload = onAssetLoad;
});

function initGame() {
  const skySprite = new Sprite({
    resource: resource.images.sky,
    frameSize: new Vector2(320, 180)
  });

  const groundSprite = new Sprite({
    resource: resource.images.ground,
    frameSize: new Vector2(320, 180)
  });

  const trainerSprite = new Sprite({
    resource: resource.images.hero,
    frameSize: new Vector2(32, 32),
    hFrames: 3,
    vFrames: 8,
    frame: 1
  });

  const shadowSprite = new Sprite({
    resource: resource.images.shadow,
    frameSize: new Vector2(32, 32)
  });

  const trainerPos = new Vector2(16 * 5, 16 * 5);

  const update = () => {
    // updating entities in game
    trainerSprite.frame += 1;
    trainerPos.x += 1;
    if (trainerPos.x > canvas.width) {
      trainerPos.x = -32;
    }
  };

  const draw = () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    skySprite.drawImage(ctx, 0, 0);
    groundSprite.drawImage(ctx, 0, 0);

    // center trainer in cell
    const trainerOffset = new Vector2(-8, -21);
    const trainerPosX = trainerPos.x + trainerOffset.x;
    const trainerPosY = trainerPos.y + trainerOffset.y;

    shadowSprite.drawImage(ctx, trainerPos.x, trainerPos.y);
    trainerSprite.drawImage(ctx, trainerPosX, trainerPosY);
  };

  class GameLoop {
    constructor(update, draw) {
      this.update = update;
      this.draw = draw;
      this.lastTime = 0;
      this.accumulatedTime = 0;
      this.timeStep = 1000 / 60; // 60 FPS
    }

    start() {
      this.lastTime = performance.now();
      this.loop(this.lastTime);
    }

    loop(currentTime) {
      requestAnimationFrame((time) => this.loop(time));

      const deltaTime = currentTime - this.lastTime;
      this.lastTime = currentTime;
      this.accumulatedTime += deltaTime;

      while (this.accumulatedTime >= this.timeStep) {
        this.update();
        this.accumulatedTime -= this.timeStep;
      }

      this.draw();
    }
  }

  const gameLoop = new GameLoop(update, draw);
  gameLoop.start();
}
