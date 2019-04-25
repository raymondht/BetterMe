import { Component, OnInit } from '@angular/core';
import {NgForm} from '@angular/forms';
import {AuthService} from '../auth.service';
import {Student} from '../../Share/Models/student.model';
import {UserService} from '../../Share/Services/user.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  errorMessage = '';
  selectedRole = null;
  isRoleNotSelected = false;
  isPasswordNotMatched = false;
  userPassword = '';

  constructor(private authServ: AuthService,
              private userServ: UserService,
              private router: Router) {
  }

  ngOnInit() {
  }

  onSignUp(form: NgForm) {
    const password = form.value.password;
    const confirm = form.value.confirmPassword;
    if (this.selectedRole === '') {
      this.isRoleNotSelected = true;
    } else if (password !== confirm) {
      this.isPasswordNotMatched = true;
    } else {
      this.isRoleNotSelected = false;
      this.isPasswordNotMatched = false;
      const email = form.value.email;
      const id = +form.value.id;
      this.authServ.signupUser(email, password).then(
        (res) => {
          if (this.selectedRole === 'student') {
           const student = new Student( res.user.uid, email, '', '', this.selectedRole, id, ['']);
           this.userServ.addUser(student);
           console.log('hey');
           this.router.navigate(['/registration']);
          }
        },
        (error) => {
          console.log('error', error);
          this.errorMessage = error.message;
        }
      );
    }
  }

  onSelectRole(event: any) {
    this.selectedRole = event.target.value;
  }
  checkConfirmPassword() {
  }
  changeToLogIn() {
    this.router.navigate(['authentication', 'login']);
  }
}
