import iAMcss from './iAMcss.js';
import * as iamCfg from './iAMcss.config.js';

describe( 'iAMcss.js', function(){
    test('Генерация строки модификаторов для блок__элемента при отсутствии схемы выдаёт ошибку', function(){
        expect( function(){
            iAMcss.buildBemModsString({
                mods: ['classic', 'active']
            });
        }).toThrow( iamCfg.errStrings.REQUIRE_SCHEME );
    });

    test('Строка с модификаторами для блок__элемента с подробными настройками формируется корректно', function(){
        expect( iAMcss.buildBemModsString({
            context: 'vb-panel',
            scheme: 'classic',
            mods: ['active', 'isLoaded', 'hasIco'],
            modStrings: {
                left: '[',
                right: ']',
                ancestor: '..',
                scheme: 's:'
            }
        })
        ).toBe( '[..vb-panel][s:classic][active][isLoaded][hasIco]' );
    });

    test('Строка с модификаторами для блок__элемента с минимальными настройками (только scheme) формируется корректно', function(){
        expect( iAMcss.buildBemModsString({
            scheme: 'default'
        })
        ).toBe( iamCfg.modStrings.left + 'default' + iamCfg.modStrings.right );
    });

    test('Строка с модификаторами (context и scheme) для блок__элемента с минимальными настройками (только str) парсится корректно', function(){
        expect( iAMcss.parseBemModsString({
            str: iamCfg.modStrings.left + iamCfg.modStrings.ancestor + 'vb-panel' + iamCfg.modStrings.right
                + iamCfg.modStrings.left + iamCfg.modStrings.scheme + 'classic' + iamCfg.modStrings.right
        })
        ).toEqual({
            scheme: 'classic',
            context: 'vb-panel'
        });
    });

    test('Строка с модификаторами (scheme и mods) для блок__элемента с подробными настройками (str и modStrings) парсится корректно', function(){
        expect( iAMcss.parseBemModsString({
            modStrings: {
                left: '{',
                right: '}',
                scheme: 'scheme:'
            },
            str: '{scheme:classic}{isActive:true}{hasIco:false}'
        })
        ).toEqual({
            scheme: 'classic',
            mods: ['isActive:true', 'hasIco:false']
        });
    });

    test('Строка с модификаторами (scheme и mods) для блок__элемента с одинаковыми префиксами для схемы и контекста вызывает ошибку', function(){
        expect( function(){
            iAMcss.parseBemModsString({
                modStrings: {
                    left: '-',
                    right: '-',
                    scheme: '@',
                    ancestor: '@'
                },
                str: '-@classic--@active-'
            });
        }).toThrow( iamCfg.errStrings.SAME_PREFIXES );
    });

    test('Строка с единственным модификатором scheme, при одинаковых префиксах схемы и контекста парсится однозначно', function(){
        expect( iAMcss.parseBemModsString({
            modStrings: {
                scheme: '@',
                ancestor: '@'
            },
            str: iamCfg.modStrings.left + iamCfg.modStrings.scheme + 'classic' + iamCfg.modStrings.right
        })
        ).toEqual({
            scheme: 'classic'
        });
    });
});
