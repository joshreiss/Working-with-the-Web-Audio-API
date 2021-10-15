var context = new AudioContext()
var Tone = context.createOscillator()
var Volume = new GainNode(context,{gain:0.1})
Tone.start()
var Connected = false
Volume.connect(context.destination)
function StartStop() {
  if (Connected == false) {
    context.resume()
    Tone.connect(Volume)
    Connected = true
  } else {
    Connected = false
    Tone.disconnect(Volume)
  }
}
VolumeSlider.oninput = function() {
  VolumeLabel.innerHTML = this.value
  Volume.gain.value = this.value
}
