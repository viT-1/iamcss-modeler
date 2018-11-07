// import originalModeler from 'bpmn-js/lib/Modeler';

// Имитируем всё, что используется от Modeler в нашем компоненте:
function Modeler( options ){}

Modeler.prototype.saveSVG = function( options, done ){
    done();
};

// Modeler.prototype.importXML = original.importXML;

Modeler.prototype.importXML = function( xml, done ){
    // const original = new originalModeler();

    // // original.importXML( xml, done );
    // original.importXML( xml, function( err ){
    //     if ( err ) {
    //         console.log( err.message );
    //         throw new Error( err.message );
    //     }

    //     // Jest теряет callback, потому вызываем функцию ниже
    //     done( err );
    // });

    done();
};

// Modeler.prototype.importXML = originalModeler.prototype.importXML;

Modeler.prototype.on = function( event, priority, callback, target ){
    // у нас в компоненте callback идёт вторым параметром
    return priority();
};

Modeler.prototype.get = function( bpmnModuleName ){
    return {
        // zoomScroll plugin
        reset: function(){},
        stepZoom: function( stepValue ){},

        // minimap plugin
        open: function(){}
    };
};

console.log( '__mocks__/bpmn-js/lib/Modeler' );

module.exports = Modeler;
// Экономия 20 секунд!
