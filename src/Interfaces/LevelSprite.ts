import GenericObject from "../Utils/GenericObject";

interface LevelSprite {
    x: number;
    y: number;
    width: number;
    height: number;
    texturePath: string;
    object?: GenericObject;  // Oggetto generico specifico per ogni tipo di elemento
}

export default LevelSprite;
