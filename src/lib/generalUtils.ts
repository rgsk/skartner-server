export const parseEntityDates = <T>(
  entity: T & { createdAt: Date; updatedAt: Date }
) => {
  return {
    ...entity,
    createdAt: entity.createdAt.toISOString(),
    updatedAt: entity.updatedAt.toISOString(),
  };
};
export const parseEntitiesDates = <T>(
  entities: (T & { createdAt: Date; updatedAt: Date })[]
) => {
  return entities.map(parseEntityDates);
};
