// api/graphql/Post.ts

import { addDateFieldsDefinitions } from 'lib/graphqlUtils';
import { booleanArg, extendType, nonNull, objectType, stringArg } from 'nexus';

export const PostObject = objectType({
  name: 'Post', // <- Name of your type
  definition(t) {
    t.nonNull.string('id'); // <- Field named `id` of type `Int`
    t.string('title'); // <- Field named `title` of type `String`
    t.string('body'); // <- Field named `body` of type `String`
    t.boolean('isPublished'); // <- Field named `isPublished` of type `Boolean`
    addDateFieldsDefinitions(t);
  },
});

export const PostQuery = extendType({
  type: 'Query',
  definition(t) {
    t.list.field('drafts', {
      type: 'Post',
      async resolve(root, args, ctx) {
        const posts = await ctx.db.post.findMany({
          where: { isPublished: false },
        });
        return posts;
      },
    });
    t.list.field('posts', {
      type: 'Post',
      async resolve(root, args, ctx) {
        const posts = await ctx.db.post.findMany({
          where: { isPublished: true },
        });
        return posts;
      },
    });
    t.list.field('allPosts', {
      type: 'Post',
      args: {
        isPublished: nonNull(booleanArg()),
        token: stringArg(),
      },
      async resolve(root, args, ctx) {
        console.log('args.token', args.token);
        if (!args.token) {
          return [];
        }
        const posts = await ctx.db.post.findMany({
          where: { isPublished: args.isPublished },
        });
        return posts;
      },
    });
  },
});
export const PostMutation = extendType({
  type: 'Mutation',
  definition(t) {
    t.field('createDraft', {
      type: 'Post',
      args: {
        title: nonNull(stringArg()),
        body: nonNull(stringArg()),
      },
      async resolve(root, args, ctx) {
        const draft = {
          title: args.title,
          body: args.body,
          isPublished: false,
        };
        const post = await ctx.db.post.create({ data: draft });
        return post;
      },
    });
    t.field('publish', {
      type: 'Post',
      args: {
        draftId: nonNull(stringArg()),
      },
      async resolve(root, args, ctx) {
        const post = await ctx.db.post.update({
          where: {
            id: args.draftId,
          },
          data: {
            isPublished: true,
          },
        });
        return post;
      },
    });
  },
});
