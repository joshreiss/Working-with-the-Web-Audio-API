//Define context and nodes
context = new AudioContext();
var CarrierFrequencyOffset = new ConstantSourceNode(context,{offset:CarrierFrequency.value});
var Carrier = new OscillatorNode(context,{frequency:0});
var ModulatorOsc = new OscillatorNode(context,{frequency:ModulationFrequency.value});
var Modulator = new GainNode(context,{gain:ModulationDepth.value});

//start any scheduled sources
Carrier.start();
ModulatorOsc.start();
CarrierFrequencyOffset.start();

//Modulator is a gain node, so this multiples ModulatorOsc with Modulator.gain
ModulatorOsc.connect(Modulator);

//Carrier frequency is the sum of the frequency offset and the modulator
Modulator.connect(Carrier.frequency);
CarrierFrequencyOffset.connect(Carrier.frequency);

Carrier.connect(context.destination);
