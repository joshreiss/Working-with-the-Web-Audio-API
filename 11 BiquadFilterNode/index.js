var audioContext = new AudioContext();
var canvasContext = canvas.getContext("2d");
var nFreqs = 100,freqStep;
var freqArray = new Float32Array(nFreqs);
for(var i=0;i<nFreqs; ++i) freqArray[i] = 20000/nFreqs*(i+1);
var Mags = new Float32Array(nFreqs),Phases = new Float32Array(nFreqs);
var biquadFilter = new BiquadFilterNode(audioContext,{frequency:1000,Q:1,gain:1});
function UICallback (event) {
  biquadFilter.frequency.value = frequencySlider.value;
  biquadFilter.Q.value = qSlider.value;
  biquadFilter.gain.value = gainSlider.value;
  biquadFilter.type = typeSelect.value;
  biquadFilter.getFrequencyResponse(freqArray,Mags,Phases);
  canvasContext.clearRect(0, 0, canvas.width, canvas.height);
  canvasContext.beginPath();
  for(freqStep=0;freqStep<nFreqs;++freqStep) canvasContext.lineTo(canvas.width*freqStep/nFreqs,canvas.height-Mags[freqStep]*90);
  canvasContext.stroke();
}
start.onclick = function() {
  audioContext.resume();
  let source = new AudioBufferSourceNode(audioContext,{loop:true});
  let nFrames = audioContext.sampleRate;
  source.buffer = audioContext.createBuffer(1,nFrames,audioContext.sampleRate);// Create 1 second buffer
  for (i=0;i<nFrames;i++) source.buffer.getChannelData(0)[i] = 2*Math.random()-1;
  source.connect(biquadFilter).connect(audioContext.destination);
  source.start();
}
