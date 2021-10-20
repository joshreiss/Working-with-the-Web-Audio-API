let context= new AudioContext()
const source1 = new OscillatorNode(context)
const source2 = new OscillatorNode(context,{frequency:0.25})
const gainNode = new GainNode(context)
source1.start()
source2.start()
source1.connect(gainNode)
source2.connect(gainNode.gain)
context.audioWorklet.addModule('compressorWorklet.js').then(() => {
  let compressor = new AudioWorkletNode(context,'compressor')
  gainNode.connect(compressor).connect(context.destination)
  Threshold.oninput = () => compressor.parameters.get('threshold').value = Threshold.value
  Ratio.oninput = () => compressor.parameters.get('ratio').value = Ratio.value
  Knee.oninput = () => compressor.parameters.get('knee').value = Knee.value
  Attack.oninput = () => compressor.parameters.get('attack').value = Attack.value
  Release.oninput = () => compressor.parameters.get('release').value = Release.value
})
