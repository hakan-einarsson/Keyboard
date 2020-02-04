const store = new Vuex.Store({
    state: {
        oscillators: [{id:0,wave:"sine",filter: "bandpass", volume: 0.5,volume_start:0, volume_end:0.5,octave:1,frequency: 50, length:1},],
        notes: {"a":440,
                "bs":440*Math.pow(2,1/12),
                "b":440*Math.pow(2,2/12),
                "c":440*Math.pow(2,3/12),
                "cs":440*Math.pow(2,4/12),
                "d":440*Math.pow(2,5/12),
                "ds":440*Math.pow(2,6/12),
                "e":440*Math.pow(2,7/12),
                "f":440*Math.pow(2,8/12),
                "fs":440*Math.pow(2,9/12),
                "g":440*Math.pow(2,10/12),
                "gs":440*Math.pow(2,11/12)}
        },
 
    getters: {
        returnNote: function(state){
            return state.notes
        },
        getOsc: function(state){
            return state.oscillators
        }
    }        
})

Vue.component('oscillator',{
    props: ["item"],
    
    template:'<div class="row justify-content-center"><div class="col-1 text-center">{{this.item.id+1}}</div>\
                <div class="col-1"><select class="form-control" v-model:value=wave>\
                <option value="sine">Sine</option><option value="square">Square</option>\
                <option value="sawtooth">Sawtooth</option><option value="triangle">Triangle</option>\
                </select></div>\
                <div class="col-1"><select class="form-control" v-model:value=filter>\
                <option value="lowpass">Lowpass</option><option value="highpass">Highpass</option>\
                <option value="bandpass">Bandpass</option><option value="lowshelf">Lowshelf</option>\
                <option value="highshelf">Highshelf</option><option value="peaking">Peaking</option>\
                <option value="notch">Notch</option><option value="allpass">Allpass</option></select></div>\
                <div class="col-1"><input type="number" min="0" max="1" step="0.01" class="form-control" v-model:value=volume></div>\
                <div class="col-1"><input type="text" class="form-control" v-model:value=volume_start></div>\
                <div class="col-1"><input type="number" class="form-control" v-model:value=octave></div>\
                <div class="col-1"><input type="number" class="form-control" v-model:value=frequency></div>\
                <div class="col-1"><input type="number" step="0.01" class="form-control" v-model:value=length></div></div>',
    computed: {
        wave: {
            get(){
                return this.$store.state.oscillators[this.item.id].wave
            },
            set(value){
                return "value"
            }
        },
        filter: {
            get(){
                return this.$store.state.oscillators[this.item.id].filter
            },
            set(value){
                return "value"
            }
        },
        volume: {
            get(){
                return this.$store.state.oscillators[this.item.id].volume
            },
            set(value){
                return "value"
            }
        },
        volume_start: {
            get(){
                return this.$store.state.oscillators[this.item.id].volume_start
            },
            set(value){
                return "value"
            }
        },
        volume_end: {
            get(){
                return this.$store.state.oscillators[this.item.id].volume_end
            },
            set(value){
                return "value"
            }
        },
        octave: {
            get(){
                return this.$store.state.oscillators[this.item.id].octave
            },
            set(value){
                return "value"
            }
        },
        frequency: {
            get(){
                return this.$store.state.oscillators[this.item.id].frequency
            },
            set(value){
                return "value"
            }
        },
        length: {
            get(){
                return this.$store.state.oscillators[this.item.id].length
            },
            set(value){
                return "value"
            }
        },
        
    }
});

const app = new Vue({
    el: "#app",
    store,
    methods : {
        playNote: function (note){
            let ctx = new AudioContext();
            let filter=ctx.createBiquadFilter();
            let oscillator = ctx.createOscillator();
            let gainNode = ctx.createGain();
            filter.connect(gainNode);
            gainNode.connect(ctx.destination);
            oscillator.connect(filter);
            filter.type="bandpass";
            filter.frequency.value=70;
            gainNode.gain.setValueAtTime(0.1,ctx.currentTime);
            gainNode.gain.setTargetAtTime(0,ctx.currentTime,0.4);
            oscillator.type="sine";
            oscillator.frequency.setValueAtTime(note,ctx.currentTime);
            oscillator.start();
            oscillator.stop(ctx.currentTime+2);
        
        },
        getNote: function(note){
            let baseNote = note.split("-")[0]
            let octave = note.split("-")[1]
            this.playNote(this.$store.getters.returnNote[baseNote]*1/Math.pow(2,(1-octave)));
            console.log(this.$store.getters.returnNote[baseNote]*1/Math.pow(2,(1-octave)))
        },
        test: function(){
            console.log(this.$store.getters.returnNote['c'])
        }

    }
})