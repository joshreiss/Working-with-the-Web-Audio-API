var recorder;
var context = new AudioContext;
context.audioWorklet.addModule('worklets.js').then(() => {
  let Noise = new AudioWorkletNode(context,'noise-generator'),
      NoiseGain = new GainNode(context,{gain:0}),
      output = new GainNode(context);
      feedbackDelay= new AudioWorkletNode(context,'feedbackDelay-processor',{parameterData:{delayTime:5,gain:0.9}});
  Noise.connect(NoiseGain);
  NoiseGain.connect(output);
  NoiseGain.connect(feedbackDelay);
  feedbackDelay.connect(output);
  output.connect(context.destination);
  //set up call backs from interface
  Decay.oninput = function() {
    feedbackDelay.parameters.get('gain').value=this.value;
    DecayLabel.innerHTML = this.value ;
  }
  Delay.oninput = function() {
    feedbackDelay.parameters.get('delayTime').value=this.value;
    DelayLabel.innerHTML = this.value ;
  }
  Width.oninput = function() { WidthLabel.innerHTML = this.value;}
  Play.onclick = function() {
    context.resume();
    var newDelay= Number(Delay.value)+1000*128/context.sampleRate;
    feedbackDelay.parameters.get('delayTime').value= newDelay;
    let now = context.currentTime;
    NoiseGain.gain.setValueAtTime(0.5, now);
    NoiseGain.gain.linearRampToValueAtTime(0, now + Width.value/1000);
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
    //Noise.disconnect(NoiseGain);
  }
});
