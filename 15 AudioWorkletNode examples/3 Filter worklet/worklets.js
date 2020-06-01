registerProcessor('noise-generator',class extends AudioWorkletProcessor {
  process(inputs, outputs) {
    for (let i=0;i<outputs[0][0].length;++i)  outputs[0][0][i]=2*Math.random()-1;
    return true;
  }
});

registerProcessor('gain-processor',class extends AudioWorkletProcessor {
  // Custom AudioParams can be defined with this static getter.
  static get parameterDescriptors() { return [{name:'gain',defaultValue:0.1}] }
  //  constructor() { super() }  // The super constructor call is required
  process(inputs, outputs, parameters) {
    const input = inputs[0],output = outputs[0];
    for (let channel=0;channel<inputs[0].length;++channel)
      for (let i=0;i<input[channel].length;++i) output[channel][i] = input[channel][i] * parameters.gain[0];
    return true;
  }
})

registerProcessor('lowpass-filter', class extends AudioWorkletProcessor {
  static get parameterDescriptors() { return [{name:'frequency',defaultValue:1000,minValue:0}]; }
  constructor() {
    super();
    this.lastOut = 0;
  }
  process(inputs, outputs, parameters) {
    let input = inputs[0],output = outputs[0],coeff;
    let frequency = parameters.frequency;
    for (let channel = 0; channel < output.length; ++channel) {
      let inputChannel = input[channel],outputChannel = output[channel];
      coeff = 2 * Math.PI * frequency[0] / sampleRate;
      for (let i = 0; i < outputChannel.length; ++i) {
        outputChannel[i]=inputChannel[i] * coeff +(1-coeff)*this.lastOut;
        this.lastOut=outputChannel[i];
      }
    }
    return true;
  }
});
