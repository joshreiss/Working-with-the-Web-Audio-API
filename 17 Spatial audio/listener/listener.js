let context= new AudioContext()
let source = context.createOscillator()
let listener= context.listener
let panNode = new PannerNode(context)
source.start()
panNode.positionX.value=0
panNode.positionY.value=0
panNode.positionZ.value=-1
panNode.orientationX.value=0
panNode.orientationY.value=0
panNode.orientationZ.value=1
panNode.coneInnerAngle = 45
panNode.coneOuterAngle = 90
panNode.coneOuterGain = 0.1
panNode.refDistance = 0.5
source.connect(panNode).connect(context.destination)
function panning() {
  context.resume()
  listener.positionX.value=panX.value
  listener.positionZ.value=panZ.value
}
