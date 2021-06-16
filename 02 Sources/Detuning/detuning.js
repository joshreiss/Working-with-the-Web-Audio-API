var context = new AudioContext();
var osc = new OscillatorNode(context,{frequency:261.63});
    osc.connect(context.destination);
    osc.start(0);
freqSlider.oninput = function () {
  osc.frequency.value = freqSlider.value;
  freqDisplay.innerHTML = freqSlider.value + 'Hz';
}
detuneSlider.oninput = function () {
  osc.detune.value = detuneSlider.value;
  detuneDisplay.innerHTML = detuneSlider.value + ' cents';
}
notes.oninput = function () {
  osc.detune.value = notes.value;
  detuneDisplay.innerHTML = notes.value + ' cents';
  detuneSlider.value = notes.value;
}
