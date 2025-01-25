class Projectiles {
    constructor(color, positionX, positionY, sizeWidth = 50, sizeHeight = 25) {
      this.color = color;
      this.positionX = positionX;
      this.positionY = positionY;
      this.sizeWidth = sizeWidth;
      this.sizeHeight = sizeHeight;
      Image=Sparo.png;
      // default speed
      this.directionY = -5;

    }
    // create ship with default properties
    createShip() {
      fill(this.color);
      rect(this.positionX, this.positionY, this.sizeWidth, this.sizeHeight);
    }
    shoot() {
      this.positionY = this.positionY + this.directionY;
      // 
      function keyTyped() {
        if (key === 'spacebar') {
          this.directionY = -5;
        } 

      }
      keyTyped();

    }
  }