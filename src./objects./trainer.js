import { GameObject } from "../../GameObject.js";
import { Vector2 } from "../../Vector2.js";

export class trainer extends GameObject {
    constructor(x, y) {
        super({
            position: new Vector2(x, y)
        });
        this.animations = null; // Add this line to define animations
        this.facing = 'DOWN'; // Add this line to define initial facing direction
    }

    tryMove(root) {
        const input = root.input; // Assuming input is a property of root
        if (!input || !input.direction) {
            if (this.facing === 'DOWN') { this.animations.play("standDown"); }
            if (this.facing === 'UP') { this.animations.play("standUp"); }
            if (this.facing === 'LEFT') { this.animations.play("standLeft"); }
            if (this.facing === 'RIGHT') { this.animations.play("standRight"); }
            return;
        }

        let nextX = this.position.x;
        let nextY = this.position.y;
        const gridSize = 16;

        if (input.direction === 'DOWN') {
            nextY += gridSize;
            this.animations.play("walkDown");
        }
        if (input.direction === 'UP') {
            nextY -= gridSize;
            this.animations.play("walkUp");
        }
        if (input.direction === 'LEFT') {
            nextX -= gridSize;
            this.animations.play("walkLeft");
        }
        if (input.direction === 'RIGHT') {
            nextX += gridSize;
            this.animations.play("walkRight");
        }
        this.facing = input.direction ?? this.facing;

        // Update the trainer's position
        this.position.x = nextX;
        this.position.y = nextY;
    }
}
