<style src="./vb-bpmn-file.css"></style>

<template>
    <span class="vb-bpmn-file" @click="nameClick()">{{ metaData.name }}</span>
</template>

<script>
    import { mapActions } from 'vuex';
    import appStore from '@/components/vb-bpmn-modeler-app-store/';

    export default {
        name: 'vbBpmnFile',
        props: {
            metaData: {
                type: Object, // { name: val }
                required: true,
                validator: function( data ){
                    return data.hasOwnProperty( 'name' );
                }
            }
        },
        methods: Object.assign( {},
            mapActions({
                _nameClick: 'bpmnFile/nameClick'
                // _requestBpmn: 'provider/requestXml'
            }),
            {
                // nameClick: function(){
                //     this._requestBpmn( this.metaData )
                //         .then( function( resp ){
                //             appStore.commit( 'modeler/setActiveDiagram', resp.data );
                //         });
                // }
                nameClick: function(){
                    this._nameClick( this.metaData );
                }
            }
        )
    }
</script>
