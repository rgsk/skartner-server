import { Post } from '@prisma/client';
import DataLoader from 'dataloader';
import { db } from 'db';
import { deriveEntityMapFromArray } from 'lib/generalUtils';

export function createPostsLoader() {
  return new DataLoader<string, Post>(async (ids) => {
    // data loader initialization
    const posts = await db.post.findMany({ where: { id: { in: [...ids] } } }); // get posts by ids
    const postsMap = deriveEntityMapFromArray(posts, (post: Post) => post.id); // get a map of posts
    return ids.map((id) => postsMap.get(id)); // map posts using their ids from keys.
  });
}

export async function runExampleDataLoader() {
  console.log('data loader hii');
  const postsLoader = createPostsLoader();
  const promises: Promise<Post>[] = [];
  promises.push(postsLoader.load('fa94ff93-0f09-4578-93ed-6bc9db7d3414'));
  promises.push(postsLoader.load('a178c487-b163-4f64-9de3-6cf5ae8652d4'));
  const [fa9, a17] = await Promise.allSettled(promises);
  console.log(fa9);
  console.log(a17);
}
