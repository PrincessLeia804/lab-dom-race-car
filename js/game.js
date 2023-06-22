class Game {
    // code to be added
    constructor() {
        this.startScreen = document.getElementById('game-intro')
        this.gameScreen = document.getElementById('game-screen')
        this.gameEndScreen = document.getElementById('game-end')
        this.height = 600
        this.width = 500
        this.player = new Player(this.gameScreen)
        this.score = 0;
        this.lives = 3;
        this.obstacles = [];
        this.isGameOver = false;
        this.animateId;
    }

    start() {
        // access style properties of game screen && need to turn it into a string to add the px
        this.gameScreen.style.width = `${this.width}px`
        this.gameScreen.style.height = `${this.height}px` 
        
        // hide start screen with style properties, element already accessed on top
        this.startScreen.style.display = 'none'
        // show game screen, if flex-container display: flex
        this.gameScreen.style.display = 'block'

        //start game loop
        this.gameLoop()
    }

    gameLoop() {
        //update game state
        this.update()
        
        // if(Math.random() > 0.98 && this.obstacles.length < 1) {
        //     this.obstacles.push(new Obstacle(this.gameScreen));
        // }

        console.log(this.animateId)
        if (this.animateId % 150 === 0) {
          this.obstacles.push(new Obstacle(this.gameScreen))
        }

        // check if game is finished
        if(this.isGameOver) {
            console.log(("Game Over"));
            this.endGame();
        }else{
        // recursive func: will ensure consistent frame rate of screen
            this.animateId = requestAnimationFrame(() => this.gameLoop()) // arrow function needed to access method
        }
    }

    update() {
        console.log('Update');
        // initiate continous position update
        this.player.move();


        const obstaclesToKeep = []
        this.obstacles.forEach(obstacle => {
            obstacle.move()
            if(this.player.didCollide(obstacle)){
                console.log('collision');
                this.lives -= 1;
                document.getElementById('lives').innerText = this.lives;
                obstacle.element.remove();
            } else if(obstacle.top > this.gameScreen.offsetHeight) {
                console.log('out of screen');
                this.score += 1;
                document.getElementById('score').innerText = this.score;
                obstacle.element.remove();
            } else {
                obstaclesToKeep.push(obstacle)
            }
        })
        this.obstacles = obstaclesToKeep
        console.log(this.obstacles);

        // check lives-count
        if(this.lives <= 0) {
            this.isGameOver = true;
    }
    }

    endGame() {
        this.player.element.remove();
        this.obstacles.forEach(obstacle => {
            obstacle.element.remove();
        })


        this.gameScreen.style.display = 'none';
        this.gameEndScreen.style.display = 'block';
    }
}