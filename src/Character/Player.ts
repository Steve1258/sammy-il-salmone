import { Sprite, Assets, Application } from "pixi.js";
import Bullet from "../Bullet/Bullet";
import Enemy from "../Enemy/Enemy";

class Player {
    /**
     * Durata dello sprint in millisecondi.
     */
    private sprintDuration: number = 3000; // 3 secondi

    /**
     * Flag per verificare se il giocatore sta sprintando.
     */
    private isSprinting: boolean = false;

    /**
     * Velocità normale del giocatore.
     */
    private normalSpeed: number;

    /**
     * Flag to track if the player can shoot.
     */
    canshoot: boolean = false;

    /**
     * List of enemies in the game.
     */
    private enemies: Enemy[] = [];

    /**
     * Flag to track if the player is currently invulnerable.
     */
    private isInvulnerable: boolean = false;

    /**
     * Duration of invulnerability in milliseconds.
     */
    private invulnerabilityDuration: number = 2000; // 2 seconds

    /**
     * Number of lives the player has.
     */
    public life: number = 3;

    /**
     * actual bullet instance
     */
    private bullet: Bullet | undefined;

    /**
     * The player's sprite instance.
     */
    private sprite: Sprite | undefined;

    /**
     * Speed of movement.
     */
    private speed: number;

    /**
     * Velocity in x and y directions.
     */
    private velocity: { x: number; y: number };

    /**
     * Gravity effect when no keys are pressed.
     */
    private gravity: number;

    /**
     * Amplitude of floating motion.
     */
    private floatingAmplitude: number;

    /**
     * Speed of floating animation.
     */
    private floatingSpeed: number;

    /**
     * Timer used for floating calculation.
     */
    private time: number;

    /**
     * Reference to the PIXI application.
     */
    private app: Application;

    /**
     * Velocità aumentata durante lo sprint.
     */
    private sprintSpeed: number;

    /**
     * Creates an instance of Player.
     * @param {string} texturePath - Path to the player's texture asset.
     * @param {Application} app - PIXI application instance.
     */
    constructor(texturePath: string, app: Application) {
        this.app = app;
        this.normalSpeed = 5;
        this.sprintSpeed = 15;
        this.speed = this.normalSpeed;
        this.velocity = { x: 0, y: 0 };
        this.gravity = 0.5;
        this.floatingAmplitude = 10;
        this.floatingSpeed = 0.1;
        this.time = 0;
        this.init(texturePath);
        this.setupKeyboardControls();
    }

    /**
     * Initializes the player's sprite and adds it to the stage.
     * @param {string} texturePath - Path to the texture file.
     * @returns {Promise<void>}
     */
    private async init(texturePath: string): Promise<void> {
        const texture = await Assets.load(texturePath);
        this.sprite = new Sprite(texture);
        this.sprite.width = 90;
        this.sprite.height = 80;
        this.sprite.anchor.set(0.5);
        this.sprite.position.set(this.app.screen.width / 2, this.app.screen.height / 2);
        this.app.stage.addChild(this.sprite);
        this.sprite.zIndex = 1;
    }

    /**
     * Sets up event listeners for keyboard controls.
     */
    private setupKeyboardControls(): void {
        window.addEventListener("keydown", (e) => this.onKeyDown(e));
        window.addEventListener("keyup", (e) => this.onKeyUp(e));
    }

    private onKeyDown(event: KeyboardEvent): void {
        switch (event.key) {
            case "ArrowUp":
                this.velocity.y = -this.speed;
                break;
            case "ArrowDown":
                this.velocity.y = this.speed;
                break;
            case "ArrowLeft":
                this.velocity.x = -this.speed;
                if (this.sprite) this.sprite.scale.x *= -1;
                break;
            case "ArrowRight":
                this.velocity.x = this.speed;
                if (this.sprite) this.sprite.scale.x *= 1;
                break;
            case " ":
                if (this.canshoot) {
                    if (!this.bullet) {
                        this.bullet = new Bullet(this.app, this, "/assets/Object/Bullet/bullet_1.png", 10, this.enemies);
                        this.bullet.shot();
                    }
                    if (!this.bullet.sprite) {

                        this.bullet = new Bullet(this.app, this, "/assets/Object/Bullet/bullet_1.png", 10, this.enemies);
                        this.bullet.shot();
                    }
                }

                break;
            case "Shift":
                this.startSprint();
                break;
        }
    }
    /**
 * Inizia lo sprint aumentando temporaneamente la velocità del giocatore.
 */
    private startSprint(): void {
        if (this.isSprinting) return; // Se già sprinta, non fare nulla

        console.log("Sprint attivato!");
        this.isSprinting = true;
        this.speed = this.sprintSpeed;

        setTimeout(() => {
            this.stopSprint();
        }, this.sprintDuration);
    }

    /**
     * Termina lo sprint e ripristina la velocità normale.
     */
    private stopSprint(): void {
        console.log("Sprint terminato!");
        this.isSprinting = false;
        this.speed = this.normalSpeed;
    }
    /**
     * Restituisce la lista dei nemici attuali del player.
     * @returns {Enemy[]} Lista di nemici.
     */
    public getEnemies(): Enemy[] {
        return this.enemies;
    }

    /**
     * Set the list of enemies in the game.
     * @param {Enemy[]} enemiesList - Array of enemies in the game.
     */
    public setEnemies(enemiesList: Enemy[]): void {
        this.enemies = enemiesList;
    }

    /**
     * Retrieves the current movement direction of the player.
     * @returns {string} The current direction: "left", "right", "up", "down", or "idle".
     */
    public getDirection(): string {
        if (this.velocity.x > 0) return "right";
        if (this.velocity.x < 0) return "left";
        if (this.velocity.y > 0) return "down";
        if (this.velocity.y < 0) return "up";
        return "idle";
    }

    /**
     * Retrieves the player's current X-coordinate position.
     * @returns {number} The X position of the player sprite. Returns `0` if the sprite is not initialized.
     */
    public getX(): number {
        return this.sprite ? this.sprite.x : 0;
    }

    /**
     * Retrieves the player's current Y-coordinate position.
     * @returns {number} The Y position of the player sprite. Returns `0` if the sprite is not initialized.
     */
    public getY(): number {
        return this.sprite ? this.sprite.y : 0;
    }

    /**
     * Returns the player's sprite instance.
     * @returns {Sprite} The player sprite object.
     * @throws Will throw an error if the sprite is not initialized.
     */
    public getSprite(): Sprite {
        return this.sprite!;
    }

    /**
     * Handles key up events to stop movement.
     * @param {KeyboardEvent} event - The keyboard event.
     */
    private onKeyUp(event: KeyboardEvent): void {
        switch (event.key) {
            case "ArrowUp":
            case "ArrowDown":
                this.velocity.y = 0;
                break;
            case "ArrowLeft":
            case "ArrowRight":
                this.velocity.x = 0;
                break;
        }
    }



    /**
     * Handles when the player gets hit by an enemy or obstacle.
     * Reduces the player's life count and starts an invulnerability period.
     */
    public hit(): void {
        if (this.isInvulnerable) {
            console.log("Player is invulnerable, hit ignored.");
            return;
        }

        if (this.life > 0) {
            this.life--;
            console.log(`Player hit! Lives left: ${this.life}`);

            if (this.life <= 0) {
                this.gameOver();
            } else {
                this.startInvulnerability();
            }
        }
    }

    /**
     * Handles game over when player's lives reach zero.
     */
    private gameOver(): void {
        console.log("Game Over!");
        window.location.href = "/game-over.html";
    }

    /**
     * Starts a brief invulnerability period after the player is hit.
     */
    private startInvulnerability(): void {
        this.isInvulnerable = true;
        console.log("Player is now invulnerable.");

        // Optionally change the player's appearance to show invulnerability
        this.sprite!.alpha = 0.5; // Make the player transparent

        setTimeout(() => {
            this.isInvulnerable = false;
            this.sprite!.alpha = 1; // Restore normal appearance
            console.log("Player is no longer invulnerable.");
        }, this.invulnerabilityDuration);
    }


    /**
     * Updates the player's position and applies gravity and floating effect.
     * @param {number} delta - The delta time factor.
     */
    public update(delta: number): void {
        if (!this.sprite) return;

        if (this.velocity.x === 0 && this.velocity.y === 0) {
            this.velocity.y += this.gravity;
        } else {
            this.sprite.x += Math.sin(this.time) * this.floatingAmplitude;
            this.time += this.floatingSpeed;
            this.sprite.x -= Math.sin(this.time) * this.floatingAmplitude;
        }

        this.sprite.x += this.velocity.x * delta;
        this.sprite.y += this.velocity.y * delta;

        const screenBottom = this.app.screen.height - this.sprite.height / 2;
        if (this.sprite.y > screenBottom) {
            this.sprite.y = screenBottom;
            this.velocity.y = 0;
        }
        this.app.stage.pivot.set(this.sprite.x - this.app.screen.width / 2, 0);
    }
}

export default Player;