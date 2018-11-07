const jestConfig = {
    browser: true,
    // Каталоги создаваемые node-модулем должны храниться в node_modules, а не засорять корневой каталог
    cacheDirectory: "./node_modules/.cache/jest",

    // Смотрим на процент покрытия тестами
    collectCoverage: true,

    // Ограничиваемся тестами на модули для реиспользования.
    collectCoverageFrom: [
        'src/**/*.{js,vue}'
        , '!src/**/*.config.js'
        // Корневой index.js всего лишь инициализация компонент для браузера - не реиспользуется
        , '!src/*.js'
    ],

    // Чтобы расписывал все тесты по шагам (иначе не показывает шаги, если тестов больше чем 1)
    verbose: true,

    // Resolve ссылок на import в тестируемых модулях (подключённых через import в файл теста)
    moduleNameMapper: {
        "~/(.*)$": "<rootDir>/$1",
        "@/(.*)$": "<rootDir>/src/$1"
    },

    // Vue-файлы парсим с помощью vue-jest, остальные (js, json) Бабелем
    transform: {
        ".*?\\.vue$": "vue-jest",
        ".*": "babel-jest"
    },

    // Чтобы избежать ошибки с интерпретацией import/export сторонних модулей, подключаемых в тестируемых компонентах
    transformIgnorePatterns: [
        "./!node_modules\\/(vue|bpmn-js-properties-panel|diagram-js)/"
    ],

    // Мэппинг по структуре проекта - какие тесты запускать из под jest
    testRegex: "./src/(.*?)/(test|spec)\\.(.*?)\\.js$",

    // Временно игнорируем тест в тестовой компоненте, чтобы сократить время прохождения всех тестов

    // Временно игнорируем тест в компоненте vb-bpmn-modeler (без components залочатся все тесты проекта), чтобы исключить
    // параллельный запуск тестов и отсутствие логов: https://github.com/facebook/jest/issues/3853
    testPathIgnorePatterns: [
        'vb-test-component'
        // , 'components/vb-bpmn-modeler'
        // , 'nodejs/vb-bpmn-service'

        // по этой маске срабатывает и vb-bpmn-files
        // , 'components/vb-bpmn-file'
    ]
};

module.exports = jestConfig;
