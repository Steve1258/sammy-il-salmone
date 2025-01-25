import { Application, Ticker } from "pixi.js";
import Player from "./Character/Player";
import Level1 from "./Levels/ListLevels/Level1";
import GameUI from "./Utils/GameUI";

(async () => {
	const app = new Application();
	await app.init({ background: "#1099bb", resizeTo: window });
	document.getElementById("pixi-container")!.appendChild(app.canvas);


	const player = new Player("/assets/character.png", app);
	const level = new Level1(app, player);
	const lifeTexturePath = "/assets/UI/heart.png";
	const inventoryTexturePath = "/assets/UI/slot.png";

	// Crea l'interfaccia utente
	const gameUI = new GameUI(app, lifeTexturePath, inventoryTexturePath);

	// Aggiorna le vite
	gameUI.updateLives(2);

	// Aggiunge un oggetto all'inventario
	gameUI.addItemToInventory("/assets/UI/item_sword.png", 0);

	app.ticker.add((time: Ticker) => {
		player.update(time.deltaTime);
	});

})();
