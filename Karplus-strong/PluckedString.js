var recorder;
var context = new AudioContext;
console.log(Source.value);
context.audioWorklet.addModule('worklets.js').then(() => {
  let Noise = new AudioWorkletNode(context,'noise-generator'),
      NoiseGain = new GainNode(context,{gain:0}),
      Osc = new OscillatorNode(this.context,{frequency:800});
      OscGain = new GainNode(this.context,{gain:0});
      output = new GainNode(context);
      delay= new DelayNode(context,{delayTime:0.001}),
      NewDelay= new AudioWorkletNode(context,'delay-processor',{parameterData:{delayTime:9}}),
      feedbackGain= new GainNode(context,{gain:0.8}),
      feedbackFilter= new BiquadFilterNode(context,{frequency:9800,Q:-3.01});
      console.log(feedbackFilter.frequency.value)
  Noise.connect(NoiseGain);
  NoiseGain.connect(NewDelay);
  Osc.connect(OscGain);
  OscGain.connect(NewDelay);
  NewDelay.connect(feedbackGain);
  feedbackGain.connect(feedbackFilter);
  feedbackFilter.connect(NewDelay);
  NewDelay.connect(output);
  output.connect(context.destination);
  Osc.start();
  //set up call backs from interface
  Decay.oninput = function() {
    feedbackGain.gain.value=this.value ;
    DecayLabel.innerHTML = this.value ;
  }
  Delay.oninput = function() {
    delay.delayTime.value=0.001*this.value ;
    NewDelay.parameters.get('delayTime').value=this.value;
    DelayLabel.innerHTML = this.value ;
  }
  Width.oninput = function() {
    WidthLabel.innerHTML = this.value;
  }
  Freq.oninput = function() {
    feedbackFilter.frequency.value=this.value;
    FreqLabel.innerHTML = this.value;
  }
  Play.onclick = function() {
    context.resume();
    let now = context.currentTime;
    if (Source.value=='noise') {
      NoiseGain.gain.setValueAtTime(0.5, now);
      NoiseGain.gain.linearRampToValueAtTime(0, now + Width.value/1000);
    }
    else {
      Osc.type=Source.value;
      OscGain.gain.setValueAtTime(0.5, now);
      OscGain.gain.linearRampToValueAtTime(0, now + Width.value/1000);
    }
  }
  // Recording
  recorder = new Recorder(output);
  Start.onclick = function() { recorder.record() }
  Stop.onclick = function() {
    recorder.stop();
    recorder.exportWAV(function(blob) {// create WAV download link using audio data blob
      var hf = document.createElement('a');
      hf.href = URL.createObjectURL(blob);
      hf.innerHTML = hf.download = new Date().toISOString() + '.wav';
      recordings.appendChild(hf);
    });
    recorder.clear();
  }
});
