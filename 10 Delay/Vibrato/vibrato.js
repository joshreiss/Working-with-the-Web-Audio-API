let context= new AudioContext()
let source = context.createMediaElementSource(file)
let delay= new DelayNode(context,{delayTime:1,maxDelayTime:10})
let LFOgain= new GainNode(context,{gain:0})
let LFO = new OscillatorNode(context,{frequency:2})
LFO.start()
source.connect(delay)
LFO.connect(LFOgain).connect(delay.delayTime)
delay.connect(context.destination)
function Update() {
  LFO.frequency.value = LFOfreq.value
  LFOgain.gain.value = Depth.value / (2*Math.PI*LFOfreq.value)
}
