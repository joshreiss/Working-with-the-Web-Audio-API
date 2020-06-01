var context = new AudioContext();
var Volume = new GainNode(context,{gain:0});
var osc = new OscillatorNode(context,{type:'sawtooth'});

osc.connect(Volume);
Volume.connect(context.destination);
osc.start();

triggerBeep.onclick = function() {
  if (context.state === 'suspended') context.resume()
  let now = context.currentTime;
  osc.frequency.value = Frequency.value;
  Volume.gain.setValueAtTime(0.0, now);
  Volume.gain.linearRampToValueAtTime(1, now + Attack.value/1000);
  Volume.gain.linearRampToValueAtTime(0, now + Attack.value/1000 + Decay.value/1000);
}

Frequency.oninput = function() { FrequencyLabel.innerHTML = this.value}
Attack.oninput = function() { AttackLabel.innerHTML = this.value}
Decay.oninput = function() { DecayLabel.innerHTML = this.value}
