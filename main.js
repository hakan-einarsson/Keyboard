const A4=440;
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

var oscillators=[]
oscillators.push(new Instrument(oscillators.length+1,50,'sine'));
oscillators.push(new Instrument(oscillators.length+1,75,'triangle'));
oscillators.push(new Instrument(oscillators.length+1,100,'sine'));






function playNote(note){
    var ctx = new AudioContext();
    let filter=ctx.createBiquadFilter();
    let oscillator = ctx.createOscillator();
    //let oscillator2 = ctx.createOscillator();
    let gainNode = ctx.createGain();
    filter.connect(gainNode);
    gainNode.connect(ctx.destination);
    oscillator.connect(filter);
    //oscillator2.connect(filter);
    filter.type="bandpass";
    filter.frequency.value=70;
    gainNode.gain.setValueAtTime(0.1,ctx.currentTime);
    gainNode.gain.setTargetAtTime(0,ctx.currentTime,0.4);
    oscillator.type=$('#waveType option:selected').text().toLowerCase();
    oscillator.frequency.setValueAtTime(note,ctx.currentTime);
    oscillator.start();
    oscillator.stop(ctx.currentTime+2);

}

function playNotes(note){
    var ctx = new AudioContext();
    let filter=ctx.createBiquadFilter();
    let oscillator = ctx.createOscillator();
    
    let gainNode = ctx.createGain();
    filter.connect(gainNode);
    gainNode.connect(ctx.destination);
    oscillator.connect(filter);
    
    filter.type="bandpass";
    filter.frequency.value=70;
    gainNode.gain.setValueAtTime(0.5,ctx.currentTime);
    gainNode.gain.setTargetAtTime(0,ctx.currentTime,0.4);
    oscillator.type=$('#waveType option:selected').text().toLowerCase();
    oscillator.frequency.setValueAtTime(note,ctx.currentTime);
    oscillator.start();
    oscillator.stop(ctx.currentTime+2);
    oscillators.forEach(element => {
        console.log(element)
        let oscillator2 = ctx.createOscillator();
        oscillator2.connect(filter);
        oscillator2.type=element.wave;
        oscillator2.frequency.setValueAtTime(element.note,ctx.currentTime);
        oscillator2.start();
        oscillator2.stop(ctx.currentTime+6);  
    });

   
    

}


function getNote(note){
    let baseNote = note.split("-")[0]
    let octave = note.split("-")[1]
    playNote(checkNote(baseNote)*1/Math.pow(2,(1-octave)));
}

function getNoteAnd(note){
    let baseNote = note.split("-")[0]
    let octave = note.split("-")[1]
    playNotes(checkNote(baseNote)*1/Math.pow(2,(1-octave)));
}


function checkNote(note){
    let freq=0;
    if (note=='c')freq=C4;
    if(note=='cs')freq=Cs4;
    if(note=='d')freq=D4;
    if(note=='ds')freq=Ds4;
    if(note=='e')freq=E4;
    if(note=='f')freq=F4;
    if(note=='fs')freq=Fs4;
    if(note=='g')freq=G4;
    if(note=='gs')freq=Gs4;
    if(note=='a')freq=A4;
    if(note=='b')freq=B4;
    if(note=='bs')freq=Bs4;
    return freq;
}

function addOscillator(){
    let id=oscillators.length;
    
}

addOscillator()
