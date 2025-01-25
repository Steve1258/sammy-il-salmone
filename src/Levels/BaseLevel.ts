import { Container, Assets, ArrayOr, UnresolvedAsset, Sprite, Application, Texture } from "pixi.js";
import LevelSprite from "../Interfaces/LevelSprite";

// Classe base per tutti i livelli
class BaseLevel {
    protected container: Container;
    protected boundaries: { minX: number; maxX: number; minY: number; maxY: number };
    protected platforms: Array<{ x: number; y: number; width: number; height: number }>;
    protected app: Application;

    constructor(app: Application) {
        this.container = new Container();
        this.app = app;
        this.boundaries = {
            minX: 0,
            maxX: this.app.screen.width,
            minY: 0,
            maxY: this.app.screen.height - 50, // Terra a 50px dal fondo
        };
        this.platforms = [];
    }

    // Metodo per aggiungere piattaforme
    protected async addLevelSprite(levelsSprite: LevelSprite[]) {
        let texture: Texture;
        let sprite: Sprite;
        levelsSprite.forEach(async (level) => {
            texture = await Assets.load(level.texturePath);
            sprite = new Sprite(texture);
            sprite.anchor.set(0.5);
            sprite.position.set(level.x, level.y);
            this.app.stage.addChild(sprite);
            level.object.handleObject();
        });
            
    }

    // Controllo collisioni generiche
    public checkCollision(x: number, y: number, width: number, height: number): boolean {
        if (x < this.boundaries.minX || x + width > this.boundaries.maxX || y < this.boundaries.minY) {
            return true;
        }

        for (const platform of this.platforms) {
            if (
                x + width > platform.x &&
                x < platform.x + platform.width &&
                y + height >= platform.y &&
                y + height <= platform.y + platform.height
            ) {
                return true;
            }
        }

        return false;
    }

    public getContainer() {
        return this.container;
    }
}

export default BaseLevel;
