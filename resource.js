class Resource {
    constructor() {
        // Object containing paths to image resource
        this.toLoad = {
            sky: "/sprites/sky.png",
            ground: "sprites/ground.png",
            hero: "/sprites/hero-sheet.png",
            shadow: "/sprites/shadow.png",
            espeon: "/sprites.espeon.png",
        };

        // Object to store loaded images
        this.images = {};

        // Load each image
        Object.keys(this.toLoad).forEach(key => {
            const img = new Image();
            img.src = this.toLoad[key];
            this.images[key] = {
                image: img,
                isLoaded: false
            }
            img.onload = () => {
                this.images[key].isLoaded = true;
            }
        });
    }
}

export const resource = new Resource();
