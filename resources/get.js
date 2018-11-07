// Данный функционал предполагается использовать только для заглушек/mocks (вместо запроса CORS) в окружении node.js
import path from 'path';
import fs from 'fs';

const bpmnFileGetStub = {

    getByFilePath: function( filePath ){
        // Если возвращают сложный путь, то отсекаем всё, оставляя только имя файла
        const fileName = path.parse( filePath ).base;

        // Данный скрипт get.js может быть запущен jest, из исходного места (resources),
        // а может быть запущен сервисом express-bpmn-service, тогда путь может отличаться вложенностью (сейчас dist)
        return fs.readFileSync( path.resolve( './resources', fileName ), 'utf8' );
    }

};

export default bpmnFileGetStub;
