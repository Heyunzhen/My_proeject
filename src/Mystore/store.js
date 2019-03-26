import Vue from "vue"
import Vuex from "vuex"

Vue.use(Vuex)

const store=new Vuex.Store({
    state:{
        info:[],
        didian:"",
        phone:"暂无绑定手机号哦~"
    },
    mutations:{
        nameupdate(state,action){
          state.info.push(action.payload)
          console.log(state.info)
        },
        loacation(state,action){
          state.didian=action.payload
        },
        phone(state,action){
            state.phone=action.payload
        }
    }
})

export default store

