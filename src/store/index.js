import { createStore } from 'vuex'
const MEMBER="MEMBER"
export default createStore({
  state: {
    member: window.SessionStorage.get(MEMBER) || {}
  },
  getters: {
  },
  mutations: {
    setMember(state,member){
      console.log(member)
      state.member=member
      window.SessionStorage.set(MEMBER,member)
    },
    clearMember(state){
      console.log('store正在清除member')
      state.member= {}
      window.SessionStorage.set(MEMBER,{})
    },
  },
  actions: {
  },
  modules: {
  }
})
