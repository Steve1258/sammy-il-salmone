import { Application } from "pixi.js";
import BaseLevel from "../BaseLevel";
import LevelSprite from "../../Interfaces/LevelSprite";
import Enemy from "../../Enemy/Enemy";
import Player from "../../Character/Player";

class Level1 extends BaseLevel {
    public platforms: LevelSprite[];

    constructor(app: Application, player: Player) {
        super(app);
        this.platforms = [
            {
                x: 100,
                y: 400,
                width: 200,
                height: 50,
                texturePath: "/assets/bunny.png",
                object: new Enemy(player, app),
            },
        ];
        this.addLevelSprite(this.platforms);
    }
}

export default Level1;