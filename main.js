const A4=440*1/Math.pow(2,2);
const Bs4=A4*Math.pow(2,1/12);
const B4=A4*Math.pow(2,2/12);
const C4=A4*Math.pow(2,-9/12);
const Cs4=A4*Math.pow(2,-8/12);
const D4=A4*Math.pow(2,-7/12);
const Ds4=A4*Math.pow(2,-6/12);
const E4=A4*Math.pow(2,-5/12);
const F4=A4*Math.pow(2,-4/12);
const Fs4=A4*Math.pow(2,-3/12);
const G4=A4*Math.pow(2,-2/12);
const Gs4=A4*Math.pow(2,-1/12);

var ctx = new AudioContext();

function playNote(note,ctx){
    let filter=ctx.createBiquadFilter();
    let oscillator = ctx.createOscillator();
    let gainNode = ctx.audioContext.createGain();
    oscillator.connect(filter);
    filter.connect(gainNode);
    gainNode.connect(ctx.destination);
    filter.type="bandpass";
    filter.frequency.value=70;
    gainNode.gain.setTargetAtTime(0,ctx.currentTime,0.5);
    oscillator.type="sine";
    oscillator.frequency.setValueAtTime(this.frequency,this.audioContext.currentTime);
}

/*function playNote(note){
    baseNote = note.split("-")[0]
    octave = note.split("-")[1]
    if (baseNote == 'a'){
       console.log(octave/Math.pow(2,2))
}
    
}

function checkNote(note){
    let baseNoteArray = note.split("-")
    return baseNoteArray

}*/
