import { Application, Ticker } from "pixi.js";
import Player from "./Character/player";

(async () => {
  const app = new Application();
  await app.init({ background: "#1099bb", resizeTo: window });
  document.getElementById("pixi-container")!.appendChild(app.canvas);

  // Create player instance
  const player = new Player("/assets/bunny.png", app);

  app.ticker.add((time: Ticker) => {
    player.update(time.deltaTime);
  });

})();
