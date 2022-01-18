var cnv;
var stAgent = [];
var agent = [];
var daah = [];
var popped = [];

var colour = ["JIARG", "GORRYM", "BWEE", "GLASS", "DOO", "BANE", "DHONE"];
var oldCol = 0;
var newCol = 0;
var ranCol = 0;
var colCount = [0, 0, 0, 0, 0, 0, 0];
var ranDaah;
var actC = [];
var stroop;
var changed = true;

var music;
var restart;
var finish;

var gameStarted = false;
var difficulty;
var easy;
var medium;
var hard;
var roundOver = false;

var score = 0;
var level = 1;
var colSize = 40;
var colSizeAct = false;

var gameOver = false;
var endTxt = 16;
var growEndTxt = true;

function preload () {
	daah[0] = loadImage('assets/jiarg.png');
	daah[1] = loadImage('assets/gorrym.png');
	daah[2] = loadImage('assets/bwee.png');
	daah[3] = loadImage('assets/glass.png');
	daah[4] = loadImage('assets/doo.png');
	daah[5] = loadImage('assets/bane.png');
	daah[6] = loadImage('assets/dhone.png');
	popped[0] = loadImage('assets/jiargPopped.png');
	popped[1] = loadImage('assets/gorrymPopped.png');
	popped[2] = loadImage('assets/bweePopped.png');
	popped[3] = loadImage('assets/glassPopped.png');
	popped[4] = loadImage('assets/dooPopped.png');
	popped[5] = loadImage('assets/banePopped.png');
	popped[6] = loadImage('assets/dhonePopped.png');

	aBeeZee = loadFont('assets/ABeeZee-Regular.ttf');

	music = loadSound('assets/Ukulele-loop_AdobeStock_461695075.wav');
	popSound = loadSound('assets/pop.mp3');
}

function setup() {
	if (displayWidth <= 480) cnv = createCanvas(displayWidth, displayHeight-163);
	else cnv = createCanvas(320, displayHeight-163);
	var x = (displayWidth - width) / 2;
	cnv.position(x);

	textFont(aBeeZee);

	for (let i = 0; i < 12; i++) {
	    stAgent.push(new startPic());
	}

	newCol = Math.floor(random(0, colour.length));
	ranCol = newCol;
 	stroop = Math.floor(random(0, actC.length));
 	colourChanges = [Math.floor(random(300, 500)), Math.floor(random(800, 1000))];

	actC[0] = color("#ED3232");
	actC[1] = color("#1999F2");
	actC[2] = color("#FFC00C");
	actC[3] = color("#51FF0E");
	actC[4] = color(0);
	actC[5] = color(255);
	actC[6] = color("#B28B1A");

 	easy = createButton("AASHAGH (EASY)");
 	easy.position(displayWidth/2-100, 200);
 	easy.size(200, 100);
 	easy.style("background", "white");
 	easy.style("border-radius", "10px");
 	easy.style("font-size", "30px");
 	easy.mousePressed(function() { startGame(0);});

 	medium = createButton("MEANAGH (MEDIUM)");
 	medium.position(displayWidth/2-100, 350);
 	medium.size(200, 100);
 	medium.style("background", "white");
 	medium.style("border-radius", "10px");
 	medium.style("font-size", "30px");
 	medium.mousePressed(function() { startGame(1);});

 	hard = createButton("DOILLEE (HARD)");
 	hard.position(displayWidth/2-100, 500);
 	hard.size(200, 100);
 	hard.style("background", "white");
 	hard.style("border-radius", "10px");
 	hard.style("font-size", "30px");
 	hard.mousePressed(function() { startGame(2);});

 	restart = createButton("RESTART");
 	restart.size(100, 32.5);
 	restart.position(displayWidth/2-175, height-90);
 	restart.style("background", "white");
 	restart.style("border-radius", "10px");
 	restart.style("border-width", "2px");
 	restart.style("display", "none");
 	restart.mousePressed(restartGame);

 	finish = createButton("FINISH");
 	finish.size(100, 32.5);
 	finish.position(displayWidth/2 + 75, height-90);
 	finish.style("background", "white");
 	finish.style("border-radius", "10px");
 	finish.style("border-width", "2px");
	finish.style("display", "none");
 	finish.mousePressed(finishGame);
}

function draw () {
	background(255);

	if (!gameStarted) {
		imageMode(CENTER);
		stAgent.forEach(element => {
			element.display()
		});

	}

	else {

		colourSize();

		if (agent.every(element => element == "gone")) roundOver = true;

		if (roundOver) {
			roundOver = false;
			agent = [];
			colCount = [0, 0, 0, 0, 0, 0, 0];
			frameCount = 0;
			for (let i = 0; i < 12; i++) {
	    		agent.push(new Balloon());
		 	}
		 	changeTime();
		}

		agent.forEach(element => {
			if (element != "gone") element.display()
		});


		fill(255);
		noStroke();
		rect(0, 0, width, 75);

		if (difficulty == 0) fill(actC[ranCol]);
		else if (difficulty == 1) fill(0);
		else if (difficulty == 2) fill(actC[stroop]);
		stroke(1);
		textSize(colSize);
		textAlign(CENTER);
	  	text(colour[ranCol], width/2, 50);

	  	fill(255);
	  	noStroke();
	  	rect(0, height-107.5, cnv.width, 107.5);

	  	stroke(0);
	  	ellipse(width/2, height-72.5, 75, 50);

	  	if (score < 0) fill(255, 0, 0);
	  	else fill(0);
	  	noStroke();
	  	textSize(30);
	  	text(score, width/2, height-62.5);

	}

	if (gameOver) {
		endScore();
	}
}

function mousePressed () {
	agent.forEach(element => {
    	if (element != "gone") element.balloonPop()
  	});
}

function changeTime () {
	if (changed) {
		oldCol = newCol;
		newCol = Math.floor(random(0, colour.length));
	}
	if (newCol == oldCol && colCount[newCol] != 0) setCol();
	else if (newCol != oldCol && colCount[newCol] == 0) setCol();
	else if (newCol != oldCol && colCount[newCol] != 0) {
		ranCol = newCol;
		stroop = Math.floor(random(0, actC.length));
		colSizeAct = true;
		changed = true;
		console.log("here")
	}
}

function setCol () {
	changed = false;
	newCol = Math.floor(random(0, colour.length));
	changeTime();
}

function colourSize () {
	if (colSizeAct && colSize < 50) {
		colSize = colSize + 1.75;
	}
	else {
		colSizeAct = false;
		colSize = 40;
	}
}

function startGame (diff) {
	gameStarted = true;
	if (diff == 0) difficulty = 0;
	else if (diff == 1) difficulty = 1;
	else if (diff == 2) difficulty = 2;
	music.loop();
	music.setVolume(0.2);
	easy.style("display", "none");
	medium.style("display", "none");
	hard.style("display", "none");
	restart.style("display", "block");
	finish.style("display", "block");
	frameCount = 0;
}

function restartGame () {
	location.reload();
}

function finishGame () {
	gameOver = true;
}

function levelUP () {
	if (score > 25 && score < 50) level = 2;
	if (score >= 50 && score < 75) level = 3;
	if (score >= 75 && score < 100) level = 4;
}

function endScore () {
	fill(0);
	noStroke();
	if (endTxt > 50) growEndTxt = false;
	if (growEndTxt) endTxt++
	else {
		if(endTxt > 40) endTxt--;
	}
	textSize(endTxt);
	text("Your Score", 160, 350);
	text(score, 160, 400);
}
