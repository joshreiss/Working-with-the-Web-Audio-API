//There is a bug that this doesn't work if the web audio inspector is installed,
// see https://github.com/google/audion/issues/73
// and  https://codepen.io/w3devcampus/pen/GWGdjK?editors=0010
context= new AudioContext();
// ES6 class that extends AnalyzerNode. Inherit default property values,
// connect methods, etc. behaviour that enable other nodes to connect to this one
class FrequencyAnalyzer extends AnalyserNode { // instances are an analyzernode
  constructor(audioContext) {
    super(audioContext);
  }
  show() {
    return 'QQ';
  }
}
fa = new FrequencyAnalyzer(context);
let source = context.createOscillator();
source.start();
source.connect(fa).connect(context.destination);
console.log(fa.show());
