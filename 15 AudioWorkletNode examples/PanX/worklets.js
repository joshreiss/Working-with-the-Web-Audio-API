registerProcessor('panX-processor',class extends AudioWorkletProcessor {
  static get parameterDescriptors() { return [{name:'pan',defaultValue:0}] }
  process(inputs, outputs, parameters) {
    let input = inputs[0],output = outputs[0];
    let nChannels=input.length;
    var position = (nChannels-1)*(1+parameters.pan[0])/2; //goes from 0 to channelCount-1
    for (let i = 0; i <nChannels; i++) {
      if ((position-i <= -1) || (position-i>=1)) {
        for (let j = 0;j< output[i].length;j++) output[i][j]=0;
      }
      else {
        for (let j=0;j<output[i].length;j++)
          output[i][j]=input[0][j]*Math.cos((position-i)*Math.PI/2);
      }
    }
    return true;
  }
})
