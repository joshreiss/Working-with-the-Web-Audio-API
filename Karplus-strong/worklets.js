registerProcessor('noise-generator',class extends AudioWorkletProcessor {
  process(inputs, outputs) {
    for (let i=0;i<outputs[0][0].length;++i)  outputs[0][0][i]=2*Math.random()-1;
    return true;
  }
});

registerProcessor('delay-processor', class extends AudioWorkletProcessor {
  static get parameterDescriptors() { return [{name:'delayTime',defaultValue:1,minValue:0,maxValue:1000}]; }
  constructor() {
    super();
    this.Buffer=[];
    this.Buffer.length=48000;
    this.Buffer.fill(0);
    this.ReadPointer=0,this.WritePointer=0;
  }
  process(inputs, outputs, parameters) {
    let delayTime = parameters.delayTime[0];
    //sample rate is 48000, delayTime in ms, so samples of delay is 48000 sam/sec * 0.001 sec
    this.ReadPointer=this.WritePointer-Math.round(delayTime*48);
    this.ReadPointer=this.ReadPointer%48000;
    while (this.ReadPointer<0) this.ReadPointer=this.ReadPointer+48000;
    for (let i=0;i<outputs[0][0].length;++i) {
      this.Buffer[this.WritePointer]=inputs[0][0][i];
      this.WritePointer++;
      if (this.WritePointer>=48000) this.WritePointer=this.WritePointer%48000;
      outputs[0][0][i]=this.Buffer[this.ReadPointer];
      this.ReadPointer++;
      this.ReadPointer=this.ReadPointer%48000;
      while (this.ReadPointer<0) this.ReadPointer=this.ReadPointer+48000;
    }
    return true;
  }
});
