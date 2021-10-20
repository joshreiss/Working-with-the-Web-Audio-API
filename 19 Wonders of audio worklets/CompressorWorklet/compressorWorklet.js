registerProcessor('compressor', class extends AudioWorkletProcessor {
  static get parameterDescriptors() { return [
    {name:'threshold',defaultValue:-30},
    {name:'ratio',defaultValue:12},
    {name:'knee',defaultValue:0},
    {name:'attack',defaultValue:0},
    {name:'release',defaultValue:5}
  ] }
  constructor() {
    super()
    this.yPrev = 0
    this.port.onmessage = () => this.port.postMessage(this.reduction)
  }
  process(inputs, outputs, parameters) {
    let alphaAttack=Math.exp(-1/(parameters.attack[0]*sampleRate/1000))
    let alphaRelease=Math.exp(-1/(parameters.release[0]*sampleRate/1000))
    let x,x_dB,y_dB,x_G,y_G,x_B,y_B,c_dB,c
    let T=parameters.threshold[0]
    let R=parameters.ratio[0]
    let W=parameters.knee[0]
    for (let j=0;j<outputs[0][0].length;++j) {
      // dB conversion
      x_dB=inputs[0][0][j]
      y_dB=Math.max(10*Math.log10(x_dB*x_dB),-120)
      // gain computer
      x_G=y_dB
      if ((x_G-T)<= -W/2) y_G=x_G
      else if ((x_G-T)>= W/2) y_G=T+(x_G-T)/R
      else y_G=x_G+(1/R-1)*(x_G-T+W/2)*(x_G-T+W/2)/(2*W)
      //ballistics
      x_B=x_G - y_G
      if (x_B>this.yPrev) y_B = x_B * (1-alphaAttack) + alphaAttack * this.yPrev
      else                y_B = x_B * (1-alphaRelease) + alphaRelease * this.yPrev
      this.yPrev=y_B
      // gain stage
      c_dB = -y_B
      this.reduction = c_dB
      c= Math.pow(10,c_dB/20)
      outputs[0][0][j]=c*inputs[0][0][j]
    }
    return true
  }
})
