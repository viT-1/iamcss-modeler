// import PropertiesPanel from 'bpmn-js-properties-panel/lib/PropertiesPanel.js';

// // Упрощаем внешний модуль за счёт вставки заглушки
// PropertiesPanel.prototype._init = function(){};

// // API выдрано из bpmn-js-properties-panel/lib/index.js
// const panel = {
//     __init__: [ 'propertiesPanel' ],
//     propertiesPanel: [ 'type', PropertiesPanel ]
// };

// API выдрано из bpmn-js-properties-panel/lib/index.js
function PropertiesPanel( config, eventBus, modeling, propertiesProvider, command, Stack, canvas ){};

console.log( '__mocks__/bpmn-js-properties-panel' );

// module.exports = panel;
module.exports = PropertiesPanel;
