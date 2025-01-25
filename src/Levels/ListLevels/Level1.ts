import { Application } from "pixi.js";
import BaseLevel from "../BaseLevel";
import LevelSprite from "../../Interfaces/LevelSprite";
import Enemy from "../../Enemy/Enemy";
import Player from "../../Character/Player";
import ParallaxBackground from "../../Utils/ParallaxBackground";

class Level1 extends BaseLevel {
    public platforms: LevelSprite[] = [];
    private levelMatrix: string[][];

    constructor(app: Application, player: Player) {
        super(app);

        this.levelMatrix = [
            ["", "", "E", "", ""],
            ["", "", "", "Enemy2", ""],
            ["", "C", "", "C", ""],
        ];

        // Specifica una griglia di 1x5 sfondi consecutivi
        new ParallaxBackground(app, [
            "/assets/background_layer1.jpg",
        ], { rows: 1, cols: 5 });

        // Definizione degli oggetti con il tipo LevelSprite
        const objectTypes: Record<string, LevelSprite> = {
            "E": {
                x: 300,
                y: 200,
                width: 100,
                height: 100,
                texturePath: "/assets/Enemy/shark.png",
                object: new Enemy(player, app)
            },
            "Enemy2": {
                x: 300,
                y: 200,
                width: 250,
                height: 100,
                texturePath: "/assets/Enemy/shark.png",
                object: new Enemy(player, app)
            },
            "C": {
                x: 500,
                y: 300,
                width: 150,
                height: 350,
                texturePath: "/assets/Colonne.png",
            },
            G": {
                x: 300,
                y: 150,
                width: 100,
                height: 100,
                texturePath: "/assets/Enemy/granchio.png",
                object: new Enemy(player, app)
            },
            "A1": {
                x:300,
                y: 200,
                width: 150,
                height: 300,
                texturePath: "/assets/alga con bolle.png",

            },
            "A2": {
                x:300,
                y: 200,
                width: 150,
                height: 300,
                texturePath: "/assets/alga con bolle.png",

            },
        };

        // Genera il livello dalla matrice
        this.generateLevelFromMatrix(this.levelMatrix, objectTypes);
    }
}

export default Level1;