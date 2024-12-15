import {GameObject} from "./GameObject.js"

export class Sprite {
    constructor({
            resource, // image want to draw
            frameSize, // size of crop of image
            hFrames = 1, // how sprite arranged horizontally
            vFrames = 1, // how sprite arranged vertically
            frame = 0, // which frame want to show
            scale = 1, // how large to draw image
            position = new Vector2(0, 0), // where to draw it
            animations = null
        }) {
        super({})
        this.resource = resource;
        this.frameSize = frameSize;
        this.hFrames = hFrames;
        this.vFrames = vFrames;
        this.frame = frame;
        this.frameMap = new Map();
        this.scale = scale;
        this.position = position;
        this.animations = animations;
        this.buildFrameMap();
    }

    buildFrameMap() {
        let frameCount = 0;
        for (let v = 0; v < this.vFrames; v++) {
            for (let h = 0; h < this.hFrames; h++) {
                this.frameMap.set(
                    frameCount,
                    { x: h * this.frameSize.width, y: v * this.frameSize.height }
                );
                frameCount++;
            }
        }
    }

    step(delta) {
        if (!this.animations) {
            return;
        }
        this.animations.step(delta);
        this.frame = this.animations.frame;
    }

    drawImage(ctx) {
        const framePosition = this.frameMap.get(this.frame);
        ctx.drawImage(
            this.resource,
            framePosition.x,
            framePosition.y,
            this.frameSize.width,
            this.frameSize.height,
            this.position.x,
            this.position.y,
            this.frameSize.width * this.scale,
            this.frameSize.height * this.scale
        );
    }
}
