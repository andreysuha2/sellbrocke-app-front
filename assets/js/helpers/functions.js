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

// camelize
export function camelize(str) {
    if(typeof str !== "string") throw new Error("toCamelCase error: argument str must be typeof string");
    return str.replace(/^([A-Z])|[\s-_]+(\w)/g, function(match, p1, p2) {
        if(p2) return p2.toUpperCase();
        return p1.toLowerCase();
    });
}

export function decamelize(str, separator = "_") {
    if(typeof str !== "string") throw new Error("decamelize error: argument str must be typeof string");
    return str
        .replace(/([a-z\d])([A-Z])/g, `$1${separator}$2`)
        .replace(/([A-Z]+)([A-Z][a-z\d]+)/g, `$1${separator}$2`)
        .toLowerCase();
}
