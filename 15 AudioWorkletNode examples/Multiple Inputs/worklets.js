registerProcessor('max-processor',class extends AudioWorkletProcessor {
  process(inputList, outputList, parameters) {
    for (let inputNum = 0; inputNum < inputList.length; inputNum++) {
      let input = inputList[inputNum];
      let output = outputList[0];
      for (let channelNum = 0; channelNum < input.length; channelNum++) {
        let sampleCount = input[channelNum].length;
        for (let i = 0; i < sampleCount; i++) {
          let sample = Math.max(output[0][i],input[channelNum][i]);
          output[0][i] = sample;
        }
      }
    };
    return true;
  }
})

registerProcessor('min-processor',class extends AudioWorkletProcessor {
  process(inputList, outputList, parameters) {
    for (let inputNum = 0; inputNum < inputList.length; inputNum++) {
      let input = inputList[inputNum];
      let output = outputList[0];
      for (let channelNum = 0; channelNum < input.length; channelNum++) {
        let sampleCount = input[channelNum].length;
        for (let i = 0; i < sampleCount; i++) {
          let sample = Math.min(output[0][i],input[channelNum][i]);
          output[0][i] = sample;
        }
      }
    };
    return true;
  }
})

registerProcessor('max-signal',class extends AudioWorkletProcessor {
  static get parameterDescriptors() { return [{name:'max',defaultValue:0}] }
  process(inputList, outputList, parameters) {
    const input = inputList[0],output = outputList[0];
    for (let channel=0;channel<input.length;++channel)
      for (let i=0;i<input[channel].length;++i) output[channel][i] = Math.max(input[channel][i],parameters.max[0]);
    return true;
  }
})

registerProcessor('min-signal',class extends AudioWorkletProcessor {
  static get parameterDescriptors() { return [{name:'min',defaultValue:0}] }
  process(inputList, outputList, parameters) {
    const input = inputList[0],output = outputList[0];
    for (let channel=0;channel<input.length;++channel)
      for (let i=0;i<input[channel].length;++i) output[channel][i] = Math.min(input[channel][i],parameters.min[0]);
    return true;
  }
})

registerProcessor('mix-inputs',class extends AudioWorkletProcessor {
  process(inputs, outputs, parameters) {
    if (Math.random()<0.02) console.log(inputs.length)
    for (let i = 0; i < inputs.length; i++) {
      for (let j = 0; j < inputs[i].length; j++) {
        for (let k = 0; k < inputs[i][j].length; k++) {
          outputs[0][0][k] += inputs[i][j][k];
        }
      }
    };
    return true;
  }
})

registerProcessor('max-inputs',class extends AudioWorkletProcessor {
  process(inputs, outputs) {
    for (let i = 0; i < inputs.length; i++) {
      for (let j = 0; j < inputs[i].length; j++) {
        for (let k = 0; k < inputs[i][j].length; k++) {
          outputs[0][0][k] = Math.max(inputs[i][j][k],outputs[0][0][k]);
        }
      }
    };
    return true;
  }
})

registerProcessor('show-inputs',class extends AudioWorkletProcessor {
  process(inputs, outputs) {
    if (Math.random()<0.02) for (let k = 0; k <128; k++) console.log(inputs[0][0][k],inputs[0][0][k])
    return true;
  }
})
