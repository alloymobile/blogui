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

export class Post {
  id: number;
  title: string;
  constructor(post?: any) {
    if (post) {
      this.id = post.id;
      this.title = post.title;
    } else {
      this.id = 0;
      this.title = '';
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
