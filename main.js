import { GameObject, Sprite, Vector2, Input, Animations, FrameIndexPattern, GameLoop } from "./your-game-engine.js";
import { WALK_DOWN, WALK_UP, WALK_LEFT, WALK_RIGHT, STAND_DOWN, STAND_UP, STAND_LEFT, STAND_RIGHT } from "./animations.js";
import { resources } from "./resource.js";
import { camera } from "./camera.js";
import { inventory } from "./inventory.js";
import { events } from "./events.js";

const canvas = document.querySelector("#game-canvas");
const ctx = canvas.getContext("2d");

const mainScene = new GameObject({
  position: new Vector2(0, 0)
});

class Trainer extends GameObject {
  constructor(x, y) {
    super({
      position: new Vector2(x, y)
    });
    this.facingDirection = 'DOWN';
    this.destinationPosition = this.position.duplicate();
    this.sprite = null;
    this.animations = null;
    this.itemPickupTime = 0;
  }

  tryMove(root) {
    // Implement movement logic
  }

  step(delta, root) {
    if (this.itemPickupTime > 0) {
      this.workOnItemPickup(delta);
      return;
    }

    const distance = moveTowards(this.position, this.destinationPosition, 1);
    const hasArrived = distance <= 1;
    if (hasArrived) {
      this.tryMove(root);
    }

    this.sprite.step(delta);
    this.animations.update(delta);
  }

  workOnItemPickup(delta) {
    this.itemPickupTime -= delta;
  }
}

const gridCells = (cells) => cells * 16;

const skySprite = new Sprite({
  resource: resources.images.sky,
  frameSize: new Vector2(320, 180)
});

const groundSprite = new Sprite({
  resource: resources.images.ground,
  frameSize: new Vector2(320, 180)
});
mainScene.addChild(groundSprite);

const trainer = new Trainer(gridCells(6), gridCells(5));
trainer.sprite = new Sprite({
  resource: resources.images.trainer,
  frameSize: new Vector2(32, 32),
  hFrames: 3,
  vFrames: 8,
});
trainer.animations = new Animations({
  walkDown: new FrameIndexPattern(WALK_DOWN),
  walkUp: new FrameIndexPattern(WALK_UP),
  walkLeft: new FrameIndexPattern(WALK_LEFT),
  walkRight: new FrameIndexPattern(WALK_RIGHT),
  standDown: new FrameIndexPattern(STAND_DOWN),
  standUp: new FrameIndexPattern(STAND_UP),
  standLeft: new FrameIndexPattern(STAND_LEFT),
  standRight: new FrameIndexPattern(STAND_RIGHT),
});
mainScene.addChild(trainer);

const shadow = new Sprite({
  resource: resources.images.shadow,
  frameSize: new Vector2(32, 32)
});

mainScene.addChild(camera);

let isInsideCafe = false;

const cafeExteriorSprite = new Sprite({
  resource: resources.images.cafeExterior,
  frameSize: new Vector2(64, 64)
});
cafeExteriorSprite.position = new Vector2(gridCells(10), gridCells(8));
mainScene.addChild(cafeExteriorSprite);

const cafeInteriorSprite = new Sprite({
  resource: resources.images.cafeInterior,
  frameSize: new Vector2(320, 180)
});
cafeInteriorSprite.visible = false;

const sawsbucksLogoSprite = new Sprite({
  resource: resources.images.sawsbucksLogo,
});
sawsbucksLogoSprite.position = new Vector2(gridCells(12), gridCells(10));
cafeInteriorSprite.addChild(sawsbucksLogoSprite);

mainScene.addChild(cafeInteriorSprite);

function checkEntrance(playerX, playerY) {
  const entranceX = gridCells(10); // Adjust based on your cafe position
  const entranceY = gridCells(8); // Adjust based on your cafe position
  const entranceRadius = gridCells(1);

  const distance = Math.sqrt(Math.pow(playerX - entranceX, 2) + Math.pow(playerY - entranceY, 2));
  
  if (distance < entranceRadius) {
    isInsideCafe = !isInsideCafe;
    if (isInsideCafe) {
      trainer.position.set(gridCells(11), gridCells(9)); // Interior spawn point
      cafeExteriorSprite.visible = false;
      cafeInteriorSprite.visible = true;
    } else {
      trainer.position.set(gridCells(10), gridCells(7)); // Exterior spawn point
      cafeExteriorSprite.visible = true;
      cafeInteriorSprite.visible = false;
    }
  }
}

function drawScene() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  skySprite.drawImage(ctx, camera.position.x, camera.position.y);
  
  ctx.save();
  
  ctx.translate(camera.position.x, camera.position.y);
  
  mainScene.draw(ctx);

  shadow.drawImage(ctx, trainer.position.x - shadow.frameSize.x / 2, trainer.position.y - shadow.frameSize.y / 2);
  
  ctx.restore();
}

document.addEventListener("keydown", (event) => {
  if (event.key === "e") {
    checkEntrance(trainer.position.x, trainer.position.y);
  }
});

const updateGameLoop = (delta) => {
   mainScene.stepEntry(delta);
};

  // clear anything stale
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // save current state (for camera offset)
  ctx.save();

  // offset by camera position
  ctx.translate(camera.position.x, camera.position.y);

  // draw objects in mounted scene
  mainScene.draw(ctx, 0, 0);

  // restore to original state
  ctx.restore();

const drawGameLoop = () => {
   drawScene();
};

// start game
const gameLoop = new GameLoop(updateGameLoop, drawGameLoop);
gameLoop.start();
