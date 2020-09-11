const MAX_ENEMY = 9;
const HEIGHT_ELEM = 100; //min size 100

const score = document.querySelector('.score'),
   start = document.querySelector('.start'),
   gameArea = document.querySelector('.gameArea'),
   car = document.createElement('div');
   topScore = document.getElementById('topScore');

const audio = document.createElement('audio');

audio.src = 'audio.mp3';
audio.style.cssText = `position: absolute; top: -1000px;`;

// audio remove(); // сделано через 'audio', а не через ember

car.classList.add('car');

const  countSection = Math.floor(document.documentElement.clientHeight / HEIGHT_ELEM);
gameArea.style.height = countSection * HEIGHT_ELEM;

const keys = {
   ArrowUp: false,
   ArrowDown: false,
   ArrowRight: false,
   ArrowLeft: false
};

const setting = {
   start: false,
   score: 0,
   speed: 2,
   traffic: 2,
   level: 0
}

let level = setting.level;

const result = parseInt(localStorage.getItem('nfjs_score', setting.score));
topScore.textContent = result ? result : 0;

const addLocalStorage = () =>{
   if (result < setting.score) {
   localStorage.setItem('nfjs_score', setting.score);
   topScore.textContent = setting.score;
   }
}

function getQuantityElementElements(heightElement) {
   // return document.documentElement.clientHeight / heightElement + 1;
   return (gameArea.offsetHeight / heightElement) + 1; // fix road
}

function startGame(event){

   const target = event.target;

   if (target === start) return;

   switch (target.id){
      case 'easy':
         setting.speed = 4;
         setting.traffic = 4;
         break;
      case 'medium':
         setting.speed = 6;
         setting.traffic = 3;
         break;
      case 'hard':
         setting.speed = 10;
         setting.traffic = 3;
         break;
   }

   audio.play();
   start.classList.add('hide');
   gameArea.innerHTML = '';
   gameArea.style.display = `block`;

   for (let i = 0; i < getQuantityElementElements(HEIGHT_ELEM); i++) {
      const line = document.createElement('div');
      line.classList.add('line');
      line.style.top = `${i * HEIGHT_ELEM}px`;
      line.style.height = (HEIGHT_ELEM / 2) + 'px';
      line.y = i * HEIGHT_ELEM;
      gameArea.append(line);
   }

   for (let i = 0; i < getQuantityElementElements(HEIGHT_ELEM * setting.traffic); i++) {
      const enemy = document.createElement('div');
      const randomEnemy = Math.floor(Math.random() * MAX_ENEMY) + 1;
      enemy.classList.add('enemy');
      enemy.y = -HEIGHT_ELEM * setting.traffic * (i + 1);
      enemy.style.top = enemy.y + 'px';
      enemy.style.background = `transparent url("./image/enemy${randomEnemy}.png") center / cover no-repeat`;
      gameArea.append(enemy);
      enemy.style.left = Math.floor(Math.random() * (gameArea.offsetWidth - HEIGHT_ELEM / 2)) + 'px';
   }
   setting.score = 0;
   setting.start = true;
   gameArea.append(car);
   car.style.left = (gameArea.offsetWidth / 2) - (car.offsetWidth / 2);
   car.style.top = 'auto';
   car.style.bottom = '10px';
   // document.body.append(audio); // сделано через 'audio', а не через ember
   setting.x = car.offsetLeft;
   setting.y = car.offsetTop;
   requestAnimationFrame(playGame);
}

function playGame(){

   setting.level = Math.floor(setting.score / 1000); //1000 очков

   if (setting.level !== level) {
      level = setting.level;
      setting.speed += 1;
   }
   
   if (setting.start){
      setting.score += setting.speed;
      score.innerHTML = 'SCORE<br>' + setting.score;
      moveRoad();
      moveEnemy();
      if (keys.ArrowLeft && setting.x > 0){
         setting.x -= setting.speed;
      }

      if (keys.ArrowRight && setting.x < (gameArea.offsetWidth - car.offsetWidth)){
         setting.x += setting.speed;
      }

      if (keys.ArrowUp && setting.y > 0){
         setting.y -= setting.speed;
      }

      if (keys.ArrowDown && setting.y < (gameArea.offsetHeight - car.offsetHeight)){
         setting.y += setting.speed;
      }

      car.style.left = setting.x + 'px';
      car.style.top = setting.y + 'px';


      requestAnimationFrame(playGame);
   }
}

function startRun(event){
   if (keys.hasOwnProperty(event.key)) {
      event.preventDefault();
      keys[event.key] = true;
   }
}

function stopRun(event){
   if (keys.hasOwnProperty(event.key)) {
      event.preventDefault();
      keys[event.key] = false;
   }
}

function moveRoad() {
   let lines = document.querySelectorAll('.line');
   lines.forEach(function(line){
      line.y += setting.speed;
      line.style.top = line.y + 'px';

      if (line.y >= gameArea.offsetHeight) {
         line.y = -HEIGHT_ELEM;
      }
   })
}

function moveEnemy() {
   let enemy = document.querySelectorAll('.enemy');
   enemy.forEach(function(item){
      let carRect = car.getBoundingClientRect();
      let enemyRect = item.getBoundingClientRect();
   
      if (carRect.top <= enemyRect.bottom &&
         carRect.right >= enemyRect.left &&
         carRect.left <= enemyRect.right &&
         carRect.bottom >= enemyRect.top) {
            setting.start = false;
            console.warn('ДТП');
            audio.pause();          // stop audio
            audio.currentTime = 0;  // stop audio
            start.classList.remove('hide');
            start.style.top = score.offsetHeight;
            addLocalStorage();
      }

      item.y += setting.speed / 2;
      

      if (item.y >= gameArea.offsetHeight) {
         item.y = -HEIGHT_ELEM * setting.traffic;
         item.style.left = Math.floor(Math.random() * (gameArea.offsetWidth - item.offsetWidth)) + 'px';
      }

      item.style.top = item.y + 'px';

   });
}

start.addEventListener('click', startGame);
document.addEventListener('keydown', startRun);
document.addEventListener('keyup', stopRun);