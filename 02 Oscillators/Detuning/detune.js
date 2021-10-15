var context = new AudioContext()
var osc = new OscillatorNode(context,{frequency:261.63})
    osc.connect(context.destination)
    osc.start(0)
freqNumber.oninput = function () {
  osc.frequency.value = freqNumber.value
  freqSlider.value = this.value
}
freqSlider.oninput = function () {
  osc.frequency.value = freqNumber.value
  freqNumber.value = this.value
}
detuneNumber.oninput = function () {
  osc.detune.value = detuneNumber.value
  detuneSlider.value = this.value
}
detuneSlider.oninput = function () {
  osc.detune.value = detuneNumber.value
  detuneNumber.value = this.value
}
interval.oninput = function () {
  osc.detune.value = this.value
  detuneSlider.value = this.value
  detuneNumber.value = this.value
}
