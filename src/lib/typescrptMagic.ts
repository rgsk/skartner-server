export type DropFirst<T extends unknown[]> = T extends [any, ...infer U]
  ? U
  : never;

export function tuple<T extends any[]>(...args: T): T {
  return args;
}
