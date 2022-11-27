const canvas = document.querySelector('canvas'),
      ctx = canvas.getContext('2d'),
      rect = canvas.getBoundingClientRect(),
      scale = window.devicePixelRatio,
      ground = new Image(),
      foodImage = new Image(),
      box = 32;
      
let score = 0,
    food = {
      x: Math.floor((Math.random() * 17 + 1)) * box,
      y: Math.floor((Math.random() * 15 + 3)) * box
    },
    snake = [];
    snake[0] = {
      x: 9 * box,
      y: 10 * box
    };

let dir;

document.addEventListener('keydown', direction);

function eatTail(head, arr) {
  for (let i = 0; i < arr.length; i++) {
    if (head.x == arr[i].x && head.y == arr[i].y) {
      clearInterval(game);
    }
  }
}

function direction(e) {
  if(e.keyCode == 37 && dir != "right") {
    dir = "left";
  } else if(e.keyCode == 38 && dir != "bottom") {
    dir = "top";
  } else if(e.keyCode == 39 && dir != "left") {
    dir = "right";
  } else if (e.keyCode == 40 && dir != "top") {
    dir = "bottom";
  }
}

ground.src = "img/ground.png";

foodImage.src = "img/banana.png";

canvas.width = rect.width * scale;
canvas.height = rect.height * scale;
ctx.scale(scale, scale);

function drawGame() {

  ctx.drawImage(ground, 0, 0);
  
  ctx.drawImage(foodImage, food.x, food.y); 

  for (let i = 0; i < snake.length; i++) {
    ctx.fillStyle = "red";
    ctx.fillRect(snake[i].x, snake[i].y, box, box);
  }

  let snakeX = snake[0].x,
      snakeY = snake[0].y;

  if (snakeX == food.x && snakeY == food.y) {
    score++;
    food = {
      x: Math.floor((Math.random() * 17 + 1)) * box,
      y: Math.floor((Math.random() * 15 + 3)) * box
    };
  } else {
    snake.pop();
  }

  // if (snakeX < box || snakeX > box * 17 || snakeY < 3 * box || snakeY > box * 17) {
  //   clearInterval(game);
  // }

  if (snakeX <= box && dir == "left") {
    clearInterval(game);
  } else if (snakeX >= box * 17 && dir == "right") {
    clearInterval(game);
  } else if (snakeY <= box * 3 && dir == "top") {
    clearInterval(game);
  } else if (snakeY >= box * 17 && dir == "bottom") {
    clearInterval(game);
  }

  ctx.fillStyle = "white";
  ctx.font = "37px Arial";
  ctx.fillText(score, box * 2.5, box * 1.5);

  if (dir == "left") snakeX -= box;
  if (dir == "right") snakeX += box;
  if (dir == "top") snakeY -= box;
  if (dir == "bottom") snakeY += box;
    
  

  let newHead = {
    x: snakeX, 
    y: snakeY
  };
  
  eatTail (newHead, snake);

  snake.unshift(newHead);

}



let game = setInterval(drawGame, 100);
