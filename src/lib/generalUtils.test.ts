import {
  deriveEntityArrayMapFromArray,
  deriveEntityMapFromArray,
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
