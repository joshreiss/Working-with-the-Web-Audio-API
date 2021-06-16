var context = new AudioContext;
context.audioWorklet.addModule('worklets.js').then(() => {
  let Noise = new AudioWorkletNode(context,'noise-generator'),
      NoiseGain = new GainNode(context,{gain:0}),
      output = new GainNode(context),
      delay= new DelayNode(context,{delayTime:0.010}),
      feedbackGain= new GainNode(context,{gain:0.8});
  Noise.connect(NoiseGain);
  NoiseGain.connect(output);
  NoiseGain.connect(delay);
  delay.connect(feedbackGain);
  feedbackGain.connect(delay);
  feedbackGain.connect(output);
  output.connect(context.destination);
  //set up call backs from interface
  Decay.oninput = function() {
    feedbackGain.gain.value=this.value ;
    DecayLabel.innerHTML = this.value ;
  }
  Delay.oninput = function() {
    delay.delayTime.value=0.001*this.value ;
    DelayLabel.innerHTML = this.value ;
  }
  Width.oninput = function() { WidthLabel.innerHTML = this.value;}
  Play.onclick = function() {
    console.log(Decay.value,Delay.value,Width.value)
    context.resume();
    let now = context.currentTime;
    NoiseGain.gain.setValueAtTime(0.5, now);
    NoiseGain.gain.linearRampToValueAtTime(0, now + Width.value/1000);
  }
    // Recording
    var recorder = new Recorder(output);
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
      //Noise.disconnect(NoiseGain);
    }
});
