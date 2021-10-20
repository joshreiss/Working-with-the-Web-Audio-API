registerProcessor('max-abs-value',class extends AudioWorkletProcessor {
  process(inputs, outputs) {
    for (let i = 0; i < inputs.length; i++) {
      for (let j = 0; j < inputs[i].length; j++) {
        for (let k = 0; k < inputs[i][j].length; k++) {
          outputs[0][0][k] = Math.max(Math.abs(inputs[i][j][k]),outputs[0][0][k])
        }
      }
    }
    return true
  }
})
