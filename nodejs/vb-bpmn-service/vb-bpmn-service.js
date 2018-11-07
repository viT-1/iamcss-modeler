import bpmnFileGetStub from '~/resources/get';

class vbBpmnService {
// const vbBpmnService = {
    // Должен быть? тот же api, что и у заменителя в каталоге resources/get
    
    // params.url - путь к bpmn-файлу
    static getBpmn( params ){
        let response = {
            status: 200,
            headers: {}
        };
        response.headers[ 'Content-Type' ] = 'text/xml';

        if ( !params.url ){
            response.status = 400;
            // throw new Error( 'Отсутствует обязательный параметр: url' );
        } else {
            try{
                // Пока ставим заглушку - используем bpmn с файловой системы нашего же сервера.
                // Вместо этой пляски с бубном, в реальном коде должен отрабатывать провайдер через axios (CORS с авторизацией).
                response.data = bpmnFileGetStub.getByFilePath( params.url );

                //Здесь переписываем с bpmnFileGetStub на axios
                // Проблема с авторизацией?
                // axios.get( 'https://code.hub.orient.root.biz/projects/TOOLS/repos/darwin/raw/resources/default.bpmn' )
                //     .then( function( resp ){
                //         res.send( resp.data );
                //     })
                //     .catch( function( err ){
                //         res.send( err );
                //     });
            } catch( err ){
                response.status = 404;
                response.statusText = err;
            }
        }

        return new Promise(
            function( resolve, reject ){
                if ( response.status >= 200 && response.status < 300 )
                    resolve( response );
                else
                    reject( response );
            }
        );
    }

    /**
     * @typedef {Object} getBpmnListParams
     * @property {string} brunch наименование ветки репозитория, url не нужен, поскольку определяется хостом
     */
    /**
     * @static
     * @param {getBpmnListParams} [params] Если параметры не переданы, то подставляем ветку по умолчанию (master)
     * @memberof vbBpmnService
     * @return {Object} JSON
     */
    static getBpmnList( params = { brunch: 'master' } ){

        console.log( 'В сервисе getBpmnList' );

        return new Promise(
            function( resolve ){
                resolve({
                    status: 200,
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    data: [
                        { name: 'bg.bpmn' }
                        , { name: 'default.bpmn' }
                    ]
                });
            }
        );
    }
}

export default vbBpmnService;
