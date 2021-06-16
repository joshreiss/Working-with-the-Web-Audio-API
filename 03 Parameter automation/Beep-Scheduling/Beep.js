var context = new AudioContext();
var Volume = new GainNode(context,{gain:0});
var Tone = new OscillatorNode(context,{type:'sawtooth'});
Tone.connect(Volume);
Volume.connect(context.destination);
Tone.start();
triggerBeep.onclick = function() {
  context.resume()
  let now = context.currentTime;
  Tone.frequency.value = Frequency.value;
  Volume.gain.setValueAtTime(0.0, now);
  Volume.gain.linearRampToValueAtTime(1,now + Attack.value/1000);
  Volume.gain.linearRampToValueAtTime(0,now + Attack.value/1000 + Decay.value/1000);
}
