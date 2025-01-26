import { Application } from "pixi.js";
import BaseLevel from "../BaseLevel";
import LevelSprite from "../../Interfaces/LevelSprite";
import Enemy from "../../Enemy/Enemy";
import Player from "../../Character/Player";
import ParallaxBackground from "../../Utils/ParallaxBackground";
import PowerUp from "../../PowerUp/PowerUp";
import GameUI from "../../Utils/GameUI";

class Level1 extends BaseLevel {
    private enemies: Enemy[] = [];
    public platforms: LevelSprite[] = [];
    private levelMatrix: string[][];

    constructor(app: Application, player: Player, gameUI: GameUI) {
        super(app);

        this.levelMatrix = [
            ["", "G2", "", "", "", "", "", "G3", "", "", "", "Enemy3", "", "", "", "", "", "", "", "", "", "", "", "", "G4", "", "", "", "Enemy5", "", "", "", "", "", "", "", "",],
            ["", "", "", "", "", "", "G5", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "Enemy4", "", "", "G6", "", "", "", "", "", "", "Enemy6", "", "", "", "", "",],
            ["", "A1", "A2", "C", "A1", "A2", "", "G7", "", "A1", "A2", "C", "", "A1", "C", "", "C", "", "G8", "", "A1", "C", "A1", "A2", "", "A1", "C", "A2", "", "C", "A1", "A2", "C", "G9", "Boss", "", "", "",],
            ["", "", "", "", "G10", "", "", "", "", "", "", "", "", "", "", "", "", "", "G11", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "G12", "", ""],
            ["", "G13", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "G14", "", "", "", "", "", "", "", "", "", "", "", "G15", "", "", ""]
        ];

        // Specifica una griglia di 1x5 sfondi consecutivi
        new ParallaxBackground(app, [
            "/assets/background_layer1.jpg",
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
            "Boss": {
                x: 300,
                y: 200,
                width: 250,
                height: 150,
                texturePath: "/assets/Salmonella.png",
                object: new Enemy(player, app, true)
            },
            "Enemy3": {
                x: 300,
                y: 200,
                width: 250,
                height: 100,
                texturePath: "/assets/Enemy/Squalo.png",
                object: new Enemy(player, app)
            },
            "Enemy4": {
                x: 300,
                y: 200,
                width: 250,
                height: 100,
                texturePath: "/assets/Enemy/Squalo.png",
                object: new Enemy(player, app)
            },
            "Enemy5": {
                x: 300,
                y: 200,
                width: 250,
                height: 100,
                texturePath: "/assets/Enemy/Squalo.png",
                object: new Enemy(player, app)
            },
            "Enemy6": {
                x: 300,
                y: 200,
                width: 250,
                height: 100,
                texturePath: "/assets/Enemy/Squalo.png",
                object: new Enemy(player, app)
            },
            "Enemy7": {
                x: 300,
                y: 200,
                width: 250,
                height: 100,
                texturePath: "/assets/Enemy/Squalo.png",
                object: new Enemy(player, app, true)
            },
            "C": {
                x: 500,
                y: 300,
                width: 150,
                height: 350,
                texturePath: "/assets/Colonne.png",
            },
            "A1": {
                x: 300,
                y: 200,
                width: 150,
                height: 300,
                texturePath: "/assets/Items/Coralli/corallo_di_due_colori.png",

            },
            "A2": {
                x: 300,
                y: 200,
                width: 150,
                height: 300,
                texturePath: "/assets/Items/Coralli/corallo_rosso.png",

            },
            "G2": {
                x: 300,
                y: 100,
                width: 100,
                height: 100,
                texturePath: "/assets/Enemy/granchio.png",
                object: new PowerUp(player, app, gameUI)
            },
            "G3": {
                x: 300,
                y: 100,
                width: 100,
                height: 100,
                texturePath: "/assets/Enemy/granchio.png",
                object: new PowerUp(player, app, gameUI)
            },
            "G4": {
                x: 300,
                y: 100,
                width: 100,
                height: 100,
                texturePath: "/assets/Enemy/granchio.png",
                object: new PowerUp(player, app, gameUI)
            },
            "G5": {
                x: 300,
                y: 100,
                width: 100,
                height: 100,
                texturePath: "/assets/Enemy/granchio.png",
                object: new PowerUp(player, app, gameUI)
            },
            "G6": {
                x: 300,
                y: 100,
                width: 100,
                height: 100,
                texturePath: "/assets/Enemy/granchio.png",
                object: new PowerUp(player, app, gameUI)
            },
            "G7": {
                x: 300,
                y: 100,
                width: 100,
                height: 100,
                texturePath: "/assets/Enemy/granchio.png",
                object: new PowerUp(player, app, gameUI)
            },
            "G8": {
                x: 300,
                y: 100,
                width: 100,
                height: 100,
                texturePath: "/assets/Enemy/granchio.png",
                object: new PowerUp(player, app, gameUI)
            },
            "G9": {
                x: 300,
                y: 100,
                width: 100,
                height: 100,
                texturePath: "/assets/Enemy/granchio.png",
                object: new PowerUp(player, app, gameUI)
            },
            "G10": {
                x: 300,
                y: 100,
                width: 100,
                height: 100,
                texturePath: "/assets/Enemy/granchio.png",
                object: new PowerUp(player, app, gameUI)
            },
            "G11": {
                x: 300,
                y: 100,
                width: 100,
                height: 100,
                texturePath: "/assets/Enemy/granchio.png",
                object: new PowerUp(player, app, gameUI)
            },
            "G12": {
                x: 300,
                y: 100,
                width: 100,
                height: 100,
                texturePath: "/assets/Enemy/granchio.png",
                object: new PowerUp(player, app, gameUI)
            },
            "G13": {
                x: 300,
                y: 100,
                width: 100,
                height: 100,
                texturePath: "/assets/Enemy/granchio.png",
                object: new PowerUp(player, app, gameUI)
            },
            "G14": {
                x: 300,
                y: 100,
                width: 100,
                height: 100,
                texturePath: "/assets/Enemy/granchio.png",
                object: new PowerUp(player, app, gameUI)
            },
            "G15": {
                x: 300,
                y: 100,
                width: 100,
                height: 100,
                texturePath: "/assets/Enemy/granchio.png",
                object: new PowerUp(player, app, gameUI)
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

    public removePowerUp(powerUp: PowerUp): void {
        for (let i = 0; i < this.platforms.length; i++) {
            if (this.platforms[i].object === powerUp) {
                this.platforms.splice(i, 1);
                console.log("PowerUp rimosso dal livello.");
                break;
            }
        }
    }
}

export default Level1;