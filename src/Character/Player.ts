import { Sprite, Assets, Application } from "pixi.js";
import Bullet from "../Bullet/Bullet";

class Player {
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
     * Creates an instance of Player.
     * @param {string} texturePath - Path to the player's texture asset.
     * @param {Application} app - PIXI application instance.
     */
    constructor(texturePath: string, app: Application) {
        this.app = app;
        this.speed = 5;
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

    /**
     * Handles key down events to update velocity and shooting.
     * @param {KeyboardEvent} event - The keyboard event.
     */
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
                if (this.sprite) this.sprite.scale.x = -1;
                break;
            case "ArrowRight":
                this.velocity.x = this.speed;
                if (this.sprite) this.sprite.scale.x = 1;
                break;
            case " ":
                if (!this.bullet) {
                    this.bullet = new Bullet(this.app, this, "/assets/Object/Bullet/bullet_1.png", 10);
                    this.bullet.shot();
                }
                if (!this.bullet.sprite) {
                    this.bullet = new Bullet(this.app, this, "/assets/Object/Bullet/bullet_1.png", 10);
                    this.bullet.shot();
                }
                break;
        }
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