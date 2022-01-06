var inp1;
var reply;
var replies = [];
var traa = ["Good morning!", "Good afternoon!", "Good day!"];
var ranTraa;
var greet = ["Moghrey mie!", "Fastyr mie!", "Laa mie!"]
var stayd = ["I'm ok.", "I can't complain.", "I'm very well!"];
var prompt = [];
var prNo = 0;
var error;
var correct;
var correctCount = 0;
var errorCount = 0;
var enmyn = ["Aalish", "Juan", "Blay", "Erin", "Josef", "Freya", "Maayl", "Jamys", "Breeshey", "Catreeney"]
var nynEnnym;
var buill = ["Rhumsaa", "Doolish", "Balley Chashtal", "Purt ny h-Inshey", "Laksaa", "Purt Çhiarn", "Purt le Moirrey"];
var rEn;
var rBu;

var boxPosY = [];

var ans1;
var ans3a;
var ans3b = new RegExp ("kys t'ou hene", "i");
var ans4a = new RegExp ("ta mee ass", "i");
var ans4b = new RegExp ("cre ass t'ou", "i");

var r1T = 0;
var r1Tt = 150;
var r2T = 0;
var r2Tt = 166;
var r3T = 0;
var r3Tt = 157;
var r4T = 0;
var r4Tt = 140;

var replying = false;

var mNo = 0;

var repX;
var repTX;
var ansX;
var ansTX;

var startPos;
var spacing;
var spacing2;
var lSpacing;

var boxWidth;
var boxHeight;
var boxHeight2;
var txtWidth;

var popSound;
var played = false;

function preload () {
  popSound = loadSound('assets/414383__bluesiren__plop-sound.wav');
}

function setup () {
  createCanvas(displayWidth, displayHeight-displayHeight*0.16);

  boxWidth = displayWidth*0.146;
  boxHeight = displayHeight*0.046;
  boxHeight2 = displayHeight*0.068;
  txtWidth = displayWidth*0.1099;
  repX = displayWidth/2.6125;
  repTX = displayWidth/2.5;
  ansX = displayWidth/2.125;
  ansTX = displayWidth/2.05;

  boxPosY[0] = displayHeight * 0.046;
  startPos = displayHeight * 0.046;
  spacing = displayHeight*0.02;
  spacing2 = boxHeight2 + displayHeight*0.006;
  lSpacing = displayHeight * 0.025;

  let ranProm = Math.floor(random(0, 3));
  if (ranProm == 0) ans3a = new RegExp ("ta mee mie dy liooar", "i");
  else if (ranProm == 1) ans3a = new RegExp ("cha noddym gaccan", "i");
  else ans3a = new RegExp ("ta mee feer vie", "i");

  ranTraa = Math.floor(random(0,3));
  if (ranTraa == 0) ans1 = new RegExp ("moghrey mie", "i");
  else if (ranTraa == 1) ans1 = new RegExp ("fastyr mie", "i");
  else ans1 = new RegExp ("laa mie", "i");

  prompt = ["Say '" + traa[ranTraa] + "' back in Manx.", "Say who you are in Manx.", "Say, '" + stayd[ranProm] + " How are you yourself?' in Manx.", "Say where you're from, and ask where they're from."];

  inp1  = createInput();
  inp1.size(displayWidth/4, displayHeight*0.035);
  inp1.position(width/2-inp1.width/2, height-height*0.093);
  inp1.style("font-size", "20px");

  // reply = createButton(">");
  // reply.position(width/4*2.45, height-height*0.03);
  // reply.style('background', 'transparent');
  // reply.style('border', 'transparent');
  // reply.style('font-size', '20px');
  // reply.mousePressed(messaged);
}

function keyPressed () {
  if (keyCode === ENTER && !correct && !error && !replying) {
    messaged();
  }
}

function draw () {
  background(255);

  //initial greeting

  fill(214);
  noStroke();
  rect(repX, boxPosY[0], boxWidth, boxHeight, 10);
  boxPosY[1] = boxPosY[0] + boxHeight + spacing;
  fill(0);
  textSize(displayWidth*0.009);
  textAlign(LEFT, CENTER);
  text(greet[ranTraa], repTX, boxPosY[0] + lSpacing, );

  if (!correct && !error && !replying) {
    textAlign(CENTER);
    text(prompt[prNo], displayWidth/2, displayHeight-displayHeight*0.17);
  }

  //first reply

  if (prNo > 0) {
    fill(20, 100, 200);
    noStroke();
    rect(ansX, boxPosY[1], boxWidth, boxHeight, 10);
    boxPosY[2] = boxPosY[1] + boxHeight + spacing;
    fill(255);
    textSize(16);
    textAlign(LEFT);
    text(replies[0], ansTX, boxPosY[1] + lSpacing);
    if (r1T < r1Tt) {
      r1T++;
      replying = true;
    }
    else {
      replying = false;
      if (!played) playPop();
      fill(214);
      noStroke();
      let enq = "Mish " + enmyn[3] + ". Cre'n ennym   t'ort?";
      if (textWidth(enq) < txtWidth) {
        rect(repX, boxPosY[2], boxWidth, boxHeight, 10);
        boxPosY[3] = boxPosY[2] + boxHeight + spacing;
      }
      else {
        rect(repX, boxPosY[2], boxWidth, boxHeight2, 10);
        boxPosY[3] = boxPosY[2] + boxHeight2 + spacing;
      }
      fill(0);
      textSize(16);
      textAlign(LEFT);
      text(enq, repTX, boxPosY[2] + lSpacing, txtWidth);
    }
  }

  //second reply

  if (prNo > 1) {
    fill(20, 100, 200);
    noStroke();
    rect(ansX, boxPosY[3], 281, 49, 10);
    boxPosY[4] = boxPosY[3] + boxHeight + spacing;
    fill(255);
    textSize(16);
    textAlign(LEFT);
    text(replies[1], ansTX, boxPosY[3] + lSpacing);
    if (r2T < r2Tt) {
      r2T++;
      replying = true;
    }
    else {
      replying = false;
      if (!played) playPop();
      fill(214);
      noStroke();
      rect(repX, boxPosY[4], boxWidth, boxHeight2, 10);
      boxPosY[5] = boxPosY[4] + boxHeight2 + spacing;
      fill(0);
      textSize(16);
      textAlign(LEFT);
      text("T’eh mie çheet dty whail, " + nynEnnym + ". Kys t’ou?", repTX, boxPosY[4] + lSpacing, txtWidth);
    }
  }

  //third reply

  if (prNo > 2) {
    fill(20, 100, 200);
    noStroke();
    rect(ansX, boxPosY[5], boxWidth, boxHeight2, 10);
    boxPosY[6] = boxPosY[5] + boxHeight2 + spacing;
    fill(255);
    textSize(16);
    textAlign(LEFT);
    text(replies[2], ansTX, boxPosY[5] + lSpacing, txtWidth);
    if (r3T < r3Tt) {
      r3T++;
      replying = true;
    }
    else {
    replying = false;
    if (!played) playPop();
    fill(214);
    noStroke();
    rect(repX, boxPosY[6], boxWidth, boxHeight2, 10);
    boxPosY[7] = boxPosY[6] + boxHeight2 + spacing;
    fill(0);
    textSize(16);
    textAlign(LEFT);
    text("Ta mee braew, gura mie ayd. Cre ass t’ou, " + nynEnnym + "?", repTX, boxPosY[6] + lSpacing, txtWidth);
    }
  }

  //fourth reply

  if (prNo > 3) {
    fill(20, 100, 200);
    noStroke();
    if (textWidth(replies[3]) < txtWidth) {
      rect(ansX, boxPosY[7], boxWidth, boxHeight, 10);
      boxPosY[8] = boxPosY[7] + boxHeight + spacing;
    }
    else {
      rect(ansX, boxPosY[7], boxWidth, boxHeight2, 10);
      boxPosY[8] = boxPosY[7] + boxHeight2 + spacing;
    }
    fill(255);
    textSize(16);
    textAlign(LEFT);
    text(replies[3], ansTX, boxPosY[7] + lSpacing, txtWidth);
    if (r4T < r4Tt) {
      r4T++;
      replying = true;
    }
    else {
      replying = false;
    fill(214);
    noStroke();
    rect(repX, boxPosY[8], boxWidth, boxHeight, 10);
    fill(0);
    textSize(16);
    textAlign(LEFT);
    text("Ta mee ass " + buill[rBu] + ".", repTX, boxPosY[8] + lSpacing);
    }
  }

  //correct message

  if (correct) {
    fill(0, 150, 0);
    textAlign(CENTER);
    text("Well done!", width/2, height-10);
    correctCount++;
    if (correctCount == 50) {
      correct = false;
      correctCount = 0;
      mNo++;
    }
  }

  //try again message

  if (error) {
    fill(255, 0, 0);
    textAlign(CENTER);
    text("Try again!", width/2, height-10);
    errorCount++;
    if (errorCount == 50) {
      error = false;
      errorCount = 0;
    }
  }
}

function messaged () {
  if (mNo == 0) firstMessage();
  if (mNo == 1) secondMessage();
  if (mNo == 2) thirdMessage();
  if (mNo == 3) fourthMessage();
}

function firstMessage () {
  if (ans1.test(inp1.value())) {
    correct = true;
    replies.push(inp1.value());
    prNo++;
    inp1.value("");
    rEn = Math.floor(random(0, 10));
  }
  else {
    error = true;
  }
}

function secondMessage () {
  let mish = /mish/i;
  if (inp1.value().search(mish) == 0 && inp1.value().length > 5) {
    let b = /b/i;
    let c = /c/i;
    let ch = /ch/i;
    let d = /d/i;
    let f = /f/i;
    let g = /g/i;
    let j = /j/i;
    let k = /k/i;
    let m = /m/i;
    let p = /p/i;
    let q = /q/i;
    let s = /s/i;
    let t = /t/i;

    nynEnnym = inp1.value().replace(mish, "");
    nynEnnym = nynEnnym.replace(" ", "");
    nynEnnym = nynEnnym.replace(".", "");

    if (nynEnnym.search(b) == 0) nynEnnym = nynEnnym.replace(b, "V");
    else if (nynEnnym.search(c) == 0 && nynEnnym.search(ch) == -1) nynEnnym = nynEnnym.replace(c, "Ch");
    else if (nynEnnym.search(d) == 0) nynEnnym = nynEnnym.replace(d, "Gh");
    else if (nynEnnym.search(f) == 0) {
      nynEnnym = nynEnnym.replace(f, "");
      nynEnnym = nynEnnym.charAt(0).toUpperCase() + nynEnnym.slice(1);
    }
    else if (nynEnnym.search(g) == 0) nynEnnym = nynEnnym.replace(g, "Gh");
    else if (nynEnnym.search(j) == 0) nynEnnym = nynEnnym.replace(j, "Y");
    else if (nynEnnym.search(k) == 0) nynEnnym = nynEnnym.replace(k, "Ch");
    else if (nynEnnym.search(m) == 0) nynEnnym = nynEnnym.replace(m, "V");
    else if (nynEnnym.search(p) == 0) nynEnnym = nynEnnym.replace(p, "Ph");
    else if (nynEnnym.search(q) == 0) nynEnnym = nynEnnym.replace(q, "Wh");
    else if (nynEnnym.search(s) == 0) nynEnnym = nynEnnym.replace(s, "H");
    else if (nynEnnym.search(t) == 0) nynEnnym = nynEnnym.replace(t, "H");
    else nynEnnym = nynEnnym.charAt(0).toUpperCase() + nynEnnym.slice(1);
    correct = true;
    replies.push(inp1.value());
    prNo++;
    inp1.value("");
  }
  else {
    error = true;
  }
}

function thirdMessage () {
  if (ans3a.test(inp1.value()) && ans3b.test(inp1.value())) {
    correct = true;
    replies.push(inp1.value());
    prNo++;
    inp1.value("");
  }
  else {
    error = true;
  }
}

function fourthMessage () {
  if (ans4a.test(inp1.value()) && ans4b.test(inp1.value())) {
    correct = true;
    replies.push(inp1.value());
    prNo++;
    inp1.value("");
    rBu = Math.floor(random(0, 7));
  }
  else {
    error = true;
  }
}

function playPop () {
  played = true;
  popSound.play();
}