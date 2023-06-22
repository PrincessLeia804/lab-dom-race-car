class Player {
    constructor(gameScreen) {
        this.gameScreen = gameScreen
        this.width = 80
        this.height= 150
        this.top = 470
        this.left = 208
        this.directionX = 0
        this.directionY = 0
        this.element = document.createElement('img')

        // add the player element. Add the exact position with absolute
        this.element.src ='./images/car.png'
        this.element.style.position = 'absolute'

        this.element.style.width = `${this.width}px`
        this.element.style.height = `${this.height}px`

        this.element.style.top = `${this.top}px`
        this.element.style.left = `${this.left}px`

        // add player to the game screen
        this.gameScreen.appendChild(this.element)
    }


    move() {
        this.left += this.directionX
        this.top += this.directionY

        if (this.left < 15) {
            this.left = 15
        }
        if(this.top < 15){
            this.top = 15
        }
        // use offsetWidth to return the elements-layout width as int
         if (this.left > this.gameScreen.offsetWidth - this.width - 15){ // minus car + boundary 
            this.left = this.gameScreen.offsetWidth - this.width - 15;
        }
        // use offsetHeight for height
        if (this.top > this.gameScreen.offsetHeight - this.height - 15){
            this.top = this.gameScreen.offsetHeight - this.height - 15
        }

        this.updatePosition()
    }

    updatePosition() {
        // update to the new values
        this.element.style.top = `${this.top}px`
        this.element.style.left = `${this.left}px`
    }

    didCollide(obstacle) {
        /*object which is the smallest rectangle which contains the entire element,
        including its padding and border-width. 
        The left, top, right, bottom, x, y, width, and height properties */
        const playerRect = this.element.getBoundingClientRect();
        const obstacleRect = obstacle.element.getBoundingClientRect();
    
        if (
          playerRect.left < obstacleRect.right &&
          playerRect.right > obstacleRect.left &&
          playerRect.top < obstacleRect.bottom &&
          playerRect.bottom > obstacleRect.top
        ) {
          return true;
        } else {
          return false;
        }
      }
}