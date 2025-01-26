import { Application, Sprite } from "pixi.js";
import GenericObject from "../Utils/GenericObject";
import Player from "../Character/Player";
import GameUI from "../Utils/GameUI";

class PowerUp extends GenericObject {
    private player: Player;
    private app: Application;
    private gameUI: GameUI;
    private sprite: Sprite | undefined;
    private collected: boolean = false;

    constructor(player: Player, app: Application, gameUI: GameUI) {
        super();
        this.player = player;
        this.app = app;
        this.gameUI = gameUI;
    }

    public async handleObject(params?: any): Promise<void> {
        if (!params) return;
        this.sprite = params.sprite as Sprite;
        this.app.stage.addChild(this.sprite);
        this.checkCollision();
    }

    private checkCollision(): void {
        const collisionHandler = () => {
            if (this.collected || !this.sprite) return;

            if (this.isColliding(this.player.getSprite(), this.sprite)) {
                console.log("PowerUp raccolto!");
                this.gameUI.addItemToInventory("/assets/Object/Bullet/bullet_1.png", 0);
                this.player.canshoot = true;
                this.collectPowerUp();

                // Rimuove l'evento di collisione dal ticker
                this.app.ticker.remove(collisionHandler);
            }
        };

        this.app.ticker.add(collisionHandler);
    }

    /**
     * Controlla se il player collide con l'oggetto power-up.
     */
    private isColliding(playerSprite: Sprite, powerUpSprite: Sprite): boolean {
        const playerBounds = playerSprite.getBounds();
        const powerUpBounds = powerUpSprite.getBounds();

        return (
            playerBounds.x < powerUpBounds.x + powerUpBounds.width &&
            playerBounds.x + playerBounds.width > powerUpBounds.x &&
            playerBounds.y < powerUpBounds.y + powerUpBounds.height &&
            playerBounds.y + playerBounds.height > powerUpBounds.y
        );
    }

    /**
     * Rimuove il power-up dalla scena e dalla lista degli oggetti.
     */
    private collectPowerUp(): void {
        if (this.sprite && this.app.stage.children.includes(this.sprite)) {
            this.app.stage.removeChild(this.sprite);
            this.sprite.visible = false;
            this.collected = true;

            // Rimuove il power-up dalla lista dei power-up del player, se presente
            if (this.app.stage.getChildByName("level")) {
                const level = this.app.stage.getChildByName("level") as any;
                if (level && level.removePowerUp) {
                    level.removePowerUp(this);
                }
            }

            console.log("PowerUp rimosso con successo!");
        }
    }
}

export default PowerUp;