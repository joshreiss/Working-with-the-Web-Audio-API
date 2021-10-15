registerProcessor('noise-generator',class extends AudioWorkletProcessor {
  process(inputs, outputs) {
    for (let i=0;i<outputs[0][0].length;++i)  outputs[0][0][i]=2*Math.random()-1
    return true
  }
})

registerProcessor('gain-processor',class extends AudioWorkletProcessor {
  static get parameterDescriptors() { return [{name:'gain',defaultValue:0.1}] }
  process(inputs, outputs, parameters) {
    const input = inputs[0],output = outputs[0]
    if (parameters.gain.length === 1) {
      for (let i=0;i<inputs[0].length;++i) {
        for (let j=0;j<inputs[0][i].length;++j) {
          outputs[0][i][j] = inputs[0][i][j] * parameters.gain[0]
        }
      }
    } else {
      for (let i=0;i<inputs[0].length;++i) {
        for (let j=0;j<inputs[0][i].length;++j) {
          outputs[0][i][j] = inputs[0][i][j] * parameters.gain[j]
        }
      }
    }
    return true
  }
})
