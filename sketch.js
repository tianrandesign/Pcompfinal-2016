var gravity = 0.001;
var drop = [];
//var gap = [5, 75, 145, 215, 285, 355, 425, 495, 570, 640, 710, 780,850,920,990,1060,1130,1200,1270,1340,1410];
var keywidth=24;
var screenwidth=1460;
var notes = [ 48,50,52,53,55,57,59,60, 62, 64, 65, 67, 69, 71,72,74,76,77,79,81,83];
var osc;

var serial; // variable to hold an instance of the serialport library
var portName = '/dev/cu.usbmodem1411'; // fill in your serial port name here
var inData;                            // for incoming serial data
var outByte = 0;                       // for outgoing data

var mic, fft;
var button;
var micOpen;
sound.connect(fft);

function setup() {   

  createCanvas(keywidth*21+90, 1450);
  var gap=[keywidth*1+40,keywidth*2+40,keywidth*3+40,keywidth*4+40,keywidth*5+40,keywidth*6+40,keywidth*7+40,
           keywidth*8+40,keywidth*9+40,keywidth*10+40,keywidth*11+40,keywidth*12+40,keywidth*13+40,keywidth*14+40,
          keywidth*15+40,keywidth*16+40,keywidth*17+40,keywidth*18+40,keywidth*19+40,keywidth*20+40,keywidth*21+40,]
//var gap = [5, 75, 145, 215, 285, 355, 425, 495, 570, 640, 710, 780,850,920,990,1060,1130,1200,1270,1340,1410];
  for (var j = 0; j <10; j++) {
    drop[j] = new Drop(random(gap),random(-3000, 0),25);
  }

  // A triangle oscillator
  osc = new p5.TriOsc();
  // Start silent
  osc.start();
  osc.amp(0);
  
 serial = new p5.SerialPort();    // make a new instance of the serialport library
 serial.on('data', serialEvent);  // callback for when new data arrives
 serial.open(portName);           // open a serial port
  
  mic = new p5.AudioIn();
  fft = new p5.FFT(0.9, 32);//bins min is 16
  fft.setInput(mic);
  micOpen=false;
  button = createButton('Singing');
  button.position(19, 19);
  button.mousePressed(startMic);
}

function startMic(){
  if(micOpen===false){
     mic.start();
     micOpen=true;
      drop.splice(0, 10);
    //for (var j = 0; j < 12; j++) {
    

    //}
    
    //when user create a note,
    //and the totle notes are more than 12
    //delete the first note in the array

    // for (var k = 0; k < 12; k++) {
    // drop[k] = new UserDrop(20);
    // }
  }else{
    mic.stop();
    micOpen=false;
  }
}

function draw() {
  background(0);
  var centroidplot = 0.0;
var spectralCentroid = 0;
  
  var vol = mic.getLevel(); 
  var spectrum = fft.analyze();
  var l = width / (spectrum.length-20);//this num has to be 12
  if(vol>0.1){
  //   for (var m = 0; m < spectrum.length-20; m++) {
  //  //console.log(spectrum);
  //   fill(m, 255, 255);
  //   stroke(m, 255, 255);
  //   //line(0, 0, x, y);
  //   //vertex(x, y);
  //   var xf = m*l;
  //   //pay attention to the real sound value range = amp range
  //   var amp = spectrum[m];
  //   var y = map(amp, 0, 256, height, 0);
  // //   var energy=fft.getEnergy(frequency1,frequency2);      
  // //   var frequency1=32*m;
  // //   var frequency2=32*(m+1);  
  // //   var y = map(energy, 0, 255, 0, height);
  //     rect(xf, y, l, y);
  //   }
   // console.log(vol);

// get the centroid
        var nyquist = 22050;
spectralCentroid = fft.getCentroid();
// the mean_freq_index calculation is for the display.
var mean_freq_index = spectralCentroid/(nyquist/spectrum.length);
centroidplot = floor(map(log(mean_freq_index), 0, log(spectrum.length), 0, width));
stroke(255,0,0); // the line showing where the centroid is will be red
//rect(centroidplot, 0, 1, height);
//console.log(centroidplot);
    var add=3;
    var beginsound=380;
    //5, 75, 145, 215, 285, 355, 425, 495, 570, 640, 710, 780
   if(centroidplot>beginsound &&centroidplot<beginsound+add && centroidplot++>15){     
     drop.push(new Drop(keywidth*1+40,0,5)); 
    
   }else if(centroidplot>beginsound+add &&centroidplot<beginsound+add*2 && centroidplot++>15){
     drop.push(new Drop(keywidth*2+40,0,5)); 
   }else if(centroidplot>beginsound+add*2 &&centroidplot<beginsound+add*3&& centroidplot++>15){
     drop.push(new Drop(keywidth*3+40,0,5));  
   }else if(centroidplot>beginsound+add*3 &&centroidplot<beginsound+add*4&& centroidplot++>15){
     drop.push(new Drop(keywidth*4+40,0,5)); 
   }else if(centroidplot>beginsound+add*4 &&centroidplot<beginsound+add*5&& centroidplot++>5){
     drop.push(new Drop(keywidth*5+40,0,5)); 
   }else if(centroidplot>beginsound+add*5 &&centroidplot<beginsound+add*6&& centroidplot++>5){
     drop.push(new Drop(keywidth*6+40,0,5)); 
   }else if(centroidplot>beginsound+add*6 &&centroidplot<beginsound+add*7&& centroidplot++>5){
     drop.push(new Drop(keywidth*7+40,0,5));
   }else if(centroidplot>beginsound+add*7 &&centroidplot<beginsound+add*8&& centroidplot++>5){
     drop.push(new Drop(keywidth*8+40,0,5));  
   }else if(centroidplot>beginsound+add*8 &&centroidplot<beginsound+add*9&& centroidplot++>5){
     drop.push(new Drop(keywidth*9+40,0,5)); 
   }else if(centroidplot>beginsound+add*9 &&centroidplot<beginsound+add*10&& centroidplot++>5){
     drop.push(new Drop(keywidth*10+40,0,5)); 
   }else if(centroidplot>beginsound+add*10 &&centroidplot<beginsound+add*11&& centroidplot++>5){
     drop.push(new Drop(keywidth*11+40,0,5)); 
   }else if(centroidplot>beginsound+add*11 &&centroidplot<beginsound+add*12&& centroidplot++>5){
     drop.push(new Drop(keywidth*12+40,0,5));  
   }else if(centroidplot>beginsound+add*12 &&centroidplot<beginsound+add*13&& centroidplot++>15){
     drop.push(new Drop(keywidth*13+40,0,5)); 
   }else if(centroidplot>beginsound+add*13 &&centroidplot<beginsound+add*14&& centroidplot++>15){
     drop.push(new Drop(keywidth*14+40,0,5)); 
   }else if(centroidplot>beginsound+add*14 &&centroidplot<beginsound+add*15&& centroidplot++>5){
     drop.push(new Drop(keywidth*15+40,0,5)); 
   }else if(centroidplot>beginsound+add*15 &&centroidplot<beginsound+add*16&& centroidplot++>5){
     drop.push(new Drop(keywidth*16+40,0,5));
   }else if(centroidplot>beginsound+add*16 &&centroidplot<beginsound+add*17&& centroidplot++>5){
     drop.push(new Drop(keywidth*17+40,0,5)); 
   }else if(centroidplot>beginsound+add*17 &&centroidplot<beginsound+add*18&& centroidplot++>5){
     drop.push(new Drop(keywidth*18+40,0,5));  
   }else if(centroidplot>beginsound+add*18 &&centroidplot<beginsound+add*19&& centroidplot++>5){
     drop.push(new Drop(keywidth*19+40,0,5));  
   }else if(centroidplot>beginsound+add*19&&centroidplot<beginsound+add*20&& centroidplot++>5){
     drop.push(new Drop(keywidth*20+40,0,5)); 
   }else if(centroidplot>beginsound+add*20 &&centroidplot<beginsound+add*21&& centroidplot++>5){
     drop.push(new Drop(keywidth*21+40,0,5)); 
   }
 if(drop.length>10 &&drop[0].y>height){
      drop.splice(0, drop.length-10);}
  }
  

  // stroke(255);
  // fill(175);
  // ellipse(100, 100, 200, 1 + vol * 200);
  // console.log(vol);
  
  var w = width / notes.length;
  for (var i = 0; i < notes.length; i++) {
    var x = i * w;
    noFill();
    strokeWeight(1);
    stroke(0);
    // Draw the key
    rect(x, 0, w, height-1);
  }

  stroke(0);
 //display the incoming serial data as a string:
  var texth=1300;
 text("1" , keywidth*1+40, texth);
  text("2" , keywidth*2+40, texth);
  text("3" , keywidth*3+40, texth);
  text("4" , keywidth*4+40, texth);
  text("5" , keywidth*5+40, texth);
  text("6" , keywidth*6+40, texth);
  text("7" , keywidth*7+40, texth);
  text("8" , keywidth*8+40, texth);
  text("9" , keywidth*9+40, texth);
  text("10" , keywidth*10+40, texth);
  text("11" , keywidth*11+40, texth);
  text("12" , keywidth*12+40,  texth);
   text("13" , keywidth*13+40,  texth);
  text("14" ,keywidth*14+40,  texth);
  text("15" , keywidth*15+40,  texth);
  text("16" , keywidth*16+40,  texth);
  text("17" , keywidth*17+40,  texth);
  text("18" , keywidth*18+40,  texth);
  text("19" , keywidth*19+40,  texth);
  text("20" , keywidth*20+40,  texth);
  text("21" ,keywidth*21+40,  texth);
  for (var j = drop.length - 1; j >= 0; j--) {
    drop[j].show();
    drop[j].fall();
    // if (drop[j].y > (height - 10)) {
    //   outByte = (drop[j].x - 5) / 65;
    //  //console.log(outByte);
    // }
  }  
}

// A function to play a note
function playNote(note, duration) {
  osc.freq(midiToFreq(note));
  // Fade it in
  osc.fade(0.5,0.2);

  // If we sest a duration, fade it out
  if (duration) {
    setTimeout(function() {
      osc.fade(0,0.2);
    }, duration-50);
  }
}

function Drop(x,y,len) {
  this.x = x;
  this.y = y;
  this.speed = 1;
  this.len = len;
  
  this.show = function() {
    stroke(255);
    strokeWeight(5);
    line(this.x, this.y, this.x, this.y + this.len);
  };
  this.fall = function() {    
    this.y = this.y + this.speed;
    this.speed = this.speed + gravity;
    if (this.y > height ) {
      this.y = 0;
      this.speed = 2;
      outByte = byte((this.x - 40) / keywidth-1);
       //console.log(outByte);
      serial.write(outByte);
      playNote(notes[outByte],100);
    }
  };
}
function serialEvent() {
 // read a byte from the serial port:
 var inByte = serial.read();
 // store it in a global variable:
 inData = inByte;
  //console.log(inData);
}