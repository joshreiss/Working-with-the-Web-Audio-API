var context = new AudioContext;
context.audioWorklet.addModule('worklets.js').then(() => {
let output = new GainNode(context);
    delay= new AudioWorkletNode(context,'feedbackDelay-processor'),
    One= new ConstantSourceNode(context,{offset:0});
One.start();
One.connect(delay);
delay.connect(output);
output.connect(context.destination);
Play.onclick = function() {
  context.resume();
  let now = context.currentTime;
  One.offset.setValueAtTime(1, now);
  One.offset.setValueAtTime(0, now + 0.000020833333333);
}
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
}
});
