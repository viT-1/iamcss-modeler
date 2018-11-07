import express  from 'express';
import vbBpmnService from '../vb-bpmn-service/vb-bpmn-service.js';

//IIFE
(function(){

    function responseFromBpmnService( params ){
        let { promise, res } = params;

        promise
            .then( function( resp ){
                if ( Object.keys( resp.headers ).length ){
                    res.set( resp.headers );
                }

                res.send(
                    resp.data
                );
            })
            .catch( function( err ){
                res.send( err );
            }); 
    }

    let app = express();

    // @todo: Переделать на массив routes - functions
    // Каждому типовому пути своя функция сервиса - здесь выдача файлов и ошибки, если файл не найден
    app.get( /(.*).bpmn$/, function( req, res ){
        responseFromBpmnService({
            promise: vbBpmnService.getBpmn( { url: req.path } ),
            res: res
        });
    });

    app.get( /^\/list\/$/, function( req, res ){
        responseFromBpmnService({
            // @todo: распознать ветку репозитория (по умолчанию master)
            promise: vbBpmnService.getBpmnList(),
            res: res
        });
    });

    app.listen( 1337, function(){
        console.log( 'Express server listening on port 1337' );
    });

}());
