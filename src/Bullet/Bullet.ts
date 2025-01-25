import { Sprite, Application, Assets } from "pixi.js";
import Player from "../Character/Player";

class Bullet {
	public sprite: Sprite | undefined;
	private speed: number;
	private app: Application;
	private player: Player;
	private texturePath: string;
	private maxDistance: number;
	private initialX: number;

	constructor(app: Application, player: Player, texturePath: string, speed: number, maxDistance: number = 500) {
		this.app = app;
		this.player = player;
		this.texturePath = texturePath;
		this.speed = speed;
		this.maxDistance = maxDistance;
		this.initialX = 0; // Viene impostato al momento dello sparo
	}

	/**
	 * Inizializza e spara il proiettile.
	 */
	public async shot() {
		try {
			const texture = await Assets.load(this.texturePath);
			this.sprite = new Sprite(texture);
			this.sprite.anchor.set(0.5);
			this.sprite.scale.set(0.1);
			this.initialX = this.player.getX(); // Registra la posizione iniziale dello sparo
			this.sprite.position.set(this.initialX, this.player.getY());

			// Determina la direzione del player e imposta la velocità di conseguenza
			const direction = this.player.getDirection();
			if (direction === "left") {
				this.speed = -Math.abs(this.speed);  // Spara a sinistra
			} else {
				this.speed = Math.abs(this.speed);   // Spara a destra
			}

			this.app.stage.addChild(this.sprite);
			this.animate();
		} catch (error) {
			console.error("Error loading bullet texture:", error);
		}
	}

	/**
	 * Gestisce il movimento del proiettile.
	 */
	private animate() {
		this.app.ticker.add(() => {
			if (!this.sprite) {
				return;  // Esci se lo sprite non è stato inizializzato correttamente
			}

			// Movimento del proiettile in base alla direzione
			this.sprite.x += this.speed;

			// Controlla se il proiettile ha raggiunto la distanza massima
			if (Math.abs(this.sprite.x - this.initialX) > this.maxDistance) {
				this.destroyBullet();
			}
		});
	}

	/**
	 * Distrugge il proiettile e lo rimuove dallo stage.
	 */
	private destroyBullet() {
		if (this.sprite) {
			this.app.stage.removeChild(this.sprite);
			this.sprite.destroy();
			this.sprite = undefined;
		}
	}
}

export default Bullet;