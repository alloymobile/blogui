export class User {
  id?: number;
  name?: string;
  email: string;
  password?: string;
  token?: string;
  username?: string;
  constructor(user?: any) {
    if (user) {
      user.id ? (this.id = user.id) : 0;
      user.name ? (this.name = user.name) : '';
      this.email = user.email;
      user.password ? (this.password = user.password) : '';
      user.token ? (this.token = user.token) : '';
      user.userName ? (this.username = user.userName) : '';
    } else {
      this.id = 0;
      this.name = '';
      this.email = '';
      this.password = '';
      this.token = '';
      this.username = '';
    }
  }
}

export class Login {
  email: string;
  password: string;
  constructor(user?: any) {
    if (user) {
      this.email = user.email;
      this.password = user.password;
    } else {
      this.email = '';
      this.password = '';
    }
  }
}
