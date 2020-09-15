export class CategoryMetadata {
  id;
  name;
  constructor(category?: any) {
    if (category) {
      this.id = category.id;
      this.name = category.name;
    } else {
      this.id = 0;
      this.name = '';
    }
  }
}

export class CommentUserMetadata {
  id;
  name;
  constructor(commentuser?: any) {
    if (commentuser) {
      this.id = commentuser.id;
      this.name = commentuser.name;
    } else {
      this.id = 0;
      this.name = '';
    }
  }
}

export class PostMetadata {
  id;
  title;
  details;
  poster;
  image;
  date;
  likes;
  categoryId;
  postUserId;
  constructor(post?: any) {
    if (post) {
      this.id = post.id;
      this.title = post.title;
      this.details = post.details;
      this.poster = post.poster;
      this.image = post.image;
      this.date = post.date;
      this.likes = post.likes;
      this.categoryId = post.categoryId;
      this.postUserId = post.postUserId;
    } else {
      this.id = 0;
      this.title = '';
      this.details = '';
      this.poster = '';
      this.image = '';
      this.date = '';
      this.likes = '';
      this.categoryId = 0;
      this.postUserId = 0;
    }
  }
}

export class PostUserMetadata {
  id;
  name;
  email;
  password?;
  constructor(user?: any) {
    if (user) {
      this.id = user.id;
      this.name = user.name;
      this.email = user.email;
      user.password ? (this.password = user.password) : (this.password = '');
    } else {
      this.id = 0;
      this.name = '';
      this.email = '';
      this.password = '';
    }
  }
}

export class TagMetadata {
  id;
  name;
  constructor(tag?: any) {
    if (tag) {
      this.id = tag.id;
      this.name = tag.name;
    } else {
      this.id = 0;
      this.name = '';
    }
  }
}

export class CommentMetadata {
  id;
  details;
  postId;
  commentUserId;
  constructor(comment?: any) {
    if (comment) {
      this.id = comment.id;
      this.details = comment.details;
      this.postId = comment.postId;
      this.commentUserId = comment.commentUserId;
    } else {
      this.id = 0;
      this.details = '';
      this.postId = 0;
      this.commentUserId = 0;
    }
  }
}

export class PostTagMetadata {
  id;
  postId;
  tagId;
  constructor(postTag?: any) {
    if (postTag) {
      this.id = postTag.id;
      this.postId = postTag.postId;
      this.tagId = postTag.tagId;
    } else {
      this.id = 0;
      this.postId = 0;
      this.tagId = 0;
    }
  }
}

export const TableName: any = {
  CategoryMetadata,
  PostMetadata,
  PostUserMetadata,
  TagMetadata,
  CommentMetadata,
  CommentUserMetadata,
  PostTagMetadata,
};

export class TableDetailMetadata {
  constructor(className: string, opts?: any) {
    if (TableName[className] === undefined || TableName[className] === null) {
      throw new Error(`Class type of \'${className}\' is not a table`);
    }
    if (opts) {
      return new TableName[className](opts);
    } else {
      return new TableName[className]();
    }
  }
}
