function linearTodB(x) { return 20*Math.log10(x) }
function dBtoLinear(x) { return Math.pow(10,x/20) }
Show.onclick = function() {
  let now = audioContext.currentTime
  source.offset.setValueAtTime(dBtoLinear(-20), now)
  source.offset.setValueAtTime(1, now + 0.33)
  source.offset.setValueAtTime(dBtoLinear(-20), now + 0.67)
  canvasContext.clearRect(0, 0, canvas.width, canvas.height)
  var x,xPrev,yIn,yInPrev,yOut,yOutPrev
  var xScale = canvas.width, yScale = - canvas.height / 30
  function plotLoop() {
    xPrev=x, yOutPrev=yOut, yInPrev=yIn
    x = xScale*(audioContext.currentTime - now)
    yIn = yScale*linearTodB(source.offset.value)
    yOut = yIn + yScale*compressor.reduction
    canvasContext.beginPath()
    canvasContext.strokeStyle = 'black'
    canvasContext.moveTo(xPrev,yInPrev)
    canvasContext.lineTo(x,yIn)
    canvasContext.stroke()
    canvasContext.beginPath()
    canvasContext.strokeStyle = 'purple'
    canvasContext.moveTo(xPrev,yOutPrev)
    canvasContext.lineTo(x,yOut)
    canvasContext.stroke()
    if (audioContext.currentTime<now+1)  requestAnimationFrame(plotLoop)
  }
  plotLoop()
}
