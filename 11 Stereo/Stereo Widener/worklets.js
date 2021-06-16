registerProcessor('stereo-widener', class extends AudioWorkletProcessor {
  static get parameterDescriptors() { return [{name:'width',defaultValue:0,minValue:-1,maxValue:1}]; }
  constructor() { super()  }
  process(inputs, outputs, parameters) {
    for (let i=0;i<outputs[0][0].length;++i) {
      var L=inputs[0][0][i];
      var R=inputs[0][1][i];

      var M = (L+R)/Math.sqrt(2);   // obtain mid-signal from left and right
      var S = (L-R)/Math.sqrt(2);   // obtain side-signal from left and right
      var W= (parameters.width[0]+1)*Math.PI/4;
      if (Math.random()<0.001) console.log(parameters.width[0],Math.cos(W),Math.sin(W))
      var newM= M*Math.cos(W);
      var newS= S*Math.sin(W);
      outputs[0][0][i]= (newM+newS)/Math.sqrt(2);
      outputs[0][1][i]= (newM-newS)/Math.sqrt(2);
  //    outputs[0][0][i]= (M+S)/Math.sqrt(2);
  //    outputs[0][1][i]= (M-S)/Math.sqrt(2);


    }
    return true;
  }
});
