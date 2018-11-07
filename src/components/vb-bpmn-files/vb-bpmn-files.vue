<style src="./vb-bpmn-files.css"></style>

<template>
    <div>
        <ul v-iam-element = "'list'"
            v-if = "items && items.length"

            ><li v-iam-element = "'item'"
                v-for = "item in items"

                ><vb-bpmn-file :meta-data = "item" />
            </li>
        </ul>
        <vb-message
            v-else
            text = "Bpmn-файлы отсутствуют"
            iam-context = "vb-bpmn-files"/>
    </div>
</template>

<script>
    import vbMessage from '@/components/vb-message/vb-message.vue';
    import vbBpmnFile from '@/components/vb-bpmn-file/vb-bpmn-file.vue';

    import iAMcssMix from '@/components/iAMcss/iAMcss.mixin.js';
    import { iamElement } from '@/components/iAMcss/iAMcss.directives.js';

    export default {
        name: 'vb-bpmn-files',
        mixins: [ iAMcssMix ],
        props: {
            items: {
                type: Array,
                default: () => []
            }
        },
        components: {
            'vb-bpmn-file': vbBpmnFile,
            'vb-message': vbMessage
        }
    }
</script>
