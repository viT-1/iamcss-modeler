jest.mock('diagram-js-minimap');

import { shallowMount } from "@vue/test-utils";
import vbBpmnModeler from './vb-bpmn-modeler.vue';
import BpmnModeler from 'bpmn-js/lib/Modeler';

describe( 'vb-bpmn-modeler.vue', function(){

    // Работа без test-utils напрямую с Vue
    // function mount( cmp, options ){
    //     const Constructor = Vue.extend( component );
    //     return new Constructor(options).$mount();
    //     // отсюда можно получить const wrapper = mount( vbBpmnModeler ); wrapper.$el и spyOn( wrapper.methods но те же грабли! Подписываемся после mount
    // }

    // console.log('Надо подвязывать spy к прототипу', vbBpmnModeler.prototype );
    // const spyOpenDiagram = jest.spyOn( wrapper.vm, 'openDiagram' );

    // Без attachToDocument не заводилось - проблемы с DOM
    const wrapper = shallowMount( vbBpmnModeler, { attachToDocument: true } );

    //spyOn Надо вызывать до shallowMount/wrapper, но нам для spy нужен wrapper!
    const spyOpenDiagram = jest.spyOn( wrapper.vm, 'openDiagram' );

    //Тесты секции data
    test( 'Создан объект моделер', function(){
        // Если убрать __mock__/Modeler, то тоже not.toBeNull
        expect( wrapper.vm.modeler ).not.toBeNull();
    });

    // test( 'Если открыть некорректный xml, при помощи openDiagram, то возвращается ошибка', function(){
    //     // 1) Проблема в том, что modeler, с которого можно получить настоящую ошибку некорректного xml,
    //     // замокирован в __mocks__, потому throw Error не ловим, надо размокировать Modeler
    //     // 2) Следующая проблема в том, что прописав в __mocks__/Modeler не вызывается callback-функция done
    //     // установка timeout в параметрах теста не помогает 

    //     const wrapperForOpenDiagramCheck = mount( vbBpmnModeler, {
    //         attachToDocument: true
    //     });
    //     // console.log( wrapperForOpenDiagramCheck.vm.modeler );

    //     expect( function(){ wrapperForOpenDiagramCheck.vm.openDiagram( '1' ); }).toThrow( 'Смотрим что за ошибка' ) ;
    // }, 500000 );

    //@todo: переписать тест под промис
    test( 'Загружена диаграмма по умолчанию при помощи функции openDiagram', function(){
        // Подменяем функцию, потому делаем отдельный mount, в котором проверяем куцый функционал
        const fnStub = jest.fn();
        const wrapperForOpenDiagramCheck = shallowMount(
            vbBpmnModeler, {
                attachToDocument: true,
                methods: {
                    openDiagram: fnStub
                }
            });

        // Проверяем, что из lifecycle (mount в vue-компоненте), вызывалась наша функция
        expect( fnStub ).toHaveBeenCalled();

        // Обработка самой ошибки, которая возвращается при некорректном формате данных диаграммы
        // возложена на компонент, в котором не выбрасывается исключение,
        // потому toThrow для openDiagram (тест закомментированный выше) неактуален
    });

    const mainStateExpected = 'with-diagram';
    test( 'Загрузка диаграммы по умолчанию привело к установке состояния ' + mainStateExpected, function(){
        //Проверка, что в data.mainState ожидаемая строка
        const isMainStateExpected = ( wrapper.vm.mainState == mainStateExpected );

        //Проверка, что в классах присутствует mainState
        const hasMainStateInClasses = wrapper.classes().includes( mainStateExpected );
        
        expect( isMainStateExpected && hasMainStateInClasses ).toBeTruthy();
    });
});
