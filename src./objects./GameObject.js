export class Pokemon extends GameObject {
    constructor(x, y) {
        super({
            position: new Vector2(x, y)
        });

        const sprite = new Sprite({
            resource: resources.images.rod,
            position: new Vector2(0, -5)
        });
        this.addChild(sprite);
    }

    ready() {
        console.log("Pokemon is ready!");

        events.on("TRAINER_POSITION", pos => {
            const roundedTrainerX = Math.round(pos.x);
            const roundedTrainerY = Math.round(pos.y);

            if (roundedTrainerX === this.position.x && roundedTrainerY === this.position.y) {
                this.onCollideWithTrainer();
            }
        });
    }

    onCollideWithTrainer() {
        this.destroy();
        events.emit("trainer_catches_pokemon", {
            image: resources.images.pokemon,
            position: this.position
        });
    }

    draw(ctx, x, y) {
        const drawPosX = x + this.position.x;
        const drawPosY = y + this.position.y;
    
        this.drawImage(ctx, drawPosX, drawPosY);

        this.getDrawChildrenOrdered().forEach(child => child.draw(ctx, drawPosX, drawPosY));
    }

    getDrawChildrenOrdered() {
        return [...this.children].sort((a, b) => {
            if (b.drawLayer === "FLOOR") {
                return 1;
            }
            return a.position.y > b.position.y ? 1 : -1;
        });
    }

    destroy() {
        this.children.forEach(child => {
            child.destroy();
        });
        this.parent.removeChild(this);
    }
}
