let context= new AudioContext();
const source = context.createOscillator();
source.start();
const compressor = new DynamicsCompressorNode(context,{threshold:-60,knee:5,ratio:15,attack:0,release:0.005});
source.connect(context.destination);
compress.onclick = function() {
    if(compress.getAttribute('active') === 'false') {
      compress.setAttribute('active', 'true');
      compress.innerHTML = 'Remove compression';
      source.disconnect(context.destination);
      source.connect(compressor).connect(context.destination);
    } else {
      compress.setAttribute('active', 'false');
      compress.innerHTML = 'Add compression';
      source.disconnect(compressor);
      compressor.disconnect(context.destination);
      source.connect(context.destination);
  }
}
