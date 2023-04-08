// tests/Post.test.ts
import { createTestContext } from './__helpers';
const ctx = createTestContext();
it('ensures that a draft can be created and isPublished', async () => {
  // Create a new draft
  const draftResult = await ctx.client.request(`            # 1
    mutation {
      createDraft(title: "Nexus", body: "...") {            # 2
        id
        title
        body
        isPublished
      }
    }
  `);
  // Snapshot that draft and expect `isPublished` to be false
  console.log(draftResult);

  // Publish the previously created draft
  const publishResult = await ctx.client.request(
    `
        mutation publishDraft($draftId: String!) {
          publish(draftId: $draftId) {
            id
            title
            body
            isPublished
          }
        }
      `,
    { draftId: draftResult.createDraft.id }
  );

  console.log(publishResult);

  // Snapshot the isPublished draft and expect `isPublished` to be true

  const persistedData = await ctx.db.post.findMany();
  console.log(persistedData);
});
