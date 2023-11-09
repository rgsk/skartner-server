import { GraphQLError, GraphQLErrorOptions } from 'graphql';

export class AuthorizationError extends GraphQLError {
  constructor(message: string, options?: GraphQLErrorOptions) {
    const prefix = 'Authorization Error: ';
    super(prefix + message, options);
    // You can customize the constructor logic if needed
  }
}
