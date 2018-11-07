// Набор действий над мета-данными bpmn-файла.
// Запросы кэшируются, потому повторный щелчок по имени файла не будет запрашивать xml ещё раз.
import vbBpmnProvider from '@/components/vb-bpmn-provider/vb-bpmn-provider.js';
import * as vbBpmnProviderConfig from '@/components/vb-bpmn-provider/vb-bpmn-provider.config';

const vbBpmnFileVuex = {
    namespaced: true,

    state: {
        _requestedXmls: []
    },

    mutations: {
        cacheXml: function( state, { fileName, xml } ){
            // В мутациях нет прямого доступа к геттерам, потому так
            if ( state._requestedXmls[ fileName ] === undefined )
                state._requestedXmls[ fileName ] = xml;
        }
    },

    actions: {
        request( {commit}, {fileName} ){
            let getBpmnPromise = vbBpmnProvider.getBpmn( { url: vbBpmnProviderConfig.urlBase + fileName } );
            getBpmnPromise.then( function( resp ){
                if ( resp.status == 200 ){
                    commit( 'modeler/setActiveDiagram', resp.data, {root: true} );
                    commit( 'cacheXml', { fileName: fileName, xml: resp.data } );
                }
            });

            // return getBpmnPromise;
        },

        nameClick( {commit, dispatch, state}, metaData ){
            let cachedXml = state._requestedXmls[ metaData.name ];

            if ( cachedXml ){
                commit( 'modeler/setActiveDiagram', cachedXml, {root: true} );
            } else {
                dispatch( 'request', { fileName: metaData.name } );
            }
        }
    }
};

export default vbBpmnFileVuex;
