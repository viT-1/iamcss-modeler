<style src="./vb-bpmn-modeler.css"></style>

<template>
    <div class="content" id="js-drop-zone"
        :class="mainState">
        <div class="message intro">
            <div class="note">
                Drop BPMN diagram from your desktop
                or create a new diagram to get started.
            </div>
        </div>

        <div class="message error">
            <div class="note">
                <p>Ooops, we could not display the BPMN 2.0 diagram.</p>

                <div class="details">
                    <span>cause of the problem</span>
                    <pre>{{errMessage}}</pre>
                </div>
            </div>
        </div>

        <div v-iam-element="'canvas-root'"></div>
        <div v-iam-element="'properties-container'"></div>

        <!--Раньше эта панель была снаружи блока #js-drop-zone.content-->
        <ul class="actionPanel">
            <li>
                download
            </li>
            <li>
                <a class="in-actionPanel btnBpmn" id="js-download-bpmn" href title="download BPMN diagram">
                    BPMN diagram
                </a>
            </li>
            <li>
                <a class="in-actionPanel btnBpmn" id="js-download-svg" href title="download as SVG image">
                    SVG image
                </a>
            </li>
            <li>
                create
            </li>
            <li>
                <button class="in-actionPanel btnBpmn" @click="createNewDiagram">
                    new diagram
                </button>
            </li>
            <li>
                <button class="in-actionPanel btnBpmn" @click="fileLocalOpen">
                    from file
                </button>
            </li>
            <li>
                zoom
            </li>
            <li>
                <button class="in-actionPanel btnBpmn" @click="zoomIn">
                    +
                </button>
            </li>
            <li>
                <button class="in-actionPanel btnBpmn" @click="zoomReset">
                    ●
                </button>
            </li>
            <li>
                <button class="in-actionPanel btnBpmn" @click="zoomOut">
                    -
                </button>
            </li>
        </ul>
    </div>
</template>

<script>
    import iAMcssMix from '@/components/iAMcss/iAMcss.mixin.js';
    import * as iamCfg from '@/components/iAMcss//iAMcss.config.js';
    import { iamElement } from '@/components/iAMcss/iAMcss.directives.js';

    import $ from 'jquery';
    import BpmnModeler from 'bpmn-js/lib/Modeler';

    import propertiesPanelModule from 'bpmn-js-properties-panel';
    import propertiesProviderModule from 'bpmn-js-properties-panel/lib/provider/camunda';
    import minimapModule from 'diagram-js-minimap';

    import vbBpmnProvider from '@/components/vb-bpmn-provider/vb-bpmn-provider.js';

    export default {
        name: 'vb-bpmn-modeler',
        directives: { iamElement },
        mixins: [iAMcssMix],
        data: function(){
            return {
                listOfFiles: [],
                // По идее это не data, а библиотека методов
                modeler: null,

                mainState: null,
                errMessage: null
            };
        },
        mounted: function(){
            let self = this;

            // Инициализация копонента как-только DOM шаблона подключена к общему DOM
            self.modeler = new BpmnModeler({
            
                // для плагинов bpmn.io возможно передавать только селекторы для js-хуков
                container: '*['+ self.$options.name + iamCfg.modStrings.element + 'canvas-root]'
                
                , propertiesPanel: {
                    // для плагина properties указываем контейнер (можно вне иерархии #js-canvas работать)
                    parent: '*['+ self.$options.name + iamCfg.modStrings.element + 'properties-container]'
                }
                , additionalModules: [
                    propertiesPanelModule,
                    propertiesProviderModule,
                    
                    // этот модуль самостоятельно встраивается в блок canvas без доп.обёрток
                    // Из-за minimap bpmn-файлы долго открываются - пока убрал из конфигурации
                    // minimapModule
                ]
            });

            if (!window.FileList || !window.FileReader) {
                window.alert(
                    'Looks like you use an older browser that does not support drag and drop. ' +
                    'Try using Chrome, Firefox or the Internet Explorer > 10.');
            } else {
                self._registerFileDrop( document.querySelector( '#js-drop-zone' ) );
            }

            //Всё что было в теле $(function ()
            window.addEventListener( 'DOMContentLoaded', function(){

                function setEncoded(link, name, data) {
                    var encodedData = encodeURIComponent(data);
            
                    if (data) {
                        $(link).addClass('-active-').attr({
                            'href': 'data:application/bpmn20-xml;charset=UTF-8,' + encodedData,
                            'download': name
                        });
                    } else {
                        $(link).removeClass('-active-');
                    }
                }
            
                function debounce(fn, timeout) {
                    var timer;
                
                    return function () {
                        if (timer) {
                            clearTimeout(timer);
                        }
                
                        timer = setTimeout(fn, timeout);
                    };
                }

                $('a.in-actionPanel.btnBpmn').click( function( e ){
                    if (!$(this).is('.-active-')) {
                        // извращение из-за того что кнопки сделаны гиперссылками
                        e.stopPropagation();
                        e.preventDefault();
                    }
                });
                
                var exportArtifacts = debounce( function(){
           
                    self.modeler.saveSVG( function(err, svg){
                        setEncoded(
                            '#js-download-svg',
                            'diagram.svg',
                            err ? null : svg
                        );
                    });                

                    self.modeler.saveXML( { format: true }, function(err, xml) {
                        setEncoded(
                            '#js-download-bpmn',
                            'diagram.bpmn',
                            err ? null : xml
                        );
                    });
                }, 500);
            
                //Только если изменили диаграму имеет смысл её скачивать
                self.modeler.on('commandStack.changed', exportArtifacts);
            });

            //На старте открываем диаграму
            vbBpmnProvider.getBpmn( { url: '/api/vb-bpmn/bg.bpmn' } )
                .then( function( resp ){
                    self.openDiagram( resp.data );
                });
        },
        methods: {
            createNewDiagram: function( e ){
                let self = this;
                
                vbBpmnProvider.getBpmn()
                    .then( function( resp ){
                        self.openDiagram( resp.data );
                    });
            },
            _fileRead: function ( e ){
                e.stopPropagation();
                e.preventDefault();

                let self = this;

                let reader = new FileReader();
                reader.onload = function( e ) {
                    self.openDiagram( e.target.result );
                };

                //Drag&drop отличен от input type="file"
                let src = e.dataTransfer ? e.dataTransfer : e.target;
                reader.readAsText( src.files[0] );
            },
            _registerFileDrop: function( container ) {
                container.addEventListener( 'dragover',
                    function( e ){
                        e.stopPropagation();
                        e.preventDefault();
                
                        e.dataTransfer.dropEffect = 'copy'; // Explicitly show this is a copy.
                    },
                    false );
                
                container.addEventListener( 'drop', this._fileRead, false );
            },
            fileLocalOpen: function( e ){
                let input = document.createElement( 'input' ); 
                input.setAttribute( 'type', 'file' );

                input.addEventListener( 'change', this._fileRead, false );
                input.click();
            },
            openDiagram: function( xml ){
                let self = this;
                self.modeler.importXML( xml, function( err ){
                    if ( err ){                      
                        self.mainState = "with-error";
                        self.errMessage = err.message;
                        console.error(err);
                    } else {
                        self.mainState = "with-diagram";

                        // Из-за minimap bpmn-файлы долго открываются
                        // self.modeler.get('minimap').open();
                    }
                });
            },
            zoomIn: function( e ){
                this.modeler.get( 'zoomScroll' ).stepZoom( 1 );
            },
            zoomOut: function( e ){
                this.modeler.get( 'zoomScroll' ).stepZoom( -1 );
            },
            zoomReset: function( e ){
                this.modeler.get( 'zoomScroll' ).reset();
            }
        }
    }
</script>
