
export class Client{
  id: string;
  name: string;
  email: string;
  password: string;
  code: string;
  phone: string;
  token: string;
  status: string;
  apiKey: string;
  roles: Role[];
  addresses: Address[];

  constructor(response?: any){
      if(response){
          this.id = response.id ? response.id : "";
          this.name = response.name ?  response.name : "";
          this.email = response.email ? response.email : "";
          this.password = response.password ? response.password : "";
          this.code = response.code ? response.code : "";
          this.apiKey = response.apiKey ? response.apiKey : "";
          this.phone = response.phone ? response.phone : "";
          this.token = response.token ? response.token : "";
          this.status = response.status ? response.status : "REQUESTED";
          this.roles = response.roles ? response.roles.map(r=>new Role(r)) : [];
          this.addresses = response.addresses ? response.addresses.map(a=>new Address(a)) : [];
      }else{
          this.id = "";
          this.name = "";
          this.email = "";
          this.password = "";
          this.code = "";
          this.phone = "";
          this.token = "";
          this.apiKey = "";
          this.status = "REQUESTED";
          this.roles = [];
          this.addresses = [];
      }
  }

  static getClientDTO(client: Client){
    return {
      id : client.id ?? "",
      name : client.name ?? "",
      email: client.email ?? "",
      phone: client.phone ?? "",
      status: client.status ?? ""
    }
  }

  static addClientDTO(client: Client){
    return {
      email: client.email
    }
  }

  static newClientDTO(client: Client){
    return {
      id : client.id,
      name : client.name,
      email: client.email,
      password: client.password
    }
  }

  static createLoginDTO(client) {
    return {
      email: client.email,
      password: client.password
    };
  }

  static createCodeDTO(client) {
    return {
      email: client.email,
      password: client.password,
      code: client.code
    };
  }
}

export class Role{
  id: number;
  name: string;
  selected: boolean;
  link: string;
  constructor(response?: any){
      if(response){
          this.id = response.id ? response.id : 0 ;
          this.name = response.name ? response.name : "" ;
          this.link = response.name ? Role.getRoleLink(response.name) : "/client" ;
          this.selected = response.selected ? response.selected : false;
      }else{
          this.id = 0;
          this.name = "";
          this.link = "/client" ;
          this.selected = false;
      }
  }

  static getRoleDTO(role: Role){
    return {
      id : role.id ?? "",
      name : role.name ?? ""
    }
  }

  static getRoleLink(name){
    switch(name){
      case 'ROLE_ADMIN':
        return '/admin';
      case 'ROLE_CLIENT':
        return '/client'; 
      case 'ROLE_OWNER':
        return '/owner';   
      default:
        return '/client';
    }
  }
}

export class Address{
  id: string;
  type: AddressType;
  address: string;
  city: string;
  province: string;
  postalCode: string;
  country: string;
  // location: Location;
  constructor(response?: any){
      if(response){
          this.id = response.id ? response.id : "";
          this.type = response.type ? response.type : AddressType.HOME;
          this.address= response.address ? response.address : "";
          this.city= response.city ? response.city : "";
          this.province = response.province ? response.province : "";
          this.postalCode= response.postalCode ? response.postalCode : "";
          this.country= response.country ? response.country : "";
          // this.location = response.location ? new Location(response.location) : new Location();
      }else{
        this.id = "";
        this.type = AddressType.HOME;
        this.address = "";
        this.city = "";
        this.province = "";
        this.postalCode = "";
        this.country = "";
        // this.location = new Location();
      }
  }
  static getAddressDTO(address){
    return {
      id : address.id ?? "",
      type: "HOME",
      address : address.address ?? "",
      city: address.city ?? "",
      province: address.province ?? "",
      postalCode: address.postalCode ?? "",
      country: address.country ?? ""
    }
  }
}

export enum AddressType{
  HOME,SHIPPING,BILLING,OFFICE,STORE
}

export class Location{
  type: string;
  coordinates: number[];
  constructor(response?: any){
    if(response){
        this.type = response.type ? response.type : "" ;
        this.coordinates = response.coordinates ? response.coordinates : [];
    }else{
      this.type = "" ;
      this.coordinates = [];
    }
  }
}


