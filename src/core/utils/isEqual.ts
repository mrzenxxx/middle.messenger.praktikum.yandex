import { isPlainObject } from "./isPlainObject";

function isEqual<T extends StringIndexed>(obj1: T, obj2: T): boolean {
  if (!isPlainObject(obj1) || !isPlainObject(obj2)) {
    return obj1 === obj2;
  }

  const keys1 = Object.keys(obj1) as (keyof T)[];
  const keys2 = Object.keys(obj2) as (keyof T)[];

  if (keys1.length !== keys2.length) {
    return false;
  }

  for (let key of keys1) {
    if (!isEqual(obj1[key], obj2[key])) {
      return false;
    }
  }

  return true;
}

export default isEqual;
