import { Router } from '@angular/router';
import { PostUserService } from '../service/user.service';
import { DataService } from '../service/data.service';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  constructor(
    public data: DataService,
    private postUserService: PostUserService,
    private router: Router
  ) {}

  ngOnInit(): void {}

  userLogin(form: NgForm) {
    this.postUserService.login(this.data.loginUser).subscribe(
      (res) => {
        if (res) {
          localStorage.setItem('user', JSON.stringify(res));
          this.data.user = res;
          this.router.navigate(['/admin']);
        }
      },
      (error) => {}
    );
  }
}
