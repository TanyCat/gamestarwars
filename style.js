const squareOur = document.querySelector(".weapon");
let maxWidth = document.documentElement.clientWidth - 150;
let maxHight = 460 - 90;
const keyLeft = document.querySelector(".arrow_top");
const keyRight = document.querySelector(".arrow_right");
const shotButton = document.querySelector(".fire_button");
const swordCoordinates = document.querySelector(".sword");
const ammunitionElement = document.querySelector(".glasses");
let elem = document.getElementById("elem");
const gameOver = document.querySelector(".window_start");
const gameStart = document.querySelector(".window_start__button");
const targetElement = document.querySelector(".target");
const specialEffectsElement = document.querySelector(".special_effects");
let rightSquare = maxWidth / 2;
let targetCoordinatesNow = { x: 0, y: 0 };
let hits = "";
let ammunition = "";
let blockShot = false;

const TIMERINTERVAL = 1000;

gameStart.addEventListener("touchstart", (event) => initial(event));
document.addEventListener("keydown", (event) => moveSquare(event));
keyLeft.addEventListener("touchstart", (event) => goToLeft(event));
keyRight.addEventListener("touchstart", (event) => goToRight(event));
shotButton.addEventListener("touchstart", (event) => shot(event));

// функция обеспечивающая старт игры и задания ВСЕХ переменных
function initial() {
  hits = 0;
  ammunition = 1;
  maxWidth = document.documentElement.clientWidth - 150;
  rightSquare = maxWidth / 2;
  squareOur.style.left = `${rightSquare}px`;
  ammunitionElement.innerHTML = ammunition;
  elem.innerHTML = hits;
  gameOver.classList.add("hideWindows");
  targetElement.classList.remove('hideWindows')
}

initial();

function goToLeft() {
  if (rightSquare > 0) {
    rightSquare = rightSquare - 10;
  } else {
    rightSquare = rightSquare;
  }
  squareOur.style.left = `${rightSquare}px`;
}

function goToRight() {
  if (rightSquare > maxWidth) {
    rightSquare = rightSquare;
  } else {
    rightSquare = rightSquare + 10;
  }
  squareOur.style.left = `${rightSquare}px`;
}

function moveSquare(event) {
  if (event.code === "ArrowLeft") {
    goToLeft();
  }

  if (event.code === "ArrowRight") {
    goToRight();
  }
  if (event.code === "Space") {
    shot();
  }
}

window.addEventListener("resize", () => initial());
initial();

function RAND(max) {
  return Math.round(Math.random() * max);
}

function moveTarget(x, y) {
  const targetCoordinates = document.querySelector(".target");
  targetCoordinates.style.left = `${x}px`;
  targetCoordinates.style.top = `${y}px`;
  targetCoordinatesNow.x = x;
  targetCoordinatesNow.y = y;
}

let goTarget = setInterval(() => {
  const x = RAND(maxWidth - 20);
  const y = RAND(maxHight);
  moveTarget(x, y);
}, TIMERINTERVAL);

moveTarget(100, 100);

function moveShot() {
  setTimeout(() => {
    for (let y = rightSquare; y >= -600; y--) {
      swordCoordinates.style.top = `${y}px`;
    }
  }, 0);
}

function shot() {
  if (ammunition <= 0) {
    targetElement.classList.add('hideWindows')
    gameOver.classList.remove("hideWindows");
    return;
  }

  if (blockShot) {
    return;
  }
  blockShot = true;
  setTimeout(() => {
    blockShot = false;
  }, TIMERINTERVAL);

  moveShot();
  const seredinaPuliX = rightSquare + 76;

  if (
    seredinaPuliX >= targetCoordinatesNow.x + 5 &&
    seredinaPuliX <= targetCoordinatesNow.x + 87
  ) {
    HITS();
  }

  setTimeout(() => {
    swordCoordinates.style.display = `none`;
  }, TIMERINTERVAL / 2);

  setTimeout(() => {
    swordCoordinates.style.display = `block`;
    swordCoordinates.style.top = `0px`;
  }, TIMERINTERVAL);
  ShowAmmunition();
}

function ShowAmmunition() {
  ammunition = ammunition - 1;
  ammunitionElement.innerHTML = ammunition;
}

function HITS() {
  hits = hits + 1;
  elem.innerHTML = hits;
  specialEffects()
}

function specialEffects() {
  targetElement.classList.add('hideWindows')
  specialEffectsElement.classList.remove('hideWindows')
 
  specialEffectsElement.style.left = `${targetCoordinatesNow.x}px`;
  specialEffectsElement.style.top = `${targetCoordinatesNow.y}px`;

  setTimeout(
    ()=>{
      targetElement.classList.remove('hideWindows')
      specialEffectsElement.classList.add('hideWindows')
    },TIMERINTERVAL
  )
}
