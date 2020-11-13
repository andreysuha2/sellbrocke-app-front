//debounce
export function debounce(handler, ms, immediate = false) {
    let timeout;
    return function H() {
        let __this = this, args = arguments, callNow = immediate && !timeout;
        function later() {
            timeout = null;
            if(!immediate) handler.apply(__this, args);
        }
        clearTimeout(timeout);
        timeout = setTimeout(later, ms);
        if(callNow) handler.apply(__this, args);
    };
}

export function isObject(data) {
    return !Array.isArray(data) && data !== null && typeof data === "object";
}

// camelize
export function camelize(str) {
    if(typeof str !== "string") throw new Error("toCamelCase error: argument str must be typeof string");
    return str.replace(/^([A-Z])|[\s-_]+(\w)/g, function(match, p1, p2) {
        if(p2) return p2.toUpperCase();
        return p1.toLowerCase();
    });
}

export function camelizeObject(obj) {
    return Object.fromEntries(Object.entries(obj).map((item) => {
        const prop = camelize(item[0]),
            value = isObject(item[1]) ? camelizeObject(item[1]) : item[1];
        return [ prop, value ];
    }));
}

//decamelize
export function decamelize(str, separator = "_") {
    if(typeof str !== "string") throw new Error("decamelize error: argument str must be typeof string");
    return str
        .replace(/([a-z\d])([A-Z])/g, `$1${separator}$2`)
        .replace(/([A-Z]+)([A-Z][a-z\d]+)/g, `$1${separator}$2`)
        .toLowerCase();
}

export function arrayChunk(arr, size) {
    const temp = [];
    for(let i = 0; i < arr.length; i += size) temp.push(arr.slice(i, i + size));
    return temp;
}

/**
 *  @desc резолвит добавление/удаление item из multi select используется при обновлени уже извесного списка
 *  @param {array} newItems - изменненный список [id]
 *  @param {array} existingItems - актуальный список [id]
 *  @returns {Object} diff - Объект с результатом
 *  @returns {array|null} diff.attached - массив добавленых или null если ничего не добавлено
 *  @returns {array|null} diff.detached - массив удаленных или null если ничего не удалено
 */
export function listDiff(newItems, existingItems) {
    // функция ищущая остутсвующие елементы из acc в checkIn
    const resolver = (acc, checkIn) => acc.reduce((list, item) => {
            if(!checkIn.includes(item)) list.push(item);
            return list;
        }, []),
        // находим елементы присутвующие в newItems и отсутсвующие в existingItems получаем добавленые
        attached = resolver(newItems, existingItems),
        // находим елементы присутвующие в existingItems и отсутствующие в newItems получаем удаленные
        detached = resolver(existingItems, newItems);
    return {
        attached: attached.length ? attached : null,
        detached: detached.length ? detached : null
    };
}
