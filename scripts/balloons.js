var balloonCount = -1;

class Balloon {
	
	constructor () {
		balloonCount++;
		this.tag = balloonCount;
		this.r = Math.floor(random(0,7));
		this.daah = daah[this.r];
		this.x = random(50, 250);
		this.y = height;
		this.release = random(0, 300);
		this.popped = false;
		this.a = 255;
		this.speed = random(1, 2);
		this.direction = 0;
		this.txtSize = 16;
		this.multiplier = this.speed*level;
	}

	display () {
		imageMode(CENTER);
		tint(255, this.a);
		if (frameCount > this.release && this.popped == false) {
			this.y = this.y - this.multiplier;
			image(this.daah, this.x, this.y);
		}
		else if (this.popped == true) {
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
		if (this.y < 0) {
			this.balloonRemove();
		}
	}

	balloonPop () {
		if (!gameOver && mouseY < height - 107.5) {
			if (mouseX > this.x -40 && mouseX < this.x +40 && mouseY < this.y +40 && mouseY > this.y -40 && ranCol == this.r) {
				if (this.popped == false) {
					popSound.play();
					score = score + Math.round(this.multiplier);
					this.direction = 1;
				}
				this.popped = true;
			}
			else if (mouseX > this.x -40 && mouseX < this.x +40 && mouseY < this.y +40 && mouseY > this.y -40 && ranCol != this.r) {
				if (this.popped == false) {
					popSound.play();
					score = score - Math.round(this.multiplier);
					this.direction = -1;
				}
				this.popped = true;
			}
		}
	}

	balloonRemove () {
		let i = agent.map((element) => element.tag).indexOf(this.tag);
		agent.splice(i, 1, "popped");
	}

}
