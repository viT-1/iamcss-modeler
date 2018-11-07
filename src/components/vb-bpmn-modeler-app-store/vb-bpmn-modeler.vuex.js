const vbBpmnModelerVuex = {
    namespaced: true,

    state: {
        //@todo: изначально undefined
        _xml: ''
    },

    getters: {
        activeDiagram: function( state ){
            return state._xml;
        }
    },

    mutations: {
        setActiveDiagram: function( state, xml ){
            state._xml = xml;
        }
    }
};

export default vbBpmnModelerVuex;
