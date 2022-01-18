var balloonCount = -1;

class Balloon {
	
	constructor () {
		balloonCount++;
		this.tag = balloonCount;
		this.r = Math.floor(random(0,7));
		colCount[this.r]++;
		this.rot = 0;
		this.daah = daah[this.r];
		this.x = random(50, 250);
		this.y = height;
		this.release = random(0, 300);
		this.burst = false;
		this.a = 255;
		this.speed = random(1, 2);
		this.direction = 0;
		this.txtSize = 16;
		if (difficulty == 0) this.multiplier = this.speed + (0.5*level);
		else if (difficulty == 1) this.multiplier = this.speed + level;
		else if (difficulty == 2) this.multiplier = this.speed + level*2;
		this.rTurn = true;
	}

	display () {
		imageMode(CENTER);
		tint(255, this.a);
		if (frameCount > this.release && this.burst == false) {
			this.y -= this.multiplier;
			if (this.rot > 0.05) this.rTurn = false;
			else if (this.rot < -0.05) this.rTurn = true;
			this.rTurn ? this.rot += 0.001*this.speed : this.rot -= 0.001*this.speed;
			push();
			translate(this.x, this.y);
			rotate(this.rot);
			image(this.daah, 0, 0);
			pop();
		}
		else if (this.burst == true) {
			this.a = this.a - 3;
			image(popped[this.r], this.x, this.y);
			this.txtSize = this.txtSize + 0.2;
			textSize(this.txtSize);
			stroke(0);
			strokeWeight(2);
			if (this.direction == 1 && this.a > 0) {
				fill(0, 255, 0);
				text("+" + Math.round(this.multiplier), this.x, this.y);
			}
			else if (this.direction == -1 && this.a > 0) {
				fill(255, 0, 0);
				text("-" + Math.round(this.multiplier), this.x, this.y);
			}
			if (this.a <= 0) this.balloonRemove();
		}
		if (this.y < 10) {
			this.balloonRemove();
			colCount[this.r]--;
			if (ranCol == this.r && colCount[this.r] == 0) {
				changeTime();
			}
		}
	}

	balloonPop () {
		if (!gameOver && mouseY < height - 107.5) {
			if (mouseX > this.x -40 && mouseX < this.x +40 && mouseY < this.y +40 && mouseY > this.y -40 && ranCol == this.r) {
				if (this.burst == false) {
					popSound.play();
					score = score + Math.round(this.multiplier);
					this.direction = 1;
					colCount[this.r]--;
					if (colCount[this.r] == 0) {
						changeTime();
					}
				}
				this.burst = true;
			}
			else if (mouseX > this.x -40 && mouseX < this.x +40 && mouseY < this.y +40 && mouseY > this.y -40 && ranCol != this.r) {
				if (this.burst == false) {
					popSound.play();
					score = score - Math.round(this.multiplier);
					this.direction = -1;
					colCount[this.r]--;
				}
				this.burst = true;
			}
		}
	}

	balloonRemove () {
		let i = agent.map((element) => element.tag).indexOf(this.tag);
		agent.splice(i, 1, "gone");
	}

}
