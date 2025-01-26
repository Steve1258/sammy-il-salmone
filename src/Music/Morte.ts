import { Howl } from 'howler';

class MenuMusic {
    private backgroundMusic: Howl;

    constructor() {
        // Caricamento della musica di sottofondo
        this.backgroundMusic = new Howl({
            src: ['/assets/Music/Morte.mp3'],  // Percorso del file audio
            autoplay: true,      // Avvia automaticamente la riproduzione
            loop: true,          // Ripeti all'infinito la musica di sottofondo
            volume: 0.5          // Regola il volume (da 0.0 a 1.0)
        });

        console.log("Musica di sottofondo avviata!");
    }

    /**
     * Avvia la musica
     */
    public play(): void {
        this.backgroundMusic.play();
    }

    /**
     * Ferma la musica
     */
    public stop(): void {
        this.backgroundMusic.stop();
    }

    /**
     * Regola il volume della musica
     * @param volume Valore compreso tra 0.0 e 1.0
     */
    public setVolume(volume: number): void {
        this.backgroundMusic.volume(volume);
    }
}

export default MenuMusic;