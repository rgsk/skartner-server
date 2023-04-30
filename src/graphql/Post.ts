// api/graphql/Post.ts

import { parseEntitiesDates, parseEntityDates } from 'lib/generalUtils';
import { booleanArg, extendType, nonNull, objectType, stringArg } from 'nexus';

export const Post = objectType({
  name: 'Post', // <- Name of your type
  definition(t) {
    t.nonNull.string('id'); // <- Field named `id` of type `Int`
    t.string('title'); // <- Field named `title` of type `String`
    t.string('body'); // <- Field named `body` of type `String`
    t.boolean('isPublished'); // <- Field named `isPublished` of type `Boolean`
    t.string('createdAt');
    t.string('updatedAt');
  },
});

export const PostQuery = extendType({
  type: 'Query',
  definition(t) {
    t.list.field('drafts', {
      type: 'Post',
      async resolve(_root, _args, ctx) {
        const posts = await ctx.db.post.findMany({
          where: { isPublished: false },
        });
        return parseEntitiesDates(posts);
      },
    });
    t.list.field('posts', {
      type: 'Post',
      async resolve(_root, _args, ctx) {
        const posts = await ctx.db.post.findMany({
          where: { isPublished: true },
        });
        return parseEntitiesDates(posts);
      },
    });
    t.list.field('allPosts', {
      type: 'Post',
      args: {
        isPublished: nonNull(booleanArg()),
        token: stringArg(),
      },
      async resolve(_root, _args, ctx) {
        console.log('_args.token', _args.token);
        if (!_args.token) {
          return [];
        }
        const posts = await ctx.db.post.findMany({
          where: { isPublished: _args.isPublished },
        });
        return parseEntitiesDates(posts);
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
      async resolve(_root, args, ctx) {
        const draft = {
          title: args.title,
          body: args.body,
          isPublished: false,
        };
        const post = await ctx.db.post.create({ data: draft });
        return parseEntityDates(post);
      },
    });
    t.field('publish', {
      type: 'Post',
      args: {
        draftId: nonNull(stringArg()),
      },
      async resolve(_root, args, ctx) {
        const post = await ctx.db.post.update({
          where: {
            id: args.draftId,
          },
          data: {
            isPublished: true,
          },
        });
        return parseEntityDates(post);
      },
    });
  },
});
