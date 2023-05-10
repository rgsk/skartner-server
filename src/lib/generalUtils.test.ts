import { addDays } from 'date-fns';
import {
  deriveEntityArrayMapFromArray,
  deriveEntityMapFromArray,
  parseEntityDates,
} from './generalUtils';
test('deriveEntityMapFromArray', () => {
  const posts = [
    {
      id: '1',
      content: 'first',
    },
    {
      id: '2',
      content: 'second',
    },
    {
      id: '3',
      content: 'third',
    },
    {
      id: '4',
      content: 'fourth',
    },
  ];
  const postIds = ['4', '2', '1', '3'];
  const postIdToPostMap = deriveEntityMapFromArray(posts, (post) => post.id);
  const postsOrderedAccordingToPostIds = postIds.map((id) =>
    postIdToPostMap.get(id)
  );
  expect(postsOrderedAccordingToPostIds).toMatchInlineSnapshot(`
    Array [
      Object {
        "content": "fourth",
        "id": "4",
      },
      Object {
        "content": "second",
        "id": "2",
      },
      Object {
        "content": "first",
        "id": "1",
      },
      Object {
        "content": "third",
        "id": "3",
      },
    ]
  `);
});

test('deriveEntityArrayMapFromArray', () => {
  const posts = [
    {
      id: '1',
      content: 'first',
    },
    {
      id: '2',
      content: 'second',
    },
    {
      id: '1',
      content: 'first brother',
    },
    {
      id: '4',
      content: 'fourth',
    },
  ];
  const postIds = ['4', '2', '1'];
  const postIdToPostsMap = deriveEntityArrayMapFromArray(
    posts,
    (post) => post.id
  );
  const postsGroupedAccordingToPostIds = postIds.map((id) =>
    postIdToPostsMap.get(id)
  );
  expect(postsGroupedAccordingToPostIds).toMatchInlineSnapshot(`
    Array [
      Array [
        Object {
          "content": "fourth",
          "id": "4",
        },
      ],
      Array [
        Object {
          "content": "second",
          "id": "2",
        },
      ],
      Array [
        Object {
          "content": "first",
          "id": "1",
        },
        Object {
          "content": "first brother",
          "id": "1",
        },
      ],
    ]
  `);
});

test('parseEntityDates', () => {
  const samplePost = {
    id: 'fa94ff93-0f09-4578-93ed-6bc9db7d3414',
    title: 'second title',
    body: 'second body',
    isPublished: false,
    createdAt: new Date(Date.UTC(1999, 8, 6)),
    updatedAt: addDays(new Date(Date.UTC(1999, 8, 6)), 1),
  };

  expect(parseEntityDates(samplePost)).toMatchInlineSnapshot(`
    Object {
      "body": "second body",
      "createdAt": "1999-09-06T00:00:00.000Z",
      "id": "fa94ff93-0f09-4578-93ed-6bc9db7d3414",
      "isPublished": false,
      "title": "second title",
      "updatedAt": "1999-09-07T00:00:00.000Z",
    }
  `);
});
