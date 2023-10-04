type Indexed<T = any> = {
    [k in (string | symbol)]: T;
};

function cloneDeep<T extends Indexed>(obj: T) {
    return (function _cloneDeep(item: T): T | Date | Set<unknown> | Map<unknown, unknown> | object | T[] {

        if (item === null || typeof item !== "object") {
            return item;
        }

        if (item instanceof Date) {
            return new Date((item as Date).valueOf());
        }

        if (item instanceof Array) {
            let copy: ReturnType<typeof _cloneDeep>[] = [];

            item.forEach((_, i) => (copy[i] = _cloneDeep(item[i])));

            return copy;
        }

        if (item instanceof Set) {
            let copy = new Set();

            item.forEach(v => copy.add(_cloneDeep(v)));

            return copy;
        }

        if (item instanceof Map) {
            let copy = new Map();

            item.forEach((v, k) => copy.set(k, _cloneDeep(v)));

            return copy;
        }

        if (item instanceof Object) {
            let copy: Indexed = {};

            Object.getOwnPropertySymbols(item).forEach(s => (copy[s.toString()] = _cloneDeep(item[s.toString()])));

            Object.keys(item).forEach(k => (copy[k] = _cloneDeep(item[k])));

            return copy;
        }

        throw new Error(`Unable to copy object: ${item}`);
    })(obj);
}
