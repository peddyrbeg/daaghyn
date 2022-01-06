var agent = [];
var daah = [];
var popped = [];
var colour = ["JIARG", "GORRYM", "BWEE", "GLASS"];
var ranCol;
var colCount = [0, 0, 0, 0];
var ranDaah;

var keyDown = false;
var roundOver = false;
var colorChanges = [];

var score = 0;
var level = 1;
var colSize = 30;
var colSizeAct = false;

function preload () {
	daah[0] = loadImage('assets/jiarg.png');
	daah[1] = loadImage('assets/gorrym.png');
	daah[2] = loadImage('assets/bwee.png');
	daah[3] = loadImage('assets/glass.png');
	popped[0] = loadImage('assets/jiargPopped.png');
	popped[1] = loadImage('assets/gorrymPopped.png');
	popped[2] = loadImage('assets/bweePopped.png');
	popped[3] = loadImage('assets/glassPopped.png');

	aBeeZee = loadFont('assets/ABeeZee-Regular.ttf');

	popSound = loadSound('assets/pop.mp3');
}

function setup() {
	var cnv = createCanvas(320, displayHeight-163);
	var x = (displayWidth - width) / 2;
	cnv.position(x);

	textFont(aBeeZee);

	for (let i = 0; i < 12; i++) {
   		agent.push(new Balloon(ranDaah));
 	}
 	ranCol = Math.floor(random(0, 4));
 	colourChanges = [Math.floor(random(300, 500)), Math.floor(random(800, 1000))];
}

function draw () {
	background(255);

	changeTime();
	colourSize();

	if (agent.every(element => element.finished == true)) roundOver = true;

	if (roundOver) {
		roundOver = false;
		agent = [];
		frameCount = 0;
		level++;
		for (let i = 0; i < 10 * level; i++) {
    		agent.push(new Balloon());
 		}
	}

	agent.forEach(element => {
    	element.display()
  	});

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
  	ellipse(width/2, height-72.5, 50);

  	fill(0);
  	noStroke();
  	textSize(30);
  	text(score, width/2, height-62.5);
}

function mousePressed () {
	agent.forEach(element => {
    	element.balloonPop()
  	});
}

function changeTime () {
	for (let i = 0; i < colourChanges.length; i++) {
		if (frameCount == colourChanges[i]) {
			ranCol = Math.floor(random(0, 4));
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
