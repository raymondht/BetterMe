import {Component, OnDestroy, OnInit} from '@angular/core';
import {AngularFireAuth} from 'angularfire2/auth';
import {MainService} from './main.service';
import {UserService} from '../Share/Services/user.service';
import {Router} from '@angular/router';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit, OnDestroy {
  authStateSub: Subscription;
  constructor(private af: AngularFireAuth,
              private mainServ: MainService,
              private userServ: UserService) { }

  ngOnInit() {
    this.authStateSub = this.af.authState.subscribe(
      res =>  {
         res ? this.userServ.getUserFromDB(res.uid) : window.location.href = '/';
      },
      error => console.log(error)
    );
  }
  ngOnDestroy() {
    this.authStateSub.unsubscribe();
  }

}
