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
    this.ReadPtr=0,this.WritePtr=0;
  }
  process(inputs, outputs, parameters) {
    let delaySamples=Math.round(sampleRate*parameters.delayTime[0]/1000),bufferSize=this.Buffer.length;
    this.ReadPtr=(this.WritePtr-delaySamples)%bufferSize;
    while (this.ReadPtr<0) this.ReadPtr=this.ReadPtr+bufferSize;
    for (let i=0;i<outputs[0][0].length;++i) {
      this.Buffer[this.WritePtr]=inputs[0][0][i];
      this.WritePtr=(this.WritePtr+1)%bufferSize;
      outputs[0][0][i]=this.Buffer[this.ReadPtr];
      this.ReadPtr=(this.ReadPtr+1)%bufferSize;
      while (this.ReadPtr<0) this.ReadPtr=this.ReadPtr+bufferSize;
    }
    return true;
  }
});

registerProcessor('feedbackDelay-processor', class extends AudioWorkletProcessor {
  static get parameterDescriptors() { return [
    {name:'gain',defaultValue:0.9,minValue:-1,maxValue:1},
    {name:'delayTime',defaultValue:10,minValue:0,maxValue:1000}] }
  constructor() {
    super();
    this.Buffer=[];
    this.Buffer.length=48000;
    this.Buffer.fill(0);
    this.ReadPtr=0,this.WritePtr=0;
  }
  process(inputs, outputs, parameters) {
    let delaySamples=Math.round(sampleRate*parameters.delayTime[0]/1000),
        bufferSize=this.Buffer.length;
    for (let i=0;i<outputs[0][0].length;++i) {
      outputs[0][0][i]= parameters.gain[0]*this.Buffer[this.ReadPtr]+inputs[0][0][i];
      this.Buffer[this.WritePtr]=outputs[0][0][i];
      this.WritePtr++;
      if (this.WritePtr>=bufferSize) this.WritePtr=this.WritePtr-bufferSize;
      this.ReadPtr=this.WritePtr-delaySamples;
      if (this.ReadPtr<0) this.ReadPtr=this.ReadPtr+bufferSize;
    }
    return true;
  }
});

/// This example rebuilds the array each time
registerProcessor('feedbackDelay2-processor', class extends AudioWorkletProcessor {
  static get parameterDescriptors() { return [{name:'gain',defaultValue:0.9}] }
  constructor() {
    super();
    this.Buffer=[];
    this.Buffer.length=48000;
    this.Buffer.fill(0);
  }
  process(inputs, outputs, parameters) {
    let delaySamples=480;
    for (let i=0;i<outputs[0][0].length;++i) {
      outputs[0][0][i]= parameters.gain[0]*this.Buffer[delaySamples-1]+inputs[0][0][i];
      for (let j=delaySamples-1;j>0;j--) this.Buffer[j]=this.Buffer[j-1];
      this.Buffer[0]=outputs[0][0][i];
    }
    return true;
  }
});
