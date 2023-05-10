export const parseEntityDates = <T>(
  entity: T & { createdAt: Date; updatedAt: Date }
) => {
  return {
    ...entity,
    createdAt: entity.createdAt.toISOString(),
    updatedAt: entity.updatedAt.toISOString(),
  };
};

export type ParsedDatesEntity<T extends { createdAt: Date; updatedAt: Date }> =
  Omit<T, 'createdAt' | 'updatedAt'> & {
    createdAt: string;
    updatedAt: string;
  };

export const parseEntitiesDates = <T>(
  entities: (T & { createdAt: Date; updatedAt: Date })[]
) => {
  return entities.map(parseEntityDates);
};

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
