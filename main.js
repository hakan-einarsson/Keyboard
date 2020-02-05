const store = new Vuex.Store({
    state: {
        oscillators: [{id:0,wave:"sine",filter: "bandpass", volume: 0.1,volume_start:0.5, volume_end:0.5,octave:1,frequency: 50, length:1},],
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
                "gs":440*Math.pow(2,11/12)},
        ctx : new AudioContext()
        },
    mutations: {
        addOsc: state => {
            state.oscillators.push({id:store.getters.getOsc.length,wave:"sine",filter: "bandpass", volume: 0.1,volume_start:0.5, volume_end:0.5,octave:1,frequency: 50, length:1})
        },
        changeProperty: function(state,values){
            state.oscillators[values.id][values.name] = values.property
        },
        removeOsc: function(state, id){
            if (store.getters.getOsc.length > 1){
            state.oscillators.splice(id,1)
                for (let index = 0; index < store.getters.getOsc.length; index++) {
                    store.dispatch('changeProperty',{id:index, name:"id",property:index})
                }
                
            }
        }
    },
 
    getters: {
        returnNote: function(state){
            return state.notes
        },
        getOsc: function(state){
            return state.oscillators
        },
        getCtx: function(state) {
            return state.ctx
        }
    },
    actions: {
        addOsc: function(context){
            context.commit('addOsc')
        },
        changeProperty: function(context,values){
            context.commit('changeProperty', values)
        },
        removeOsc: function(context, id){
            context.commit('removeOsc',id)
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
                <div class="col-1"><input type="number" step="1" class="form-control" v-model:value=length></div><div class="col-1"><button class="btn btn-danger" @click=remove>Remove</button></div></div>',
    computed: {
        wave: {
            get(){
                return this.$store.state.oscillators[this.item.id].wave
            },
            set(value){
                this.$store.dispatch('changeProperty',{id:this.item.id,name:"wave",property:value})
            }
        },
        filter: {
            get(){
                return this.$store.state.oscillators[this.item.id].filter
            },
            set(value){
                this.$store.dispatch('changeProperty',{id:this.item.id,name:"filter",property:value})
            }
        },
        volume: {
            get(){
                return this.$store.state.oscillators[this.item.id].volume
            },
            set(value){
                this.$store.dispatch('changeProperty',{id:this.item.id,name:"volume",property:parseFloat(value)})
            }
        },
        volume_start: {
            get(){
                return this.$store.state.oscillators[this.item.id].volume_start
            },
            set(value){
                this.$store.dispatch('changeProperty',{id:this.item.id,name:"volume_start",property:parseFloat(value)})
            }
        },
        volume_end: {
            get(){
                return this.$store.state.oscillators[this.item.id].volume_end
            },
            set(value){
                this.$store.dispatch('changeProperty',{id:this.item.id,name:"volume_end",property:parseFloat(value)})
            }
        },
        octave: {
            get(){
                return this.$store.state.oscillators[this.item.id].octave
            },
            set(value){
                this.$store.dispatch('changeProperty',{id:this.item.id,name:"octave",property:parseInt(value)})
            }
        },
        frequency: {
            get(){
                return this.$store.state.oscillators[this.item.id].frequency
            },
            set(value){
                this.$store.dispatch('changeProperty',{id:this.item.id,name:"frequency",property:parseInt(value)})
            }
        },
        length: {
            get(){
                return this.$store.state.oscillators[this.item.id].length
            },
            set(value){
                this.$store.dispatch('changeProperty',{id:this.item.id,name:"length",property:parseInt(value)})
            }
        },
        
    },
    methods: {
        remove: function(){
            this.$store.commit('removeOsc',this.item.id)
        }
    }
});

const app = new Vue({
    el: "#app",
    store,
    methods : {
        playNote: function (note){
            this.$store.getters.getOsc.forEach(e => {
                let baseNote = note.split("-")[0]
                let octave = note.split("-")[1]
                let frequency = this.$store.getters.returnNote[baseNote]*1/Math.pow(2,(2-e.octave-octave))
                console.log(this.$store.getters.returnNote[baseNote]*1/Math.pow(2,(2-e.octave-octave)))
                let filter=this.$store.getters.getCtx.createBiquadFilter();
                let oscillator = this.$store.getters.getCtx.createOscillator();
                let gainNode = this.$store.getters.getCtx.createGain();
                filter.connect(gainNode);
                gainNode.connect(this.$store.getters.getCtx.destination);
                oscillator.connect(filter);
                filter.type=e.filter;
                filter.frequency.value=e.frequency;
                gainNode.gain.setValueAtTime(e.volume,this.$store.getters.getCtx.currentTime);
                gainNode.gain.setTargetAtTime(0,this.$store.getters.getCtx.currentTime,0.2);
                //gainNode.gain.setTargetAtTime(0,this.$store.getters.getCtx.currentTime,1);
                oscillator.type=e.wave;
                oscillator.frequency.setValueAtTime(frequency,this.$store.getters.getCtx.currentTime);
                oscillator.start();
                oscillator.stop(this.$store.getters.getCtx.currentTime+e.length);
            });
        
        },
        getNote: function(note){
            let baseNote = note.split("-")[0]
            let octave = note.split("-")[1]
            this.playNote(this.$store.getters.returnNote[baseNote]*1/Math.pow(2,(1-octave)));
        },
        test: function(){
            store.dispatch('addOsc')
        }

    }
})