import vbBpmnService from './vb-bpmn-service.js';
import * as bpmnProviderConfig from '@/components/vb-bpmn-provider/vb-bpmn-provider.config';

import bpmnFileGetStub from '~/resources/get';
// В этой строке, по идее, не должно быть ошибок/исключений
const bpmnDefault = bpmnFileGetStub.getByFilePath( bpmnProviderConfig.urlDefaultBpmn );

describe( 'vb-bpmn-service.js', function(){
    // Покрытие 100% ?! ;) Тест был бы бессмысленным, если бы в сервис не приходили напрямую из mock axios
    test( 'Если передаём настройки в getBpmn, то отсутствие url приводит к ошибке 400', function(){
        //Можно передать не только пустую структуру, но и любую другую, без { url: url }
        const retPromise = vbBpmnService.getBpmn( {} );
        return expect( retPromise ).rejects.toMatchObject( { status: 400 } );
    });

    test( 'С указанием прямого пути через api к несуществующему файлу получена ошибка 404', function(){
        const retPromise = vbBpmnService.getBpmn( { url: '/api/vb-bpmn/never.bpmn.failurl' } );
        return expect( retPromise ).rejects.toMatchObject( { status: 404 } );
    });

    test( 'С указанием прямого пути через api к default.bpmn получен файл default.bpmn', function(){
        // В отличии от тестов на vb-bpmn-provider нас устраивает относительный путь,
        // поскольку vbBpmnService сейчас работает через bpmnFileGetStub с файловой системой,
        // вместо того, чтобы по axios запросить CORS на Bitbucket
        const retPromise = vbBpmnService.getBpmn( { url: bpmnProviderConfig.urlDefaultBpmn } );
        return expect( retPromise ).resolves.toMatchObject( { data: bpmnDefault } );
    });

    test( 'Запрос списка bpmn в ветке репозитория по умолчанию возвращает список json-элементов, в которых можно считать name', function(){
        // const retPromise = vbBpmnService.getBpmnList();
        // return expect( retPromise ).resolves.data[0].toHaveProperty( ['name'] );
        return vbBpmnService.getBpmnList()
            .then( function( resp ){
                expect( resp.data[0] ).toHaveProperty( ['name'] );
            });
    });
});
