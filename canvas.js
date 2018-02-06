var canvas = document.querySelector('canvas');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

var c = canvas.getContext('2d');

// c.fillStyle = "#F08080";
// c.fillRect(100, 100, 100, 100);
// console.log(canvas);

 //Line
// c.beginPath();
// c.moveTo(50, 300);
// c.lineTo(450, 100);
// c.lineTo(600, 200);
// c.strokeStyle = 'blue';
// c.stroke();

// //Arc / circle
// c.strokeStlye = 'red';

// for (var i =0; i<5; i++){
// 	var x = Math.random() * window.innerWidth;
// 	var y = Math.random() * window.innerHeight;
	
// c.beginPath();
// c.arc(x, y, 30, 0, Math.PI * 2, false);
// c.stroke();
// }

var mouse = {
	x: undefined, 
	y: undefined
}

var maxRadius = 40;
var minRadius = 2;

var colorArray = [
'#DC143C',
'#556B2F',
'#8B0000',
'#DAA520',
'#7CFC00',
'#DB7093',
'#FF0000',
];

window.addEventListener('mousemove',
	function(event){
      mouse.x = event.x;
      mouse.y = event.y;
	})

function Circle(x, y, dx, dy, radius) {
	this.x = x;
	this.y = y;
    this.dx = dx;
    this.dy = dy;
    this.radius = radius;
	console.log('abujn');
	this.draw = function(){
       c.beginPath();
        c.arc(this.x,this.y,this.radius,0,
        	Math.PI * 2, false);
        c.fillStyle = colorArray[Math.floor(Math.random() * colorArray.length)];
        c.fill();
       }

	this.update = function(){
        if(this.x + this.radius > innerWidth
         || this.x - this.radius < 0){
         this.dx = -this.dx;
        }
       if(this.y + this.radius > innerHeight 
       	|| this.y - this.radius < 0){
         this.dy = -this.dy;
        }
    this.x += this.dx;
    this.y += this.dy;
    
    //interactivity
    if (mouse.x - this.x < 50 && mouse.x - this.x> -50
        && mouse.y - this.y < 50 && mouse.y - this.y> -50
    	){
    	if (this.radius < maxRadius) {
    		this.radius += 1;
    	}
    } else if(this.radius > minRadius){
    	this.radius -= 1;
    }
    this.draw();
	}

} 

var circleArray = [];

for(var i = 0; i< 200; i++){
 var radius = 30;
 var x = Math.random() * (innerWidth - radius*2)+ radius;
 var y = Math.random() * (innerHeight - radius*2)+ radius;
 var dx = (Math.random() - 0.5);
 var dy = (Math.random() - 0.5);
 
  circleArray.push(new Circle(x,y,dx,dy,radius));
 }

 function animate() {
 	requestAnimationFrame(animate);
    c.clearRect(0, 0, innerWidth, innerHeight);
    for(var i = 0; i< circleArray.length; i++){
    	circleArray[i].update();
    }

}
animate();