// tests/Post.test.ts
import { createTestContext } from './__helpers';
const ctx = createTestContext();
it('ensures that a draft can be created and published', async () => {
  // Create a new draft
  const draftResult = await ctx.client.request(`            # 1
    mutation {
      createDraft(title: "Nexus", body: "...") {            # 2
        id
        title
        body
        published
      }
    }
  `);
  // Snapshot that draft and expect `published` to be false
  console.log(draftResult);
  expect(draftResult).toMatchInlineSnapshot(`
Object {
  "createDraft": Object {
    "body": "...",
    "id": 9,
    "published": false,
    "title": "Nexus",
  },
}
`); // 3
  // Publish the previously created draft
  const publishResult = await ctx.client.request(
    `
        mutation publishDraft($draftId: Int!) {
          publish(draftId: $draftId) {
            id
            title
            body
            published
          }
        }
      `,
    { draftId: draftResult.createDraft.id }
  );

  console.log(publishResult);

  // Snapshot the published draft and expect `published` to be true
  expect(publishResult).toMatchInlineSnapshot(`
Object {
  "publish": Object {
    "body": "...",
    "id": 9,
    "published": true,
    "title": "Nexus",
  },
}
`);

  const persistedData = await ctx.db.post.findMany();
  expect(persistedData).toMatchInlineSnapshot(`
Array [
  Object {
    "body": "This is body of Rahul",
    "id": 1,
    "published": false,
    "title": "Rahul is great",
  },
  Object {
    "body": "This is body of Rahul",
    "id": 2,
    "published": false,
    "title": "Rahul is great",
  },
  Object {
    "body": "...",
    "id": 3,
    "published": false,
    "title": "Nexus",
  },
  Object {
    "body": "...",
    "id": 4,
    "published": false,
    "title": "Nexus",
  },
  Object {
    "body": "...",
    "id": 5,
    "published": false,
    "title": "Nexus",
  },
  Object {
    "body": "...",
    "id": 6,
    "published": false,
    "title": "Nexus",
  },
  Object {
    "body": "...",
    "id": 7,
    "published": false,
    "title": "Nexus",
  },
  Object {
    "body": "...",
    "id": 8,
    "published": true,
    "title": "Nexus",
  },
  Object {
    "body": "...",
    "id": 9,
    "published": true,
    "title": "Nexus",
  },
]
`);
});
