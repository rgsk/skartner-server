// collapse the info property of objects to see easily

const sampleQueryInfo = {
  query: `
    query {
      greWords {
        createdAt
        gptPrompts {
          createdAt
          input
          greWord {
            gptPrompts {
              id
            }
          }
        }
        id
        spelling
        updatedAt
      }
    }
  `,
  info: {
    fieldName: 'greWords',
    fieldNodes: [
      {
        kind: 'Field',
        name: { kind: 'Name', value: 'greWords', loc: { start: 10, end: 18 } },
        arguments: [],
        directives: [],
        selectionSet: {
          kind: 'SelectionSet',
          selections: [
            {
              kind: 'Field',
              name: {
                kind: 'Name',
                value: 'createdAt',
                loc: { start: 25, end: 34 },
              },
              arguments: [],
              directives: [],
              loc: { start: 25, end: 34 },
            },
            {
              kind: 'Field',
              name: {
                kind: 'Name',
                value: 'gptPrompts',
                loc: { start: 39, end: 49 },
              },
              arguments: [],
              directives: [],
              selectionSet: {
                kind: 'SelectionSet',
                selections: [
                  {
                    kind: 'Field',
                    name: {
                      kind: 'Name',
                      value: 'createdAt',
                      loc: { start: 58, end: 67 },
                    },
                    arguments: [],
                    directives: [],
                    loc: { start: 58, end: 67 },
                  },
                  {
                    kind: 'Field',
                    name: {
                      kind: 'Name',
                      value: 'input',
                      loc: { start: 74, end: 79 },
                    },
                    arguments: [],
                    directives: [],
                    loc: { start: 74, end: 79 },
                  },
                  {
                    kind: 'Field',
                    name: {
                      kind: 'Name',
                      value: 'greWord',
                      loc: { start: 86, end: 93 },
                    },
                    arguments: [],
                    directives: [],
                    selectionSet: {
                      kind: 'SelectionSet',
                      selections: [
                        {
                          kind: 'Field',
                          name: {
                            kind: 'Name',
                            value: 'gptPrompts',
                            loc: { start: 104, end: 114 },
                          },
                          arguments: [],
                          directives: [],
                          selectionSet: {
                            kind: 'SelectionSet',
                            selections: [
                              {
                                kind: 'Field',
                                name: {
                                  kind: 'Name',
                                  value: 'id',
                                  loc: { start: 127, end: 129 },
                                },
                                arguments: [],
                                directives: [],
                                loc: { start: 127, end: 129 },
                              },
                            ],
                            loc: { start: 115, end: 139 },
                          },
                          loc: { start: 104, end: 139 },
                        },
                      ],
                      loc: { start: 94, end: 147 },
                    },
                    loc: { start: 86, end: 147 },
                  },
                ],
                loc: { start: 50, end: 153 },
              },
              loc: { start: 39, end: 153 },
            },
            {
              kind: 'Field',
              name: {
                kind: 'Name',
                value: 'id',
                loc: { start: 158, end: 160 },
              },
              arguments: [],
              directives: [],
              loc: { start: 158, end: 160 },
            },
            {
              kind: 'Field',
              name: {
                kind: 'Name',
                value: 'spelling',
                loc: { start: 165, end: 173 },
              },
              arguments: [],
              directives: [],
              loc: { start: 165, end: 173 },
            },
            {
              kind: 'Field',
              name: {
                kind: 'Name',
                value: 'updatedAt',
                loc: { start: 178, end: 187 },
              },
              arguments: [],
              directives: [],
              loc: { start: 178, end: 187 },
            },
          ],
          loc: { start: 19, end: 191 },
        },
        loc: { start: 10, end: 191 },
      },
    ],
    returnType: '[GreWord!]!',
    parentType: 'Query',
    path: { key: 'greWords', typename: 'Query' },
    schema: {
      __validationErrors: [],
      extensions: {
        nexus: {
          config: {
            types: {
              GeneralQuery: {
                name: 'Query',
                config: { type: 'Query', name: 'Query' },
              },
              GptPromptObject: {
                name: 'GptPrompt',
                config: { name: 'GptPrompt' },
              },
              GptPromptQuery: {
                name: 'Query',
                config: { type: 'Query', name: 'Query' },
              },
              GptPromptMutation: {
                name: 'Mutation',
                config: { type: 'Mutation', name: 'Mutation' },
              },
              GreWordStatusEnum: {
                name: 'GreWordStatus',
                config: {
                  name: 'GreWordStatus',
                  members: [
                    'STARTED_LEARNING',
                    'STILL_LEARNING',
                    'ALMOST_LEARNT',
                    'FINISHED_LEARNING',
                    'MEMORY_MODE',
                    'MASTERED',
                  ],
                },
              },
              GreWordObject: { name: 'GreWord', config: { name: 'GreWord' } },
              EnumGreWordStatusFilter: {
                name: 'EnumGreWordStatusFilter',
                config: { name: 'EnumGreWordStatusFilter' },
              },
              GreWordTagListRelationFilter: {
                name: 'GreWordTagListRelationFilter',
                config: { name: 'GreWordTagListRelationFilter' },
              },
              GreWordQuery: {
                name: 'Query',
                config: { type: 'Query', name: 'Query' },
              },
              GreWordTagWhereUniqueInput: {
                name: 'GreWordTagWhereUniqueInput',
                config: { name: 'GreWordTagWhereUniqueInput' },
              },
              GreWordMutation: {
                name: 'Mutation',
                config: { type: 'Mutation', name: 'Mutation' },
              },
              GreWordSearchPromptInputObject: {
                name: 'GreWordSearchPromptInput',
                config: { name: 'GreWordSearchPromptInput' },
              },
              GreWordSearchPromptInputQuery: {
                name: 'Query',
                config: { type: 'Query', name: 'Query' },
              },
              GreWordSearchPromptInputMutation: {
                name: 'Mutation',
                config: { type: 'Mutation', name: 'Mutation' },
              },
              GreWordTagObject: {
                name: 'GreWordTag',
                config: { name: 'GreWordTag' },
              },
              GreWordTagWhereInput: {
                name: 'GreWordTagWhereInput',
                config: { name: 'GreWordTagWhereInput' },
              },
              GreWordTagQuery: {
                name: 'Query',
                config: { type: 'Query', name: 'Query' },
              },
              GreWordTagMutation: {
                name: 'Mutation',
                config: { type: 'Mutation', name: 'Mutation' },
              },
              PostObject: { name: 'Post', config: { name: 'Post' } },
              PostQuery: {
                name: 'Query',
                config: { type: 'Query', name: 'Query' },
              },
              PostMutation: {
                name: 'Mutation',
                config: { type: 'Mutation', name: 'Mutation' },
              },
              StringFilter: {
                name: 'StringFilter',
                config: { name: 'StringFilter' },
              },
              Json: {
                name: 'Json',
                config: {
                  name: 'Json',
                  description:
                    'The `Json` scalar type represents JSON objects.',
                },
              },
              UserMetaParsedJsonValue: {
                name: 'UserMetaParsedJsonValue',
                config: { name: 'UserMetaParsedJsonValue' },
              },
              UserMetaParsedJsonValueInput: {
                name: 'UserMetaParsedJsonValueInput',
                config: { name: 'UserMetaParsedJsonValueInput' },
              },
              UserObject: { name: 'User', config: { name: 'User' } },
              UserQuery: {
                name: 'Query',
                config: { type: 'Query', name: 'Query' },
              },
              UserMutation: {
                name: 'Mutation',
                config: { type: 'Mutation', name: 'Mutation' },
              },
            },
            outputs: {
              typegen:
                '/Users/rahulgupta/Desktop/skartner/skartner-server/nexus-typegen.ts',
              schema:
                '/Users/rahulgupta/Desktop/skartner/skartner-server/schema.graphql',
            },
            contextType: {
              module:
                '/Users/rahulgupta/Desktop/skartner/skartner-server/src/context.ts',
              export: 'Context',
            },
            features: {
              abstractTypeRuntimeChecks: true,
              abstractTypeStrategies: {
                isTypeOf: false,
                resolveType: true,
                __typename: false,
              },
            },
            plugins: [],
            nonNullDefaults: { input: false, output: false },
            dynamicFields: {
              dynamicInputFields: {},
              dynamicOutputFields: {},
              dynamicOutputProperties: {},
            },
            sourceTypings: {},
          },
        },
      },
      extensionASTNodes: [],
      _queryType: 'Query',
      _mutationType: 'Mutation',
      _directives: ['@include', '@skip', '@deprecated', '@specifiedBy'],
      _typeMap: {
        GptPrompt: 'GptPrompt',
        String: 'String',
        GreWordStatus: 'GreWordStatus',
        GreWord: 'GreWord',
        EnumGreWordStatusFilter: 'EnumGreWordStatusFilter',
        GreWordTagListRelationFilter: 'GreWordTagListRelationFilter',
        GreWordTagWhereUniqueInput: 'GreWordTagWhereUniqueInput',
        GreWordSearchPromptInput: 'GreWordSearchPromptInput',
        GreWordTag: 'GreWordTag',
        GreWordTagWhereInput: 'GreWordTagWhereInput',
        Post: 'Post',
        Boolean: 'Boolean',
        StringFilter: 'StringFilter',
        Json: 'Json',
        UserMetaParsedJsonValue: 'UserMetaParsedJsonValue',
        UserMetaParsedJsonValueInput: 'UserMetaParsedJsonValueInput',
        User: 'User',
        helloWorld: 'helloWorld',
        GreConfiguration: 'GreConfiguration',
        GreWordWhereInput: 'GreWordWhereInput',
        GreWordSearchPromptInputWhereInput:
          'GreWordSearchPromptInputWhereInput',
        UserWhereInput: 'UserWhereInput',
        Query: 'Query',
        Int: 'Int',
        Mutation: 'Mutation',
        __Schema: '__Schema',
        __Type: '__Type',
        __TypeKind: '__TypeKind',
        __Field: '__Field',
        __InputValue: '__InputValue',
        __EnumValue: '__EnumValue',
        __Directive: '__Directive',
        __DirectiveLocation: '__DirectiveLocation',
      },
      _subTypeMap: {},
      _implementationsMap: {},
    },
    fragments: {},
    operation: {
      kind: 'OperationDefinition',
      operation: 'query',
      variableDefinitions: [],
      directives: [],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: {
              kind: 'Name',
              value: 'greWords',
              loc: { start: 10, end: 18 },
            },
            arguments: [],
            directives: [],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                {
                  kind: 'Field',
                  name: {
                    kind: 'Name',
                    value: 'createdAt',
                    loc: { start: 25, end: 34 },
                  },
                  arguments: [],
                  directives: [],
                  loc: { start: 25, end: 34 },
                },
                {
                  kind: 'Field',
                  name: {
                    kind: 'Name',
                    value: 'gptPrompts',
                    loc: { start: 39, end: 49 },
                  },
                  arguments: [],
                  directives: [],
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      {
                        kind: 'Field',
                        name: {
                          kind: 'Name',
                          value: 'createdAt',
                          loc: { start: 58, end: 67 },
                        },
                        arguments: [],
                        directives: [],
                        loc: { start: 58, end: 67 },
                      },
                      {
                        kind: 'Field',
                        name: {
                          kind: 'Name',
                          value: 'input',
                          loc: { start: 74, end: 79 },
                        },
                        arguments: [],
                        directives: [],
                        loc: { start: 74, end: 79 },
                      },
                      {
                        kind: 'Field',
                        name: {
                          kind: 'Name',
                          value: 'greWord',
                          loc: { start: 86, end: 93 },
                        },
                        arguments: [],
                        directives: [],
                        selectionSet: {
                          kind: 'SelectionSet',
                          selections: [
                            {
                              kind: 'Field',
                              name: {
                                kind: 'Name',
                                value: 'gptPrompts',
                                loc: { start: 104, end: 114 },
                              },
                              arguments: [],
                              directives: [],
                              selectionSet: {
                                kind: 'SelectionSet',
                                selections: [
                                  {
                                    kind: 'Field',
                                    name: {
                                      kind: 'Name',
                                      value: 'id',
                                      loc: { start: 127, end: 129 },
                                    },
                                    arguments: [],
                                    directives: [],
                                    loc: { start: 127, end: 129 },
                                  },
                                ],
                                loc: { start: 115, end: 139 },
                              },
                              loc: { start: 104, end: 139 },
                            },
                          ],
                          loc: { start: 94, end: 147 },
                        },
                        loc: { start: 86, end: 147 },
                      },
                    ],
                    loc: { start: 50, end: 153 },
                  },
                  loc: { start: 39, end: 153 },
                },
                {
                  kind: 'Field',
                  name: {
                    kind: 'Name',
                    value: 'id',
                    loc: { start: 158, end: 160 },
                  },
                  arguments: [],
                  directives: [],
                  loc: { start: 158, end: 160 },
                },
                {
                  kind: 'Field',
                  name: {
                    kind: 'Name',
                    value: 'spelling',
                    loc: { start: 165, end: 173 },
                  },
                  arguments: [],
                  directives: [],
                  loc: { start: 165, end: 173 },
                },
                {
                  kind: 'Field',
                  name: {
                    kind: 'Name',
                    value: 'updatedAt',
                    loc: { start: 178, end: 187 },
                  },
                  arguments: [],
                  directives: [],
                  loc: { start: 178, end: 187 },
                },
              ],
              loc: { start: 19, end: 191 },
            },
            loc: { start: 10, end: 191 },
          },
        ],
        loc: { start: 6, end: 196 },
      },
      loc: { start: 0, end: 196 },
    },
    variableValues: {},
    cacheControl: { cacheHint: {} },
  },
};

export const fragmentTestingSamples = {
  greWordsId: {
    withoutFragment: {
      query: `
      query {
        greWords {
          id
        }
      }`,
      info: {
        fieldName: 'greWords',
        fieldNodes: [
          {
            kind: 'Field',
            name: {
              kind: 'Name',
              value: 'greWords',
              loc: { start: 11, end: 19 },
            },
            arguments: [],
            directives: [],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                {
                  kind: 'Field',
                  name: {
                    kind: 'Name',
                    value: 'id',
                    loc: { start: 26, end: 28 },
                  },
                  arguments: [],
                  directives: [],
                  loc: { start: 26, end: 28 },
                },
              ],
              loc: { start: 20, end: 32 },
            },
            loc: { start: 11, end: 32 },
          },
        ],
        returnType: '[GreWord!]!',
        parentType: 'Query',
        path: { key: 'greWords', typename: 'Query' },
        schema: {
          __validationErrors: [],
          extensions: {
            nexus: {
              config: {
                types: {
                  GeneralQuery: {
                    name: 'Query',
                    config: { type: 'Query', name: 'Query' },
                  },
                  GptPromptObject: {
                    name: 'GptPrompt',
                    config: { name: 'GptPrompt' },
                  },
                  GptPromptQuery: {
                    name: 'Query',
                    config: { type: 'Query', name: 'Query' },
                  },
                  GptPromptMutation: {
                    name: 'Mutation',
                    config: { type: 'Mutation', name: 'Mutation' },
                  },
                  GreWordStatusEnum: {
                    name: 'GreWordStatus',
                    config: {
                      name: 'GreWordStatus',
                      members: [
                        'STARTED_LEARNING',
                        'STILL_LEARNING',
                        'ALMOST_LEARNT',
                        'FINISHED_LEARNING',
                        'MEMORY_MODE',
                        'MASTERED',
                      ],
                    },
                  },
                  GreWordObject: {
                    name: 'GreWord',
                    config: { name: 'GreWord' },
                  },
                  EnumGreWordStatusFilter: {
                    name: 'EnumGreWordStatusFilter',
                    config: { name: 'EnumGreWordStatusFilter' },
                  },
                  GreWordTagListRelationFilter: {
                    name: 'GreWordTagListRelationFilter',
                    config: { name: 'GreWordTagListRelationFilter' },
                  },
                  GreWordQuery: {
                    name: 'Query',
                    config: { type: 'Query', name: 'Query' },
                  },
                  GreWordTagWhereUniqueInput: {
                    name: 'GreWordTagWhereUniqueInput',
                    config: { name: 'GreWordTagWhereUniqueInput' },
                  },
                  GreWordMutation: {
                    name: 'Mutation',
                    config: { type: 'Mutation', name: 'Mutation' },
                  },
                  GreWordSearchPromptInputObject: {
                    name: 'GreWordSearchPromptInput',
                    config: { name: 'GreWordSearchPromptInput' },
                  },
                  GreWordSearchPromptInputQuery: {
                    name: 'Query',
                    config: { type: 'Query', name: 'Query' },
                  },
                  GreWordSearchPromptInputMutation: {
                    name: 'Mutation',
                    config: { type: 'Mutation', name: 'Mutation' },
                  },
                  GreWordTagObject: {
                    name: 'GreWordTag',
                    config: { name: 'GreWordTag' },
                  },
                  GreWordTagWhereInput: {
                    name: 'GreWordTagWhereInput',
                    config: { name: 'GreWordTagWhereInput' },
                  },
                  GreWordTagQuery: {
                    name: 'Query',
                    config: { type: 'Query', name: 'Query' },
                  },
                  GreWordTagMutation: {
                    name: 'Mutation',
                    config: { type: 'Mutation', name: 'Mutation' },
                  },
                  PostObject: { name: 'Post', config: { name: 'Post' } },
                  PostQuery: {
                    name: 'Query',
                    config: { type: 'Query', name: 'Query' },
                  },
                  PostMutation: {
                    name: 'Mutation',
                    config: { type: 'Mutation', name: 'Mutation' },
                  },
                  StringFilter: {
                    name: 'StringFilter',
                    config: { name: 'StringFilter' },
                  },
                  Json: {
                    name: 'Json',
                    config: {
                      name: 'Json',
                      description:
                        'The `Json` scalar type represents JSON objects.',
                    },
                  },
                  UserMetaParsedJsonValue: {
                    name: 'UserMetaParsedJsonValue',
                    config: { name: 'UserMetaParsedJsonValue' },
                  },
                  UserMetaParsedJsonValueInput: {
                    name: 'UserMetaParsedJsonValueInput',
                    config: { name: 'UserMetaParsedJsonValueInput' },
                  },
                  UserObject: { name: 'User', config: { name: 'User' } },
                  UserQuery: {
                    name: 'Query',
                    config: { type: 'Query', name: 'Query' },
                  },
                  UserMutation: {
                    name: 'Mutation',
                    config: { type: 'Mutation', name: 'Mutation' },
                  },
                },
                outputs: {
                  typegen:
                    '/Users/rahulgupta/Desktop/skartner/skartner-server/nexus-typegen.ts',
                  schema:
                    '/Users/rahulgupta/Desktop/skartner/skartner-server/schema.graphql',
                },
                contextType: {
                  module:
                    '/Users/rahulgupta/Desktop/skartner/skartner-server/src/context.ts',
                  export: 'Context',
                },
                features: {
                  abstractTypeRuntimeChecks: true,
                  abstractTypeStrategies: {
                    isTypeOf: false,
                    resolveType: true,
                    __typename: false,
                  },
                },
                plugins: [],
                nonNullDefaults: { input: false, output: false },
                dynamicFields: {
                  dynamicInputFields: {},
                  dynamicOutputFields: {},
                  dynamicOutputProperties: {},
                },
                sourceTypings: {},
              },
            },
          },
          extensionASTNodes: [],
          _queryType: 'Query',
          _mutationType: 'Mutation',
          _directives: ['@include', '@skip', '@deprecated', '@specifiedBy'],
          _typeMap: {
            GptPrompt: 'GptPrompt',
            String: 'String',
            GreWordStatus: 'GreWordStatus',
            GreWord: 'GreWord',
            EnumGreWordStatusFilter: 'EnumGreWordStatusFilter',
            GreWordTagListRelationFilter: 'GreWordTagListRelationFilter',
            GreWordTagWhereUniqueInput: 'GreWordTagWhereUniqueInput',
            GreWordSearchPromptInput: 'GreWordSearchPromptInput',
            GreWordTag: 'GreWordTag',
            GreWordTagWhereInput: 'GreWordTagWhereInput',
            Post: 'Post',
            Boolean: 'Boolean',
            StringFilter: 'StringFilter',
            Json: 'Json',
            UserMetaParsedJsonValue: 'UserMetaParsedJsonValue',
            UserMetaParsedJsonValueInput: 'UserMetaParsedJsonValueInput',
            User: 'User',
            helloWorld: 'helloWorld',
            GreConfiguration: 'GreConfiguration',
            GreWordWhereInput: 'GreWordWhereInput',
            GreWordSearchPromptInputWhereInput:
              'GreWordSearchPromptInputWhereInput',
            UserWhereInput: 'UserWhereInput',
            Query: 'Query',
            Int: 'Int',
            Mutation: 'Mutation',
            __Schema: '__Schema',
            __Type: '__Type',
            __TypeKind: '__TypeKind',
            __Field: '__Field',
            __InputValue: '__InputValue',
            __EnumValue: '__EnumValue',
            __Directive: '__Directive',
            __DirectiveLocation: '__DirectiveLocation',
          },
          _subTypeMap: {},
          _implementationsMap: {},
        },
        fragments: {},
        operation: {
          kind: 'OperationDefinition',
          operation: 'query',
          variableDefinitions: [],
          directives: [],
          selectionSet: {
            kind: 'SelectionSet',
            selections: [
              {
                kind: 'Field',
                name: {
                  kind: 'Name',
                  value: 'greWords',
                  loc: { start: 11, end: 19 },
                },
                arguments: [],
                directives: [],
                selectionSet: {
                  kind: 'SelectionSet',
                  selections: [
                    {
                      kind: 'Field',
                      name: {
                        kind: 'Name',
                        value: 'id',
                        loc: { start: 26, end: 28 },
                      },
                      arguments: [],
                      directives: [],
                      loc: { start: 26, end: 28 },
                    },
                  ],
                  loc: { start: 20, end: 32 },
                },
                loc: { start: 11, end: 32 },
              },
            ],
            loc: { start: 7, end: 34 },
          },
          loc: { start: 1, end: 34 },
        },
        variableValues: {},
        cacheControl: { cacheHint: {} },
      },
    },
    withFragment: {
      query: `
            fragment GreWordFields on GreWord {
              id
            }
            query {
              greWords {
                ...GreWordFields
              }
            }
      `,
      info: {
        fieldName: 'greWords',
        fieldNodes: [
          {
            kind: 'Field',
            name: {
              kind: 'Name',
              value: 'greWords',
              loc: { start: 53, end: 61 },
            },
            arguments: [],
            directives: [],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                {
                  kind: 'FragmentSpread',
                  name: {
                    kind: 'Name',
                    value: 'GreWordFields',
                    loc: { start: 71, end: 84 },
                  },
                  directives: [],
                  loc: { start: 68, end: 84 },
                },
              ],
              loc: { start: 62, end: 88 },
            },
            loc: { start: 53, end: 88 },
          },
        ],
        returnType: '[GreWord!]!',
        parentType: 'Query',
        path: { key: 'greWords', typename: 'Query' },
        schema: {
          __validationErrors: [],
          extensions: {
            nexus: {
              config: {
                types: {
                  GeneralQuery: {
                    name: 'Query',
                    config: { type: 'Query', name: 'Query' },
                  },
                  GptPromptObject: {
                    name: 'GptPrompt',
                    config: { name: 'GptPrompt' },
                  },
                  GptPromptQuery: {
                    name: 'Query',
                    config: { type: 'Query', name: 'Query' },
                  },
                  GptPromptMutation: {
                    name: 'Mutation',
                    config: { type: 'Mutation', name: 'Mutation' },
                  },
                  GreWordStatusEnum: {
                    name: 'GreWordStatus',
                    config: {
                      name: 'GreWordStatus',
                      members: [
                        'STARTED_LEARNING',
                        'STILL_LEARNING',
                        'ALMOST_LEARNT',
                        'FINISHED_LEARNING',
                        'MEMORY_MODE',
                        'MASTERED',
                      ],
                    },
                  },
                  GreWordObject: {
                    name: 'GreWord',
                    config: { name: 'GreWord' },
                  },
                  EnumGreWordStatusFilter: {
                    name: 'EnumGreWordStatusFilter',
                    config: { name: 'EnumGreWordStatusFilter' },
                  },
                  GreWordTagListRelationFilter: {
                    name: 'GreWordTagListRelationFilter',
                    config: { name: 'GreWordTagListRelationFilter' },
                  },
                  GreWordQuery: {
                    name: 'Query',
                    config: { type: 'Query', name: 'Query' },
                  },
                  GreWordTagWhereUniqueInput: {
                    name: 'GreWordTagWhereUniqueInput',
                    config: { name: 'GreWordTagWhereUniqueInput' },
                  },
                  GreWordMutation: {
                    name: 'Mutation',
                    config: { type: 'Mutation', name: 'Mutation' },
                  },
                  GreWordSearchPromptInputObject: {
                    name: 'GreWordSearchPromptInput',
                    config: { name: 'GreWordSearchPromptInput' },
                  },
                  GreWordSearchPromptInputQuery: {
                    name: 'Query',
                    config: { type: 'Query', name: 'Query' },
                  },
                  GreWordSearchPromptInputMutation: {
                    name: 'Mutation',
                    config: { type: 'Mutation', name: 'Mutation' },
                  },
                  GreWordTagObject: {
                    name: 'GreWordTag',
                    config: { name: 'GreWordTag' },
                  },
                  GreWordTagWhereInput: {
                    name: 'GreWordTagWhereInput',
                    config: { name: 'GreWordTagWhereInput' },
                  },
                  GreWordTagQuery: {
                    name: 'Query',
                    config: { type: 'Query', name: 'Query' },
                  },
                  GreWordTagMutation: {
                    name: 'Mutation',
                    config: { type: 'Mutation', name: 'Mutation' },
                  },
                  PostObject: { name: 'Post', config: { name: 'Post' } },
                  PostQuery: {
                    name: 'Query',
                    config: { type: 'Query', name: 'Query' },
                  },
                  PostMutation: {
                    name: 'Mutation',
                    config: { type: 'Mutation', name: 'Mutation' },
                  },
                  StringFilter: {
                    name: 'StringFilter',
                    config: { name: 'StringFilter' },
                  },
                  Json: {
                    name: 'Json',
                    config: {
                      name: 'Json',
                      description:
                        'The `Json` scalar type represents JSON objects.',
                    },
                  },
                  UserMetaParsedJsonValue: {
                    name: 'UserMetaParsedJsonValue',
                    config: { name: 'UserMetaParsedJsonValue' },
                  },
                  UserMetaParsedJsonValueInput: {
                    name: 'UserMetaParsedJsonValueInput',
                    config: { name: 'UserMetaParsedJsonValueInput' },
                  },
                  UserObject: { name: 'User', config: { name: 'User' } },
                  UserQuery: {
                    name: 'Query',
                    config: { type: 'Query', name: 'Query' },
                  },
                  UserMutation: {
                    name: 'Mutation',
                    config: { type: 'Mutation', name: 'Mutation' },
                  },
                },
                outputs: {
                  typegen:
                    '/Users/rahulgupta/Desktop/skartner/skartner-server/nexus-typegen.ts',
                  schema:
                    '/Users/rahulgupta/Desktop/skartner/skartner-server/schema.graphql',
                },
                contextType: {
                  module:
                    '/Users/rahulgupta/Desktop/skartner/skartner-server/src/context.ts',
                  export: 'Context',
                },
                features: {
                  abstractTypeRuntimeChecks: true,
                  abstractTypeStrategies: {
                    isTypeOf: false,
                    resolveType: true,
                    __typename: false,
                  },
                },
                plugins: [],
                nonNullDefaults: { input: false, output: false },
                dynamicFields: {
                  dynamicInputFields: {},
                  dynamicOutputFields: {},
                  dynamicOutputProperties: {},
                },
                sourceTypings: {},
              },
            },
          },
          extensionASTNodes: [],
          _queryType: 'Query',
          _mutationType: 'Mutation',
          _directives: ['@include', '@skip', '@deprecated', '@specifiedBy'],
          _typeMap: {
            GptPrompt: 'GptPrompt',
            String: 'String',
            GreWordStatus: 'GreWordStatus',
            GreWord: 'GreWord',
            EnumGreWordStatusFilter: 'EnumGreWordStatusFilter',
            GreWordTagListRelationFilter: 'GreWordTagListRelationFilter',
            GreWordTagWhereUniqueInput: 'GreWordTagWhereUniqueInput',
            GreWordSearchPromptInput: 'GreWordSearchPromptInput',
            GreWordTag: 'GreWordTag',
            GreWordTagWhereInput: 'GreWordTagWhereInput',
            Post: 'Post',
            Boolean: 'Boolean',
            StringFilter: 'StringFilter',
            Json: 'Json',
            UserMetaParsedJsonValue: 'UserMetaParsedJsonValue',
            UserMetaParsedJsonValueInput: 'UserMetaParsedJsonValueInput',
            User: 'User',
            helloWorld: 'helloWorld',
            GreConfiguration: 'GreConfiguration',
            GreWordWhereInput: 'GreWordWhereInput',
            GreWordSearchPromptInputWhereInput:
              'GreWordSearchPromptInputWhereInput',
            UserWhereInput: 'UserWhereInput',
            Query: 'Query',
            Int: 'Int',
            Mutation: 'Mutation',
            __Schema: '__Schema',
            __Type: '__Type',
            __TypeKind: '__TypeKind',
            __Field: '__Field',
            __InputValue: '__InputValue',
            __EnumValue: '__EnumValue',
            __Directive: '__Directive',
            __DirectiveLocation: '__DirectiveLocation',
          },
          _subTypeMap: {},
          _implementationsMap: {},
        },
        fragments: {
          GreWordFields: {
            kind: 'FragmentDefinition',
            name: {
              kind: 'Name',
              value: 'GreWordFields',
              loc: { start: 9, end: 22 },
            },
            typeCondition: {
              kind: 'NamedType',
              name: {
                kind: 'Name',
                value: 'GreWord',
                loc: { start: 26, end: 33 },
              },
              loc: { start: 26, end: 33 },
            },
            directives: [],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                {
                  kind: 'Field',
                  name: {
                    kind: 'Name',
                    value: 'id',
                    loc: { start: 38, end: 40 },
                  },
                  arguments: [],
                  directives: [],
                  loc: { start: 38, end: 40 },
                },
              ],
              loc: { start: 34, end: 42 },
            },
            loc: { start: 0, end: 42 },
          },
        },
        operation: {
          kind: 'OperationDefinition',
          operation: 'query',
          variableDefinitions: [],
          directives: [],
          selectionSet: {
            kind: 'SelectionSet',
            selections: [
              {
                kind: 'Field',
                name: {
                  kind: 'Name',
                  value: 'greWords',
                  loc: { start: 53, end: 61 },
                },
                arguments: [],
                directives: [],
                selectionSet: {
                  kind: 'SelectionSet',
                  selections: [
                    {
                      kind: 'FragmentSpread',
                      name: {
                        kind: 'Name',
                        value: 'GreWordFields',
                        loc: { start: 71, end: 84 },
                      },
                      directives: [],
                      loc: { start: 68, end: 84 },
                    },
                  ],
                  loc: { start: 62, end: 88 },
                },
                loc: { start: 53, end: 88 },
              },
            ],
            loc: { start: 49, end: 90 },
          },
          loc: { start: 43, end: 90 },
        },
        variableValues: {},
        cacheControl: { cacheHint: {} },
      },
    },
  },
  greWordsNested: {
    withoutFragment: {
      query: `
            query {
              greWords {
                id
                createdAt
                gptPrompts {
                  id
                  updatedAt
                  greWord {
                    id
                    spelling
                    user {
                      email
                    }
                    gptPrompts {
                      id
                    }
                  } 
                }
              }
            }
      `,
      info: {
        fieldName: 'greWords',
        fieldNodes: [
          {
            kind: 'Field',
            name: {
              kind: 'Name',
              value: 'greWords',
              loc: { start: 11, end: 19 },
            },
            arguments: [],
            directives: [],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                {
                  kind: 'Field',
                  name: {
                    kind: 'Name',
                    value: 'id',
                    loc: { start: 26, end: 28 },
                  },
                  arguments: [],
                  directives: [],
                  loc: { start: 26, end: 28 },
                },
                {
                  kind: 'Field',
                  name: {
                    kind: 'Name',
                    value: 'createdAt',
                    loc: { start: 33, end: 42 },
                  },
                  arguments: [],
                  directives: [],
                  loc: { start: 33, end: 42 },
                },
                {
                  kind: 'Field',
                  name: {
                    kind: 'Name',
                    value: 'gptPrompts',
                    loc: { start: 47, end: 57 },
                  },
                  arguments: [],
                  directives: [],
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      {
                        kind: 'Field',
                        name: {
                          kind: 'Name',
                          value: 'id',
                          loc: { start: 66, end: 68 },
                        },
                        arguments: [],
                        directives: [],
                        loc: { start: 66, end: 68 },
                      },
                      {
                        kind: 'Field',
                        name: {
                          kind: 'Name',
                          value: 'updatedAt',
                          loc: { start: 75, end: 84 },
                        },
                        arguments: [],
                        directives: [],
                        loc: { start: 75, end: 84 },
                      },
                      {
                        kind: 'Field',
                        name: {
                          kind: 'Name',
                          value: 'greWord',
                          loc: { start: 91, end: 98 },
                        },
                        arguments: [],
                        directives: [],
                        selectionSet: {
                          kind: 'SelectionSet',
                          selections: [
                            {
                              kind: 'Field',
                              name: {
                                kind: 'Name',
                                value: 'id',
                                loc: { start: 109, end: 111 },
                              },
                              arguments: [],
                              directives: [],
                              loc: { start: 109, end: 111 },
                            },
                            {
                              kind: 'Field',
                              name: {
                                kind: 'Name',
                                value: 'spelling',
                                loc: { start: 120, end: 128 },
                              },
                              arguments: [],
                              directives: [],
                              loc: { start: 120, end: 128 },
                            },
                            {
                              kind: 'Field',
                              name: {
                                kind: 'Name',
                                value: 'user',
                                loc: { start: 137, end: 141 },
                              },
                              arguments: [],
                              directives: [],
                              selectionSet: {
                                kind: 'SelectionSet',
                                selections: [
                                  {
                                    kind: 'Field',
                                    name: {
                                      kind: 'Name',
                                      value: 'email',
                                      loc: { start: 154, end: 159 },
                                    },
                                    arguments: [],
                                    directives: [],
                                    loc: { start: 154, end: 159 },
                                  },
                                ],
                                loc: { start: 142, end: 169 },
                              },
                              loc: { start: 137, end: 169 },
                            },
                            {
                              kind: 'Field',
                              name: {
                                kind: 'Name',
                                value: 'gptPrompts',
                                loc: { start: 178, end: 188 },
                              },
                              arguments: [],
                              directives: [],
                              selectionSet: {
                                kind: 'SelectionSet',
                                selections: [
                                  {
                                    kind: 'Field',
                                    name: {
                                      kind: 'Name',
                                      value: 'id',
                                      loc: { start: 201, end: 203 },
                                    },
                                    arguments: [],
                                    directives: [],
                                    loc: { start: 201, end: 203 },
                                  },
                                ],
                                loc: { start: 189, end: 224 },
                              },
                              loc: { start: 178, end: 224 },
                            },
                          ],
                          loc: { start: 99, end: 232 },
                        },
                        loc: { start: 91, end: 232 },
                      },
                    ],
                    loc: { start: 58, end: 238 },
                  },
                  loc: { start: 47, end: 238 },
                },
              ],
              loc: { start: 20, end: 242 },
            },
            loc: { start: 11, end: 242 },
          },
        ],
        returnType: '[GreWord!]!',
        parentType: 'Query',
        path: { key: 'greWords', typename: 'Query' },
        schema: {
          __validationErrors: [],
          extensions: {
            nexus: {
              config: {
                types: {
                  GeneralQuery: {
                    name: 'Query',
                    config: { type: 'Query', name: 'Query' },
                  },
                  GptPromptObject: {
                    name: 'GptPrompt',
                    config: { name: 'GptPrompt' },
                  },
                  GptPromptQuery: {
                    name: 'Query',
                    config: { type: 'Query', name: 'Query' },
                  },
                  GptPromptMutation: {
                    name: 'Mutation',
                    config: { type: 'Mutation', name: 'Mutation' },
                  },
                  GreWordStatusEnum: {
                    name: 'GreWordStatus',
                    config: {
                      name: 'GreWordStatus',
                      members: [
                        'STARTED_LEARNING',
                        'STILL_LEARNING',
                        'ALMOST_LEARNT',
                        'FINISHED_LEARNING',
                        'MEMORY_MODE',
                        'MASTERED',
                      ],
                    },
                  },
                  GreWordObject: {
                    name: 'GreWord',
                    config: { name: 'GreWord' },
                  },
                  EnumGreWordStatusFilter: {
                    name: 'EnumGreWordStatusFilter',
                    config: { name: 'EnumGreWordStatusFilter' },
                  },
                  GreWordTagListRelationFilter: {
                    name: 'GreWordTagListRelationFilter',
                    config: { name: 'GreWordTagListRelationFilter' },
                  },
                  GreWordQuery: {
                    name: 'Query',
                    config: { type: 'Query', name: 'Query' },
                  },
                  GreWordTagWhereUniqueInput: {
                    name: 'GreWordTagWhereUniqueInput',
                    config: { name: 'GreWordTagWhereUniqueInput' },
                  },
                  GreWordMutation: {
                    name: 'Mutation',
                    config: { type: 'Mutation', name: 'Mutation' },
                  },
                  GreWordSearchPromptInputObject: {
                    name: 'GreWordSearchPromptInput',
                    config: { name: 'GreWordSearchPromptInput' },
                  },
                  GreWordSearchPromptInputQuery: {
                    name: 'Query',
                    config: { type: 'Query', name: 'Query' },
                  },
                  GreWordSearchPromptInputMutation: {
                    name: 'Mutation',
                    config: { type: 'Mutation', name: 'Mutation' },
                  },
                  GreWordTagObject: {
                    name: 'GreWordTag',
                    config: { name: 'GreWordTag' },
                  },
                  GreWordTagWhereInput: {
                    name: 'GreWordTagWhereInput',
                    config: { name: 'GreWordTagWhereInput' },
                  },
                  GreWordTagQuery: {
                    name: 'Query',
                    config: { type: 'Query', name: 'Query' },
                  },
                  GreWordTagMutation: {
                    name: 'Mutation',
                    config: { type: 'Mutation', name: 'Mutation' },
                  },
                  PostObject: { name: 'Post', config: { name: 'Post' } },
                  PostQuery: {
                    name: 'Query',
                    config: { type: 'Query', name: 'Query' },
                  },
                  PostMutation: {
                    name: 'Mutation',
                    config: { type: 'Mutation', name: 'Mutation' },
                  },
                  StringFilter: {
                    name: 'StringFilter',
                    config: { name: 'StringFilter' },
                  },
                  Json: {
                    name: 'Json',
                    config: {
                      name: 'Json',
                      description:
                        'The `Json` scalar type represents JSON objects.',
                    },
                  },
                  UserMetaParsedJsonValue: {
                    name: 'UserMetaParsedJsonValue',
                    config: { name: 'UserMetaParsedJsonValue' },
                  },
                  UserMetaParsedJsonValueInput: {
                    name: 'UserMetaParsedJsonValueInput',
                    config: { name: 'UserMetaParsedJsonValueInput' },
                  },
                  UserObject: { name: 'User', config: { name: 'User' } },
                  UserQuery: {
                    name: 'Query',
                    config: { type: 'Query', name: 'Query' },
                  },
                  UserMutation: {
                    name: 'Mutation',
                    config: { type: 'Mutation', name: 'Mutation' },
                  },
                },
                outputs: {
                  typegen:
                    '/Users/rahulgupta/Desktop/skartner/skartner-server/nexus-typegen.ts',
                  schema:
                    '/Users/rahulgupta/Desktop/skartner/skartner-server/schema.graphql',
                },
                contextType: {
                  module:
                    '/Users/rahulgupta/Desktop/skartner/skartner-server/src/context.ts',
                  export: 'Context',
                },
                features: {
                  abstractTypeRuntimeChecks: true,
                  abstractTypeStrategies: {
                    isTypeOf: false,
                    resolveType: true,
                    __typename: false,
                  },
                },
                plugins: [],
                nonNullDefaults: { input: false, output: false },
                dynamicFields: {
                  dynamicInputFields: {},
                  dynamicOutputFields: {},
                  dynamicOutputProperties: {},
                },
                sourceTypings: {},
              },
            },
          },
          extensionASTNodes: [],
          _queryType: 'Query',
          _mutationType: 'Mutation',
          _directives: ['@include', '@skip', '@deprecated', '@specifiedBy'],
          _typeMap: {
            GptPrompt: 'GptPrompt',
            String: 'String',
            GreWordStatus: 'GreWordStatus',
            GreWord: 'GreWord',
            EnumGreWordStatusFilter: 'EnumGreWordStatusFilter',
            GreWordTagListRelationFilter: 'GreWordTagListRelationFilter',
            GreWordTagWhereUniqueInput: 'GreWordTagWhereUniqueInput',
            GreWordSearchPromptInput: 'GreWordSearchPromptInput',
            GreWordTag: 'GreWordTag',
            GreWordTagWhereInput: 'GreWordTagWhereInput',
            Post: 'Post',
            Boolean: 'Boolean',
            StringFilter: 'StringFilter',
            Json: 'Json',
            UserMetaParsedJsonValue: 'UserMetaParsedJsonValue',
            UserMetaParsedJsonValueInput: 'UserMetaParsedJsonValueInput',
            User: 'User',
            helloWorld: 'helloWorld',
            GreConfiguration: 'GreConfiguration',
            GreWordWhereInput: 'GreWordWhereInput',
            GreWordSearchPromptInputWhereInput:
              'GreWordSearchPromptInputWhereInput',
            UserWhereInput: 'UserWhereInput',
            Query: 'Query',
            Int: 'Int',
            Mutation: 'Mutation',
            __Schema: '__Schema',
            __Type: '__Type',
            __TypeKind: '__TypeKind',
            __Field: '__Field',
            __InputValue: '__InputValue',
            __EnumValue: '__EnumValue',
            __Directive: '__Directive',
            __DirectiveLocation: '__DirectiveLocation',
          },
          _subTypeMap: {},
          _implementationsMap: {},
        },
        fragments: {},
        operation: {
          kind: 'OperationDefinition',
          operation: 'query',
          variableDefinitions: [],
          directives: [],
          selectionSet: {
            kind: 'SelectionSet',
            selections: [
              {
                kind: 'Field',
                name: {
                  kind: 'Name',
                  value: 'greWords',
                  loc: { start: 11, end: 19 },
                },
                arguments: [],
                directives: [],
                selectionSet: {
                  kind: 'SelectionSet',
                  selections: [
                    {
                      kind: 'Field',
                      name: {
                        kind: 'Name',
                        value: 'id',
                        loc: { start: 26, end: 28 },
                      },
                      arguments: [],
                      directives: [],
                      loc: { start: 26, end: 28 },
                    },
                    {
                      kind: 'Field',
                      name: {
                        kind: 'Name',
                        value: 'createdAt',
                        loc: { start: 33, end: 42 },
                      },
                      arguments: [],
                      directives: [],
                      loc: { start: 33, end: 42 },
                    },
                    {
                      kind: 'Field',
                      name: {
                        kind: 'Name',
                        value: 'gptPrompts',
                        loc: { start: 47, end: 57 },
                      },
                      arguments: [],
                      directives: [],
                      selectionSet: {
                        kind: 'SelectionSet',
                        selections: [
                          {
                            kind: 'Field',
                            name: {
                              kind: 'Name',
                              value: 'id',
                              loc: { start: 66, end: 68 },
                            },
                            arguments: [],
                            directives: [],
                            loc: { start: 66, end: 68 },
                          },
                          {
                            kind: 'Field',
                            name: {
                              kind: 'Name',
                              value: 'updatedAt',
                              loc: { start: 75, end: 84 },
                            },
                            arguments: [],
                            directives: [],
                            loc: { start: 75, end: 84 },
                          },
                          {
                            kind: 'Field',
                            name: {
                              kind: 'Name',
                              value: 'greWord',
                              loc: { start: 91, end: 98 },
                            },
                            arguments: [],
                            directives: [],
                            selectionSet: {
                              kind: 'SelectionSet',
                              selections: [
                                {
                                  kind: 'Field',
                                  name: {
                                    kind: 'Name',
                                    value: 'id',
                                    loc: { start: 109, end: 111 },
                                  },
                                  arguments: [],
                                  directives: [],
                                  loc: { start: 109, end: 111 },
                                },
                                {
                                  kind: 'Field',
                                  name: {
                                    kind: 'Name',
                                    value: 'spelling',
                                    loc: { start: 120, end: 128 },
                                  },
                                  arguments: [],
                                  directives: [],
                                  loc: { start: 120, end: 128 },
                                },
                                {
                                  kind: 'Field',
                                  name: {
                                    kind: 'Name',
                                    value: 'user',
                                    loc: { start: 137, end: 141 },
                                  },
                                  arguments: [],
                                  directives: [],
                                  selectionSet: {
                                    kind: 'SelectionSet',
                                    selections: [
                                      {
                                        kind: 'Field',
                                        name: {
                                          kind: 'Name',
                                          value: 'email',
                                          loc: { start: 154, end: 159 },
                                        },
                                        arguments: [],
                                        directives: [],
                                        loc: { start: 154, end: 159 },
                                      },
                                    ],
                                    loc: { start: 142, end: 169 },
                                  },
                                  loc: { start: 137, end: 169 },
                                },
                                {
                                  kind: 'Field',
                                  name: {
                                    kind: 'Name',
                                    value: 'gptPrompts',
                                    loc: { start: 178, end: 188 },
                                  },
                                  arguments: [],
                                  directives: [],
                                  selectionSet: {
                                    kind: 'SelectionSet',
                                    selections: [
                                      {
                                        kind: 'Field',
                                        name: {
                                          kind: 'Name',
                                          value: 'id',
                                          loc: { start: 201, end: 203 },
                                        },
                                        arguments: [],
                                        directives: [],
                                        loc: { start: 201, end: 203 },
                                      },
                                    ],
                                    loc: { start: 189, end: 224 },
                                  },
                                  loc: { start: 178, end: 224 },
                                },
                              ],
                              loc: { start: 99, end: 232 },
                            },
                            loc: { start: 91, end: 232 },
                          },
                        ],
                        loc: { start: 58, end: 238 },
                      },
                      loc: { start: 47, end: 238 },
                    },
                  ],
                  loc: { start: 20, end: 242 },
                },
                loc: { start: 11, end: 242 },
              },
            ],
            loc: { start: 7, end: 244 },
          },
          loc: { start: 1, end: 244 },
        },
        variableValues: {},
        cacheControl: { cacheHint: {} },
      },
    },
    withFragment: {
      query: `
      fragment GreWordFields on GreWord {
            id
            createdAt
            gptPrompts {
              id
              updatedAt
              greWord {
                id
                spelling
                user {
                  email
                }
                gptPrompts {
                  id
                  
                }
              }
            }
        }
        query {
          greWords {
          ...GreWordFields
          }
        }
      `,
      info: {
        fieldName: 'greWords',
        fieldNodes: [
          {
            kind: 'Field',
            name: {
              kind: 'Name',
              value: 'greWords',
              loc: { start: 265, end: 273 },
            },
            arguments: [],
            directives: [],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                {
                  kind: 'FragmentSpread',
                  name: {
                    kind: 'Name',
                    value: 'GreWordFields',
                    loc: { start: 281, end: 294 },
                  },
                  directives: [],
                  loc: { start: 278, end: 294 },
                },
              ],
              loc: { start: 274, end: 298 },
            },
            loc: { start: 265, end: 298 },
          },
        ],
        returnType: '[GreWord!]!',
        parentType: 'Query',
        path: { key: 'greWords', typename: 'Query' },
        schema: {
          __validationErrors: [],
          extensions: {
            nexus: {
              config: {
                types: {
                  GeneralQuery: {
                    name: 'Query',
                    config: { type: 'Query', name: 'Query' },
                  },
                  GptPromptObject: {
                    name: 'GptPrompt',
                    config: { name: 'GptPrompt' },
                  },
                  GptPromptQuery: {
                    name: 'Query',
                    config: { type: 'Query', name: 'Query' },
                  },
                  GptPromptMutation: {
                    name: 'Mutation',
                    config: { type: 'Mutation', name: 'Mutation' },
                  },
                  GreWordStatusEnum: {
                    name: 'GreWordStatus',
                    config: {
                      name: 'GreWordStatus',
                      members: [
                        'STARTED_LEARNING',
                        'STILL_LEARNING',
                        'ALMOST_LEARNT',
                        'FINISHED_LEARNING',
                        'MEMORY_MODE',
                        'MASTERED',
                      ],
                    },
                  },
                  GreWordObject: {
                    name: 'GreWord',
                    config: { name: 'GreWord' },
                  },
                  EnumGreWordStatusFilter: {
                    name: 'EnumGreWordStatusFilter',
                    config: { name: 'EnumGreWordStatusFilter' },
                  },
                  GreWordTagListRelationFilter: {
                    name: 'GreWordTagListRelationFilter',
                    config: { name: 'GreWordTagListRelationFilter' },
                  },
                  GreWordQuery: {
                    name: 'Query',
                    config: { type: 'Query', name: 'Query' },
                  },
                  GreWordTagWhereUniqueInput: {
                    name: 'GreWordTagWhereUniqueInput',
                    config: { name: 'GreWordTagWhereUniqueInput' },
                  },
                  GreWordMutation: {
                    name: 'Mutation',
                    config: { type: 'Mutation', name: 'Mutation' },
                  },
                  GreWordSearchPromptInputObject: {
                    name: 'GreWordSearchPromptInput',
                    config: { name: 'GreWordSearchPromptInput' },
                  },
                  GreWordSearchPromptInputQuery: {
                    name: 'Query',
                    config: { type: 'Query', name: 'Query' },
                  },
                  GreWordSearchPromptInputMutation: {
                    name: 'Mutation',
                    config: { type: 'Mutation', name: 'Mutation' },
                  },
                  GreWordTagObject: {
                    name: 'GreWordTag',
                    config: { name: 'GreWordTag' },
                  },
                  GreWordTagWhereInput: {
                    name: 'GreWordTagWhereInput',
                    config: { name: 'GreWordTagWhereInput' },
                  },
                  GreWordTagQuery: {
                    name: 'Query',
                    config: { type: 'Query', name: 'Query' },
                  },
                  GreWordTagMutation: {
                    name: 'Mutation',
                    config: { type: 'Mutation', name: 'Mutation' },
                  },
                  PostObject: { name: 'Post', config: { name: 'Post' } },
                  PostQuery: {
                    name: 'Query',
                    config: { type: 'Query', name: 'Query' },
                  },
                  PostMutation: {
                    name: 'Mutation',
                    config: { type: 'Mutation', name: 'Mutation' },
                  },
                  StringFilter: {
                    name: 'StringFilter',
                    config: { name: 'StringFilter' },
                  },
                  Json: {
                    name: 'Json',
                    config: {
                      name: 'Json',
                      description:
                        'The `Json` scalar type represents JSON objects.',
                    },
                  },
                  UserMetaParsedJsonValue: {
                    name: 'UserMetaParsedJsonValue',
                    config: { name: 'UserMetaParsedJsonValue' },
                  },
                  UserMetaParsedJsonValueInput: {
                    name: 'UserMetaParsedJsonValueInput',
                    config: { name: 'UserMetaParsedJsonValueInput' },
                  },
                  UserObject: { name: 'User', config: { name: 'User' } },
                  UserQuery: {
                    name: 'Query',
                    config: { type: 'Query', name: 'Query' },
                  },
                  UserMutation: {
                    name: 'Mutation',
                    config: { type: 'Mutation', name: 'Mutation' },
                  },
                },
                outputs: {
                  typegen:
                    '/Users/rahulgupta/Desktop/skartner/skartner-server/nexus-typegen.ts',
                  schema:
                    '/Users/rahulgupta/Desktop/skartner/skartner-server/schema.graphql',
                },
                contextType: {
                  module:
                    '/Users/rahulgupta/Desktop/skartner/skartner-server/src/context.ts',
                  export: 'Context',
                },
                features: {
                  abstractTypeRuntimeChecks: true,
                  abstractTypeStrategies: {
                    isTypeOf: false,
                    resolveType: true,
                    __typename: false,
                  },
                },
                plugins: [],
                nonNullDefaults: { input: false, output: false },
                dynamicFields: {
                  dynamicInputFields: {},
                  dynamicOutputFields: {},
                  dynamicOutputProperties: {},
                },
                sourceTypings: {},
              },
            },
          },
          extensionASTNodes: [],
          _queryType: 'Query',
          _mutationType: 'Mutation',
          _directives: ['@include', '@skip', '@deprecated', '@specifiedBy'],
          _typeMap: {
            GptPrompt: 'GptPrompt',
            String: 'String',
            GreWordStatus: 'GreWordStatus',
            GreWord: 'GreWord',
            EnumGreWordStatusFilter: 'EnumGreWordStatusFilter',
            GreWordTagListRelationFilter: 'GreWordTagListRelationFilter',
            GreWordTagWhereUniqueInput: 'GreWordTagWhereUniqueInput',
            GreWordSearchPromptInput: 'GreWordSearchPromptInput',
            GreWordTag: 'GreWordTag',
            GreWordTagWhereInput: 'GreWordTagWhereInput',
            Post: 'Post',
            Boolean: 'Boolean',
            StringFilter: 'StringFilter',
            Json: 'Json',
            UserMetaParsedJsonValue: 'UserMetaParsedJsonValue',
            UserMetaParsedJsonValueInput: 'UserMetaParsedJsonValueInput',
            User: 'User',
            helloWorld: 'helloWorld',
            GreConfiguration: 'GreConfiguration',
            GreWordWhereInput: 'GreWordWhereInput',
            GreWordSearchPromptInputWhereInput:
              'GreWordSearchPromptInputWhereInput',
            UserWhereInput: 'UserWhereInput',
            Query: 'Query',
            Int: 'Int',
            Mutation: 'Mutation',
            __Schema: '__Schema',
            __Type: '__Type',
            __TypeKind: '__TypeKind',
            __Field: '__Field',
            __InputValue: '__InputValue',
            __EnumValue: '__EnumValue',
            __Directive: '__Directive',
            __DirectiveLocation: '__DirectiveLocation',
          },
          _subTypeMap: {},
          _implementationsMap: {},
        },
        fragments: {
          GreWordFields: {
            kind: 'FragmentDefinition',
            name: {
              kind: 'Name',
              value: 'GreWordFields',
              loc: { start: 9, end: 22 },
            },
            typeCondition: {
              kind: 'NamedType',
              name: {
                kind: 'Name',
                value: 'GreWord',
                loc: { start: 26, end: 33 },
              },
              loc: { start: 26, end: 33 },
            },
            directives: [],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                {
                  kind: 'Field',
                  name: {
                    kind: 'Name',
                    value: 'id',
                    loc: { start: 40, end: 42 },
                  },
                  arguments: [],
                  directives: [],
                  loc: { start: 40, end: 42 },
                },
                {
                  kind: 'Field',
                  name: {
                    kind: 'Name',
                    value: 'createdAt',
                    loc: { start: 47, end: 56 },
                  },
                  arguments: [],
                  directives: [],
                  loc: { start: 47, end: 56 },
                },
                {
                  kind: 'Field',
                  name: {
                    kind: 'Name',
                    value: 'gptPrompts',
                    loc: { start: 61, end: 71 },
                  },
                  arguments: [],
                  directives: [],
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      {
                        kind: 'Field',
                        name: {
                          kind: 'Name',
                          value: 'id',
                          loc: { start: 80, end: 82 },
                        },
                        arguments: [],
                        directives: [],
                        loc: { start: 80, end: 82 },
                      },
                      {
                        kind: 'Field',
                        name: {
                          kind: 'Name',
                          value: 'updatedAt',
                          loc: { start: 89, end: 98 },
                        },
                        arguments: [],
                        directives: [],
                        loc: { start: 89, end: 98 },
                      },
                      {
                        kind: 'Field',
                        name: {
                          kind: 'Name',
                          value: 'greWord',
                          loc: { start: 105, end: 112 },
                        },
                        arguments: [],
                        directives: [],
                        selectionSet: {
                          kind: 'SelectionSet',
                          selections: [
                            {
                              kind: 'Field',
                              name: {
                                kind: 'Name',
                                value: 'id',
                                loc: { start: 123, end: 125 },
                              },
                              arguments: [],
                              directives: [],
                              loc: { start: 123, end: 125 },
                            },
                            {
                              kind: 'Field',
                              name: {
                                kind: 'Name',
                                value: 'spelling',
                                loc: { start: 134, end: 142 },
                              },
                              arguments: [],
                              directives: [],
                              loc: { start: 134, end: 142 },
                            },
                            {
                              kind: 'Field',
                              name: {
                                kind: 'Name',
                                value: 'user',
                                loc: { start: 151, end: 155 },
                              },
                              arguments: [],
                              directives: [],
                              selectionSet: {
                                kind: 'SelectionSet',
                                selections: [
                                  {
                                    kind: 'Field',
                                    name: {
                                      kind: 'Name',
                                      value: 'email',
                                      loc: { start: 168, end: 173 },
                                    },
                                    arguments: [],
                                    directives: [],
                                    loc: { start: 168, end: 173 },
                                  },
                                ],
                                loc: { start: 156, end: 183 },
                              },
                              loc: { start: 151, end: 183 },
                            },
                            {
                              kind: 'Field',
                              name: {
                                kind: 'Name',
                                value: 'gptPrompts',
                                loc: { start: 192, end: 202 },
                              },
                              arguments: [],
                              directives: [],
                              selectionSet: {
                                kind: 'SelectionSet',
                                selections: [
                                  {
                                    kind: 'Field',
                                    name: {
                                      kind: 'Name',
                                      value: 'id',
                                      loc: { start: 215, end: 217 },
                                    },
                                    arguments: [],
                                    directives: [],
                                    loc: { start: 215, end: 217 },
                                  },
                                ],
                                loc: { start: 203, end: 238 },
                              },
                              loc: { start: 192, end: 238 },
                            },
                          ],
                          loc: { start: 113, end: 246 },
                        },
                        loc: { start: 105, end: 246 },
                      },
                    ],
                    loc: { start: 72, end: 252 },
                  },
                  loc: { start: 61, end: 252 },
                },
              ],
              loc: { start: 34, end: 254 },
            },
            loc: { start: 0, end: 254 },
          },
        },
        operation: {
          kind: 'OperationDefinition',
          operation: 'query',
          variableDefinitions: [],
          directives: [],
          selectionSet: {
            kind: 'SelectionSet',
            selections: [
              {
                kind: 'Field',
                name: {
                  kind: 'Name',
                  value: 'greWords',
                  loc: { start: 265, end: 273 },
                },
                arguments: [],
                directives: [],
                selectionSet: {
                  kind: 'SelectionSet',
                  selections: [
                    {
                      kind: 'FragmentSpread',
                      name: {
                        kind: 'Name',
                        value: 'GreWordFields',
                        loc: { start: 281, end: 294 },
                      },
                      directives: [],
                      loc: { start: 278, end: 294 },
                    },
                  ],
                  loc: { start: 274, end: 298 },
                },
                loc: { start: 265, end: 298 },
              },
            ],
            loc: { start: 261, end: 300 },
          },
          loc: { start: 255, end: 300 },
        },
        variableValues: {},
        cacheControl: { cacheHint: {} },
      },
    },
  },
  greWordsDoubleFragment: {
    withoutFragment: {
      query: `
        query {
          greWords {
          id
            spelling
            gptPrompts {
              id
              input
              response
            }
          }
        }
      `,
      info: {
        fieldName: 'greWords',
        fieldNodes: [
          {
            kind: 'Field',
            name: {
              kind: 'Name',
              value: 'greWords',
              loc: { start: 11, end: 19 },
            },
            arguments: [],
            directives: [],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                {
                  kind: 'Field',
                  name: {
                    kind: 'Name',
                    value: 'id',
                    loc: { start: 24, end: 26 },
                  },
                  arguments: [],
                  directives: [],
                  loc: { start: 24, end: 26 },
                },
                {
                  kind: 'Field',
                  name: {
                    kind: 'Name',
                    value: 'spelling',
                    loc: { start: 31, end: 39 },
                  },
                  arguments: [],
                  directives: [],
                  loc: { start: 31, end: 39 },
                },
                {
                  kind: 'Field',
                  name: {
                    kind: 'Name',
                    value: 'gptPrompts',
                    loc: { start: 44, end: 54 },
                  },
                  arguments: [],
                  directives: [],
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      {
                        kind: 'Field',
                        name: {
                          kind: 'Name',
                          value: 'id',
                          loc: { start: 63, end: 65 },
                        },
                        arguments: [],
                        directives: [],
                        loc: { start: 63, end: 65 },
                      },
                      {
                        kind: 'Field',
                        name: {
                          kind: 'Name',
                          value: 'input',
                          loc: { start: 72, end: 77 },
                        },
                        arguments: [],
                        directives: [],
                        loc: { start: 72, end: 77 },
                      },
                      {
                        kind: 'Field',
                        name: {
                          kind: 'Name',
                          value: 'response',
                          loc: { start: 84, end: 92 },
                        },
                        arguments: [],
                        directives: [],
                        loc: { start: 84, end: 92 },
                      },
                    ],
                    loc: { start: 55, end: 98 },
                  },
                  loc: { start: 44, end: 98 },
                },
              ],
              loc: { start: 20, end: 102 },
            },
            loc: { start: 11, end: 102 },
          },
        ],
        returnType: '[GreWord!]!',
        parentType: 'Query',
        path: { key: 'greWords', typename: 'Query' },
        schema: {
          __validationErrors: [],
          extensions: {
            nexus: {
              config: {
                types: {
                  GeneralQuery: {
                    name: 'Query',
                    config: { type: 'Query', name: 'Query' },
                  },
                  GptPromptObject: {
                    name: 'GptPrompt',
                    config: { name: 'GptPrompt' },
                  },
                  GptPromptQuery: {
                    name: 'Query',
                    config: { type: 'Query', name: 'Query' },
                  },
                  GptPromptMutation: {
                    name: 'Mutation',
                    config: { type: 'Mutation', name: 'Mutation' },
                  },
                  GreWordStatusEnum: {
                    name: 'GreWordStatus',
                    config: {
                      name: 'GreWordStatus',
                      members: [
                        'STARTED_LEARNING',
                        'STILL_LEARNING',
                        'ALMOST_LEARNT',
                        'FINISHED_LEARNING',
                        'MEMORY_MODE',
                        'MASTERED',
                      ],
                    },
                  },
                  GreWordObject: {
                    name: 'GreWord',
                    config: { name: 'GreWord' },
                  },
                  EnumGreWordStatusFilter: {
                    name: 'EnumGreWordStatusFilter',
                    config: { name: 'EnumGreWordStatusFilter' },
                  },
                  GreWordTagListRelationFilter: {
                    name: 'GreWordTagListRelationFilter',
                    config: { name: 'GreWordTagListRelationFilter' },
                  },
                  GreWordQuery: {
                    name: 'Query',
                    config: { type: 'Query', name: 'Query' },
                  },
                  GreWordTagWhereUniqueInput: {
                    name: 'GreWordTagWhereUniqueInput',
                    config: { name: 'GreWordTagWhereUniqueInput' },
                  },
                  GreWordMutation: {
                    name: 'Mutation',
                    config: { type: 'Mutation', name: 'Mutation' },
                  },
                  GreWordSearchPromptInputObject: {
                    name: 'GreWordSearchPromptInput',
                    config: { name: 'GreWordSearchPromptInput' },
                  },
                  GreWordSearchPromptInputQuery: {
                    name: 'Query',
                    config: { type: 'Query', name: 'Query' },
                  },
                  GreWordSearchPromptInputMutation: {
                    name: 'Mutation',
                    config: { type: 'Mutation', name: 'Mutation' },
                  },
                  GreWordTagObject: {
                    name: 'GreWordTag',
                    config: { name: 'GreWordTag' },
                  },
                  GreWordTagWhereInput: {
                    name: 'GreWordTagWhereInput',
                    config: { name: 'GreWordTagWhereInput' },
                  },
                  GreWordTagQuery: {
                    name: 'Query',
                    config: { type: 'Query', name: 'Query' },
                  },
                  GreWordTagMutation: {
                    name: 'Mutation',
                    config: { type: 'Mutation', name: 'Mutation' },
                  },
                  PostObject: { name: 'Post', config: { name: 'Post' } },
                  PostQuery: {
                    name: 'Query',
                    config: { type: 'Query', name: 'Query' },
                  },
                  PostMutation: {
                    name: 'Mutation',
                    config: { type: 'Mutation', name: 'Mutation' },
                  },
                  StringFilter: {
                    name: 'StringFilter',
                    config: { name: 'StringFilter' },
                  },
                  Json: {
                    name: 'Json',
                    config: {
                      name: 'Json',
                      description:
                        'The `Json` scalar type represents JSON objects.',
                    },
                  },
                  UserMetaParsedJsonValue: {
                    name: 'UserMetaParsedJsonValue',
                    config: { name: 'UserMetaParsedJsonValue' },
                  },
                  UserMetaParsedJsonValueInput: {
                    name: 'UserMetaParsedJsonValueInput',
                    config: { name: 'UserMetaParsedJsonValueInput' },
                  },
                  UserObject: { name: 'User', config: { name: 'User' } },
                  UserQuery: {
                    name: 'Query',
                    config: { type: 'Query', name: 'Query' },
                  },
                  UserMutation: {
                    name: 'Mutation',
                    config: { type: 'Mutation', name: 'Mutation' },
                  },
                },
                outputs: {
                  typegen:
                    '/Users/rahulgupta/Desktop/skartner/skartner-server/nexus-typegen.ts',
                  schema:
                    '/Users/rahulgupta/Desktop/skartner/skartner-server/schema.graphql',
                },
                contextType: {
                  module:
                    '/Users/rahulgupta/Desktop/skartner/skartner-server/src/context.ts',
                  export: 'Context',
                },
                features: {
                  abstractTypeRuntimeChecks: true,
                  abstractTypeStrategies: {
                    isTypeOf: false,
                    resolveType: true,
                    __typename: false,
                  },
                },
                plugins: [],
                nonNullDefaults: { input: false, output: false },
                dynamicFields: {
                  dynamicInputFields: {},
                  dynamicOutputFields: {},
                  dynamicOutputProperties: {},
                },
                sourceTypings: {},
              },
            },
          },
          extensionASTNodes: [],
          _queryType: 'Query',
          _mutationType: 'Mutation',
          _directives: ['@include', '@skip', '@deprecated', '@specifiedBy'],
          _typeMap: {
            GptPrompt: 'GptPrompt',
            String: 'String',
            GreWordStatus: 'GreWordStatus',
            GreWord: 'GreWord',
            EnumGreWordStatusFilter: 'EnumGreWordStatusFilter',
            GreWordTagListRelationFilter: 'GreWordTagListRelationFilter',
            GreWordTagWhereUniqueInput: 'GreWordTagWhereUniqueInput',
            GreWordSearchPromptInput: 'GreWordSearchPromptInput',
            GreWordTag: 'GreWordTag',
            GreWordTagWhereInput: 'GreWordTagWhereInput',
            Post: 'Post',
            Boolean: 'Boolean',
            StringFilter: 'StringFilter',
            Json: 'Json',
            UserMetaParsedJsonValue: 'UserMetaParsedJsonValue',
            UserMetaParsedJsonValueInput: 'UserMetaParsedJsonValueInput',
            User: 'User',
            helloWorld: 'helloWorld',
            GreConfiguration: 'GreConfiguration',
            GreWordWhereInput: 'GreWordWhereInput',
            GreWordSearchPromptInputWhereInput:
              'GreWordSearchPromptInputWhereInput',
            UserWhereInput: 'UserWhereInput',
            Query: 'Query',
            Int: 'Int',
            Mutation: 'Mutation',
            __Schema: '__Schema',
            __Type: '__Type',
            __TypeKind: '__TypeKind',
            __Field: '__Field',
            __InputValue: '__InputValue',
            __EnumValue: '__EnumValue',
            __Directive: '__Directive',
            __DirectiveLocation: '__DirectiveLocation',
          },
          _subTypeMap: {},
          _implementationsMap: {},
        },
        fragments: {},
        operation: {
          kind: 'OperationDefinition',
          operation: 'query',
          variableDefinitions: [],
          directives: [],
          selectionSet: {
            kind: 'SelectionSet',
            selections: [
              {
                kind: 'Field',
                name: {
                  kind: 'Name',
                  value: 'greWords',
                  loc: { start: 11, end: 19 },
                },
                arguments: [],
                directives: [],
                selectionSet: {
                  kind: 'SelectionSet',
                  selections: [
                    {
                      kind: 'Field',
                      name: {
                        kind: 'Name',
                        value: 'id',
                        loc: { start: 24, end: 26 },
                      },
                      arguments: [],
                      directives: [],
                      loc: { start: 24, end: 26 },
                    },
                    {
                      kind: 'Field',
                      name: {
                        kind: 'Name',
                        value: 'spelling',
                        loc: { start: 31, end: 39 },
                      },
                      arguments: [],
                      directives: [],
                      loc: { start: 31, end: 39 },
                    },
                    {
                      kind: 'Field',
                      name: {
                        kind: 'Name',
                        value: 'gptPrompts',
                        loc: { start: 44, end: 54 },
                      },
                      arguments: [],
                      directives: [],
                      selectionSet: {
                        kind: 'SelectionSet',
                        selections: [
                          {
                            kind: 'Field',
                            name: {
                              kind: 'Name',
                              value: 'id',
                              loc: { start: 63, end: 65 },
                            },
                            arguments: [],
                            directives: [],
                            loc: { start: 63, end: 65 },
                          },
                          {
                            kind: 'Field',
                            name: {
                              kind: 'Name',
                              value: 'input',
                              loc: { start: 72, end: 77 },
                            },
                            arguments: [],
                            directives: [],
                            loc: { start: 72, end: 77 },
                          },
                          {
                            kind: 'Field',
                            name: {
                              kind: 'Name',
                              value: 'response',
                              loc: { start: 84, end: 92 },
                            },
                            arguments: [],
                            directives: [],
                            loc: { start: 84, end: 92 },
                          },
                        ],
                        loc: { start: 55, end: 98 },
                      },
                      loc: { start: 44, end: 98 },
                    },
                  ],
                  loc: { start: 20, end: 102 },
                },
                loc: { start: 11, end: 102 },
              },
            ],
            loc: { start: 7, end: 104 },
          },
          loc: { start: 1, end: 104 },
        },
        variableValues: {},
        cacheControl: { cacheHint: {} },
      },
    },
    withFragment: {
      query: `
          fragment GreWordFields on GreWord {
            id
            spelling
          }
          fragment GptPromptFields on GptPrompt {
            id
            input
            response
          }
          query {
            greWords {
              ...GreWordFields
              gptPrompts {
                ...GptPromptFields
              }
            }
          }
      `,
      info: {
        fieldName: 'greWords',
        fieldNodes: [
          {
            kind: 'Field',
            name: {
              kind: 'Name',
              value: 'greWords',
              loc: { start: 143, end: 151 },
            },
            arguments: [],
            directives: [],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                {
                  kind: 'FragmentSpread',
                  name: {
                    kind: 'Name',
                    value: 'GreWordFields',
                    loc: { start: 161, end: 174 },
                  },
                  directives: [],
                  loc: { start: 158, end: 174 },
                },
                {
                  kind: 'Field',
                  name: {
                    kind: 'Name',
                    value: 'gptPrompts',
                    loc: { start: 179, end: 189 },
                  },
                  arguments: [],
                  directives: [],
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      {
                        kind: 'FragmentSpread',
                        name: {
                          kind: 'Name',
                          value: 'GptPromptFields',
                          loc: { start: 201, end: 216 },
                        },
                        directives: [],
                        loc: { start: 198, end: 216 },
                      },
                    ],
                    loc: { start: 190, end: 222 },
                  },
                  loc: { start: 179, end: 222 },
                },
              ],
              loc: { start: 152, end: 226 },
            },
            loc: { start: 143, end: 226 },
          },
        ],
        returnType: '[GreWord!]!',
        parentType: 'Query',
        path: { key: 'greWords', typename: 'Query' },
        schema: {
          __validationErrors: [],
          extensions: {
            nexus: {
              config: {
                types: {
                  GeneralQuery: {
                    name: 'Query',
                    config: { type: 'Query', name: 'Query' },
                  },
                  GptPromptObject: {
                    name: 'GptPrompt',
                    config: { name: 'GptPrompt' },
                  },
                  GptPromptQuery: {
                    name: 'Query',
                    config: { type: 'Query', name: 'Query' },
                  },
                  GptPromptMutation: {
                    name: 'Mutation',
                    config: { type: 'Mutation', name: 'Mutation' },
                  },
                  GreWordStatusEnum: {
                    name: 'GreWordStatus',
                    config: {
                      name: 'GreWordStatus',
                      members: [
                        'STARTED_LEARNING',
                        'STILL_LEARNING',
                        'ALMOST_LEARNT',
                        'FINISHED_LEARNING',
                        'MEMORY_MODE',
                        'MASTERED',
                      ],
                    },
                  },
                  GreWordObject: {
                    name: 'GreWord',
                    config: { name: 'GreWord' },
                  },
                  EnumGreWordStatusFilter: {
                    name: 'EnumGreWordStatusFilter',
                    config: { name: 'EnumGreWordStatusFilter' },
                  },
                  GreWordTagListRelationFilter: {
                    name: 'GreWordTagListRelationFilter',
                    config: { name: 'GreWordTagListRelationFilter' },
                  },
                  GreWordQuery: {
                    name: 'Query',
                    config: { type: 'Query', name: 'Query' },
                  },
                  GreWordTagWhereUniqueInput: {
                    name: 'GreWordTagWhereUniqueInput',
                    config: { name: 'GreWordTagWhereUniqueInput' },
                  },
                  GreWordMutation: {
                    name: 'Mutation',
                    config: { type: 'Mutation', name: 'Mutation' },
                  },
                  GreWordSearchPromptInputObject: {
                    name: 'GreWordSearchPromptInput',
                    config: { name: 'GreWordSearchPromptInput' },
                  },
                  GreWordSearchPromptInputQuery: {
                    name: 'Query',
                    config: { type: 'Query', name: 'Query' },
                  },
                  GreWordSearchPromptInputMutation: {
                    name: 'Mutation',
                    config: { type: 'Mutation', name: 'Mutation' },
                  },
                  GreWordTagObject: {
                    name: 'GreWordTag',
                    config: { name: 'GreWordTag' },
                  },
                  GreWordTagWhereInput: {
                    name: 'GreWordTagWhereInput',
                    config: { name: 'GreWordTagWhereInput' },
                  },
                  GreWordTagQuery: {
                    name: 'Query',
                    config: { type: 'Query', name: 'Query' },
                  },
                  GreWordTagMutation: {
                    name: 'Mutation',
                    config: { type: 'Mutation', name: 'Mutation' },
                  },
                  PostObject: { name: 'Post', config: { name: 'Post' } },
                  PostQuery: {
                    name: 'Query',
                    config: { type: 'Query', name: 'Query' },
                  },
                  PostMutation: {
                    name: 'Mutation',
                    config: { type: 'Mutation', name: 'Mutation' },
                  },
                  StringFilter: {
                    name: 'StringFilter',
                    config: { name: 'StringFilter' },
                  },
                  Json: {
                    name: 'Json',
                    config: {
                      name: 'Json',
                      description:
                        'The `Json` scalar type represents JSON objects.',
                    },
                  },
                  UserMetaParsedJsonValue: {
                    name: 'UserMetaParsedJsonValue',
                    config: { name: 'UserMetaParsedJsonValue' },
                  },
                  UserMetaParsedJsonValueInput: {
                    name: 'UserMetaParsedJsonValueInput',
                    config: { name: 'UserMetaParsedJsonValueInput' },
                  },
                  UserObject: { name: 'User', config: { name: 'User' } },
                  UserQuery: {
                    name: 'Query',
                    config: { type: 'Query', name: 'Query' },
                  },
                  UserMutation: {
                    name: 'Mutation',
                    config: { type: 'Mutation', name: 'Mutation' },
                  },
                },
                outputs: {
                  typegen:
                    '/Users/rahulgupta/Desktop/skartner/skartner-server/nexus-typegen.ts',
                  schema:
                    '/Users/rahulgupta/Desktop/skartner/skartner-server/schema.graphql',
                },
                contextType: {
                  module:
                    '/Users/rahulgupta/Desktop/skartner/skartner-server/src/context.ts',
                  export: 'Context',
                },
                features: {
                  abstractTypeRuntimeChecks: true,
                  abstractTypeStrategies: {
                    isTypeOf: false,
                    resolveType: true,
                    __typename: false,
                  },
                },
                plugins: [],
                nonNullDefaults: { input: false, output: false },
                dynamicFields: {
                  dynamicInputFields: {},
                  dynamicOutputFields: {},
                  dynamicOutputProperties: {},
                },
                sourceTypings: {},
              },
            },
          },
          extensionASTNodes: [],
          _queryType: 'Query',
          _mutationType: 'Mutation',
          _directives: ['@include', '@skip', '@deprecated', '@specifiedBy'],
          _typeMap: {
            GptPrompt: 'GptPrompt',
            String: 'String',
            GreWordStatus: 'GreWordStatus',
            GreWord: 'GreWord',
            EnumGreWordStatusFilter: 'EnumGreWordStatusFilter',
            GreWordTagListRelationFilter: 'GreWordTagListRelationFilter',
            GreWordTagWhereUniqueInput: 'GreWordTagWhereUniqueInput',
            GreWordSearchPromptInput: 'GreWordSearchPromptInput',
            GreWordTag: 'GreWordTag',
            GreWordTagWhereInput: 'GreWordTagWhereInput',
            Post: 'Post',
            Boolean: 'Boolean',
            StringFilter: 'StringFilter',
            Json: 'Json',
            UserMetaParsedJsonValue: 'UserMetaParsedJsonValue',
            UserMetaParsedJsonValueInput: 'UserMetaParsedJsonValueInput',
            User: 'User',
            helloWorld: 'helloWorld',
            GreConfiguration: 'GreConfiguration',
            GreWordWhereInput: 'GreWordWhereInput',
            GreWordSearchPromptInputWhereInput:
              'GreWordSearchPromptInputWhereInput',
            UserWhereInput: 'UserWhereInput',
            Query: 'Query',
            Int: 'Int',
            Mutation: 'Mutation',
            __Schema: '__Schema',
            __Type: '__Type',
            __TypeKind: '__TypeKind',
            __Field: '__Field',
            __InputValue: '__InputValue',
            __EnumValue: '__EnumValue',
            __Directive: '__Directive',
            __DirectiveLocation: '__DirectiveLocation',
          },
          _subTypeMap: {},
          _implementationsMap: {},
        },
        fragments: {
          GreWordFields: {
            kind: 'FragmentDefinition',
            name: {
              kind: 'Name',
              value: 'GreWordFields',
              loc: { start: 10, end: 23 },
            },
            typeCondition: {
              kind: 'NamedType',
              name: {
                kind: 'Name',
                value: 'GreWord',
                loc: { start: 27, end: 34 },
              },
              loc: { start: 27, end: 34 },
            },
            directives: [],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                {
                  kind: 'Field',
                  name: {
                    kind: 'Name',
                    value: 'id',
                    loc: { start: 39, end: 41 },
                  },
                  arguments: [],
                  directives: [],
                  loc: { start: 39, end: 41 },
                },
                {
                  kind: 'Field',
                  name: {
                    kind: 'Name',
                    value: 'spelling',
                    loc: { start: 44, end: 52 },
                  },
                  arguments: [],
                  directives: [],
                  loc: { start: 44, end: 52 },
                },
              ],
              loc: { start: 35, end: 54 },
            },
            loc: { start: 1, end: 54 },
          },
          GptPromptFields: {
            kind: 'FragmentDefinition',
            name: {
              kind: 'Name',
              value: 'GptPromptFields',
              loc: { start: 64, end: 79 },
            },
            typeCondition: {
              kind: 'NamedType',
              name: {
                kind: 'Name',
                value: 'GptPrompt',
                loc: { start: 83, end: 92 },
              },
              loc: { start: 83, end: 92 },
            },
            directives: [],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                {
                  kind: 'Field',
                  name: {
                    kind: 'Name',
                    value: 'id',
                    loc: { start: 101, end: 103 },
                  },
                  arguments: [],
                  directives: [],
                  loc: { start: 101, end: 103 },
                },
                {
                  kind: 'Field',
                  name: {
                    kind: 'Name',
                    value: 'input',
                    loc: { start: 110, end: 115 },
                  },
                  arguments: [],
                  directives: [],
                  loc: { start: 110, end: 115 },
                },
                {
                  kind: 'Field',
                  name: {
                    kind: 'Name',
                    value: 'response',
                    loc: { start: 122, end: 130 },
                  },
                  arguments: [],
                  directives: [],
                  loc: { start: 122, end: 130 },
                },
              ],
              loc: { start: 93, end: 132 },
            },
            loc: { start: 55, end: 132 },
          },
        },
        operation: {
          kind: 'OperationDefinition',
          operation: 'query',
          variableDefinitions: [],
          directives: [],
          selectionSet: {
            kind: 'SelectionSet',
            selections: [
              {
                kind: 'Field',
                name: {
                  kind: 'Name',
                  value: 'greWords',
                  loc: { start: 143, end: 151 },
                },
                arguments: [],
                directives: [],
                selectionSet: {
                  kind: 'SelectionSet',
                  selections: [
                    {
                      kind: 'FragmentSpread',
                      name: {
                        kind: 'Name',
                        value: 'GreWordFields',
                        loc: { start: 161, end: 174 },
                      },
                      directives: [],
                      loc: { start: 158, end: 174 },
                    },
                    {
                      kind: 'Field',
                      name: {
                        kind: 'Name',
                        value: 'gptPrompts',
                        loc: { start: 179, end: 189 },
                      },
                      arguments: [],
                      directives: [],
                      selectionSet: {
                        kind: 'SelectionSet',
                        selections: [
                          {
                            kind: 'FragmentSpread',
                            name: {
                              kind: 'Name',
                              value: 'GptPromptFields',
                              loc: { start: 201, end: 216 },
                            },
                            directives: [],
                            loc: { start: 198, end: 216 },
                          },
                        ],
                        loc: { start: 190, end: 222 },
                      },
                      loc: { start: 179, end: 222 },
                    },
                  ],
                  loc: { start: 152, end: 226 },
                },
                loc: { start: 143, end: 226 },
              },
            ],
            loc: { start: 139, end: 228 },
          },
          loc: { start: 133, end: 228 },
        },
        variableValues: {},
        cacheControl: { cacheHint: {} },
      },
    },
    multipleSpreads: {
      withFragment: {
        query: `
        fragment GreWordFields on GreWord {
          id
          spelling
        }
        fragment PartialGreWordFields on GreWord {
          spelling
          createdAt
        }
        fragment GptPromptFields on GptPrompt {
              id
        }
        query {
          greWords {
            ...GreWordFields
            ...PartialGreWordFields
            gptPrompts {
              ...GptPromptFields
              greWord {
                ...PartialGreWordFields
              }
            }
          }
        }
        `,
        transpiledQuery: `
        query {
          greWords {
            id
            spelling
            createdAt
            gptPrompts {
              id
              greWord {
                spelling
                createdAt
              }
            }
          }
        }
        `,
      },
    },
    spreadInsideFragment: {
      withFragment: {
        query: `
            fragment PartialGreWordFields on GreWord {
              id
              spelling
            }

            fragment GreWordFields on GreWord {
              ...PartialGreWordFields
              createdAt
            }

            query {
              greWords {
                ...GreWordFields
                gptPrompts {
                  greWord {
                    ...PartialGreWordFields
                  }
                }
              }
            }
        `,
        transpiledQuery: `
        query {
          greWords {
            id
            spelling
            createdAt
            gptPrompts {
              greWord {
                id
                spelling
              }
            }
          }
        }
        `,
      },
    },
  },
};

export default sampleQueryInfo;
