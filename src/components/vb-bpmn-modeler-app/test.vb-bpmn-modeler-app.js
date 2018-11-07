import { shallowMount, createLocalVue } from "@vue/test-utils";
import vbBpmnModelerApp from './vb-bpmn-modeler-app.vue';

// Функционал компонента расширен vuex, потому здесь тоже требуется подготовить среду
// @url: https://vue-test-utils.vuejs.org/guides/using-with-vuex.html

import Vuex from 'vuex';

const localVue = createLocalVue();
localVue.use( Vuex );

const store = new Vuex.Store({
    state: {}
});

describe( 'vb-bpmn-modeler-app.vue', function(){
    test( 'Корневой элемент по умолчанию отрисовался с темой bpmnio', function(){
        let wrapper = shallowMount( vbBpmnModelerApp, {
            store,
            localVue,
            attachToDocument: true
        });

        expect( wrapper.find( '*[vb-bpmn-modeler-app *= "bpmnio"]' ).exists() ).toBe( true );
    });

    //Сразу подгружен список bpmn-файлов
});
