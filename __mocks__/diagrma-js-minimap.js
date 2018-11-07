// import Minimap from 'diagram-js-minimap/lib/Minimap.js';

// // Упрощаем внешний модуль за счёт вставки заглушки
// Minimap.prototype._init = function(){};

// // API выдрано из diagram-js-minimap/lib/index.js
// const minimap = {
//     __init__: [ 'minimap' ],
//     minimap: [ 'type', Minimap ]
// };

// API выдрано из diagram-js-minimap/lib/index.js
function Minimap( config, injector, eventBus, canvas, elementRegistry ){};

console.log( '__mocks__/diagram-js-minimap' );

// module.exports = minimap;
module.exports = Minimap;
