// Store для провайдера. Данные по запросам кэшируются.
import provider from '@/components/vb-bpmn-provider/vb-bpmn-provider.js';
import * as providerCfg from '@/components/vb-bpmn-provider/vb-bpmn-provider.config';

const vbBpmnProviderVuex = {
    namespaced: true,

    state: {
        // Массив - список метаданных по bpmn-файлам
        _bpmnList: [],
        _requestedXmls: []
    },

    getters: {
        bpmnList: function ( state ){
            return state._bpmnList;
        },
        xmlForFile: function( state, { fileName } ){
            return state._requestedXmls[ fileName ];
        }
    },

    mutations: {
        cacheBpmnList: function( state, { bpmnList }){
            if ( state._bpmnList.length == 0 )
                state._bpmnList = bpmnList;
        },
        cacheXml: function( state, { fileName, xml } ){
            // В мутациях нет прямого доступа к геттерам, потому так
            if ( state._requestedXmls[ fileName ] === undefined )
                state._requestedXmls[ fileName ] = xml;
        }
    },

    actions: {
        requestBpmnList( {commit} ){
            let getBpmnListPromise = provider.getBpmnList( );
            getBpmnListPromise.then( function( resp ){
                //если какие-то ошибки или сообщения в resp, то не commit'ить
                if ( resp.status == 200 ){
                    commit( 'cacheBpmnList', { bpmnList: resp.data } );
                }
            });

            // return getBpmnListPromise;
        },

        requestBpmn( {commit, getters}, { name } ){
            let cachedXml = getters.xmlForFile( {fileName: name} );

            // Оборачиваем в promise, чтобы соответствовать формату, который передаётся и не при cached
            if ( cachedXml ){
                console.log('Закэшировано для', name);
                return new Promise(
                    function( resolve ){
                        resolve( { data: cachedXml } );
                    }
                );
            }

            let getBpmnParams;
            if ( name ){
                //@todo здесь должно быть 
                getBpmnParams = { url: providerCfg.urlBase + name };
            }

            // Если параметры не переданы, то провайдер сам разберётся, что выдать по умолчанию
            let getBpmnPromise = provider.getBpmn( getBpmnParams );
            getBpmnPromise.then( function( resp ){
                if ( resp.status == 200 ){
                    // commit( 'modeler/setActiveDiagram', resp.data, {root: true} );
                    commit( 'cacheXml', { fileName: name, xml: resp.data } );
                }
            });

            // return getBpmnPromise;
        },

        // getXmlForFile( {commit, dispatch, state, getters}, metaData ){
        //     // let cachedXml = state._requestedXmls[ metaData.name ];
        //     let cachedXml = getters.xmlForFile( {fileName: metaData.name} );

        //     if ( cachedXml ){
        //         commit( 'modeler/setActiveDiagram', cachedXml, {root: true} );
        //     } else {
        //         dispatch( 'requestBpmn', { fileName: metaData.name } );
        //     }
        // }
    }
};

export default vbBpmnProviderVuex;
