//Define context and nodes
context = new AudioContext()
var Carrier = new OscillatorNode(context,{frequency:CarrierFrequency.value})
var ModulatorOsc = new OscillatorNode(context,{frequency:ModulationFrequency.value})
var Modulator = new GainNode(context,{gain:ModulationDepth.value})
//start any scheduled sources
Carrier.start()
ModulatorOsc.start()
//Modulator is a gain node, so this multiples ModulatorOsc with the modulation depth
ModulatorOsc.connect(Modulator)
//Carrier frequency is the sum of the intrinsic frequency offset and the modulator
Modulator.connect(Carrier.frequency)
Carrier.connect(context.destination)
