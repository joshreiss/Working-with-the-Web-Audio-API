registerProcessor('stereo-widener', class extends AudioWorkletProcessor {
  static get parameterDescriptors() { return [
    {name:'width',defaultValue:0,minValue:-1,maxValue:1}
  ]}
  constructor(options) {
    super()
    options.numberOfOutputs=2
  }
  process(inputs, outputs, parameters) {
    const input = inputs[0],output = outputs[0]
    for (let channel = 0; channel < input.length; ++channel) {
      for (let i = 0; i < input[channel].length; ++i) {
        let L,R,M,S,newM,newS,newL,newR,W,norm
        L=input[0][i]
        if (input.length>1) R=input[1][i]
        else R=input[0][i]
        M = (L+R)/Math.sqrt(2) // obtain mid-signal from left and right
        S = (L-R)/Math.sqrt(2) // obtain side-signal from left and right
        W= (parameters.width[0]+1)*Math.PI/4
        newM= M*Math.cos(W)
        newS= S*Math.sin(W)
        newL= (newM+newS)/Math.sqrt(2)
        newR= (newM-newS)/Math.sqrt(2)
        norm= Math.sqrt((L*L + R*R) / (newL*newL+newR*newR))
        output[0][i]= norm*newL
        output[1][i]= norm*newR
      }
    }
    return true
  }
})
