registerProcessor('first-order-filter', class extends AudioWorkletProcessor {
  static get parameterDescriptors() { return [{name:'frequency',defaultValue:100,minValue:0}] }
  constructor() {
    super();
    this.lastOut = 0;
    this.lastIn = 0;
    this.type = 'lowpass';
    this.port.onmessage = (event) => { this.type=event.data };
  }
  process(inputs, outputs, parameters) {
    let omega_0= 2*Math.PI*parameters.frequency[0]/sampleRate;
    let a,b;
    if (this.type == 'lowpass') {
      a= [Math.tan(omega_0/2)+1,Math.tan(omega_0/2)-1],
      b= [Math.tan(omega_0/2),Math.tan(omega_0/2)];
    } else {
      a= [Math.tan(omega_0/2)+1,Math.tan(omega_0/2)-1],
      b= [1,-1];
    }
    for (let i=0;i<inputs[0].length;++i) {
      for (let j=0;j<inputs[0][i].length;++j) {
        outputs[0][i][j] = (b[0]*inputs[0][i][j] + b[1]*this.lastIn -a[1]*this.lastOut)/a[0];
        this.lastIn=inputs[0][i][j];
        this.lastOut=outputs[0][i][j];
      }
    }
    return true;
  }
});
