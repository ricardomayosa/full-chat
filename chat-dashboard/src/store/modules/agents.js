const agents = {
    state: {
        countAgents: 0,
        agentsList: [],
        notifyAgents: new Date().toISOString()
    },
  
    mutations: {
        SOCKET_SET_AGENTS_LIST: (state, result) => {
            let id = result[0].idDist
            let total = result[0].total
            let lista = result[0].lista
            let bandera = false
            let listaAgentes = state.agentsList

            for(let i in listaAgentes){
                if(listaAgentes[i].idDist == id){
                    bandera = true
                    listaAgentes[i].total = total
                    listaAgentes[i].lista = lista
                }
            }

            if(!bandera){
                listaAgentes.push(result[0])
            }

            state.agentsList = listaAgentes
            state.notifyAgents = new Date().toISOString()
            
        },
        SOCKET_SET_COUNT_AGENTS: (state, result) => {
            state.countAgents = result[0]
        }
    },
  
    actions: {
        SOCKET_AGENTS_LIST(){
            
        }
    }
  }
  
  export default agents
  