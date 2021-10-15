registerProcessor('noise-generator',class extends AudioWorkletProcessor {
  process(inputs, outputs) {
    for (let i=0;i<outputs[0][0].length;++i) outputs[0][0][i]=2*Math.random()-1
    return true
  }
})
