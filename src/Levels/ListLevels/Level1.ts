import { Application } from "pixi.js";
import BaseLevel from "../BaseLevel";
import LevelSprite from "../../Interfaces/LevelSprite";
import Enemy from "../../Enemy/Enemy";
import Player from "../../Character/Player";
import ParallaxBackground from "../../Utils/ParallaxBackground";

class Level1 extends BaseLevel {
    private enemies: Enemy[] = [];
    public platforms: LevelSprite[] = [];
    private levelMatrix: string[][];

    constructor(app: Application, player: Player) {
        super(app);

        this.levelMatrix = [
            ["", "", "", "", ""],
            ["", "", "", "", ""],
            ["", "C", "A1", "C", "G"],
        ];

        // Specifica una griglia di 1x5 sfondi consecutivi
        new ParallaxBackground(app, [
            "/assets/background_layer1.jpg",
        ], { rows: 1, cols: 5 });

        // Definizione degli oggetti con il tipo LevelSprite
        const objectTypes: Record<string, LevelSprite> = {
            "Enemy2": {
                x: 300,
                y: 200,
                width: 250,
                height: 100,
                texturePath: "/assets/Enemy/Squalo.png",
                object: new Enemy(player, app)
            },
            "C": {
                x: 500,
                y: 300,
                width: 150,
                height: 350,
                texturePath: "/assets/Colonne.png",
            },
            "G": {
                x: 300,
                y: 150,
                width: 100,
                height: 100,
                texturePath: "/assets/Enemy/granchio.png",
            },
            "A1": {
                x: 300,
                y: 200,
                width: 150,
                height: 300,
                texturePath: "/assets/corallo_di_due_colori.png",

            },
            "A2": {
                x: 300,
                y: 200,
                width: 150,
                height: 300,
                texturePath: "/assets/corallo_rosso.png",

            },
        };
        // Genera il livello dalla matrice
        this.generateLevelFromMatrix(this.levelMatrix, objectTypes);

        // Cattura tutti i nemici generati nel livello
        // Collezioniamo tutti i nemici
        this.enemies = Object.values(objectTypes)
            .filter(obj => obj.object instanceof Enemy)
            .map(obj => obj.object as Enemy);

        player.setEnemies(this.enemies);

        // Genera il livello dalla matrice
        this.generateLevelFromMatrix(this.levelMatrix, objectTypes);
    }

    /**
     * Rimuove un nemico dal livello.
     * @param {Enemy} enemy - Il nemico da rimuovere.
     */
    public removeEnemy(enemy: Enemy): void {
        this.enemies = this.enemies.filter(e => e !== enemy);
        console.log("Nemico rimosso dal livello.");
    }

    public getEnemies(): Enemy[] {
        return this.enemies;
    }
}

export default Level1;