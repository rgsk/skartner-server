import { User } from '@prisma/client';
import { DecodedIdToken } from 'firebase-admin/lib/auth/token-verifier';

export namespace Middlewares {
  export enum Keys {
    Authenticate = 'Authenticate',
    ErrorData = 'ErrorData',
  }
  export type Authenticate = {
    decodedIdToken: DecodedIdToken;
    user: User | null;
  };
  export type ErrorData = {
    data: Record<string, any>;
  };
}
