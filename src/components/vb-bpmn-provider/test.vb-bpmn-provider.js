const isNeedToGetRealRequest = true;

import vbBpmnProvider from './vb-bpmn-provider.js';
// Взять реализацию модуля из __mocks__
// в отличии от __mocks__ в корне (для node_modules), свои модули не цепляются автоматически, потому выполняем
// Если строка кода закомментирована, то мокируется через __mocks__/axios
// jest.mock( './vb-bpmn-provider.js' );

import * as bpmnProviderConfig from './vb-bpmn-provider.config';

import bpmnFileGetStub from '~/resources/get';
// Тут, по идее, не должно быть ошибок/исключений
const bpmnDefault = bpmnFileGetStub.getByFilePath( bpmnProviderConfig.urlDefaultBpmn );

describe( 'vb-bpmn-provider.js', function(){
    test( 'Если передаём настройки в getBpmn, то отсутствие url приводит к ошибке 400', function(){
        //Можно передать не только пустую структуру, но и любую другую, без { url: url }
        const retPromise = vbBpmnProvider.getBpmn( {} );
        return expect( retPromise ).rejects.toMatchObject( { status: 400 } );
    });

    test( 'С указанием прямого пути через api к несуществующему файлу получена ошибка 404', function(){
        const retPromise = vbBpmnProvider.getBpmn( { url: bpmnProviderConfig.urlDefaultBpmn + '.failurl' } );
        return expect( retPromise ).rejects.toMatchObject( { status: 404 } );
    });

    test( 'Из указанного источника данных, при вызове без параметров, получен default bpmn', function(){
        const retPromise = vbBpmnProvider.getBpmn();
        return expect( retPromise ).resolves.toMatchObject( { data: bpmnDefault } );
    });

    test( 'С указанием прямого пути через api к default.bpmn получен файл default.bpmn', function(){
        const retPromise = vbBpmnProvider.getBpmn( { url: bpmnProviderConfig.urlDefaultBpmn } );
        return expect( retPromise ).resolves.toMatchObject( { data: bpmnDefault } );
    });

    // По сути (при размокировании axios) это интеграционный тест,
    // jest не умеет работать с запросами как браузер (плюс необходимо разруливать relative url)
    test( 'Запрос списка bpmn в ветке репозитория по умолчанию возвращает список json-элементов, в которых можно считать name', function(){
        return vbBpmnProvider.getBpmnList()
            .then( function( resp ){
                expect( resp.data[0] ).toHaveProperty( ['name'] );
            });
    });
});
