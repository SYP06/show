import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    curMenu:{
      name:'电视剧',
      bgColor:'rgb(72, 191, 196)'
    }
  },
  mutations: {
    setCurMenu(state,data){
      state.curMenu = data;
    }
  },
  actions: {
  },
  modules: {
  }
})
