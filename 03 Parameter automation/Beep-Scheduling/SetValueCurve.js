var context = new AudioContext();
var Volume = new GainNode(context,{gain:0});
var Tone = new OscillatorNode(context,{type:'sawtooth'});
Tone.connect(Volume);
Volume.connect(context.destination);
Tone.start();
var valueCurve = new Float32Array(100);
for (i=0;i<100;i++) valueCurve[i]=Math.sin(Math.PI*i/100);
triggerBeep.onclick = function() {
  context.resume()
  let now = context.currentTime;
  Tone.frequency.value = Frequency.value;
  Volume.gain.setValueCurveAtTime(valueCurve,now,Duration.value/1000);
  Volume.gain.setValueAtTime(0.0,now+Duration.value/1000);
}
