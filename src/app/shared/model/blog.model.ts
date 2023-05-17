export class Category{
    id: string;
    name: string;
    constructor(res?){
        if(res){
            this.id = res.id ? res.id : "";
            this.name = res.name ? res.name : "";
        }else{
            this.id =  "";
            this.name =  "";
        }
    }
}