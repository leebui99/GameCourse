var ctx;
function initCanvas(){
    ctx = document.getElementById('my_canvas').getContext('2d');
    var cW = ctx.canvas.width, cH = ctx.canvas.height;
    var enemies = [ {"id":"enemy1","x":100,"y":-20,"w":40,"h":20},
                    {"id":"enemy2","x":225,"y":-20,"w":40,"h":20},
                    {"id":"enemy3","x":350,"y":-20,"w":40,"h":20},
                    {"id":"enemy4","x":475,"y":-20,"w":40,"h":20},
                    {"id":"enemy5","x":590,"y":-20,"w":40,"h":20},
                    
                    {"id":"enemy6","x":100,"y":-70,"w":40,"h":20},
                    {"id":"enemy7","x":225,"y":-70,"w":40,"h":20},
                    {"id":"enemy8","x":350,"y":-70,"w":40,"h":20},
                    {"id":"enemy9","x":475,"y":-70,"w":40,"h":20},
                    {"id":"enemy10","x":590,"y":-70,"w":40,"h":20},

                    {"id":"enemy11","x":100,"y":-120,"w":40,"h":20},
                    {"id":"enemy12","x":225,"y":-120,"w":40,"h":20},
                    {"id":"enemy13","x":350,"y":-120,"w":40,"h":20},
                    {"id":"enemy14","x":475,"y":-120,"w":40,"h":20},
                    {"id":"enemy14","x":590,"y":-120,"w":40,"h":20},

                    {"id":"enemy11","x":100,"y":-170,"w":40,"h":20},
                    {"id":"enemy12","x":225,"y":-170,"w":40,"h":20},
                    {"id":"enemy13","x":350,"y":-170,"w":40,"h":20},
                    {"id":"enemy14","x":475,"y":-170,"w":40,"h":20},
                    {"id":"enemy14","x":590,"y":-170,"w":40,"h":20},
                    


    ];
    
    function renderEnemies(){
        for(var i = 0; i < enemies.length; i++){
            ctx.fillStyle = "blue";
            ctx.fillRect(enemies[i].x, enemies[i].y+=.5, enemies[i].w, enemies[i].h);
       
            if(enemies[i].y > 650){
                console.log("You lose");
                clearInterval(animateInterval);
                ctx.fillStyle = '#FC0';
                ctx.font = 'bold 36px Arial, sans-serif';
                ctx.fillText('GAME OVER!', cW*.5-130, 50, 300);
                
            }
        }
    }
    function Launcher(){
        this.y = 650, this.x = cW*.5-25, this.w = 50, this.h = 50, this.dir, this.bg="red", this.missiles = [];
        this.render = function(){
            if(this.dir == 'left'){
                if(this.x > 0){
                     this.x-=5;
                }
            } else if(this.dir == 'right'){
                if(this.x < 750){
                    this.x+=5;
                }
            }
            ctx.fillStyle = this.bg;
            ctx.fillRect(this.x, this.y, this.w, this.h);
            for(var i=0; i < this.missiles.length; i++){
                var m = this.missiles[i];
                ctx.fillStyle = m.bg;
                ctx.fillRect(m.x, m.y-=5, m.w, m.h);
                this.hitDetect(this.missiles[i],i);
                if(m.y <= 0){ // If a missile goes past the canvas boundaries, remove it
                  
                    this.missiles.splice(i,1); // Splice that missile out of the missiles array
                }
            }
            if(enemies.length == 0){
                clearInterval(animateInterval); // Stop the game animation loop
                ctx.fillStyle = '#FC0';
                ctx.font = 'bold 36px Arial, sans-serif';
                ctx.fillText('YOU WIN!', cW*.5-130, 50, 300);
            }
        }
        this.hitDetect = function(m,mi){
             var enemiesNum = 0;
            for(var i = 0; i < enemies.length; i++){
                var e = enemies[i];
                 enemiesNum++;
                if(m.x+m.w >= e.x && m.x <= e.x+e.w && m.y >= e.y && m.y <= e.y+e.h){
                    this.missiles.splice(this.missiles[mi],1); // Remove the missile
                    enemies.splice(i,1); // Remove the enemy that the missile hit
                }
                
            }
             document.getElementById('status').innerHTML = "You have "+ enemiesNum + " enimies";
        }
        
        this.move = function () {
             ctx.canvas.addEventListener('keypress', function (e) {
		    //if (e.code === 'KeyW') that.w = true;
		    console.log("Hello" + e);
		    //console.log("Key Down Event - Char " + e.code + " Code " + e.keyCode);
		    e.preventDefault();
	}, false);
        }
    }
    
    var launcher = new Launcher();
    function animate(){
        //ctx.save();
        ctx.clearRect(0, 0, cW, cH);
        launcher.render();
        launcher.move();
        renderEnemies();
         //ctx.restore();
    }
    var animateInterval = setInterval(animate, 30);
    
    var left_btn = document.getElementById('left_btn');
    var right_btn = document.getElementById('right_btn');
    var fire_btn = document.getElementById('fire_btn');
    
    left_btn.addEventListener('mousedown', function(event) {
        console.log("HE");
        launcher.dir = 'left';
        console.log("LEFT");
    });
    left_btn.addEventListener('mouseup', function(event) {
        launcher.dir = '';
    });
    right_btn.addEventListener('mousedown', function(event) {
        console.log("RIGHT");
        launcher.dir = 'right';
    });
    right_btn.addEventListener('mouseup', function(event) {
        launcher.dir = '';
    });
    fire_btn.addEventListener('mousedown', function(event) {
          console.log("FIRE");
        launcher.missiles.push({"x":launcher.x+launcher.w*.5,"y":launcher.y,"w":3,"h":10,"bg":"red"});
    });
    

}


window.addEventListener('load', function(event) {
    //console.log("CAAAAAAAAAa");
    initCanvas();
});
