html, body, div, span, applet, object, iframe,
h1, h2, h3, h4, h5, h6, p, blockquote, pre,
a, abbr, acronym, address, big, cite, code,
del, dfn, em, img, ins, kbd, q, s, samp,
small, strike, strong, sub, sup, tt, var,
b, u, i, center,
dl, dt, dd, ol, ul, li,
fieldset, form, label, legend,
table, caption, tbody, tfoot, thead, tr, th, td,
article, aside, canvas, details, embed, 
figure, figcaption, footer, header, hgroup, 
menu, nav, output, ruby, section, summary,
time, mark, audio, video {
	margin: 0;
	padding: 0;
	border: 0;
	font-size: 100%;
	font: inherit;
	vertical-align: baseline;
}
article, aside, details, figcaption, figure, 
footer, header, hgroup, menu, nav, section {
	display: block;
}
body {
	line-height: 1;
}
ol, ul {
	list-style: none;
}
blockquote, q {
	quotes: none;
}
blockquote:before, blockquote:after,
q:before, q:after {
	content: '';
	content: none;
}
table {
	border-collapse: collapse;
	border-spacing: 0;
}

const score = document.querySelector('.score'),
    start = document.querySelector('.start'),
    gameArea = document.querySelector('.gameArea')
    car = document.createElement('div')
car.classList.add('car')


start.addEventListener('click, startGame')
document.addEventListener('keydown', startRun)
document.addEventListener('keyup', stoptRun)

const keys = {
    ArrowUp: false,
    ArrowDown: false,
    ArrowRight: false,
    ArrowLeft: false,
}

const setting ={
    start: false,
    score: 0,
    speed: 3,
    traffic: 3
}

function getQuantityElements(heightElement){
    return document.documentElement.clientHeight / heightElement + 1;

}

function startGame(){
    start.classList.add('hide');

    for (let i = 0; i <getQuantityElements(100); i++){
        const line = document.createElement('div');
        line.classList.add('line');
        line.style.top = (i *100) + 'px';
        line.y = i *100;
        gameArea.appendChild(line);
    }

    for (let i = 0; i < getQuantityElements(100 * setting.traffic); i++ ){
        const enemy = document.createElement('div');
        enemy.classList.add('enemy');
        enemy.y = -100 * setting.traffic * (i + 1);
        enemy.style.left = Math.floor(Math.random() * (gameArea.offsetWidth -50)) + 'px';
        enemy.style.top = enemy.y + 'px';
        enemy.style.background = transparent url(./image/enemy2.png) center / cover no-repeat;
        gameArea.appendChild(enemy);

    }

    setting.start = true;
    gameArea.appendChild(car);
    setting.x = car.offsetleft;
    setting.y = car.offsetTop;

    requestAnimationFrame(playGame);
}
function playGame(){
    
    if( setting.start){
        moveRoad();
        moveEnemy();
        if(keys.ArrowLeft && setting.x < (gameArea.offsetWidth -  car.offsetWidth){
            setting.x -= setting.speed;
        }
        if(keys.ArrowRight && setting.y > 0 ){
            setting.x += setting.speed;
        }
        if(keys.ArrowDown && setting.y > 0){
            setting.y += setting.speed;
        }
        if(keys.ArrowUp  && setting.y < (gameArea.offsetHeight -  car.offsetHeight){
            setting.y -= setting.speed;
        }
        car.style.left = setting.x + 'px'; 
        car.style.top = setting.y + 'px'; 


        requestAnimationFrame(playGame);
    }
}

function startRun(){
    event.preventDefault();
    keys[event.keys]=true;
}


function stoptRun(){
    event.preventDefault();
    keys[event.keys]=false;
}

function moveRoad(){
    let lines = document.querySelector('.line');
    lines.forEach(function(line )){
       line.y += setting.speed;
       line.style.top = line.y + 'px';

       if(line.y > document.documentElement.clientHeight){
           line.y = -100;
       }

    }
});

}

function moveEnemy(){
    let enemy = document.querySelectorAll('.enemy');
    enemy.forEach(function(item){
        item.y += setting.speed /2 ;
        item.style.top = item.y + 'px';
        if(item.y >= document.createElement.clientHeight){
            item.y =- 100 * setting.traffic;
            item.style.left = Math.floor(Math.random() * (gameArea.offsetWidth -50)) + 'px';

        }
    });


}