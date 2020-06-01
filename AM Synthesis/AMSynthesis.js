//UNFINISHED SEE https://theproaudiofiles.com/the-fundamentals-of-am-synthesis/

CarrierFrequency.oninput = function() {
  CarrierFrequencyLabel.innerHTML = this.value;
  Carrier.frequency.value=this.value;
}
ModulationDepth.oninput = function() {
  ModulationDepth.innerHTML = this.value;
  Modulator.gain.value=this.value;
}
ModulatorFrequency.oninput = function() {
  ModulatorFrequencyDepth.innerHTML = this.value;
  Modulator.frequency.value=this.value;
}
StartStop.onclick = function() {
  if (context.state === 'suspended') context.resume();
  else context.suspend();
  console.log(Carrier.frequency.value)
}

context = new AudioContext();
var CarrierFrequencyOffset = new ConstantSourceNode(context,{offset:CarrierFrequency.value});
var Carrier = new OscillatorNode(context,{frequency:800});
var Modulator = new OscillatorNode(context,{frequency:30,type:'square'});
var AM = new GainNode(context,{gain:1});

//start any scheduled sources
Carrier.start();
Modulator.start();
CarrierFrequencyOffset.start();

Carrier.connect(AM);
Modulator.connect(AM.gain);
AM.connect(context.destination);
