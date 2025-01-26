import { Application, Sprite, Container, Assets, Ticker } from "pixi.js";
import Player from "../Character/Player";

class GameUI {
    private app: Application;
    private uiContainer: Container;
    private lifeSprites: Sprite[] = [];
    private inventorySprites: Sprite[] = [];
    private maxLives: number;
    private inventorySize: number;
    private lifeTexturePath: string;
    private inventoryTexturePath: string;
    private player: Player;

    /**
     * Crea un'interfaccia utente di gioco.
     * @param {Application} app - Istanza di PIXI Application.
     * @param {string} lifeTexturePath - Percorso dell'immagine per la vita.
     * @param {string} inventoryTexturePath - Percorso dell'immagine per gli slot dell'inventario.
     * @param {Player} player - Istanza del player.
     * @param {number} maxLives - Numero massimo di vite.
     * @param {number} inventorySize - Numero di slot nell'inventario.
     */
    constructor(
        app: Application,
        lifeTexturePath: string,
        inventoryTexturePath: string,
        player: Player,
        maxLives: number = 3,
        inventorySize: number = 5
    ) {
        this.app = app;
        this.lifeTexturePath = lifeTexturePath;
        this.inventoryTexturePath = inventoryTexturePath;
        this.maxLives = maxLives;
        this.inventorySize = inventorySize;
        this.player = player;
        this.uiContainer = new Container();
        this.app.stage.addChild(this.uiContainer);

        // Assicuriamoci che l'UI venga inizializzata prima di eseguire qualsiasi altra operazione
        this.initUI().then(() => {
            console.log("UI Initialized");
        });
    }

    /**
     * Inizializza gli elementi UI per la vita e l'inventario.
     */
    private async initUI() {
        await this.createLifeUI();
        await this.createInventoryUI();
        this.update();
    }

    /**
     * Crea gli sprite delle vite posizionandoli in alto a destra dello schermo.
     */
    private async createLifeUI() {
        const texture = await Assets.load(this.lifeTexturePath);

        for (let i = 0; i < this.maxLives; i++) {
            const lifeSprite = new Sprite(texture);
            lifeSprite.anchor.set(1, 0); // Ancoraggio in alto a destra
            lifeSprite.width = 40;
            lifeSprite.height = 40;
            this.uiContainer.addChild(lifeSprite);
            this.lifeSprites.push(lifeSprite);
        }
        this.updateLifePositions();
    }

    /**
     * Posiziona gli sprite delle vite rispetto alla telecamera del player.
     */
    private updateLifePositions() {
        for (let i = 0; i < this.maxLives; i++) {
            this.lifeSprites[i].position.set(
                this.app.screen.width - (i * (this.lifeSprites[i].width + 10)) - 20,
                20
            );
        }
    }

    /**
     * Crea gli sprite degli slot dell'inventario posizionandoli in basso al centro dello schermo.
     */
    private async createInventoryUI() {
        const texture = await Assets.load(this.inventoryTexturePath);
        for (let i = 0; i < this.inventorySize; i++) {
            const inventorySprite = new Sprite(texture);
            inventorySprite.anchor.set(0.5, 1);
            inventorySprite.width = 50;
            inventorySprite.height = 50;
            this.uiContainer.addChild(inventorySprite);
            this.inventorySprites.push(inventorySprite);
        }
        this.updateInventoryPositions();
    }

    /**
     * Posiziona gli sprite dell'inventario rispetto alla telecamera del player.
     */
    private updateInventoryPositions() {
        const startX = (this.app.screen.width / 2) - ((this.inventorySize * 50) / 2);

        for (let i = 0; i < this.inventorySize; i++) {
            this.inventorySprites[i].position.set(startX + i * 50, this.app.screen.height - 20);
        }
    }

    /**
     * Aggiorna la posizione dell'UI rispetto al player.
     */
    public update() {
        this.app.ticker.add(() => {
            this.uiContainer.position.set(
                this.player.getX() - this.app.screen.width / 2,
                0
            );
        });
    }

    /**
     * Aggiorna il numero di vite visibili.
     * @param {number} lives - Numero di vite rimanenti.
     */
    public updateLives(lives: number) {
        if (this.lifeSprites.length === 0) {
            return;
        }

        for (let i = 0; i < this.maxLives; i++) {
            this.lifeSprites[i].visible = i < lives;
        }
    }

    /**
     * Aggiunge un oggetto all'inventario.
     * @param {string} itemTexturePath - Percorso della texture dell'oggetto da aggiungere.
     * @param {number} slotIndex - Indice dello slot dell'inventario (0-based).
     */
    public async addItemToInventory(itemTexturePath: string, slotIndex: number) {
        if (!this.inventorySprites.length) {
            return;
        }

        if (slotIndex < 0 || slotIndex >= this.inventorySize) return;

        try {
            const texture = await Assets.load(itemTexturePath);
            this.inventorySprites[slotIndex].texture = texture;
        } catch (error) {
            console.error("Failed to load inventory item texture:", error);
        }
    }

    /**
     * Mostra l'interfaccia utente.
     */
    public showUI() {
        this.uiContainer.visible = true;
    }

    /**
     * Nasconde l'interfaccia utente.
     */
    public hideUI() {
        this.uiContainer.visible = false;
    }
}

export default GameUI;