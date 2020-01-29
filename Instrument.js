
class Instrument{
    constructor(id,frequency,wave){
        this.id=id;
        this.wave = wave;
        this.filter = "lowpass";
        this.frequency= frequency;
        this.volume=0.5;
        this.volumeStory=[0,0.5];
        this.octave=0;
        this.lenght=1;
    }
}