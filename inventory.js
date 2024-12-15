import { GameObject } from "../../GameObject.js";
import { sprite } from "../../sprite.js";
import { resource } from "../../resource.js";
import { Vector2 } from "../../Vector2.ts";
import { events } from "../../events.js";

export class Inventory extends GameObject {
    constructor() {
        super({
            position: new Vector2(0, 1)
        });

        this.nextId = 0;
        this.items = [];

        // react to trainer catching espeon
        events.on("TRAINER_CATCHES_POKEMON", data => {
            this.nextId += 1;
            this.items.push({
                id: this.nextId,
                image: resource.images.pokemon
            });
            this.renderInventory();
        });

        // draw initial state on bootup
        this.renderInventory();
    }

    stepEntry(delta, root) {
        // call updates on all children first
        this.children.forEach(child => child.stepEntry(delta, root));

        // call ready on first frame
        if (!this.hasReadyBeenCalled) {
            this.hasReadyBeenCalled = true;
            this.ready();
        }

        // call any implemented step code
        this.step(delta, root);
    }

    // called before first step
    ready() {
        // ...
    }

    // called once every frame
    step(_delta) {
        // ...
    }

    // draw entry
    draw(ctx, x, y) {
        const drawPosX = x + this.position.x;
        const drawPosY = y + this.position.y;

        // do actual rendering for images
        this.children.forEach(child => child.draw(ctx, drawPosX, drawPosY));
    }

    renderInventory() {
        // remove stale drawings
        this.children.forEach(child => child.destroy());

        // draw fresh from latest version of list
        this.items.forEach((item, index) => {
            const sprite = new Sprite({
                resource: item.image,
                position: new Vector2(index * 12, 0)
            });
            this.addChild(sprite);
        });
    }

    removeFromInventory(id) {
        this.items = this.items.filter(item => item.id !== id);
        this.renderInventory();
    }
}
