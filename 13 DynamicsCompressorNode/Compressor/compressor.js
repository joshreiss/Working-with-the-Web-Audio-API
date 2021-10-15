let context= new AudioContext()
const source1 = new OscillatorNode(context)
const source2 = new OscillatorNode(context,{frequency:0.25})
const gainNode = new GainNode(context)
const compressor = new DynamicsCompressorNode(context,
  {threshold:-20,knee:0,ratio:12,attack:0.002,release:0.005})
source1.start()
source2.start()
source1.connect(gainNode)
source2.connect(gainNode.gain)
gainNode.connect(context.destination)
let canvasContext= canvas.getContext('2d')
function draw() {
  requestAnimationFrame(draw)
  canvasContext.clearRect(0,0,canvas.width,canvas.height)
  canvasContext.fillRect(0,100*(1+compressor.reduction/25),5,100)
}
draw()
compress.onclick = function() {
  if(compress.getAttribute('active') === 'false') {
    compress.setAttribute('active', 'true')
    compress.innerHTML = 'Remove compression'
    gainNode.disconnect(context.destination)
    gainNode.connect(compressor).connect(context.destination)
  } else {
    compress.setAttribute('active', 'false')
    compress.innerHTML = 'Add compression'
    gainNode.disconnect(compressor)
    compressor.disconnect(context.destination)
    gainNode.connect(context.destination)
  }
}
Threshold.oninput = () => compressor.threshold.value = Threshold.value
Ratio.oninput = () => compressor.ratio.value = Ratio.value
Knee.oninput = () => compressor.knee.value = Knee.value
Attack.oninput = () => compressor.AttackRelease.value = Attack.value
Release.oninput = () => compressor.release.value = Release.value
