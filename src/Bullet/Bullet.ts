import { Sprite, Application, Assets } from "pixi.js";
import Player from "../Character/Player";
import Enemy from "../Enemy/Enemy";
import { Howl } from 'howler';
class Bullet {
	public sprite: Sprite | undefined;
	private speed: number;
	private app: Application;
	private shotSound: Howl;
	private player: Player;
	private texturePath: string;
	private maxDistance: number;
	private initialX: number;
	private enemies: Enemy[];

	constructor(app: Application, player: Player, texturePath: string, speed: number, enemies: Enemy[], maxDistance: number = 500) {
		this.app = app;
		this.player = player;
		this.texturePath = texturePath;
		this.speed = speed;
		this.maxDistance = maxDistance;
		this.initialX = 0;
		this.enemies = enemies || []

		this.shotSound = new Howl({
			src: ['/assets/Music/Sparo3.mp3'],
			volume: 2
		});

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
			this.initialX = this.player.getX();
			this.sprite.position.set(this.initialX, this.player.getY());
			this.shotSound.play();
			// Determina la direzione del player e imposta la velocità di conseguenza
			const direction = this.player.getDirection();
			this.speed = direction === "left" ? -Math.abs(this.speed) : Math.abs(this.speed);

			this.app.stage.addChild(this.sprite);
			this.animate();
		} catch (error) {
			console.error("Error loading bullet texture:", error);
		}
	}

	/**
	 * Gestisce il movimento del proiettile e controlla collisioni.
	 */
	private animate() {
		this.app.ticker.add(() => {
			if (!this.sprite) return;

			// Movimento del proiettile
			this.sprite.x += this.speed;

			// Controlla se il proiettile ha raggiunto la distanza massima
			if (Math.abs(this.sprite.x - this.initialX) > this.maxDistance) {
				this.destroyBullet();
			}

			// Controlla le collisioni con i nemici
			this.checkCollisionWithEnemies();
		});
	}

	/**
	 * Controlla se il proiettile ha colpito un nemico.
	 */
	private checkCollisionWithEnemies() {
		if (!this.sprite) return;

		for (const enemy of this.enemies) {
			const enemySprite = enemy.getSprite();
			if (enemySprite && this.isColliding(this.sprite, enemySprite)) {
				this.destroyBullet();
				this.destroyEnemy(enemy);
				break;
			}
		}
	}

	/**
	 * Controlla se due sprite si stanno scontrando.
	 * @param {Sprite} bullet - Sprite del proiettile.
	 * @param {Sprite} enemy - Sprite del nemico.
	 * @returns {boolean} - True se c'è collisione.
	 */
	private isColliding(bullet: Sprite, enemy: Sprite): boolean {
		try {
			if (!bullet || !enemy || !bullet.getBounds || !enemy.getBounds) {
				console.warn("Collision check failed due to undefined sprite or bounds.");
				return false;  // Evita errori se uno degli sprite è null/undefined
			}

			const boundsBullet = bullet.getBounds();
			const boundsEnemy = enemy.getBounds();

			if (!boundsBullet || !boundsEnemy) {
				console.warn("Bounding box is undefined.");
				return false;
			}

			return (
				boundsBullet.x < boundsEnemy.x + boundsEnemy.width &&
				boundsBullet.x + boundsBullet.width > boundsEnemy.x &&
				boundsBullet.y < boundsEnemy.y + boundsEnemy.height &&
				boundsBullet.y + boundsBullet.height > boundsEnemy.y
			);
		}
		catch (e) {
			return false;
		}

	}

	/**
	 * Rimuove il proiettile dallo stage.
	 */
	private destroyBullet() {
		if (this.sprite) {
			this.app.stage.removeChild(this.sprite);
			this.sprite.destroy();
			this.sprite = undefined;
		}
	}


	/**
	 * Rimuove il nemico dallo stage, dalla lista dei nemici e dal player.
	 * @param {Enemy} enemy - Il nemico da rimuovere.
	 */
	private destroyEnemy(enemy: Enemy) {
		const enemySprite = enemy.getSprite();

		if (enemySprite && this.app.stage.children.includes(enemySprite)) {
			this.app.stage.removeChild(enemySprite);
			enemySprite.destroy();
		}

		// Rimuove il nemico dalla lista dei nemici nel player
		this.player.setEnemies(this.player.getEnemies().filter(e => e !== enemy));

		// Rimuove il nemico dalla lista dei nemici del livello (se accessibile)
		if (this.app.stage.getChildByName("level")) {
			const level = this.app.stage.getChildByName("level") as any;
			if (level && level.removeEnemy) {
				level.removeEnemy(enemy);
			}
		}

		console.log("Nemico rimosso con successo!");
	}
}

export default Bullet;