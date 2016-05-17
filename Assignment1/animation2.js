function Animation2(spriteSheet, startX, startY, frameWidth, frameHeight, frameDuration, frames, loop, reverse) {
    this.spriteSheet = spriteSheet;
    this.startX = startX;
    this.startY = startY;
    this.frameWidth = frameWidth;
    this.frameDuration = frameDuration;
    this.frameHeight = frameHeight;
    this.frames = frames;
    this.totalTime = frameDuration * frames;
    this.elapsedTime = 0;
    this.loop = loop;
    this.reverse = reverse;
}

Animation2.prototype.drawFrame = function (tick, ctx, x, y, scaleBy) {
    var scaleBy = scaleBy || 1;
    this.elapsedTime += tick;
    if (this.loop) {
        if (this.isDone()) {
            this.elapsedTime = 0;
        }
    } else if (this.isDone()) {
        return;
    }
    var index = this.reverse ? this.frames - this.currentFrame() - 1 : this.currentFrame();
    var vindex = 0;
    if ((index + 1) * this.frameWidth + this.startX > this.spriteSheet.width) {
        index -= Math.floor((this.spriteSheet.width - this.startX) / this.frameWidth);
        vindex++;
    }
    while ((index + 1) * this.frameWidth > this.spriteSheet.width) {
        index -= Math.floor(this.spriteSheet.width / this.frameWidth);
        vindex++;
    }

    var locX = x;
    var locY = y;
    var offset = vindex === 0 ? this.startX : 0;
    ctx.drawImage(this.spriteSheet,
                  index * this.frameWidth + offset, vindex * this.frameHeight + this.startY,  // source from sheet
                  this.frameWidth, this.frameHeight,
                  locX, locY,
                  this.frameWidth * scaleBy,
                  this.frameHeight * scaleBy);
}

Animation2.prototype.currentFrame = function () {
    return Math.floor(this.elapsedTime / this.frameDuration);
}

Animation2.prototype.isDone = function () {
    return (this.elapsedTime >= this.totalTime);
}

function Angel(game, spriteSheet) {
    //Animation2(spriteSheet, startX, startY, frameWidth, frameHeight, frameDuration, frames, loop, reverse)
    this.animation = new Animation2(spriteSheet, 0, 300, 95, 85, 0.15, 3, true, true);
    this.leftAnimation = new Animation2(spriteSheet, 0, 200, 95, 85, 0.1, 3, true, true);
    this.rightAnimation = new Animation2(spriteSheet, 0, 110, 95, 85, 0.1, 3, true, true);
    this.upAnimation = new Animation2(spriteSheet, 0, 0, 95, 85, 0.1, 3, true, true);
    this.radius = 100;
    this.ground = 350;
    this.left = false;
    this.right = false;
    this.up = false;
    this.down = false;
    this.space = false;
    this.xPosition = 400;
    this.yPosition = 350;
    Entity.call(this, game, 400, 350);//position where it start
}

Angel.prototype = new Entity();
Angel.prototype.constructor = Angel;

Angel.prototype.update = function () {
           //console.log(this.game.click);

   if (this.game.click) {
		this.change(this.calDir(this.game.position.x, this.game.position.y));
        
		console.log(this.xPosition + " " + this.yPosition);
		//this.change(temp);       
	}
    if (this.left) {
        console.log("left");
       this.xPosition = this.xPosition - 1;
       if (this.xPosition <= this.game.position.x){
           this.left = false;
           this.game.click = false;
           
       }
    }
     if (this.right) {
        console.log("right");
       this.xPosition = this.xPosition + 1;
       //console.log("CHECK" + this.xPosition);
       if (this.xPosition >= this.game.position.x){
           this.right = false;
           this.game.click = false;
           
       }
    }
        
     if (this.up) {
        console.log("UP");
       this.yPosition = this.yPosition - 1;
       //console.log("CHECK" + this.xPosition);
       if (this.yPosition <= this.game.position.y){
           this.up = false;
           this.game.click = false;
           
       }
    }
    Entity.prototype.update.call(this);
}

//Change the direct of the angel
Angel.prototype.change = function(dir) {

	switch(dir) {
		
		case "left": this.up = false; this.down = false; this.left = true; this.right = false; this.space = false;    console.log("LEFT"); break;
		case "right": this.up = false; this.down = false; this.left = false; this.right = true; this.space = false;  console.log("RIGHT99999999999999999"); break;
        case "up": this.up = true; this.down = false; this.left = true; this.right = false; this.space = false;    console.log("LEFT"); break;
		case "down": this.up = false; this.down = false; this.left = true; this.right = false; this.space = false;    console.log("LEFT"); break;
		default: console.log("none");
	}
	this.move = true;
}

Angel.prototype.calDir = function(x, y) {
	var nory = x*4/5;
	var oppy = x*-4/5 + 700;
	if(y <= nory && y <= oppy) {
		return "up";
	} else if(y >= nory && y <= oppy) {
		return "left";
	} else if(y <= nory && y >= oppy) {
		return "right";
	} else {
		return "down";
	}
}


Angel.prototype.draw = function (ctx) {
   if(this.left) {
    	this.leftAnimation.drawFrame(this.game.clockTick, ctx, this.xPosition, this.yPosition);
    } else if(this.right) {
    	this.rightAnimation.drawFrame(this.game.clockTick, ctx, this.xPosition, this.yPosition);
    }else if(this.up) {
    	this.upAnimation.drawFrame(this.game.clockTick, ctx, this.xPosition, this.yPosition);
    }else{
        this.animation.drawFrame(this.game.clockTick, ctx, this.xPosition, this.yPosition);
    }
    Entity.prototype.draw.call(this);
}



