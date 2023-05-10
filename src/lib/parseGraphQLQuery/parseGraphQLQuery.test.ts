import parseGraphQLQuery from './parseGraphQLQuery';
import sampleQueryInfo from './sampleQueryInfo';

test('parseGraphQLQuery', () => {
  expect(parseGraphQLQuery(sampleQueryInfo)).toMatchInlineSnapshot(`
    Object {
      "orderBy": Object {},
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
      "skip": 0,
      "take": 100,
      "where": Object {},
    }
  `);
});
