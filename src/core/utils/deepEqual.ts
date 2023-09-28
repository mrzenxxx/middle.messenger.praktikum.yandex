export default function deepEqual<T extends any>(obj1: T, obj2: T): boolean {
  if (!obj1 || !obj2) {
    return false;
  }

  if (typeof obj1 !== 'object' || typeof obj2 !== 'object') {
    return obj1 === obj2;
  }

  const keys1 = Object.keys(obj1) as (keyof T)[];
  const keys2 = Object.keys(obj2) as (keyof T)[];

  if (keys1.length !== keys2.length) {
    return false;
  }

  keys1.forEach((key) => {
    if (!deepEqual(obj1[key], obj2[key])) {
      return false;
    }
    return true;
  });

  return true;
}
