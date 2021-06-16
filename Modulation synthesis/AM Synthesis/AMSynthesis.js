CarrierFrequency.oninput = function() {
  CarrierFrequencyLabel.innerHTML = this.value;
  Carrier.frequency.value=this.value;
}
ModulationDepth.oninput = function() {
  ModulationDepth.innerHTML = this.value;
  ModulatorGain.gain.value=this.value;
}
ModulatorFrequency.oninput = function() {
  ModulatorFrequencyLabel.innerHTML = this.value;
  Modulator.frequency.value=this.value;
}
StartStop.onclick = function() {
  if (context.state === 'suspended') context.resume();
  else context.suspend();
}

context = new AudioContext();
var CarrierAmplitudeOffset = new ConstantSourceNode(context);
var Carrier = new OscillatorNode(context,{frequency:800});
var Modulator = new OscillatorNode(context,{frequency:30,type:'square'});
var ModulatorGain = new GainNode(context);
var AM = new GainNode(context,{gain:1});

//start any scheduled sources
Carrier.start();
Modulator.start();
CarrierAmplitudeOffset.start();

Modulator.connect(ModulatorGain);
ModulatorGain.connect(CarrierAmplitudeOffset.offset)
Carrier.connect(AM);
CarrierAmplitudeOffset.connect(AM.gain);
AM.connect(context.destination);
