import Vue from 'vue';
import iAMcss from './iAMcss.js';
import * as iamCfg from './iAMcss.config.js';

export const iamElement = Vue.directive('iamElement', {
    inserted: function( el, binding, vnode ){
        if ( !binding.value )
            throw new Error( iamCfg.errStrings.REQUIRE_NAME );

        let attName;
        let buildModsStingParams = {};

        if ( typeof binding.value == 'string' ){
            attName = vnode.context.$options.name + iamCfg.modStrings.element + binding.value;

            //Параметр схема обязателен!
            buildModsStingParams.scheme = iamCfg.defaultScheme;
        } else {
            attName = vnode.context.$options.name + iamCfg.modStrings.element + binding.value.name;

            if ( !binding.value.name )
                throw new Error( iamCfg.errStrings.REQUIRE_NAME );
            
            if ( binding.value.context )
                buildModsStingParams.context = binding.value.context;
            
            buildModsStingParams.scheme = binding.value.scheme ? binding.value.scheme : iamCfg.defaultScheme;

            if ( binding.value.mods )
                buildModsStingParams.mods = binding.value.mods;
        }

        el.setAttribute( attName, iAMcss.buildBemModsString( buildModsStingParams ) );
    }
});
