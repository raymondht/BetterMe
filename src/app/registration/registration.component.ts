import { Component, OnInit } from '@angular/core';
import {UserService} from '../Share/Services/user.service';
import {Subscription} from 'rxjs';
import {AngularFireAuth} from 'angularfire2/auth';


@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {
  authStateSub: Subscription;
  constructor(private userServ: UserService,
              private af: AngularFireAuth) { }

  ngOnInit() {
    this.authStateSub = this.af.authState.subscribe(
      res =>  {
        res ? this.userServ.getUserFromDB(res.uid) : window.location.href = '/';
      },
      error => console.log(error)
    );
  }

}
