import vbBpmnService from '@/nodejs/vb-bpmn-service/vb-bpmn-service.js';
import * as bpmnProviderConfig from '@/components/vb-bpmn-provider/vb-bpmn-provider.config.js';

const mockAxios = {
    get: function( url ) {

        // mockVbBpmnProvider не нужен - справшиваем напрямую с сервиса
        if ( url.includes( bpmnProviderConfig.urlBase ) && url.includes( '.bpmn' ) ){
            return vbBpmnService.getBpmn( { url: url } );
        }

        if ( url.includes( bpmnProviderConfig.urlBpmnList ) ){
            return vbBpmnService.getBpmnList();
        }
        
    }
};

console.log( '__mocks__/axios' );

export default mockAxios;

// Выключаем мокирование axios
// export default require( 'axios' );
