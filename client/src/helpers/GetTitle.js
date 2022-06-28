const type = require('./types.js');

function getTitle(category) {
    switch(category) {
        case type.COFFEE:
            return 'Вагова кава';
        case type.DESSERTS:
            return 'Десерти';
        case type.DRINKS:
            return 'Напої';
        case type.SANDWHICH:
            return 'Сендвічі';
        case type.SALAD:
            return 'Салати';
        case type.BOUL:
            return 'Боули';
        case type.BREAKFAST:
            return 'Сніданки';
        case type.SEARCH:
            return 'Результати пошуку';
        default:
            return 'ціKavi пропозиції'
    }
}

module.exports = getTitle;