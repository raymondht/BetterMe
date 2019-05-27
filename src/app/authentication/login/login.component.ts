import { Component, OnInit } from '@angular/core';
import {NgForm} from '@angular/forms';
import {AuthService} from '../auth.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  errorMessage = '';

  constructor(private authServ: AuthService,
              private router: Router) { }

  ngOnInit() {
  }

  onLogIn(form: NgForm) {
    const email = form.value.email;
    const password = form.value.password;
    this.authServ.logInUser(email, password).then(
      (res) => {
        console.log(res);
        this.router.navigate(['/main']);
      },
      (error) => {
        console.log(error);
        this.errorMessage = error.message;
      }
    );
  }
  changeToSignUp() {
    this.router.navigate(['/authentication', 'signup']);
  }

}
