import { Address } from "./client.model";

export enum HomeStatus{
    HOME,UTILITY,PRIVACY,REVIEW,ACTIVE
}

export class Utility{
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

export class Home{
    id: string;
    ownerId: string;
    address: Address;
    details: string;
    imageUrl: string;
    status: HomeStatus;
    utilities: Utility[];
    constructor(res?){
        if(res){
            this.id = res.id ? res.id : "";
            this.ownerId = res.ownerId ? res.ownerId : "";
            this.address = res.address ? new Address(res.address) : new Address();
            this.details = res.details ? res.details : "";
            this.imageUrl = res.imageUrl ? res.imageUrl : "";
            this.status = res.status ? res.status : HomeStatus.HOME;
            this.utilities = res.utilities ? res.utilities.map(r => new Utility(r)) : [];
        }else{
            this.id =  "";
            this.ownerId =  "";
            this.address = new Address();
            this.details = "";
            this.imageUrl = "";
            this.status = HomeStatus.HOME;
            this.utilities = [];
        }
    }
}


