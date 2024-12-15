class Events {
    constructor() {
        this.callbacks = [];
        this.nextId = 0;
    }

    // emit event
    emit(eventName, value) {
        this.callbacks.forEach(stored => {
            if (stored.eventName === eventName) {
                stored.callback(value);
            }
        });
    }

    // subscribe to something happening
    on(eventName, caller, callback) {
        this.nextId += 1;
        this.callbacks.push({
            id: this.nextId,
            eventName,
            caller,
            callback,
        });
        return this.nextId;
    }

    // remove subscription
    off(id) {
        this.callbacks = this.callbacks.filter((stored) => stored.id !== id);
    }

    unsubscribe(caller) {
        this.callbacks = this.callbacks.filter(
            (stored) => stored.caller !== caller
        );
    }
}

// Assuming the necessary imports and class definitions are present

// build up scene by adding sky, ground, and trainer
const skySprite = new Sprite({
    resource: resources.images.sky,
    frameSize: new Vector2(320, 180)
});
mainScene.addChild(skySprite);

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
});
mainScene.addChild(trainer);

// add input class to main scene
mainScene.input = new Input();

const shadow = new Sprite({
    resource: resources.images.shadow,
    frameSize: new Vector2(32, 32)
});

// establish update and draw loops
const update = (delta) => {
    mainScene.stepEntry(delta, mainScene);
};

const draw = () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height); // Clear canvas before drawing

    mainScene.draw(ctx, 0, 0);
    skySprite.drawImage(ctx, 0, 0);
    groundSprite.drawImage(ctx, 0, 0);

    // center trainer in cell
    const trainerOffset = new Vector2(-8, -21);
    const trainerPositionX = trainer.position.x + trainerOffset.x;
    const trainerPositionY = trainer.position.y + trainerOffset.y;

    shadow.drawImage(ctx, trainer.position.x, trainer.position.y);
    trainer.sprite.drawImage(ctx, trainerPositionX, trainerPositionY);
};

// game loop
const gameLoop = new GameLoop(update, draw);
gameLoop.start();