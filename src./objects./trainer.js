import { GameObject, Sprite, Vector2, Input, Animations, FrameIndexPattern, GameLoop } from './your-game-engine.js';
import { WALK_DOWN, WALK_UP, WALK_LEFT, WALK_RIGHT, STAND_DOWN, STAND_UP, STAND_LEFT, STAND_RIGHT, PICK_UP_DOWN } from './animations.js';
import { resources } from './resources.js';

const canvas = document.querySelector("#game-canvas");
const ctx = canvas.getContext("2d");

const mainScene = new GameObject({ position: new Vector2(0, 0) });

const moveTowards = (current, target, maxDistance) => {
    const direction = target.subtract(current);
    if (direction.magnitude() <= maxDistance) {
        return target.duplicate();
    }
    return current.add(direction.normalize().multiply(maxDistance));
};

class Trainer extends GameObject {
  constructor(x, y) {
    super({ position: new Vector2(x, y) });
    this.facingDirection = 'DOWN';
    this.destinationPosition = this.position.duplicate();
    this.sprite = null;
    this.animations = null;
    this.itemPickupTime = 0;
    this.itemPickupShell = null;

    events.on("trainer_catches_pokemon", data => {
      this.onPickupItem(data);
    });
  }

  tryMove(root) {
    const { input } = root;
    if (!input || !input.direction) {
      this.animations.play(`stand${this.facingDirection}`);
      return;
    }

    let nextX = this.position.x;
    let nextY = this.position.y;
    const gridSize = 16;

    if (input.direction === 'down') nextY += gridSize;
    if (input.direction === 'up') nextY -= gridSize;
    if (input.direction === 'left') nextX -= gridSize;
    if (input.direction === 'right') nextX += gridSize;

    this.animations.play(`walk${input.direction.toUpperCase()}`);
    this.facingDirection = input.direction.toUpperCase();
    
    this.destinationPosition.x = nextX;
    this.destinationPosition.y = nextY;
  }

  onePickupItem({ image, position }) {
    // make sure land right on item
    this.destinationPosition = position.duplicate();
  }
  step(delta, root) {
    // lock movement if celebrating catching pokemon
    if (this.itemPickupTime > 0) {
      this.workOnItemPickup(delta);
      return;
    }

    const distance = moveTowards(this.position, this.destinationPosition, 1);
    const hasArrived = distance <= 1;

    // attempt to move again if trainer is at position
    if (hasArrived) {
      this.tryMove(root);
    }

    this.tryEmitPosition();
  }

  tryEmitPosition() {
    // Implementation not provided in the original code
  }

  onPickupItem({ image, position }) {
    // make sure land right on item
    this.destinationPosition = position.duplicate();

    // start pickup animation
    this.itemPickupTime = 1500; // ms

    this.itemPickupShell = new GameObject({});
    this.itemPickupShell.addChild(new Sprite({
      resource: image,
      position: new Vector2(0, -18)
    }));
    this.addChild(this.itemPickupShell);
  }

  workOnItemPickup(delta) {
    this.itemPickupTime -= delta;
    this.animations.play("pickUpDown");

    // remove pokemon being held overhead
    if (this.itemPickupTime <= 0) {
      this.itemPickupShell.destroy();
    }
  }
}

class Animations {
  constructor(patterns) {
    this.patterns = patterns;
    this.frameTime = 0;
    this.currentPattern = null;
  }

  play(patternName) {
    this.currentPattern = this.patterns[patternName];
    this.frameTime = 0;
  }

  update(delta) {
    if (this.currentPattern) {
      this.frameTime += delta;
      if (this.frameTime >= this.currentPattern.frameDuration) {
        this.frameTime -= this.currentPattern.frameDuration;
        this.currentPattern.nextFrame();
      }
    }
  }
}

const gridCells = (cells) => cells * 16;

['sky', 'ground'].forEach(type => {
  const sprite = new Sprite({
    resource: resources.images[type],
    frameSize: new Vector2(320, 180)
  });
  mainScene.addChild(sprite);
});

const trainer = new Trainer(gridCells(6), gridCells(5));
trainer.sprite = new Sprite({
  resource: resources.images.trainer,
  frameSize: new Vector2(32, 32),
  hFrames: 3,
  vFrames: 8,
  frame: 1,
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
  pickUpDown: new FrameIndexPattern(PICK_UP_DOWN),
});
trainer.addChild(trainer.sprite);

mainScene.addChild(trainer);

mainScene.input = new Input();

const shadow = new Sprite({
  resource: resources.images.shadow,
  frameSize: new Vector2(32, 32)
});
mainScene.addChild(shadow);
