import { isPlainObject } from './isPlainObject';

export default function merge(lhs: Indexed, rhs: Indexed): Indexed {
  const merged: Indexed = {};

  Object.keys(lhs).forEach((key) => {
    if (isPlainObject(lhs[key]) && isPlainObject(rhs[key])) {
      merged[key] = merge(lhs[key] as Indexed, rhs[key] as Indexed);
    } else {
      merged[key] = lhs[key];
    }
  });

  Object.keys(rhs).forEach((key) => {
    if (!merged.hasOwnProperty.call(merged, key)) {
      merged[key] = rhs[key];
    }
  });

  return merged;
}
