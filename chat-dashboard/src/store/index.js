import agents from './modules/agents'
import getters from './getters'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    io: {}//rootState.io
  },
  mutations: {
    setSocket: (state, socket) => {
      state.io = socket
    }
  },
  modules: {
    app,
  	permission,
    tagsView,
    user,
    chat,
    client,
    agents
  },
  getters
})

export default store