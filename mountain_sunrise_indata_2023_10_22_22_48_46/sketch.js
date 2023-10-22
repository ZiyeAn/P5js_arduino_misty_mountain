let serial;          // variable to hold an instance of the serialport library
let portName = '/dev/tty.usbmodem21101 ';  // fill in your serial port name here
let inData; 
let scaling, w, h;
let sound0Played = false;
let sound1Played = false;
let sound2Played = false;
let sound3Played = false;
let sound4Played = false;
const soundDelay = 1000; // 5 seconds
let mInData
let lerpxc=0;

function preload(){
  sound0=loadSound("0.mp3")
  sound1=loadSound("1.mp3")
  sound2=loadSound("2.mp3")
  sound3=loadSound("3.mp3")
  sound4=loadSound("4.mp3")
}

function setup() {  
    
    w = 300;
	h = 700;
	scaling = 1;
	//if (h > w) h = w;
	pixelDensity(1);
	createCanvas(w, h);
	background('#DCCDC6');
	colorMode(HSB);
	noStroke();
	drawingContext.shadowColor = random(['#D7B48A']);
	drawingContext.shadowBlur = 210;
  
  serial = new p5.SerialPort();

 serial.list();
 serial.open('/dev/tty.usbmodem21101');
 serial.on('connected', serverConnected);
 serial.on('list', gotList);
 serial.on('data', gotData);
 serial.on('error', gotError);
 serial.on('open', gotOpen);
 serial.on('close', gotClose);
}
//serial connect setting
function serverConnected() {
 print("Connected to Server");
}
function gotList(thelist) {
 print("List of Serial Ports:");

 for (let i = 0; i < thelist.length; i++) {
  print(i + " " + thelist[i]);
 }
}
function gotOpen() {
 print("Serial Port is Open");
}
function gotClose(){
 print("Serial Port is Closed");
 inData = "Serial Port is Closed";
}
function gotError(theerror) {
 print(theerror);
}
function gotData() {
 let currentString = serial.readLine();
  trim(currentString);
 if (!currentString) return;
 console.log(currentString);
 inData = currentString;
}
//animation

function draw(){
  // Sun
  mInData= map(inData,100,150,0,255)
  let xc = constrain(mInData,w/4,3/4*w)
  lerpxc =(lerpxc,xc,0.001)
  let SunY=sin(map(xc,0,w,-3.14,0,true))*100+100
	fill('#902828');
	circle(xc, SunY,100)
   //console.log(xc)
   //console.log(SunY)
    drawMountains();
    addTexture();
    playSound();
}

function playSound() {
    if (0 <= mInData && mInData < 50 && !sound0Played) {
    sound0.play();
    sound0.setLoop(false);
    sound0Played = true;
    
    // Set a timer to reset the flag after the delay
    setTimeout(() => {
      sound0Played = false;
    }, soundDelay);
  } else if (50 <= mInData && mInData < 100 && !sound1Played) {
    sound1.play();
    sound1.setLoop(false);
    sound1Played = true;
    
    // Set a timer to reset the flag after the delay
    setTimeout(() => {
      sound1Played = false;
    }, soundDelay);
  } else if (100 <= mInData && mInData < 150 && !sound2Played) {
    sound2.play();
    sound2.setLoop(false);
    sound2Played = true;
    
    // Set a timer to reset the flag after the delay
    setTimeout(() => {
      sound2Played = false;
    }, soundDelay);
  } else if (150 <= mInData && mInData < 200 && !sound3Played) {
    sound3.play();
    sound3.setLoop(false);
    sound3Played = true;
    
    // Set a timer to reset the flag after the delay
    setTimeout(() => {
      sound3Played = false;
    }, soundDelay);
  } else if (200 <= mInData && mInData < 255 && !sound4Played) {
    sound4.play();
    sound4.setLoop(false);
    sound4Played = true;
    
    // Set a timer to reset the flag after the delay
    setTimeout(() => {
      sound4Played = false;
    }, soundDelay);
  }
}
function drawMountains() {
	randomSeed(9999)
	for (let y = 150*scaling+mInData*0.9; y <= h+50*scaling; y+= 50*scaling) {
  	    let xnoise = 0;
		let ynoise = random(10);
		let ymin = 0;
		let xstep = 0.005;
		fill(100, y/36 , 47);
      console.log(y/90)
		beginShape();
  	    vertex(0, y);
        //console.log(y)
		for (let x = 0; x <= w+1; x+=2) {
			let y2 = ymin + (y - ymin) * noise(x * xstep, ynoise)
			vertex(x, y2);
		}
		vertex(w, y)
		endShape();
  }
	
	// Add some fog at the bottom.
  drawingContext.shadowBlur = 6000 * scaling;
  rect(-200 * scaling, h, w + 400 * scaling, 500 * scaling);
}
function addTexture() {
  loadPixels();
  for (let x = 0; x < w; x += 1) {
    for (let y = 0; y < h; y += 1) {
      const i = 4 * (x + y * w);
      const ns = -0.5 + noise(x*0.5,y*1.8);
      for (let n = 0; n < 3; n += 1) {
        pixels[i + n] += ns * 32;
      }
    }
  }
  updatePixels();
}