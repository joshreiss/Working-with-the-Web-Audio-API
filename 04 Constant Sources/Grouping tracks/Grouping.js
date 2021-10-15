var file=[],tracks=[],gains=[]
var fileName=['01_Congas','02_Bass','03_UkeleleMic','04_UkeleleDI','05_Viola']
context = new AudioContext()
for (i=0;i<5;i++) {
  file[i] = new Audio(fileName[i]+'.wav')
  tracks[i] = context.createMediaElementSource(file[i])
  gains[i] = new GainNode(context,{gain:0})
  tracks[i].connect(gains[i])
  gains[i].connect(context.destination)
}
let constantNode = context.createConstantSource()
constantNode.start()
volume.oninput = function() {constantNode.offset.value = volume.value}
playButton.onclick = function() {
  context.resume()
  for (i=0;i<5;i++) file[i].play()
}
function Checks(element) {
  var checkNumber=parseInt(element.id.substring(5))
  if (element.checked) constantNode.connect(gains[checkNumber].gain)
  else constantNode.disconnect(gains[checkNumber].gain)
}
