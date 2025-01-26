import { Container, Assets, Sprite, Application, Texture } from "pixi.js";
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

    protected async generateLevelFromMatrix(matrix: string[][], objectMapping: Record<string, LevelSprite>) {
        const tileSize = 200; // Dimensione di ciascun "blocco" della matrice
        const lastRowIndex = matrix.length - 1; // Trova l'ultima riga della matrice

        for (let row = 0; row < matrix.length; row++) {
            for (let col = 0; col < matrix[row].length; col++) {
                const symbol = matrix[row][col];

                if (symbol && objectMapping[symbol]) {
                    const objectConfig = objectMapping[symbol];

                    const texture = await Assets.load(objectConfig.texturePath);
                    const sprite = new Sprite(texture);
                    sprite.zIndex = 1;

                    sprite.width = objectConfig.width;
                    sprite.height = objectConfig.height;

                    // Se l'oggetto è nell'ultima riga, posizionalo in fondo alla mappa
                    let posX = col * tileSize;
                    let posY = row === lastRowIndex
                        ? this.app.screen.height - objectConfig.height / 2  // Posiziona in basso
                        : row * tileSize;  // Posiziona normalmente

                    sprite.position.set(posX, posY);
                    sprite.anchor.set(0.5);

                    this.app.stage.addChild(sprite);

                    if (objectConfig.object) {
                        objectConfig.object.handleObject({ sprite });
                    }

                    // Aggiungi l'oggetto alla lista delle piattaforme se necessario
                    if (symbol === "P") {
                        this.platforms.push({
                            x: posX,
                            y: posY,
                            width: objectConfig.width,
                            height: objectConfig.height,
                        });
                    }
                }
            }
        }
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
