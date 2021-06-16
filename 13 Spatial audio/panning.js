let context= new AudioContext();
let source = context.createOscillator();
source.start();
// set up listener and panNode position information
var panNode = new PannerNode(context);
panNode.positionX.value=0;
panNode.positionY.value=0;
panNode.positionZ.value=-1;
panNode.orientationX.value=0;
panNode.orientationY.value=0;
panNode.orientationZ.value=1;
panNode.coneInnerAngle = 45;
panNode.coneOuterAngle = 90;
panNode.coneOuterGain = 0.1;
panNode.refDistance = 0.5;
var listener = context.listener;//set up listener, with default values
source.connect(panNode).connect(context.destination);
//use sliders to move the source
function panning() {
    context.resume();
    panNode.positionX.value=panX.value;
    panNode.positionZ.value=panZ.value;
    console.log(panNode.positionX.value,panNode.positionY.value,panNode.positionZ.value)
}
