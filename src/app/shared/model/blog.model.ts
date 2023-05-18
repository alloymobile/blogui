export class Category{
    id: string;
    name: string;
    icon: string;
    constructor(res?){
        if(res){
            this.id = res.id ? res.id : "";
            this.name = res.name ? res.name : "";
            this.icon = res.icon ? res.icon : "";
        }else{
            this.id =  "";
            this.name =  "";
            this.icon =  "";
        }
    }

    static getCategoryDTO(category: Category){
        return {
          id : category.id ?? "",
          name : category.name ?? "",
          icon : category.icon ?? ""
        }
      }
}

export class Blog{
    id: string;
    title: string;
    imageUrl: string;
    details: string;
    date: string;
    likes: number;
    constructor(res?){
        if(res){
            this.id = res.id ? res.id : "";
            this.title = res.title ? res.title : "";
            this.imageUrl = res.imageUrl ? res.imageUrl : "";
            this.details = res.details ? res.details : "";
            this.date = res.date ? res.date : "";
            this.likes = res.likes ? res.likes : 0;
        }else{
            this.id =  "";
            this.title =  "";
            this.imageUrl =  "";
            this.details =  "";
            this.date =  "";
            this.likes =  0;
        }
    }

    static getBlogDTO(blog: Blog){
        return {
            id : blog.id ?? "",
            title : blog.title ?? "",
            imageUrl : blog.imageUrl ?? "",
            details : blog.details ?? "",
            date : blog.date ?? "",
            likes : blog.likes ?? 0
        }
      }
}