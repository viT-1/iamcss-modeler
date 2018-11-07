import Vue from 'vue';
import Vuex from 'vuex';

import vbBpmnFileVuex from './vb-bpmn-file.vuex.js';
import vbBpmnProviderVuex from './vb-bpmn-provider.vuex.js';
import vbBpmnModelerVuex from './vb-bpmn-modeler.vuex.js';

Vue.use( Vuex );

const appStore = new Vuex.Store({
    modules: {
        //Пишем в такой форме, чтобы сформировать namespaces
        bpmnFile: vbBpmnFileVuex,
        provider: vbBpmnProviderVuex,
        modeler: vbBpmnModelerVuex
    }
});

// Так делать не надо - старый стиль "подписчик" ведущий к хаосу (трудно собрать логику, кто что слушает)
// appStore.subscribeAction( function( {type, payload}, state ){
//     switch ( type ){
//     case 'bpmnFile/nameClick':
//         console.log( 'Щёлкнули по', payload );
//     }
// });

export default appStore;
