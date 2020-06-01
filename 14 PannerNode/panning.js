// set up listener and panNode position information
var WIDTH = window.innerWidth,HEIGHT = window.innerHeight;
// define other variables
let context= new AudioContext();
let source = context.createOscillator();
var panNode = new PannerNode(context,{panningModel:'HRTF',distanceModel:'linear'});
source.start();
source.connect(panNode).connect(context.destination);
panNode.refDistance = 1;
panNode.maxDistance = 100;
panNode.rolloffFactor = 1;
panNode.coneInnerAngle = 360;
panNode.coneOuterAngle = 0;
panNode.coneOuterGain = 0;
  panNode.orientationX.value=1;
  panNode.orientationY.value=0;
  panNode.orientationZ.value=0;
var listener = context.listener;//set up listener
  listener.forwardX.value=0;
  listener.forwardY.value=0;
  listener.forwardZ.value=-1;
  listener.upX.value=0;
  listener.upY.value=1;
  listener.upZ.value=0;
  listener.positionX.value=0;
  listener.positionY.value=0;
  listener.positionZ.value=0;
// panNode will move as the graphic moves around on the screen
function panning() {
    context.resume();
    panNode.positionX.value=panX.value;
    panNode.positionY.value=panY.value;
    panNode.positionZ.value=panZ.value;
    console.log(panNode.positionX.value,panNode.positionY.value,panNode.positionZ.value)
}
