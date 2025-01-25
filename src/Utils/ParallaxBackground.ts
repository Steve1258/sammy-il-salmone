import { Sprite, Application, Assets, Texture } from "pixi.js";

class ParallaxBackground {
    private layers: Sprite[][];
    private app: Application;
    private gridSize: { rows: number; cols: number };

    constructor(app: Application, texturePaths: string[], gridSize: { rows: number; cols: number }) {
        this.app = app;
        this.layers = [];
        this.gridSize = gridSize;
        this.init(texturePaths);
    }

    private async init(texturePaths: string[]) {
        for (let i = 0; i < texturePaths.length; i++) {
            const texture = await Assets.load(texturePaths[i]);
            this.layers[i] = [];

            for (let row = 0; row < this.gridSize.rows; row++) {
                for (let col = 0; col < this.gridSize.cols; col++) {
                    const sprite = new Sprite(texture);
                    sprite.width = this.app.screen.width;
                    sprite.height = this.app.screen.height;
                    sprite.position.set(col * this.app.screen.width, row * this.app.screen.height);

                    this.layers[i].push(sprite);
                    this.app.stage.addChild(sprite);
                }
            }
        }
    }
}

export default ParallaxBackground;