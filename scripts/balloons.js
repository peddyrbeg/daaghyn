class Balloon {
	
	constructor () {
		this.r = Math.floor(random(0,4));
		this.daah = daah[this.r];
		this.x = random(50, 250);
		this.y = height;
		this.release = random(0, 300);
		this.popped = false;
		this.a = 255;
		this.finished = false;
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
			this.a--;
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
		}
		if (this.y < 0) this.finished = true;
	}

	balloonPop () {
		if (!gameOver && mouseY < height - 107.5) {
			if (mouseX > this.x -40 && mouseX < this.x +40 && mouseY < this.y +40 && mouseY > this.y -40 && ranCol == this.r) {
				if (this.popped == false) {
					popSound.play();
					score = score + Math.round(this.multiplier);
					this.direction = 1;
				}
				this.finished = true;
				this.popped = true;
			}
			else if (mouseX > this.x -40 && mouseX < this.x +40 && mouseY < this.y +40 && mouseY > this.y -40 && ranCol != this.r) {
				if (this.popped == false) {
					popSound.play();
					score = score - Math.round(this.multiplier);
					this.direction = -1;
				}
				this.finished = true;
				this.popped = true;
			}
		}
	}

}