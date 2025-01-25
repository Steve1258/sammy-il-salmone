import { Application, Ticker } from "pixi.js";
import Player from "./Character/Player";
import Level1 from "./Levels/ListLevels/Level1";

(async () => {
	const app = new Application();
	await app.init({ background: "#1099bb", resizeTo: window });
	document.getElementById("pixi-container")!.appendChild(app.canvas);


	const player = new Player("/assets/character.png", app);
	const level = new Level1(app, player);

	app.ticker.add((time: Ticker) => {
		player.update(time.deltaTime);
	});

})();
