import Vue from "vue"
import Vuex from "vuex"

Vue.use(Vuex)

const store=new Vuex.Store({
    state:{
        info:[],
        didian:""
    },
    mutations:{
        nameupdate(state,action){
          state.info.push(action.payload)
        },
        loacation(state,action){
          state.didian=action.payload
        }
    }
})

export default store

