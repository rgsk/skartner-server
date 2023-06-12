type UserKeys = 'id' | 'id.' | 'user.meta' | 'user.meta.';

type ExcludeDotEnd<T> = T extends `${infer Key}.` ? never : T;

type NewUserKeys = ExcludeDotEnd<UserKeys>;
// type NewUserKeys = "id" | "user.meta"
