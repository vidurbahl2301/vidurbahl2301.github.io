var healthPoints = 100;
var feelings = ["anxiety","uncertainity", "confusion", "boredom", "restrictions"]
var gunSound = new Audio("gunshot.mp3");
var enemyGunSound = new Audio("gunshot.mp3");

enemyGunSound.volume = 0.6;

let theDivs = [];

theDivs = document.getElementsByClassName('enemy')
console.log(theDivs[0]);

for (let i = 0; i <feelings.length; i++){
	console.log(feelings[i])

}



for (let i=0; i < theDivs.length; i++){
	let theseP = document.createElement('p');
	theDivs.item(i).append(theseP)
	theDivs.item(i).textContent = feelings[i]


}


function updateHealthPoints(points) {

	healthPoints = points;
	var healthBar = document.querySelector("#healthBar");
	healthBar.style.width = points + "%";

	if(healthPoints < 1) {
		alert("Game over!");
		window.location.reload();
	}

}


function livingEnemies() {
	return document.querySelectorAll(".enemy:not(.dead)");
}


function iShoot(enemy) {
	enemy.classList.add("dead");

	if(!livingEnemies().length) {
		alert("You win!");
		window.location.reload();
	}

}


function enemyAttacksMe(enemy) {

	if(healthPoints > 0) {

		enemy.classList.add("showing");

		setTimeout(()=> {
			enemyShootsMe(enemy);
		}, 1000);

		setTimeout(()=> {
			enemy.classList.remove("showing");
		}, 3000);
		
	}


}


function enemyShootsMe(enemy) {

	enemyGunSound.play();
	if(!enemy.classList.contains("dead")) {

		enemy.classList.add("shooting");
		updateHealthPoints(healthPoints - 20);

		setTimeout(()=> {
			enemy.classList.remove("shooting");
		}, 200);

	}

}


function randomEnemyAttacks() {

	var randomEnemyNo = Math.random() * livingEnemies().length;
	randomEnemyNo = Math.floor(randomEnemyNo);
	var enemy = livingEnemies()[randomEnemyNo];

	var randomDelay = Math.random() * 1500 + 1000;

	setTimeout( ()=> {
		enemyAttacksMe(enemy);
		randomEnemyAttacks();
	}, randomDelay);

}

//this function starts the enemy attacks when new game button is pressed, 
//also removes new game button when it is pressed 
function newGame(){
	randomEnemyAttacks();
	document.querySelector("button").style.display = "none"
}
