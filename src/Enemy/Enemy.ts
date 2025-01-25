import { Sprite, Texture } from "pixi.js";
import GenericObject from "../Utils/GenericObject";

interface EnemyParams {
    x: number;
    y: number;
    speed: number;
    texturePath: string;
}

class Enemy extends GenericObject {
    private sprite: Sprite;
    private speed: number = 0;

    constructor() {
        super();
        this.sprite = new Sprite();
    }

    public async handleObject(params?: EnemyParams): Promise<void> {
        console.log(`Enemy created at`);
    }

    public getSprite(): Sprite {
        return this.sprite;
    }
}

export default Enemy;
