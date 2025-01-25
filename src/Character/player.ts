import { Sprite, Assets } from "pixi.js";

/**
 * The Player class represents a controllable sprite in the game.
 * It handles movement, gravity simulation, and keyboard inputs.
 */
class Player {
    private sprite: Sprite | undefined; // The player's sprite instance
    private speed: number; // Speed of movement
    private velocity: { x: number; y: number }; // Velocity in x and y directions
    private gravity: number; // Gravity effect when no keys are pressed
    private floatingAmplitude: number; // Amplitude of floating motion
    private floatingSpeed: number; // Speed of floating animation
    private time: number; // Timer used for floating calculation
    private app: any; // Reference to the PIXI application

    /**
     * Creates an instance of Player.
     * @param texturePath - Path to the player's texture asset.
     * @param app - PIXI application instance.
     */
    constructor(texturePath: string, app: any) {
        this.app = app;
        this.speed = 5;
        this.velocity = { x: 0, y: 0 };
        this.gravity = 0.5;
        this.floatingAmplitude = 2;
        this.floatingSpeed = 0.05;
        this.time = 0;
        this.init(texturePath);
        this.setupKeyboardControls();
    }

    /**
     * Initializes the player's sprite and adds it to the stage.
     * @param texturePath - Path to the texture file.
     */
    private async init(texturePath: string) {
        const texture = await Assets.load(texturePath);
        this.sprite = new Sprite(texture);
        this.sprite.anchor.set(0.5);
        this.sprite.position.set(this.app.screen.width / 2, this.app.screen.height / 2);
        this.app.stage.addChild(this.sprite);
    }

    /**
     * Sets up event listeners for keyboard controls.
     */
    private setupKeyboardControls() {
        window.addEventListener("keydown", (e) => this.onKeyDown(e));
        window.addEventListener("keyup", (e) => this.onKeyUp(e));
    }

    /**
     * Handles key down events to update velocity.
     * @param event - The keyboard event.
     */
    private onKeyDown(event: KeyboardEvent) {
        switch (event.key) {
            case "ArrowUp":
                this.velocity.y = -this.speed;
                break;
            case "ArrowDown":
                this.velocity.y = this.speed;
                break;
            case "ArrowLeft":
                this.velocity.x = -this.speed;
                break;
            case "ArrowRight":
                this.velocity.x = this.speed;
                break;
        }
    }

    /**
     * Handles key up events to stop movement.
     * @param event - The keyboard event.
     */
    private onKeyUp(event: KeyboardEvent) {
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
     * @param delta - The delta time factor.
     */
    public update(delta: number) {
        if (!this.sprite) return;
        
        if (this.velocity.x === 0 && this.velocity.y === 0) {
            this.velocity.y += this.gravity;
        }
        else{
            this.sprite.x += Math.sin(this.time) * this.floatingAmplitude;
            this.time += this.floatingSpeed;
            this.sprite.x -= Math.sin(this.time) * this.floatingAmplitude;
        }

        this.sprite.x += this.velocity.x * delta;
        this.sprite.y += this.velocity.y * delta;
    }
}

export default Player;
