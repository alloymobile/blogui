export class Category {
  id: number;
  name: string;
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

export class CommentUser {
  id: number;
  name: string;
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

export class Post {
  id: number;
  title: string;
  details: string;
  poster: string;
  image: string;
  date: string;
  likes: string;
  categoryId: Category;
  postUserId: PostUser;
  constructor(post?: any) {
    if (post) {
      this.id = post.id;
      this.title = post.title;
      this.details = post.details;
      this.poster = post.poster;
      this.image = post.image;
      this.date = post.date;
      this.likes = post.likes;
      this.categoryId = new Category(post.categoryId);
      this.postUserId = new PostUser(post.postUserId);
    } else {
      this.id = 0;
      this.title = '';
      this.details = '';
      this.poster = '';
      this.image = '';
      this.date = '';
      this.likes = '';
      this.categoryId = new Category();
      this.postUserId = new PostUser();
    }
  }
}

export class PostUser {
  id: number;
  name: string;
  email: string;
  password?: string;
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

export class Tag {
  id: number;
  name: string;
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

export class Comment {
  id: number;
  details: string;
  postId: Post;
  commentUserId: CommentUser;
  constructor(comment?: any) {
    if (comment) {
      this.id = comment.id;
      this.details = comment.details;
      this.postId = new Post(comment.postId);
      this.commentUserId = new CommentUser(comment.commentUserId);
    } else {
      this.id = 0;
      this.details = '';
      this.postId = new Post();
      this.commentUserId = new CommentUser();
    }
  }
}

export class PostTag {
  id: number;
  postId: Post;
  tagId: Tag;
  constructor(postTag?: any) {
    if (postTag) {
      this.id = postTag.id;
      this.postId = new Post(postTag.postId);
      this.tagId = new Tag(postTag.tagId);
    } else {
      this.id = 0;
      this.postId = new Post();
      this.tagId = new Tag();
    }
  }
}

export const TableName: any = {
  Category,
  Post,
  PostUser,
  Tag,
  Comment,
  CommentUser,
  PostTag,
};

export class Table {
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
