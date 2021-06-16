registerProcessor('phasor-generator',class extends AudioWorkletProcessor {
  constructor() {
    super();
    this.phase = 0;
  }
  static get parameterDescriptors() {
    return [ {name:"phase",defaultValue:0,max:1,min:0},{name:"frequency",defaultValue: 1000},{name:"duty",defaultValue:1,max: 1,min:0.000001}];
  }
  process(inputs, outputs, params) {
    let input = inputs[0],output = outputs[0];
    let frequency = params.frequency;
    let duty = params.duty;
    for (let channel = 0; channel < output.length; ++channel) {
      let inputChannel = input[channel],outputChannel = output[channel];
      if (frequency.length === 1)
      {
        for (let i = 0; i < outputChannel.length; ++i) {
          if (this.phase > duty) outputChannel[i]=0;
          else outputChannel[i]=this.phase * (1/duty);
          this.phase += frequency[0] / sampleRate;
          this.phase = this.phase-Math.floor(this.phase);
        }
      }
      else
      {
        for (let i = 0; i < outputChannel.length; ++i) {
          if (this.phase > duty) outputChannel[i]=0;
          else outputChannel[i]=this.phase * (1/duty);
          this.phase += frequency[i] / sampleRate;
          this.phase = this.phase-Math.floor(this.phase);
        }
      }
    }
    return true;
  }
});
