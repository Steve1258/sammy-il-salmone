import { Howl } from "howler";

class MenuMusic {
    private static instance: MenuMusic;
    private music: HTMLAudioElement;

    private constructor() {
        this.music = new Audio("assets/sounds/menu.mp3");
        this.music.loop = true;
    }

    public static getInstance(): MenuMusic {
        if (!MenuMusic.instance) {
            MenuMusic.instance = new MenuMusic();
        }
        return MenuMusic.instance;
    }

    public play() {
        this.music.play();
    }

    public stop() {
        this.music.pause();
    }
}