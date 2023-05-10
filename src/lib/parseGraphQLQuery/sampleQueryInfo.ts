const sampleQueryInfo = {
  fieldName: 'greWords',
  fieldNodes: [
    {
      kind: 'Field',
      name: { kind: 'Name', value: 'greWords', loc: { start: 19, end: 27 } },
      arguments: [],
      directives: [],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'id', loc: { start: 34, end: 36 } },
            arguments: [],
            directives: [],
            loc: { start: 34, end: 36 },
          },
          {
            kind: 'Field',
            name: {
              kind: 'Name',
              value: 'spelling',
              loc: { start: 41, end: 49 },
            },
            arguments: [],
            directives: [],
            loc: { start: 41, end: 49 },
          },
          {
            kind: 'Field',
            name: {
              kind: 'Name',
              value: 'createdAt',
              loc: { start: 54, end: 63 },
            },
            arguments: [],
            directives: [],
            loc: { start: 54, end: 63 },
          },
          {
            kind: 'Field',
            name: {
              kind: 'Name',
              value: 'updatedAt',
              loc: { start: 68, end: 77 },
            },
            arguments: [],
            directives: [],
            loc: { start: 68, end: 77 },
          },
          {
            kind: 'Field',
            name: {
              kind: 'Name',
              value: 'gptPrompts',
              loc: { start: 82, end: 92 },
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
                    value: 'input',
                    loc: { start: 101, end: 106 },
                  },
                  arguments: [],
                  directives: [],
                  loc: { start: 101, end: 106 },
                },
                {
                  kind: 'Field',
                  name: {
                    kind: 'Name',
                    value: 'createdAt',
                    loc: { start: 113, end: 122 },
                  },
                  arguments: [],
                  directives: [],
                  loc: { start: 113, end: 122 },
                },
                {
                  kind: 'Field',
                  name: {
                    kind: 'Name',
                    value: 'greWord',
                    loc: { start: 129, end: 136 },
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
                          loc: { start: 147, end: 157 },
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
                                loc: { start: 170, end: 172 },
                              },
                              arguments: [],
                              directives: [],
                              loc: { start: 170, end: 172 },
                            },
                          ],
                          loc: { start: 158, end: 182 },
                        },
                        loc: { start: 147, end: 182 },
                      },
                    ],
                    loc: { start: 137, end: 190 },
                  },
                  loc: { start: 129, end: 190 },
                },
              ],
              loc: { start: 93, end: 196 },
            },
            loc: { start: 82, end: 196 },
          },
        ],
        loc: { start: 28, end: 200 },
      },
      loc: { start: 19, end: 200 },
    },
  ],
  returnType: '[GreWord]',
  parentType: 'Query',
  path: { key: 'greWords', typename: 'Query' },
  schema: {
    __validationErrors: [],
    extensions: {
      nexus: {
        config: {
          types: {
            GptPromptObject: {
              name: 'GptPrompt',
              config: { name: 'GptPrompt' },
            },
            GptPromptQuery: {
              name: 'Query',
              config: { type: 'Query', name: 'Query' },
            },
            GreWordObject: { name: 'GreWord', config: { name: 'GreWord' } },
            GreWordQuery: {
              name: 'Query',
              config: { type: 'Query', name: 'Query' },
            },
            GreWordMutation: {
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
      GreWord: 'GreWord',
      Post: 'Post',
      Boolean: 'Boolean',
      Query: 'Query',
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
    name: { kind: 'Name', value: 'greWords', loc: { start: 6, end: 14 } },
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
            loc: { start: 19, end: 27 },
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
                  loc: { start: 34, end: 36 },
                },
                arguments: [],
                directives: [],
                loc: { start: 34, end: 36 },
              },
              {
                kind: 'Field',
                name: {
                  kind: 'Name',
                  value: 'spelling',
                  loc: { start: 41, end: 49 },
                },
                arguments: [],
                directives: [],
                loc: { start: 41, end: 49 },
              },
              {
                kind: 'Field',
                name: {
                  kind: 'Name',
                  value: 'createdAt',
                  loc: { start: 54, end: 63 },
                },
                arguments: [],
                directives: [],
                loc: { start: 54, end: 63 },
              },
              {
                kind: 'Field',
                name: {
                  kind: 'Name',
                  value: 'updatedAt',
                  loc: { start: 68, end: 77 },
                },
                arguments: [],
                directives: [],
                loc: { start: 68, end: 77 },
              },
              {
                kind: 'Field',
                name: {
                  kind: 'Name',
                  value: 'gptPrompts',
                  loc: { start: 82, end: 92 },
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
                        value: 'input',
                        loc: { start: 101, end: 106 },
                      },
                      arguments: [],
                      directives: [],
                      loc: { start: 101, end: 106 },
                    },
                    {
                      kind: 'Field',
                      name: {
                        kind: 'Name',
                        value: 'createdAt',
                        loc: { start: 113, end: 122 },
                      },
                      arguments: [],
                      directives: [],
                      loc: { start: 113, end: 122 },
                    },
                    {
                      kind: 'Field',
                      name: {
                        kind: 'Name',
                        value: 'greWord',
                        loc: { start: 129, end: 136 },
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
                              loc: { start: 147, end: 157 },
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
                                    loc: { start: 170, end: 172 },
                                  },
                                  arguments: [],
                                  directives: [],
                                  loc: { start: 170, end: 172 },
                                },
                              ],
                              loc: { start: 158, end: 182 },
                            },
                            loc: { start: 147, end: 182 },
                          },
                        ],
                        loc: { start: 137, end: 190 },
                      },
                      loc: { start: 129, end: 190 },
                    },
                  ],
                  loc: { start: 93, end: 196 },
                },
                loc: { start: 82, end: 196 },
              },
            ],
            loc: { start: 28, end: 200 },
          },
          loc: { start: 19, end: 200 },
        },
      ],
      loc: { start: 15, end: 203 },
    },
    loc: { start: 0, end: 203 },
  },
  variableValues: {},
  cacheControl: { cacheHint: {} },
};
export default sampleQueryInfo;
