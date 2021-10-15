let context= new AudioContext()
let source = new AudioBufferSourceNode(context,{loop:true})
fetch('drone.wav')
.then(response => response.arrayBuffer())
.then(buffer => context.decodeAudioData(buffer))
.then(data => source.buffer = data)
source.start()
let panNode = new PannerNode(context)
panNode.refDistance = 0.5
panNode.panningModel = 'HRTF'
source.connect(panNode).connect(context.destination)
panX.oninput = () => panNode.positionX.value = panX.value
panY.oninput = () => panNode.positionY.value = panY.value
panZ.oninput = () => panNode.positionZ.value = panZ.value
