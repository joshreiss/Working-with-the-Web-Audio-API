registerProcessor('pulse-generator',class extends AudioWorkletProcessor {
  constructor(options) {
    super()
    if (typeof options.processorOptions !== 'undefined') this.phase = 0
    else this.phase = options.processorOptions.phase / 360
  }
  static get parameterDescriptors() { return [
    {name:'frequency',defaultValue: 440},
    {name:'duty',defaultValue:0.5,max:1,min:0},
    {name:'phase',defaultValue:0,max:360,min:0}
  ]}
  process(inputs, outputs, params) {
    for (let channel = 0; channel < outputs[0].length; ++channel) {
      if (params.frequency.length === 1) {
        for (let i = 0; i < outputs[0][channel].length; ++i) {
          if (this.phase > params.duty[0]) outputs[0][channel][i]=-1
          else outputs[0][channel][i]=1
          this.phase += params.frequency[0] / sampleRate
          this.phase = this.phase-Math.floor(this.phase)
        }
      } else {
        for (let i = 0; i < outputs[0][channel].length; ++i) {
          if (this.phase > params.duty[i]) outputs[0][channel][i]=-1
          else outputs[0][channel][i]=1
          this.phase += params.frequency[i] / sampleRate
          this.phase = this.phase-Math.floor(this.phase)
        }
      }
    }
    return true
  }
})
