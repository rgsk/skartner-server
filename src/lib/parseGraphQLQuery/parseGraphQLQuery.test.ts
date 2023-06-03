import parseGraphQLQuery from './parseGraphQLQuery';
import sampleQueryInfo, { fragmentTestingSamples } from './sampleQueryInfo';

test('parseGraphQLQuery', () => {
  expect(parseGraphQLQuery(sampleQueryInfo.info)).toMatchInlineSnapshot(`
    Object {
      "select": Object {
        "createdAt": true,
        "gptPrompts": Object {
          "select": Object {
            "createdAt": true,
            "greWord": Object {
              "select": Object {
                "gptPrompts": Object {
                  "select": Object {
                    "id": true,
                  },
                },
              },
            },
            "input": true,
          },
        },
        "id": true,
        "spelling": true,
        "updatedAt": true,
      },
    }
  `);
});

test('parseGraphQLQuery works for fragment', () => {
  const greWordsIdResult = `
  Object {
    "select": Object {
      "id": true,
    },
  }
`;
  expect(
    parseGraphQLQuery(fragmentTestingSamples.greWordsId.withoutFragment.info)
  ).toMatchInlineSnapshot(greWordsIdResult);
  expect(
    parseGraphQLQuery(fragmentTestingSamples.greWordsId.withFragment.info)
  ).toMatchInlineSnapshot(greWordsIdResult);

  const greWordsNestedResult = `
  Object {
    "select": Object {
      "createdAt": true,
      "gptPrompts": Object {
        "select": Object {
          "greWord": Object {
            "select": Object {
              "gptPrompts": Object {
                "select": Object {
                  "id": true,
                },
              },
              "id": true,
              "spelling": true,
              "user": Object {
                "select": Object {
                  "email": true,
                },
              },
            },
          },
          "id": true,
          "updatedAt": true,
        },
      },
      "id": true,
    },
  }
`;

  expect(
    parseGraphQLQuery(
      fragmentTestingSamples.greWordsNested.withoutFragment.info
    )
  ).toMatchInlineSnapshot(greWordsNestedResult);

  expect(
    parseGraphQLQuery(fragmentTestingSamples.greWordsNested.withFragment.info)
  ).toMatchInlineSnapshot(greWordsNestedResult);

  const greWordsDoubleFragmentResult = `
Object {
  "select": Object {
    "gptPrompts": Object {
      "select": Object {
        "id": true,
        "input": true,
        "response": true,
      },
    },
    "id": true,
    "spelling": true,
  },
}
`;
  expect(
    parseGraphQLQuery(
      fragmentTestingSamples.greWordsDoubleFragment.withoutFragment.info
    )
  ).toMatchInlineSnapshot(greWordsDoubleFragmentResult);

  expect(
    parseGraphQLQuery(
      fragmentTestingSamples.greWordsDoubleFragment.withFragment.info
    )
  ).toMatchInlineSnapshot(greWordsDoubleFragmentResult);
});
