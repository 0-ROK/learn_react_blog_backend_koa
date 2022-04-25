let postId = 1;

const posts = [
  {
    id: 1,
    title: '제목',
    body: '내용',
  },
];

// write 함수 export. 넘겨받은 컨텍스트 넘겨줌.
exports.write = (ctx) => {
  const { title, body } = ctx.request.body;
  postId += 1;
  const post = { id: postId, title, body };
  posts.push(post);
  ctx.body = post;
};

exports.list = (ctx) => {
  ctx.body = posts;
};

// GET /api/posts/:id
exports.read = (ctx) => {
  const { id } = ctx.params;
  const post = posts.find((p) => p.id.toString() === id);
  if (!post) {
    ctx.status = 404;
    ctx.body = {
      message: '포스트 존재 안함',
    };
    return;
  }
  ctx.body = post;
};
// DELETE /api/posts/:id
exports.remove = (ctx) => {
  const { id } = ctx.params;
  const { index } = posts.findIndex((p) => p.id.toString() === id);
  if (index === -1) {
    ctx.status = 404;
    ctx.body = {
      message: '포스트 존재 안 함.',
    };
    return;
  }
  posts.splice(index, 1);
  ctx.status = 204;
};

// PUT /api/posts/:id
exports.replace = (ctx) => {
  const { id } = ctx.params;
  const index = posts.findIndex((p) => p.id.toString() === id);
  if (index === -1) {
    ctx.status = 404;
    ctx.body = {
      message: '포스트 존재 안함',
    };
    return;
  }
  posts[index] = {
    id,
    ...ctx.request.body,
  };
  ctx.body = posts[index];
};

// PATCH /api/posts/:id
exports.update = (ctx) => {
  const { id } = ctx.params;

  const index = posts.findIndex((p) => p.id.toString() === id);

  if (index === -1) {
    ctx.status = 404;
    ctx.body = {
      message: '포스트가 존재하지 않습니다.',
    };
    return;
  }

  posts[index] = {
    ...posts[index],
    ...ctx.request.body,
  };
  ctx.body = posts[index];
};
