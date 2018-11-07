import { mount, shallowMount, createLocalVue } from "@vue/test-utils";
import vbBpmnFiles from './vb-bpmn-files.vue';

// Функционал компонента расширен vuex, потому здесь тоже требуется подготовить среду
// @url: https://vue-test-utils.vuejs.org/guides/using-with-vuex.html

import Vuex from 'vuex';
const localVue = createLocalVue();
localVue.use( Vuex );
const store = new Vuex.Store({
    state: {}
});

describe( 'vb-bpmn-files.vue', function(){

    test( 'Если список файлов не передан, то компонент отображает сообщение об ошибке при помощи vb-message', function(){
        // С shallowMount тест не пройдёт
        let wrapper = mount( vbBpmnFiles, {
            store,
            localVue,
            attachToDocument: true
        });

        expect( wrapper.find( '[vb-message]' ).exists() ).toBe( true );
    });

    test( 'При передаче списка bpmn-файлов компонент отрисовывает ровно столько же file, сколько указано в списке', function(){
        let bpmnListItems = [
            { name: 'bg.bpmn' }
            ,{ name: 'default.bpmn' }
        ];

        let wrapper = shallowMount( vbBpmnFiles, {
            propsData: { items: bpmnListItems },
            store,
            localVue,
            attachToDocument: true
        });

        expect( wrapper.findAll( '[vb-bpmn-files__item]' ) ).toHaveLength( bpmnListItems.length );
    });

    test( 'Если у элемента списка файлов не указано свойство name, возвращается ошибка', function(){
        let spyOnConsoleErr = jest.spyOn( global.console, 'error' );

        shallowMount( vbBpmnFiles, {
            propsData: { items: [{ url: 'some.url' }] },
            store,
            localVue,
            attachToDocument: true
        });

        expect( spyOnConsoleErr ).toHaveBeenCalled();
    });

});
