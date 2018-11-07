import * as bpmnProviderConfig from './vb-bpmn-provider.config';

import axios from 'axios';

class vbBpmnProvider {

    /**
     * @typedef {Object} getBpmnParams
     * @property {string} url путь до bpmn-файла
     */
    /**
     * @static
     * @param {getBpmnParams} [params] Если параметры не переданы, то автозаполняем url и должен выдаться bpmn по умолчанию, иначе требуем url
     * @memberof vbBpmnProvider
     * @return {string} строка xml файла bpmn
     */
    static getBpmn( params = { url: bpmnProviderConfig.urlDefaultBpmn } ){

        if ( !params.url ){
            return new Promise(
                function( resolve, reject ){
                    reject( { status: 400, statusText: 'Не передан url!' } );
                }
            );
        } else {
            // @todo: добавлять branch в качестьве get-параметра
            return axios.get( params.url );
        }
    }

    /**
     * @typedef {Object} getBpmnListParams
     * @property {string} [branch] наименование ветки репозитория (по умолчанию master)
     * @property {string} [url] url к домену вовне, где хостится наш сервис выдающий bpmn-файлы (по умолчанию localhost)
     */
    /**
     * @static
     * @param {getBpmnListParams} [params] Если параметры не переданы, то подставляем значения по умолчанию
     * @memberof vbBpmnProvider
     * @return {Object} JSON
     */
    static getBpmnList( params = { branch: bpmnProviderConfig.defaultBranch } ){
        // @todo: за базовым url к сервису перед относительным url добавлять branch, который отсекать в express-bpmn-service
        return axios.get( bpmnProviderConfig.urlBpmnList );
    }
}

export default vbBpmnProvider;
