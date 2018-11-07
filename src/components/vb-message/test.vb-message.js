import { shallowMount } from "@vue/test-utils";
import vbMessage from './vb-message.vue';
import * as iamCfg from '@/components/iAMcss/iAMcss.config.js';

describe( 'vb-message.vue', function(){
    test( 'Корневой элемент по умолчанию отрисовался с темой bpmnio и состоянием info', function(){
        let wrapper = shallowMount( vbMessage, {
            propsData: { text: 'о' },
            attachToDocument: true
        });
        
        expect( wrapper.find( '*[vb-message *= "'
            + iamCfg.modStrings.left + iamCfg.modStrings.scheme + iamCfg.defaultScheme + iamCfg.modStrings.right
            + iamCfg.modStrings.left + 'info' + iamCfg.modStrings.right
            + '"]' ).exists() ).toBe( true );
    });
});
