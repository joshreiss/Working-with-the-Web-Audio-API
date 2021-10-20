let context= new AudioContext()
var source = new AudioBufferSourceNode(context)
let bufferDuration = 3*context.sampleRate
let array = new Float32Array(bufferDuration)
let instantFreq
for (var i=0;i<array.length;i++) {
  instantFreq=1000*i/bufferDuration
  array[i]=Math.sin(2*Math.PI*instantFreq*i/context.sampleRate)
}
start.onclick = function() {
  context.resume()
  source = new AudioBufferSourceNode(context)
  source.buffer = context.createBuffer(1,bufferDuration,context.sampleRate)
  source.buffer.copyToChannel(array,0)
  source.playbackRate.value = rate.value
  source.loop = loop.checked
  source.loopStart = loopstart.value
  source.loopEnd = loopend.value
  source.start(0,offset.value)
  source.connect(context.destination)
}
rate.oninput = () => source.playbackRate.value = rate.value
loop.oninput = () => source.loop = loop.checked
loopstart.oninput = () => source.loopStart = loopstart.value
loopend.oninput = () => source.loopEnd = loopend.value
