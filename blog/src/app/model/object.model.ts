import { TextMetadata, NumberMetaData } from './datatype.model';
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

export class CategoryMetadata {
  id: NumberMetaData;
  name: TextMetadata;
  constructor(metadata?: any) {
    if (metadata) {
      this.id = new NumberMetaData(metadata.id);
      this.name = new TextMetadata(metadata.name);
    } else {
      this.id = new NumberMetaData();
      this.name = new TextMetadata();
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
  categoryId: number;
  postUserId: number;
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

export class PostMetadata {
  id: NumberMetaData;
  title: TextMetadata;
  constructor(metadata?: any) {
    if (metadata) {
      this.id = new NumberMetaData(metadata.id);
      this.title = new TextMetadata(metadata.title);
    } else {
      this.id = new NumberMetaData();
      this.title = new TextMetadata();
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
  CategoryMetadata,
  Post,
  PostMetadata,
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
