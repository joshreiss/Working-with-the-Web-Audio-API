var context = new AudioContext();
Params= { //BigBen:
  nOsc:14,
  F:[97.0362,155.7461,200.6708,291.5601,335.2872,401.6002,500.6919,
    599.8203,679.0558,704.6314,850.3987,1016.353,1169.165,1343.452],
  Slope:[-0.71286,-1.08551,-2.68134,-0.80383,-5.88471,-1.06387,-3.419,
    -3.69923,-6.71634,-3.57097,-6.85307,-7.04044,-5.6755,-7.25273],
  Amp0:[ -55.7976,-44.8857,-33.3415,-70.8675,-24.9633,-75.653,-27.2338,
    -66.8294,-23.635,-57.3287,-43.0425,-50.9267,-55.1784,-46.6498]
};
var DBToAmp = function(db) { return Math.pow(10, db / 20); }
var gNode=[],osc=[];
for (i=0;i<Params.nOsc;i++) {
  gNode[i]=new GainNode(context,{gain:0});
  osc[i]= context.createOscillator();
  osc[i].start();
  osc[i].connect(gNode[i]).connect(context.destination);
}
Strike.onclick = function() {
  context.resume();
  var now = context.currentTime;
  for (i=0;i<Params.nOsc;i++) {
    gNode[i].gain.cancelScheduledValues(now);
    osc[i].frequency.setValueAtTime(Pitch.value*Params.F[i],now);
    gNode[i].gain.setValueAtTime(DBToAmp(Params.Amp0[i]), now);
    FinalAmp[i]=DBToAmp(Params.Amp0[i]+Params.Slope[i]*8/Duration.value);
    gNode[i].gain.exponentialRampToValueAtTime(DBToAmp(FinalAmp[i],now+8);
    gNode[i].gain.linearRampToValueAtTime(0, now + 12);
  }
}
