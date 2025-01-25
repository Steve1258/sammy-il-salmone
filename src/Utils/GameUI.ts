import { Application, Sprite, Container, Assets } from "pixi.js";

class GameUI {
    private app: Application;
    private uiContainer: Container;
    private lifeSprites: Sprite[] = [];
    private inventorySprites: Sprite[] = [];
    private maxLives: number;
    private inventorySize: number;
    private lifeTexturePath: string;
    private inventoryTexturePath: string;

    /**
     * Crea un'interfaccia utente di gioco.
     * @param {Application} app - Istanza di PIXI Application.
     * @param {string} lifeTexturePath - Percorso dell'immagine per la vita.
     * @param {string} inventoryTexturePath - Percorso dell'immagine per gli slot dell'inventario.
     * @param {number} maxLives - Numero massimo di vite.
     * @param {number} inventorySize - Numero di slot nell'inventario.
     */
    constructor(
        app: Application,
        lifeTexturePath: string,
        inventoryTexturePath: string,
        maxLives: number = 3,
        inventorySize: number = 5
    ) {
        this.app = app;
        this.lifeTexturePath = lifeTexturePath;
        this.inventoryTexturePath = inventoryTexturePath;
        this.maxLives = maxLives;
        this.inventorySize = inventorySize;
        this.uiContainer = new Container();
        this.app.stage.addChild(this.uiContainer);
        this.initUI();
    }

    /**
     * Inizializza gli elementi UI per la vita e l'inventario.
     */
    private async initUI() {
        await this.createLifeUI();
        await this.createInventoryUI();
    }

    /**
     * Crea gli sprite delle vite posizionandoli in alto a destra dello schermo.
     */
    private async createLifeUI() {
        const texture = await Assets.load(this.lifeTexturePath);

        for (let i = 0; i < this.maxLives; i++) {
            const lifeSprite = new Sprite(texture);
            lifeSprite.anchor.set(1, 0); // Ancoraggio in alto a destra
            lifeSprite.position.set(this.app.screen.width - (i * (lifeSprite.width + 10)) - 20, 20);
            this.uiContainer.addChild(lifeSprite);
            this.lifeSprites.push(lifeSprite);
        }
    }

    /**
     * Crea gli sprite degli slot dell'inventario posizionandoli in basso al centro dello schermo.
     */
    private async createInventoryUI() {
        const texture = await Assets.load(this.inventoryTexturePath);

        const startX = (this.app.screen.width / 2) - ((this.inventorySize * (texture.width + 10)) / 2);

        for (let i = 0; i < this.inventorySize; i++) {
            const inventorySprite = new Sprite(texture);
            inventorySprite.anchor.set(0.5, 1); // Ancoraggio in basso al centro
            inventorySprite.position.set(startX + i * (inventorySprite.width + 10), this.app.screen.height - 20);
            this.uiContainer.addChild(inventorySprite);
            this.inventorySprites.push(inventorySprite);
        }
    }

    /**
     * Aggiorna il numero di vite visibili.
     * @param {number} lives - Numero di vite rimanenti.
     */
    public updateLives(lives: number) {
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
        if (slotIndex < 0 || slotIndex >= this.inventorySize) return;

        const texture = await Assets.load(itemTexturePath);
        this.inventorySprites[slotIndex].texture = texture;
    }

    /**
     * Rimuove un oggetto dallo slot dell'inventario ripristinando l'icona di default.
     * @param {number} slotIndex - Indice dello slot dell'inventario (0-based).
     */
    public async removeItemFromInventory(slotIndex: number) {
        if (slotIndex < 0 || slotIndex >= this.inventorySize) return;

        const texture = await Assets.load(this.inventoryTexturePath);
        this.inventorySprites[slotIndex].texture = texture;
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