const audioCtx=new AudioContext()
let FF= [0.00011314198115,  0.00033942594344, 0.00033942594344, 0.00011314198115],
    FB= [3.88183838983223,-11.15778893207433,10.70022228815451,-3.42336661006324]
const nFreqs=30
let Freqs=new Float32Array(nFreqs),
    Mags=new Float32Array(nFreqs),
    Phases=new Float32Array(nFreqs)
Freqs=Freqs.map(function(item,index) {return Math.pow(1.4,index)})
const iirfilter=audioCtx.createIIRFilter(FF,FB)
let source = audioCtx.createMediaElementSource(file)
source.connect(audioCtx.destination)
filterCheck.addEventListener('click', function() {
  source.disconnect()
  if (filterCheck.checked) source.connect(iirfilter).connect(audioCtx.destination)
  else source.connect(audioCtx.destination)
})
iirfilter.getFrequencyResponse(Freqs, Mags, Phases)
