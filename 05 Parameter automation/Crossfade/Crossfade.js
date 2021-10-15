var context = new AudioContext()
var Tone1 = new OscillatorNode(context,{type:'sine',frequency:500})
var Tone2 = new OscillatorNode(context,{type:'sine',frequency:300})
var Gain1 = new GainNode(context,{gain:1})
var Gain2 = new GainNode(context,{gain:0})
Tone1.start()
Tone2.start()
Tone1.connect(Gain1).connect(context.destination)
Tone2.connect(Gain2).connect(context.destination)
var N=100
var curveUp = new Float32Array(N), curveDown = new Float32Array(N)
for (i=0;i<N;i++) curveUp[i] = Math.sin(0.5*Math.PI*i/(N-1))
for (i=0;i<N;i++) curveDown[i] = Math.cos(0.5*Math.PI*i/(N-1))
CrossfadeEqualPower.onclick = function() {
  let now = context.currentTime
  Gain1.gain.setValueCurveAtTime(curveDown,now,Duration.value)
  Gain2.gain.setValueCurveAtTime(curveUp,now,Duration.value)
}
CrossfadeLinear.onclick = function() {
  let now = context.currentTime
  Gain1.gain.value=1
  Gain2.gain.value=0
  Gain1.gain.linearRampToValueAtTime(0,now + parseFloat(Duration.value))
  Gain2.gain.linearRampToValueAtTime(1,now + parseFloat(Duration.value))
}