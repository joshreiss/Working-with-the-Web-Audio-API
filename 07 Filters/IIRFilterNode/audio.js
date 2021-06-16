const audioCtx=new AudioContext();
let Omega_c = 2 * Math.PI * 480 / 48000;
let Beta = (1 - Math.tan(Omega_c/ 2)) / (1 + Math.tan(Omega_c / 2));
let FF=[Math.pow(1-Beta,3)/2, 3*Math.pow(1-Beta,3)/2, 3*Math.pow(1-Beta,3)/2, Math.pow(1-Beta,3)/2],
    FB=[3+Beta*Beta, -Beta*(11+Beta*Beta), 1+11*Beta*Beta, -Beta*(1+3*Beta*Beta)];
//let FF=[0.5, 1.5, 1.5, 0.5], FB= [3, 0, 1, 0]
console.log(FF,FB)
const nFreqs=30;
let Freqs=new Float32Array(nFreqs),Mags=new Float32Array(nFreqs),Phases=new Float32Array(nFreqs);
Freqs=Freqs.map(function(item,index) {return Math.pow(1.4,index)});//Fill array with log-spaced frequencies  audioCtx.sampleRate*index/(2*nFreqs)});
const iirfilter=audioCtx.createIIRFilter(FF,FB);// create the iir filter
let srcNode = audioCtx.createMediaElementSource(file);
srcNode.connect(audioCtx.destination);
filterCheck.addEventListener('click', function() {
  srcNode.disconnect();
  if (filterCheck.checked) srcNode.connect(iirfilter).connect(audioCtx.destination);
  else srcNode.connect(audioCtx.destination);
});
iirfilter.getFrequencyResponse(Freqs, Mags, Phases);// get our frequency response
