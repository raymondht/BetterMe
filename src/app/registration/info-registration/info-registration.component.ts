import { Component, OnInit } from '@angular/core';
import {NgForm} from '@angular/forms';
import {UserService} from '../../Share/Services/user.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-info-registration',
  templateUrl: './info-registration.component.html',
  styleUrls: ['./info-registration.component.css']
})
export class InfoRegistrationComponent implements OnInit {

  constructor(private userServ: UserService,
              private router: Router) { }

  ngOnInit() {
  }
  onInfoRegistered(form: NgForm) {
    const firstName = form.value.firstName;
    const lastName = form.value.lastName;
    const name = firstName + ' ' + lastName;
    this.userServ.updateName(name);
    const faculties = form.value.faculties.split(',');
    for (const faculty of faculties) {
      this.userServ.addFaculty(faculty);
    }
    this.router.navigate(['registration', 'image-registration']);
  }

}
