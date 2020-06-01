FreqLabel.innerHTML = Freq.value;
VolumeLabel.innerHTML = Volume.value;
var context = new AudioContext();
var Tone = context.createOscillator();
var Amplitude = new GainNode(context,{gain:0.1});
Tone.start();
var Connected = false; //Oscillator is not connected in the beginning, so silence
Amplitude.connect(context.destination); // connect the Gain node to the output (speakers or heaphones)
// Connects/Disconnects the oscillator to the graph
function StartStop() {
  if (Connected == false) {
    context.resume();
    Tone.connect(Amplitude);
    Connected = true;
  } else {
    Connected = false;
    Tone.disconnect(Amplitude);
  }
}
// Controls oscillator frequency
Freq.oninput = function() {
  Tone.frequency.value = this.value;
  FreqLabel.innerHTML = this.value;
}
// Controls oscillator's volume
Volume.oninput = function() {
  Amplitude.gain.value = this.value;
  VolumeLabel.innerHTML = this.value;
}
// Controls oscillator's type
Type.onchange = function() {
  Tone.type = this.value;
}
