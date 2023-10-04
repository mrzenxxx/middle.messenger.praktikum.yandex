import { isPlainObject } from "./isPlainObject";

export default function set(object: Indexed | unknown, path: string, value: unknown): Indexed | unknown {
    if (!isPlainObject(object)) {
        return object;
    }
    if (typeof path !== 'string') {
        throw new Error('path must be string');
    }

    const result: Indexed = object as Indexed;

    const segments = path.split('.');
    const lastKey = segments.pop();

    let nestedObj: Indexed = result;
    for (const key of segments) {
        if (!isPlainObject(nestedObj[key])) {
            (nestedObj as Indexed)[key] = {};
        }
        nestedObj = (nestedObj as Indexed)[key] as Indexed;
    }

    if (lastKey) {
        (nestedObj as Indexed)[lastKey] = value;
    }

    return result;
}
