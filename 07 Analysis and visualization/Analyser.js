let canvasContext= canvas.getContext('2d')
let audioContext= new AudioContext()
let source= new OscillatorNode(audioContext,{type:'square'})
let analyser= audioContext.createAnalyser()
source.connect(analyser)
source.start()
var data = new Uint8Array(analyser.frequencyBinCount)
Frequency.oninput = function() { source.frequency.value = this.value}
draw()
function draw() {
  let height=canvas.height, width=canvas.width
  if (Spectrum.checked) analyser.getByteFrequencyData(data)
  else analyser.getByteTimeDomainData(data)
  canvasContext.clearRect(0,0,canvas.width,canvas.height)
  for (let i = 0; i < data.length; i++) {
    if (!Spectrum.checked) canvasContext.fillRect(i,height*(1-data[i]/256)-1,1,1)
    else canvasContext.fillRect(i,height*(1-data[i]/256),1,height*data[i]/256)
  }
  requestAnimationFrame(draw)
}
