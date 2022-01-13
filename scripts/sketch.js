var agent = [];
var daah = [];
var popped = [];
var colour = ["JIARG", "GORRYM", "BWEE", "GLASS", "DOO", "BANE", "DHONE"];
var oldCol = 0;
var newCol = 0;
var ranCol;
var colCount = [0, 0, 0, 0];
var ranDaah;
var music;
var restart;
var finish;

var keyDown = false;
var roundOver = false;

var score = 0;
var level = 1;
var colSize = 30;
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
	var cnv = createCanvas(320, displayHeight-163);
	var x = (displayWidth - width) / 2;
	cnv.position(x);

	music.play();
	music.loop();
	music.setVolume(0.2);

	textFont(aBeeZee);

	for (let i = 0; i < 13; i++) {
   		agent.push(new Balloon(ranDaah));
 	}

 	newCol = Math.floor(random(0, colour.length));
 	ranCol = newCol;
 	colourChanges = [Math.floor(random(300, 500)), Math.floor(random(800, 1000))];

 	restart = createButton("RESTART");
 	restart.size(100, 32.5);
 	restart.position(displayWidth/2-175, height-90);
 	restart.style("background", "white");
 	restart.style("border-radius", "10px");
 	restart.style("border-width", "2px");
 	restart.mousePressed(restartGame);

 	finish = createButton("FINISH");
 	finish.size(100, 32.5);
 	finish.position(displayWidth/2 + 75, height-90);
 	finish.style("background", "white");
 	finish.style("border-radius", "10px");
 	finish.style("border-width", "2px");
 	finish.mousePressed(finishGame);
}

function draw () {
	background(255);

		changeTime();
		colourSize();

		if (agent.every(element => element == "popped")) roundOver = true;

			if (roundOver) {
				roundOver = false;
				agent = [];
				frameCount = 0;
				level++;
				for (let i = 0; i < 13; i++) {
    				agent.push(new Balloon());
	 			}
			}

		agent.forEach(element => {
	    	if (element != "popped") element.display()
	  	});

	if (gameOver) {
		endScore();
	}

	fill(255);
	noStroke();
	rect(0, 0, width, 75);

	fill(0);
	textSize(colSize);
	textAlign(CENTER);
  	text(colour[ranCol], width/2, 50);

  	fill(255);
  	rect(0, height-107.5, width, 107.5);

  	stroke(0);
  	ellipse(width/2, height-72.5, 75, 50);

  	if (score < 0) fill(255, 0, 0);
  	else fill(0);
  	noStroke();
  	textSize(30);
  	text(score, width/2, height-62.5);
}

function mousePressed () {
	agent.forEach(element => {
    	if (element != "popped") element.balloonPop()
  	});
}

function changeTime () {
	if (frameCount % 300 == 0) {
		oldCol = newCol;
		newCol = Math.floor(random(0, colour.length));
		if (newCol != oldCol) {
			ranCol = newCol;
			colSizeAct = true;
		}
	}
}

function colourSize () {
	if (colSizeAct && colSize < 50) {
		colSize = colSize + 1.75;
	}
	else {
		colSizeAct = false;
		colSize = 30;
	}
}

function restartGame () {
	location.reload();
}

function finishGame () {
	gameOver = true;
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