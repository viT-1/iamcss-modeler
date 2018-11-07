import { createLocalVue, shallowMount } from "@vue/test-utils";
import { iamElement } from './iAMcss.directives.js';
import * as iamCfg from './iAMcss.config.js';

describe( 'iAMcss.directives.js', function(){
    const localVue = createLocalVue();

    test( 'Директива iam-element при минимальной настройке (указании только name как объект) генерирует iam-атрибут со схемой по умолчанию', function(){
        const Compo = {
            name: 'hello-world',
            directives: { iamElement },
            template: '<div><p v-iam-element="{name:\'greeting\'}">Hello, World</p></div>'
        };
    
        const wrapper = shallowMount( Compo, { localVue } );

        expect( wrapper.find( '*[hello-world' + iamCfg.modStrings.element + 'greeting *= "'
            + iamCfg.modStrings.left + iamCfg.modStrings.scheme + iamCfg.defaultScheme + iamCfg.modStrings.right
            + '"]').exists() ).toBe( true );
    });

    test( 'Директива iam-element при минимальной настройке (указании только name как string) генерирует iam-атрибут со схемой по умолчанию', function(){
        const Compo = {
            name: 'hello-world',
            directives: { iamElement },
            template: '<div><p v-iam-element="\'greeting\'">Hello, World</p></div>'
        };
    
        const wrapper = shallowMount( Compo, { localVue } );

        expect( wrapper.find( '*[hello-world' + iamCfg.modStrings.element + 'greeting *= "'
            + iamCfg.modStrings.left + iamCfg.modStrings.scheme + iamCfg.defaultScheme + iamCfg.modStrings.right
            + '"]').exists() ).toBe( true );
    });

    // Данный тест выдаёт ошибку дважды!!!
    // test( 'Директива iam-element в случае отсутствия наименования элемента выдаёт ошибку', function(){
    //     const Compo = {
    //         name: 'hello-world',
    //         directives: { iamElement },
    //         template: '<div><p v-iam-element>Hello, World</p></div>'
    //     };

    //     expect( function(){
    //         shallowMount( Compo, { localVue } );
    //     }).toThrow( iamCfg.errStrings.REQUIRE_NAME );
    // });

    test( 'Директива iam-element при передаче всех параметров (name, context, scheme и mods) генерирует корректный iam-атрибут', function(){
        const Compo = {
            name: 'hello-world',
            directives: { iamElement },
            template: '<div><p v-iam-element="'
                + '{name:\'greeting\', context:\'vb-modal\', scheme:\'classic\', mods:[\'visible\']}'
                + '">Hello, World</p></div>'
        };

        const wrapper = shallowMount( Compo, { localVue } );

        expect( wrapper.find( '*[hello-world' + iamCfg.modStrings.element + 'greeting *= "'
            + iamCfg.modStrings.left + iamCfg.modStrings.ancestor + 'vb-modal' + iamCfg.modStrings.right
            + iamCfg.modStrings.left + iamCfg.modStrings.scheme + 'classic' + iamCfg.modStrings.right
            + iamCfg.modStrings.left + 'visible' + iamCfg.modStrings.right
            + '"]').exists() ).toBe( true );
    });
});
