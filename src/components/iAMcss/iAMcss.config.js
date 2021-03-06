// Строки обёртывающие значения, чтобы проверять contains и не попадать на частичное совпадение по маске
// Например без этого разделителя поиск 'acitve' будет срабатывать и на 'inactive'.
export const modStrings = {
    left: '-',
    right: '-',
    ancestor: '..', //Это значение нельзя устанавливать в '', иначе невозможно будет различить в сгенерированной строке ancestor и scheme
    scheme: '',
    element: '__'
};

// Модификатор БЭМ, чтобы отделить привязку css-стилей по блочной модели (и всему, что не касается skin)
// export const skeletonModificator = 'base';
export const errStrings = {
    REQUIRE_NAME: 'Необходимо передать наименование элемента, при помощи {name:"имя"} или просто "имя"',
    REQUIRE_SCHEME: 'Необходимо передать параметр scheme',
    SAME_PREFIXES: 'Строку невозможно распознать однозначно, так как префиксы ancestor и scheme совпадают!'
};

//Тема для оформления по умолчанию - общая для всех компонент моделера
export const defaultScheme = 'bpmnio';
