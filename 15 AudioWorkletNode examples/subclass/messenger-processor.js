registerProcessor('messenger-processor',class extends AudioWorkletProcessor {
  constructor() {
    super();
    this._lastUpdate = currentTime;
    this.port.onmessage = this.handleMessage_.bind(this);
  }
  handleMessage_(event) {console.log('Processor:Received ' + event.data)}
  process() { // Post a message to the node for every 1 second.
    if (currentTime - this._lastUpdate > 1.0) {
      this.port.postMessage({message:'1 second passed'});
    }
    return true;
  }
})
