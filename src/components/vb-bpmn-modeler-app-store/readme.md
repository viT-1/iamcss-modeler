Размещаем vuex-модули соотносящиеся с компонентами в каталоге общего store, а не в каталогах соответствующих визуальных vue-компонент,
потому что состояние и actions могут быть вызваны в родителях данных компонент (например vb-bpmn-files данные мы поставляем снаружи),
а также потому что эти store-модули могут быть необходимы для нескольких компонент, а не для одного конкретного.