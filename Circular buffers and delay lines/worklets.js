registerProcessor('fixedDelay’, class extends AudioWorkletProcessor {
  constructor() {
    super();
    this.Buffer=[];
    this.Buffer.length=20;
    this.Buffer.fill(0);
  }
  process(inputs, outputs, parameters) {
    let delaySamples=12;
    for (let i=0;i<outputs[0][0].length;++i) {
      outputs[0][0][i]=inputs[0][0][i];
      for (let j=1;j<delaySamples;j++) this.Buffer[j-1]=this.Buffer[j];
      this.Buffer[delaySamples-1]=inputs[0][0][i];//write at 20th sample
    }
    return true;
  }
});

registerProcessor('fixedDelay2’, class extends AudioWorkletProcessor {
  constructor() {
    super();
    this.Buffer=[];
    this.Buffer.length=48000;
    this.Buffer.fill(0);
    this.ReadPtr=0,this.WritePtr=0;
  }
  process(inputs, outputs, parameters) {
    let delaySamples= 12;
    bufferSize=this.Buffer.length;
    for (let i=0;i<outputs[0][0].length;++i) {
      while (this.WritePtr>bufferSize) this.WritePtr-=bufferSize;
      this.ReadPtr=this.WritePtr-delaySamples;
      while (this.ReadPtr<0) this.ReadPtr+=bufferSize;
      this.Buffer[this.WritePtr]=inputs[0][0][i];
      outputs[0][0][i]=this.Buffer[this.ReadPtr];
      this.WritePtr++,this.ReadPtr++;
    }
    return true;
  }
});
