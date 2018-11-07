import * as iamCfg from './iAMcss.config.js';

class iAMcss {
    /**
     * @typedef {Object} modStrings
     * @property {String} left левая "скобка"
     * @property {String} right правая "скобка"
     * @property {String} ancestor символ-префикс предка
     * @property {String} scheme символ-префикс схемы/темы
     */
    /**
     * @typedef {Object} buildBemModificatorsStringParams
     * @property {String} [context] модификатор контекста (любой родительский элемент выше по иерархии DOM),
     *      для того чтобы корректировать css-стили блока-элемента в разных контекстах других блоков или блоков-элементов
     * @property {String} scheme модификатор для css-стилей касательно цветовой схемы И блочной модели в этой схеме
     * @property {Array.<String>} [mods] другие модификаторы (состояния, и прочие)
     * @property {modStrings} [modStrings] строки-разделители, если не указаны, то будут использоваться из iAMcss.config
     */
    /**
     * Генерация строки для значения атрибута блока-элемента (iAMcss)
     * @static
     * @param {buildBemModificatorsStringParams} [params]
     * @returns {String} строка типичной структуры с модификаторами для блока-элемента
     * @memberof iAMcss
     */
    static buildBemModsString( params ){
        let 
            lStr = (params.modStrings && params.modStrings.left ) ? params.modStrings.left : iamCfg.modStrings.left,
            rStr = (params.modStrings && params.modStrings.right ) ? params.modStrings.right : iamCfg.modStrings.right,
            ctxStr = (params.modStrings && params.modStrings.ancestor ) ? params.modStrings.ancestor : iamCfg.modStrings.ancestor,
            shmStr = (params.modStrings && params.modStrings.scheme ) ? params.modStrings.scheme : iamCfg.modStrings.scheme,

            ctx = params.context,
            scheme = params.scheme,
            // scheme = params.scheme ? params.scheme : iamCfg.defaultScheme,
            mods = params.mods;

        let strContext = ctx ? lStr + ctxStr + ctx + rStr : '';
        
        // scheme обязателен!
        if ( !scheme ){
            throw new Error( iamCfg.errStrings.REQUIRE_SCHEME );
        }

        let strScheme = lStr + shmStr + scheme + rStr;
        
        let strMods = '';
        if ( mods && mods.length ){
            strMods = mods.map( mod => lStr + mod + rStr ).join('');
        }

        return strContext + strScheme + strMods;
    }

    /**
     * @typedef {Object} parseBemModificatorsStringParams
     * @property {modStrings} [modStrings] строки-разделители, если не указаны, то будут использоваться из iAMcss.config
     * @property {String} str строка с рендеренными модификаторами (состояния, и прочие)
     */
    /**
     * Обратная функция к buildBemModsString
     * @static
     * @param {parseBemModificatorsStringParams} params 
     * @returns {buildBemModificatorsStringParams} По полученному объекту можно заново выполнить buildBemModsString,
     * и он должен сгенерировать ту же строку
     * @memberof iAMcss
     */
    static parseBemModsString( params ){
        let
            lStr = (params.modStrings && params.modStrings.left ) ? params.modStrings.left : iamCfg.modStrings.left,
            rStr = (params.modStrings && params.modStrings.right ) ? params.modStrings.right : iamCfg.modStrings.right,
            ctxStr = (params.modStrings && params.modStrings.ancestor ) ? params.modStrings.ancestor : iamCfg.modStrings.ancestor,
            shmStr = (params.modStrings && params.modStrings.scheme ) ? params.modStrings.scheme : iamCfg.modStrings.scheme,

            str = params.str.substr( lStr.length, params.str.length - lStr.length - rStr.length );
        
        // Если модификатор один, то это обязательный: схема
        if ( str.indexOf( rStr + lStr ) == -1 ){
            return { scheme: str };
        }

        //Сначала получаем все модификаторы, к чему бы они ни относились
        let allMods = str.split( rStr + lStr );
        
        // Если у схемы и контекста префикс '', то мы не можем точно определить местоположение схемы и понять, есть ли вообще контекст!
        if ( !(ctxStr + shmStr).length ){
            return { mods: allMods };
        }

        let hasContext = false;
        // Если у схемы префикс не отличается от префикса контекста (и не пустые),
        // то распарсить возможно по их очерёдности: сначала контекст, затем схема.
        // Если элемент с такими префиксом всего один, то это схема.
        if ( ctxStr == shmStr ){
            // Тут вариантов с пустым префиксом не может быть, поскольку вылетели в предыдущем if
            let ctx_shmArr = allMods.filter( mod => mod.indexOf( shmStr ) == 0 );
            if ( ctx_shmArr.length != 1 ){
                throw new Error( iamCfg.errStrings.SAME_PREFIXES );
            } else {
                // Если же найдено с префиксом только одно значение, то это точно схема
            }
        } else {
            // Когда контекст или схема с пустым префиксом, или же оба непустые и неодинаковые

            // Определяем, есть ли контекст по вычислению позиции префикса
            if ( shmStr.length ){
                let schemeWithPrefix = allMods.filter( mod => mod.indexOf( shmStr ) == 0 )[0];
                // есть ли в строке context, проверяем по позиции схемы внутри массива
                hasContext = allMods.indexOf( schemeWithPrefix ) == 1;
            } else {
                // Если у схемы нет префикса, то проверяем, есть ли контекст, а за ним префикс

                // Проверку возможно сделать только если у контекста есть префикс
                if ( ctxStr.length ){
                    hasContext = allMods.filter( mod => mod.indexOf( ctxStr ) == 0 ).length;
                } else {
                    // Если у контекста нет префикса, но у схемы есть, то понять, есть ли контекст можно по позиции схемы
                    // это условие уже проверено выше
                }
            }
        }

        let retObject = {
            scheme: allMods[hasContext ? 1 : 0].substr( shmStr.length )
        };

        if ( hasContext ){
            retObject.context = allMods[0].substr( ctxStr.length );
        }

        // Схему вычислили, контекст возможно вычислили. Остальное mods
        allMods.splice( 0, hasContext ? 2 : 1 );
        if ( allMods.length ){
            retObject.mods = allMods;
        }
        
        return retObject;
    }
}

export default iAMcss;
