var context = new AudioContext();
var Tone = context.createOscillator();
var Volume = new GainNode(context,{gain:0.1});
Tone.start();
var Connected = false; //Oscillator is not connected in the beginning, so silence
Volume.connect(context.destination); // connect the Gain node to the output (speakers or heaphones)
// Connects/Disconnects the oscillator to the graph
function StartStop() {
  if (Connected == false) {
    context.resume();
    Tone.connect(Volume);
    Connected = true;
  } else {
    Connected = false;
    Tone.disconnect(Volume);
  }
}
// Controls oscillator's volume
VolumeSlider.oninput = function() {
  Volume.gain.value = this.value;
}
