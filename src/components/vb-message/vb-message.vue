<style src="./vb-message.css"></style>

<template>
    <span>
        <!-- @todo переделать на вызов компоненты vb-ico -->
        <i v-iam-element="'ico'" vb-ico="">ico</i>
        <span v-iam-element="'text'">{{ text }}</span>
    </span>
</template>

<script>
    import iAMcssMix from '@/components/iAMcss/iAMcss.mixin.js';
    import { iamElement } from '@/components/iAMcss/iAMcss.directives.js';
    import iAMcss from '@/components/iAMcss/iAMcss.js';

    export default {
        name: 'vb-message',
        directives: { iamElement },
        mixins: [iAMcssMix],
        data: function(){
            return {
                // @todo: не самый лучший по архитектуре код: использование тайного знания о структуре данных iAMcss.mixin.js
                _iamMods: [ this.status ]
            }
        },
        props: {
            status: {
                type: String,
                default: 'info'
            },
            text: {
                type: String,
                required: true
            }
        }
    }
</script>
