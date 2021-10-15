registerProcessor('smoothing-filter', class extends AudioWorkletProcessor {
  static get parameterDescriptors() { return [
    {name:'timeConstant',defaultValue:1,minValue:0}
  ]}
  constructor() {
    super()
    this.lastOut = 0
  }
  process(inputs, outputs, parameters) {
    let alpha=Math.exp(-1/(parameters.timeConstant[0]*sampleRate/1000))
    for (let i=0;i<outputs[0].length;++i) {
      for (let j=0;j<outputs[0][i].length;++j) {
        outputs[0][i][j]=inputs[0][i][j] * (1-alpha) + alpha * this.lastOut
        this.lastOut=outputs[0][i][j]
      }
    }
    return true
  }
})
