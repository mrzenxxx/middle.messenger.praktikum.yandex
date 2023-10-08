import { isPlainObject } from './isPlainObject';

export default function merge(lhs: Indexed, rhs: Indexed): Indexed {
  const merged: Indexed = {};

  for (const key in lhs) {
    if (isPlainObject(lhs[key]) && isPlainObject(rhs[key])) {
      merged[key] = merge(lhs[key] as Indexed, rhs[key] as Indexed);
    } else {
      merged[key] = lhs[key];
    }
  }

  for (const key in rhs) {
    if (!merged.hasOwnProperty(key)) {
      merged[key] = rhs[key];
    }
  }

  return merged;
}
