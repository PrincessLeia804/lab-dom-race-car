window.addEventListener('load', () => {
  const startButton = document.getElementById("start-button");
  const restartButton = document.getElementById("restart-button");

  let game;

  function startGame() {
    console.log("start game");
    game = new Game()
    game.start()

    // add eventlistener for user interaction
    document.addEventListener('keydown', event => {
      const key = event.key;
      const possibleKeystrokes = [
        "ArrowLeft",
        "ArrowUp",
        "ArrowRight",
        "ArrowDown"
      ];

      // if one of the keys, adjust players position
      if(possibleKeystrokes.includes(key)){
        // avoid unwanted scrolling
        event.preventDefault();

       switch(key) {
        case "ArrowLeft":
          game.player.directionX = -3;
          break;
        case "ArrowRight":
          game.player.directionX = 3;
          break;
        case "ArrowDown":
          game.player.directionY = 3;
          break;
        case "ArrowUp":
          game.player.directionY = -3;
          break;
      }
      }
      console.log(game.player.directionX, game.player.directionY);
    })
  
    document.addEventListener('keyup', event => {
      const key = event.key;
      const possibleKeystrokes = [
        "ArrowLeft",
        "ArrowUp",
        "ArrowRight",
        "ArrowDown"
      ];
      
      if(possibleKeystrokes.includes(key)) {
      
        switch(key) {
         case "ArrowLeft":
         case "ArrowRight":
           game.player.directionX = 0;
           break;
         case "ArrowDown":
         case "ArrowUp":
           game.player.directionY = 0;
           break;
       }
      }
    })
  }

  startButton.addEventListener("click", function () {
    startGame();
  });

  restartButton.addEventListener('click', () => {
    location.reload()
  })
})
