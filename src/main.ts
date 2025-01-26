import { Application, Ticker } from "pixi.js";
import Player from "./Character/Player";
import Level1 from "./Levels/ListLevels/Level1";
import GameUI from "./Utils/GameUI";
import GameAudio from './Music/GameAudio';

(async () => {
	const app = new Application();
	await app.init({ background: "#1099bb", resizeTo: window });
	document.getElementById("pixi-container")!.appendChild(app.canvas);
	// Crea un'istanza della musica di sottofondo
	const gameAudio = new GameAudio();

	// Avvia la musica quando il gioco è pronto
	gameAudio.play();
	const lifeTexturePath = "/assets/UI/heart.png";
	const inventoryTexturePath = "/assets/UI/inventory_square.png";
	const player = new Player("/assets/character.png", app);
	const gameUI = new GameUI(app, lifeTexturePath, inventoryTexturePath, player);
	const level = new Level1(app, player, gameUI);

	app.ticker.add((time: Ticker) => {
		player.update(time.deltaTime);
		gameUI.updateLives(player.life);
	});

})();
