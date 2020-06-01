//Define variables
var context = new AudioContext();
var Tone = new OscillatorNode(context);
var Amplitude = new GainNode(context,{gain:0.2});

//Set up audio graph
Tone.connect(Amplitude);
Amplitude.connect(context.destination);
Tone.start();

//User interface callbacks
Frequency.oninput = function() { Tone.frequency.value = this.value }
Volume.oninput = function() { Amplitude.gain.value = this.value }
Type.onchange = function() { Tone.type = this.value }
