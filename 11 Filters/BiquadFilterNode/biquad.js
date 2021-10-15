var audioContext = new AudioContext()
var canvasContext = canvas.getContext('2d')
var nFreqs = 100,
    Freqs = new Float32Array(nFreqs),
    Mags = new Float32Array(nFreqs),
    Phases = new Float32Array(nFreqs)
for (var i=0;i<nFreqs;++i) Freqs[i] = 20000/nFreqs*(i+1)
var biquadFilter = new BiquadFilterNode(audioContext,{frequency:1000,Q:1,gain:1})
function UICallback() {
  biquadFilter.frequency.value = Frequency.value
  biquadFilter.Q.value = Q.value
  biquadFilter.gain.value = Gain.value
  biquadFilter.type = Type.value
  biquadFilter.getFrequencyResponse(Freqs,Mags,Phases)
  canvasContext.clearRect(0,0,canvas.width,canvas.height)
  canvasContext.beginPath()
  for (let i=0;i<nFreqs;++i) 
    canvasContext.lineTo(canvas.width*i/nFreqs,canvas.height-Mags[i]*90)
  canvasContext.stroke()
}
start.onclick = () => {
  audioContext.resume()
  let source = new AudioBufferSourceNode(audioContext,{loop:true})
  let nFrames = audioContext.sampleRate
  source.buffer = audioContext.createBuffer(1,nFrames,audioContext.sampleRate)
  for (i=0;i<nFrames;i++) source.buffer.getChannelData(0)[i] = 2*Math.random()-1
  source.connect(biquadFilter).connect(audioContext.destination)
  source.start()
}
