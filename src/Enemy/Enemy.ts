import { Application, Sprite, Ticker } from "pixi.js";
import GenericObject from "../Utils/GenericObject";
import Player from "../Character/Player";

interface EnemyParams {
    sprite: Sprite;
    chaseDistance: number;  // Distanza minima per iniziare l'inseguimento
    speed: number;          // Velocità di movimento del nemico
}

class Enemy extends GenericObject {
    private spriteEnemy: Sprite | undefined;
    private player: Player;
    private chaseDistance: number;
    private speed: number;
    private app: Application;

    constructor(player: Player, app: Application) {
        super();
        this.player = player;
        this.chaseDistance = 300;
        this.speed = 2;
        this.app = app;
    }

    /**
     * Inizializza il nemico con parametri specifici.
     * @param params - Parametri contenenti lo sprite del nemico, la distanza di inseguimento e la velocità.
     */
    public async handleObject(params?: EnemyParams): Promise<void> {
        if (!params) return;

        this.spriteEnemy = params.sprite as Sprite;
        this.chasePlayer();
    }

    /**
     * Controlla se il nemico è abbastanza vicino al giocatore per iniziare l'inseguimento.
     */
    public chasePlayer(): void {
        this.app.ticker.add(() => {
            if (!this.spriteEnemy) {
                console.error("Nemico non inizializzato! chasePlayer");
                return;
            }
            const playerX = this.player.getX();
            const playerY = this.player.getY();
            const enemyX = this.spriteEnemy.x;
            const enemyY = this.spriteEnemy.y;
            // Calcola la distanza usando il teorema di Pitagora: d = sqrt((x2 - x1)^2 + (y2 - y1)^2)
            const distance = Math.sqrt(
                Math.pow(playerX - enemyX, 2) + Math.pow(playerY - enemyY, 2)
            );

            if (distance <= this.chaseDistance) {
                this.moveTowardsPlayer(playerX, playerY);
            }
            if (distance <= 0) {
                this.player.hit();
            }
        });

    }

    /**
     * Muove il nemico verso la posizione del giocatore.
     * @param playerX - Coordinata X del giocatore
     * @param playerY - Coordinata Y del giocatore
     */
    private moveTowardsPlayer(playerX: number, playerY: number): void {
        if (!this.spriteEnemy) {
            console.error("Nemico non inizializzato! moveTowardsPlayer");
            return;
        }
        const dx = playerX - this.spriteEnemy.x;
        const dy = playerY - this.spriteEnemy.y;
        const angle = Math.atan2(dy, dx);

        // Movimento basato su velocità e direzione
        this.spriteEnemy.x += Math.cos(angle) * this.speed;
        this.spriteEnemy.y += Math.sin(angle) * this.speed;
    }

    public getSprite(): Sprite | undefined {
        return this.spriteEnemy;
    }
}

export default Enemy;