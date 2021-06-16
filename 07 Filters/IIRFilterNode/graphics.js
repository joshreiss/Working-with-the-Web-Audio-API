// set 2d context and set dimensions
const canvasCtx=canvas.getContext('2d');
const width=graph.offsetWidth,height=graph.offsetHeight;
canvas.width=width,canvas.height=height;
canvasCtx.fillStyle='white';
canvasCtx.fillRect(0,0,width,height);
// draw & label axes
const spacing=width/16;
const fontSize=Math.floor(spacing/1.5);
canvasCtx.beginPath();
canvasCtx.moveTo(spacing,spacing);
canvasCtx.lineTo(spacing,height-spacing);
canvasCtx.lineTo(width-spacing,height-spacing);
canvasCtx.stroke();
canvasCtx.font=fontSize+'px sans-serif';
canvasCtx.fillStyle='black';
canvasCtx.fillText('1',spacing-fontSize,spacing+fontSize);
canvasCtx.fillText('g',spacing-fontSize,(height-spacing+fontSize)/2);
canvasCtx.fillText('0',spacing-fontSize,height-spacing+fontSize);
canvasCtx.fillText('Hz',width/2,height-spacing+fontSize);
canvasCtx.fillText('Fs/2',width-spacing-10,height-spacing+fontSize);
canvasCtx.beginPath();// plot graph
for(let i=0; i < Mags.length; i++) {
  if (i===0) canvasCtx.moveTo(spacing,height-(Mags[i]*(height-(spacing*2)))-spacing);
  else canvasCtx.lineTo((width/nFreqs)*i,height-(Mags[i]*(height-(spacing*2)))-spacing);
}
canvasCtx.stroke();
