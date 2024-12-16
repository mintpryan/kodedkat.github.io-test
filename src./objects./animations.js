import { FrameIndexPattern } from "./FrameIndexPattern.js";
import { WALK_DOWN, WALK_LEFT, WALK_RIGHT, WALK_UP, STAND_DOWN, STAND_UP, STAND_LEFT, STAND_RIGHT } from "./objects/hero/heroAnimations.js";

export class Animations {
    constructor(patterns) {
        this.patterns = patterns;
        this.activeKey = Object.keys(this.patterns)[0];
    }

    get frame() {
        return this.patterns[this.activeKey].frame;
    }

    place(key, startAtTime = 0) {
        // already playing this one
        if (this.activeKey === key) {
            return;
        }
        // switch
        this.activeKey = key;
        this.patterns[this.activeKey].currentTime = startAtTime;
    }

    step(delta) {
        this.patterns[this.activeKey].step(delta);
    }
}
