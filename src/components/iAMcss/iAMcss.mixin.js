import iAMcss from './iAMcss.js';
import * as iamCfg from './iAMcss.config.js';

const iAMcssMix = {
    data: function(){
        return {
            _iamContext: '',
            _iamScheme: iamCfg.defaultScheme,
            _iamMods: []
        };
    },
    props: {
        // bem-модификатор (контекст: контейнер или более root-овый элемент по смыслу которого меняем CSS или JS-поведение)
        iamContext: {
            type: String
        },
        // bem-модификатор (схема отображения - каркас, блочная модель и цветовое оформление)
        iamScheme: {
            type: String
        },
        // bem-модификаторы (состояния и хаки-хуки)
        iamMods: {
            type: Array
        }
    },
    created: function(){
        if ( this.iamContext )
            this.$data._iamContext = this.iamContext;

        if ( this.iamScheme )
            this.$data._iamScheme = this.iamScheme;
        
        if ( this.iamMods )
            this.$data._iamMods = this.iamMods;
    },
    mounted: function(){
        //Добавляем модификаторы к блоку-элементу (наименование компонента именно таким и должно быть - БЭ)
        this.$el.setAttribute(
            this.$options.name,
            iAMcss.buildBemModsString({
                context: this.$data._iamContext,
                scheme: this.$data._iamScheme,
                mods: this.$data._iamMods
            })
        );
    }
};

export default iAMcssMix;
