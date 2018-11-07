import { shallowMount, createLocalVue } from "@vue/test-utils";
import vbBpmnFile from './vb-bpmn-file.vue';

// Функционал компонента расширен vuex, потому здесь тоже требуется подготовить среду
// @url: https://vue-test-utils.vuejs.org/guides/using-with-vuex.html

import Vuex from 'vuex';
const localVue = createLocalVue();
localVue.use( Vuex );
const store = new Vuex.Store({
    state: {}
});

describe( 'vb-bpmn-file.vue', function(){
    test( 'Переданное имя файла отображается', function(){
        let fileName = 'default.bpmn';

        let wrapper = shallowMount( vbBpmnFile, {
            propsData: { metaData: { name: fileName } },
            store,
            localVue,
            attachToDocument: true
        });

        expect( wrapper.text() ).toMatch( fileName );
    });
});
