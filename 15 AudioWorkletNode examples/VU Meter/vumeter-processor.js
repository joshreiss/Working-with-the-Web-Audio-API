/* AudioWorkletGlobalScope */
const SMOOTHING = 0.9, MINIMUM = 0.00001;
registerProcessor('vumeter', class extends AudioWorkletProcessor {
  constructor (options) {
    super();
    this._volume = 0;
    this._updateIntervalInMS = options.processorOptions.updateIntervalInMS;
    this._nextUpdateFrame = this._updateIntervalInMS;
    this.port.onmessage = event => {
      if (event.data.updateIntervalInMS) this._updateIntervalInMS=event.data.updateIntervalInMS;
    }
  }
  process (inputs, outputs, parameters) {
    const input = inputs[0];//Input down-mixed to mono; if no inputs connected then zero channels passed in
    if (input.length > 0) {
      const samples = input[0];
      // Calculate RMS level and update the volume
      let sum = 0;
      for (let i = 0; i < samples.length; ++i) sum += samples[i] * samples[i];
      this._volume = Math.max(Math.sqrt(sum/samples.length),this._volume*SMOOTHING);
      // Update and sync the volume property with the main thread.
      this._nextUpdateFrame -= samples.length;
      if (this._nextUpdateFrame < 0) {
        this._nextUpdateFrame += this._updateIntervalInMS / 1000 * sampleRate;
        this.port.postMessage({volume: this._volume});
      }
    }
    return this._volume >= MINIMUM;//if volume>=threshold, disconnecting does not immediately make meter stop
  }
});
