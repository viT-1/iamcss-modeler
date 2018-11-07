<style src="./vb-bpmn-modeler-app.css"></style>

<template>
    <div>
        <vb-bpmn-modeler v-iam-element="'diagram-root'" />
        
        <!--@todo Пока заглушка панели, должен быть компонент со слотом-->
        <div v-iam-element = "'panel'">
            <vb-bpmn-files v-iam-element = "'files'"
                :items = "bpmnList" />
        </div>
    </div>
</template>

<script>
    import iAMcssMix from '@/components/iAMcss/iAMcss.mixin.js';
    import { iamElement } from '@/components/iAMcss/iAMcss.directives.js';

    import { mapGetters } from 'vuex';
    import appStore from '@/components/vb-bpmn-modeler-app-store/'

    import vbBpmnFiles from '@/components/vb-bpmn-files/vb-bpmn-files.vue';
    import vbBpmnModeler from '@/components/vb-bpmn-modeler/vb-bpmn-modeler.vue';

    export default {
        name: 'vb-bpmn-modeler-app',
        directives: { iamElement },
        mixins: [iAMcssMix],
        components: {
            'vb-bpmn-files': vbBpmnFiles,
            'vb-bpmn-modeler': vbBpmnModeler
        },
        //@todo перенести в vuex store
        data: function(){
            return {
                lastOpenedBpmn: {
                    branch: 'master',
                    name: 'bg.bpmn'
                }
            }
        },
        created: function(){
            let self = this;
            // Управление загрузкой мета-данных перенесено в прослойку vuex store vb-bpmn-provider
            // вызываем событие, по которому в синглтон возвращается список мета-данных,
            // который далее передаём в дочерникй vue-компонент vb-bpmn-files
            appStore.dispatch( 'provider/requestBpmnList' );
        },
        computed: Object.assign( {},
            mapGetters({ bpmnList: 'provider/bpmnList' })
        )
    }
</script>
