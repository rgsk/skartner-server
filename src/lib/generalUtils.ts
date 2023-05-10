export function deriveEntityMapFromArray<T>(
  array: T[],
  mapFn: (item: T) => any
) {
  const map = new Map<any, any>();
  array.forEach((item) => {
    map.set(mapFn(item), item);
  });
  return map;
}
export function deriveEntityArrayMapFromArray<T>(
  array: T[],
  mapFn: (item: T) => any
) {
  const map = new Map<any, any>();
  array.forEach((item) => {
    const key = mapFn(item);
    map.set(key, [...(map.get(key) ?? []), item]);
  });
  return map;
}
