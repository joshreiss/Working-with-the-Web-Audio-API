var recorder;
var context = new AudioContext;
  let output = new GainNode(context);
  output.connect(context.destination);
  //set up call backs from interface
  Decay.oninput = function() {
    DecayLabel.innerHTML = this.value ;
  }
  Delay.oninput = function() {
    DelayLabel.innerHTML = this.value ;
  }
  Width.oninput = function() {
    WidthLabel.innerHTML = this.value;
  }
  Freq.oninput = function() {
    FreqLabel.innerHTML = this.value;
  }
  Source.oninput = function() {
  }
  Play.onclick = function() {
    context.resume();
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
