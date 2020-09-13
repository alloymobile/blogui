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
  constructor(post?: any) {
    if (post) {
      this.id = post.id;
      this.title = post.title;
      this.details = post.details;
      this.poster = post.poster;
      this.image = post.image;
      this.date = post.date;
      this.likes = post.likes;
    } else {
      this.id = 0;
      this.title = '';
      this.details = '';
      this.poster = '';
      this.image = '';
      this.date = '';
      this.likes = '';
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
export const TableName: any = {
  Category,
  Post,
  Tag,
  CommentUser,
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
