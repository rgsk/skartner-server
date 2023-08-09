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

export function randomBetween(
  start: number,
  end: number,
  excludedValues?: number[]
) {
  // Create an array of available values within the desired range
  const availableValues = [];
  if (excludedValues) {
    for (let i = start; i <= end; i++) {
      if (!excludedValues.includes(i)) {
        availableValues.push(i);
      }
    }
  } else {
    for (let i = start; i <= end; i++) {
      availableValues.push(i);
    }
  }
  if (availableValues.length) {
    // Generate a random index within the available values array
    const randomIndex = Math.floor(Math.random() * availableValues.length);

    // Retrieve the random number from the available values array
    const result = availableValues[randomIndex];

    return result;
  } else {
    return null;
  }
}

export const sleep = (millis: number) => {
  return new Promise((resolve) => {
    setTimeout(resolve, millis);
  });
};
