var context = new AudioContext;
context.audioWorklet.addModule('worklets.js').then(() => {
  let Noise = new AudioWorkletNode(context,'noise-generator'),
      Tone = new OscillatorNode(context,{frequency:800});
      BurstGain = new GainNode(context,{gain:0}),
      output = new GainNode(context);
      delay= new DelayNode(context,{delayTime:0.010}),
      feedbackGain= new GainNode(context,{gain:0.8}),
      feedbackFilter= new BiquadFilterNode(context,{frequency:9800,Q:-3.01});
  Tone.start();
  Noise.connect(BurstGain);
  BurstGain.connect(output);
  output.connect(delay);
  delay.connect(feedbackGain);
  feedbackGain.connect(feedbackFilter);
  feedbackFilter.connect(output);
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
  Width.oninput = function() { WidthLabel.innerHTML = this.value; }
  Freq.oninput = function() {
    feedbackFilter.frequency.value=this.value;
    FreqLabel.innerHTML = this.value;
  }
  Source.onchange = function() {
    console.log(this.value);
    if (this.value != 'noise') {
      Noise.disconnect();
      Tone.type = this.value;
      Tone.connect(BurstGain);
    } else {
      Tone.disconnect();
      Noise.connect(BurstGain);
    }
  }
  Play.onclick = function() {
    context.resume();
    let now = context.currentTime;
    BurstGain.gain.setValueAtTime(0.5, now);
    BurstGain.gain.linearRampToValueAtTime(0, now + Width.value/1000);
  }
});
