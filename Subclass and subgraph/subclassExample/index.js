/* ----- A METTRE DANS PARAMS.JS ----- */
var params={
	decibel:{
		min:-100,max:0
	},
	color:{
		freqBar:"#2874c8",dashBar:"yellow",axisBar:"#eee",bottomFreq:"#000"
	},
	fontSize:14,
	barPosition:100,
	smoothingTimeConstant:0.8,
	fftSize:2048
};
/* ----- A METTRE DANS JS.JS ----- */
window.onload=init;
// An adaptation / improvement of https://github.com/airbenich/realtime-audio-analyzer
// Rewrote it as an ES6 class that extends AnalyzerNode
// Author Michel Buffa @micbuffa on github/twitter/WebAudio slack channel
let audioCtx;
window.onload = init;
function init() {
	audioCtx = new AudioContext();
	let wrapperDiv= document.querySelector('.wrapper');
	//main block for doing the audio stuff
	if (navigator.mediaDevices.getUserMedia) {
		console.log('getUserMedia supported.');
		navigator.mediaDevices.getUserMedia (
		// constraints - only audio needed for this app
		{
			audio:{mandatory: {echoCancellation: false}}
		}).then(function(stream) {
			let fa = new FrequencyAnalyzer(audioCtx,wrapperDiv,"A resizeable freq analyzer");
			let source = audioCtx.createOscillator();
			source.start();
			source.connect(fa);
			fa.connect(audioCtx.destination);
			// EVENTS
			let div_settings=document.querySelector('#div_settings');
			div_settings.addEventListener('dblclick',function(e){
				this.classList.toggle('hidden-settings');
			});
			let fftSize=document.querySelector('#fftSize');
			fftSize.addEventListener('input',function(e){
				params.fftSize=convert(e.target.value);
				fa.updateParams();
			});
			let bar_position=document.querySelector('#bar_position');
			bar_position.addEventListener('input',function(e){
				params.barPosition=e.target.value;
			});
			let smoothingTimeConstant=document.querySelector('#smoothingTimeConstant');
			smoothingTimeConstant.addEventListener('input',function(e){
				params.smoothingTimeConstant=e.target.value;
				fa.updateParams();
			});
			let freq_bar_color=document.querySelector('#freq_bar_color');
			freq_bar_color.addEventListener('change',function(e){
				let select_elem=document.querySelector('#select_elem');
				switch(select_elem.value){
					case "Frequency bars":{
						params.color.freqBar=e.target.value;
					}
					break;
					case "Treshold bar":{
						params.color.dashBar=e.target.value;
					}
					break;
					case "Axis/labels":{
						params.color.axisBar=e.target.value;
					}
					break;
				}
			});

			// _ Z O O M _
			let _zoom=9;
			let positionZoom=0;
			let positionZoomB=0;
			wrapperDiv.addEventListener('click',function(){
				// on initialise la position et la width de la zone zoomable à 0
				console.log('click');
				updateZoom(0,0);
			});
			wrapperDiv.addEventListener('dragstart',function(e){
				//e.dataTransfer.setData("Text", e.target.id);
				console.log('dragstart');
				// on initialise la position et la width de la zone zoomable à 0
				updateZoom(0,0);
				// on récupère la position de la souris au point de drague
				let rect = e.target.getBoundingClientRect();
				let mouseX = e.x - rect.left;
				//let mouseY = e.y - rect.top;
				// on set la position du zoom à la position de la souris
				positionZoom=mouseX;
				updateZoom(positionZoom,0);
			});
			wrapperDiv.addEventListener('drag',function(e){
				// on récupère la nouvelle position de la souris durant le drague
				let rect = e.target.getBoundingClientRect();
				let mouseX = e.x - rect.left;
				if (mouseX>0){
					positionZoomB=mouseX;
				}
				//let mouseY = e.y - rect.top;
				// on compare la position du zoom à la nouvelle position de la souris
				// on set la width du zoom en faisant la différence entre la nouvelle position et la position du zoom
				updateZoom(positionZoom,positionZoomB-positionZoom);
			});
			wrapperDiv.addEventListener('dragend',function(e){
				if (positionZoomB>positionZoom){
					_zoom++;
					if (_zoom>=9)	_zoom=9;
				}else{
					_zoom--;
					if (_zoom<=1) _zoom=1;
				}
			});
		}).catch(function(err) {
			console.log('The following gUM error occured: ' + err);
		});
	} else {
		console.log('getUserMedia not supported on your browser!');
		alert('getUserMedia not supported on your browser! Please use Firefox or Google Chrome.');
	}
}
function convert(_val){
	var _h=16;
	for (var i=0;i<_val;i++) _h=_h*2;
	console.log("_val : "+_val+" ; _h : "+_h);
	return parseInt(_h);
}
function updateZoom(_left,_width){
	let divZoom = document.querySelector('#div_zoom');
	divZoom.style.left=_left+"px";
	divZoom.style.width=_width+"px";
}

/* ----- A METTRE DANS FREQUENCYANALYZER.JS ----- */

// inherit default property values, connect methods, etc.
// behaviour that enable other nodes to connect to this one
// etc.
// TO ADD:
// -zoom in out to focus on some parts. Ideal way = click and drag + a reset button
// and/or two sliders one vertical and one horizontal for scaling.
// Instead of a ctx.scale, the whole analysis parameter should be modified
// - color for bars, for peaks,
// - mouse move display a reticulum for accurate measure of some freqs
// - smoothing should be settable using a slider too
// - display as a smoothed curve instead of bars
// - come with some integrated oscillators for testing, or with a demo
// - settable  dashed bar position
if (!params){
  var params={
    decibel:{
      min:-100,max:0
    },
    color:{
      freqBar:"#2874c8",dashBar:"yellow",axisBar:"#eee",bottomFreq:"#000"
    },
    fontSize:14,
    barPosition:100,
    smoothingTimeConstant:0.8,
    fftSize:2048
  };
}

class FrequencyAnalyzer extends AnalyserNode {
  // instances are an analyzernode
  constructor(audioContext, parent, label) {
    // parent is for example a div that will contain the analyzer
    super(audioContext);
    this.label = label;
    // analyzer part
    this.audioContext = audioContext;
    this.minDecibels = params.decibel.min;
    this.maxDecibels = params.decibel.max;
    this.smoothingTimeConstant = params.smoothingTimeConstant;
    //analyser.fftSize = 4096;
    this.setAnalyzerParams();
    // canvas part
    this.canvas = document.createElement('canvas');
    // get dimensions, by default the ones from the parent element
    this.canvas.classList.add("freqAnalyzer");
    this.canvas.width = parent.clientWidth;
    this.canvas.height = parent.clientHeight;
    this.canvasParent = parent;
    this.canvasParent.appendChild(this.canvas);
    this.ctx = this.canvas.getContext('2d');
    this.WIDTH = this.canvas.width;
    this.HEIGHT = this.canvas.height;
    this.resize(this.WIDTH, this.HEIGHT);
    window.addEventListener('resize', evt => this.resize(this.canvasParent.clientWidth,this.canvasParent.clientHeight));
    // start drawing frequencies
    requestAnimationFrame(this.update.bind(this));
  }

  setAnalyzerParams() {
    this.fftSize = params.fftSize;
    this.bufferLength = this.frequencyBinCount;
    //console.log(bufferLength);
    this.dataArray = new Float32Array(this.bufferLength);
    this.dataVisualArray = new Array(this.bufferLength);
    this.frequency = [];
  }
  // call this method if there is a need to resize the freq analyzer
  resize(w, h) {
    console.log("resize");
    this.canvas.width = w;
    this.canvas.height = h;
    this.WIDTH = w;
    this.HEIGHT = h;
    this.ANALYZERWIDTH = w;
    this.ANALYZERHEIGHT = h-100;
    this.HEIGHTRATIO = this.ANALYZERHEIGHT/140;
    this.barWidth = [];
    // calculate frequency and barWidth
    for(var i = 0; i < this.bufferLength; i++) {
      this.frequency[i] = i * this.audioContext.sampleRate / this.fftSize;
      this.barWidth[i] = (Math.log(i+2)-Math.log(i+1))*this.ANALYZERWIDTH/Math.log(this.bufferLength);
    }
    this.clearCanvas();
  }
  updateFreqDataArrayToPlot() {
    // get current frequency data
    this.getFloatFrequencyData(this.dataArray);
  }
  drawPeakTresholdDashedBar() {
    this.ctx.save();
    this.PEAKTHRESHOLD = params.barPosition;
    // draw peak threshold stroke
    this.ctx.beginPath();
    this.ctx.moveTo(60,this.ANALYZERHEIGHT-this.PEAKTHRESHOLD*this.HEIGHTRATIO);
    this.ctx.lineTo(this.ANALYZERWIDTH,this.ANALYZERHEIGHT-this.PEAKTHRESHOLD*this.HEIGHTRATIO);
    this.ctx.strokeStyle = params.color.dashBar;
    this.ctx.setLineDash([5]);
    this.ctx.stroke();
    this.ctx.setLineDash([]);
    this.ctx.restore();
  }

  drawOneLabel2(i, x, widthInBars, color) {
    let fontSize = params.fontSize;
    if(this.WIDTH < 600) fontSize = 8;
    else if(this.WIDTH < 400) fontSize = 4;
    this.ctx.font = fontSize + 'px Arial';
    this.ctx.fillStyle = color;
    var sumBar=0;
    for (var l=0;l<widthInBars;l++) sumBar+=this.barWidth[i-l]+1;
    //distance=-x+fontSize/2;
    //let distance=-x-widthInBars*this.barWidth[i]/2+(fontSize/2);
    var distance=-x+((fontSize-sumBar)/2);
    this.ctx.save();
    // insert "kilo" herz
    if(this.frequency[i] >= 1000) {
      this.ctx.fillText(Math.round(this.frequency[i+1]/100)/10+ ' kHz', this.HEIGHT-80,distance);
    } else {
      this.ctx.fillText(Math.round(this.frequency[i+1])+ ' Hz', this.HEIGHT-80,distance);
    }
    // draw small scale identifyer
    this.ctx.beginPath();
    this.ctx.moveTo(this.ANALYZERHEIGHT,-x+1);
    this.ctx.lineTo(this.ANALYZERHEIGHT+10,-x+1);
    this.ctx.strokeStyle = params.color.axisBar;
    this.ctx.stroke();
    this.ctx.restore();
  }
  drawFrequencyLabels() {
    this.ctx.save();
    // draw bottom in dark grey
    this.ctx.fillStyle = params.color.bottomFreq;
    this.ctx.fillRect(0, this.ANALYZERHEIGHT+1, this.WIDTH, this.HEIGHT);
    // Draw rotated freq labels
    this.ctx.save();
    // draw frequency labels (rotated 90 degree to be vertically drawn)
    this.ctx.rotate(Math.PI / 2);
    var x=0, a=0, b=0, c=0, d=0;
    for(let i = 0; i < this.bufferLength; i++) {
      if (i<16)
      {
        this.drawOneLabel2(i,x,1,params.color.axisBar);
      }
      else if(i<32)
      {
        if (a%2===0) this.drawOneLabel2(i,x,2,params.color.axisBar);
        a++;
      }
      else if(i<64)
      {
        if (b%4===0) this.drawOneLabel2(i,x,4,params.color.axisBar);
        b++;
      }
      else if(i<128)
      {
        if (c%8===0) this.drawOneLabel2(i,x,8,params.color.axisBar);
        c++;
      }
      else {
        if(d%16===0) this.drawOneLabel2(i,x,16,params.color.axisBar);
        d++;
      }
      x+=this.barWidth[i]+1;
    }
    this.ctx.restore();
    // draw x-scale stroke
    this.ctx.beginPath();
    this.ctx.moveTo(0,this.ANALYZERHEIGHT+5);
    this.ctx.lineTo(this.ANALYZERWIDTH,this.ANALYZERHEIGHT+5);
    this.ctx.strokeStyle = params.color.axisBar;
    this.ctx.stroke();
    this.ctx.restore();
  }
  drawLeftDbScale() {
    this.ctx.save();
    // draw left scale
    this.minDecibels = params.decibel.min;
    this.maxDecibels = params.decibel.max;
    let stepSize = 10;
    let steps = (this.maxDecibels - this.minDecibels)/stepSize;
    this.ctx.fillStyle =params.color.axisBar;
    let fontSize = params.fontSize;
        if(this.HEIGHT < 250) {
      fontSize = 8;
    } else if(this.HEIGHT < 100) {
      fontSize = 4;
    }
    this.ctx.font = 'normal ' + fontSize + 'px Arial';
    var y = this.maxDecibels;
    for(let i = 0; i < steps;i++) {
      // draw text
      this.ctx.fillText(y + ' db', 10, this.ANALYZERHEIGHT/steps*i+30);
      // draw small scale identifier
      this.ctx.beginPath();
      this.ctx.moveTo(55,this.ANALYZERHEIGHT/steps*i+25);
      this.ctx.lineTo(65,this.ANALYZERHEIGHT/steps*i+25);
      this.ctx.strokeStyle = params.color.axisBar;
      this.ctx.stroke();
      y -= stepSize;
    }
    // draw y-scale axis
    this.ctx.beginPath();
    this.ctx.moveTo(60,0);
    this.ctx.lineTo(60,this.ANALYZERHEIGHT+5);
    this.ctx.strokeStyle = params.color.axisBar;
    this.ctx.stroke();
    this.ctx.restore();
  }
  drawFrequencyBars() {
    this.ctx.save();
    let x = 0;
    //console.log(dataArray);
    // draw bars (rectangles)
    for(let i = 0; i < this.bufferLength; i++) {
      let barHeight = (this.dataArray[i]+140)*this.HEIGHTRATIO;
      barHeight /= (90 / (this.maxDecibels - this.minDecibels));
      if(barHeight < 0) barHeight = 0;
      // draw bar
      // this.ctx.fillStyle = 'rgb(0,'+(barHeight+50)+',0)';
      // nice blue....
      this.ctx.fillStyle = params.color.freqBar;
      // If above treshold, highlight the frequencies in white
      if(this.dataArray[i]+140 > this.PEAKTHRESHOLD) this.ctx.fillStyle = 'white';
      // draw a bar
      this.ctx.fillRect(x,this.ANALYZERHEIGHT-barHeight,this.barWidth[i],barHeight);
      x += this.barWidth[i] + 1;
    }
    this.ctx.restore();
  }
  drawLabel() {
    this.ctx.save();
    let fontSize = params.fontSize;
    this.ctx.font =  fontSize + 'px Arial';
    this.ctx.testAlign='center';
    this.ctx.fillStyle = params.color.axisBar;
    this.ctx.fillText(this.label, this.WIDTH/2-40, 30);
    this.ctx.restore();
  }
  clearCanvas() { this.ctx.fillRect(0, 0, this.WIDTH, this.HEIGHT)}
  updateParams(){
    this.PEAKTHRESHOLD = params.barPosition;
    this.fftSize = params.fftSize;
    this.bufferLength = this.frequencyBinCount;
    this.dataArray = new Float32Array(this.bufferLength);
    this.dataVisualArray = new Array(this.bufferLength);
    console.log(this.fftSize);
    console.log(this.bufferLength);
    this.smoothingTimeConstant = params.smoothingTimeConstant;
    //this.resize(this.width, this.height);
    this.resize(this.WIDTH, this.HEIGHT);
  }
  // Main animation loop
  update() {
    this.clearCanvas();
    this.updateFreqDataArrayToPlot();
    this.drawPeakTresholdDashedBar();
    this.drawFrequencyLabels();
    this.drawFrequencyBars();
    this.drawLeftDbScale();
    this.drawLabel();
    // repaint 60 times/s
    requestAnimationFrame(this.update.bind(this));
  }
}
