// Для того, чтобы элемент таки отрендерился в вебпаке для 'vue' настроен alias
import Vue from 'vue';
import vueApp from '@/components/vb-bpmn-modeler-app/vb-bpmn-modeler-app.vue';
import vueAppStore from '@/components/vb-bpmn-modeler-app-store';

new Vue({
    el: '#appVue',
    store: vueAppStore,
    components: {
        'vb-bpmn-modeler-app': vueApp
    }
});
