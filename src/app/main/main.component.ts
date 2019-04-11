import { Component, OnInit } from '@angular/core';
import {AngularFireAuth} from 'angularfire2/auth';
import {MainService} from './main.service';
import {UserService} from '../Share/Services/user.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {

  constructor(private af: AngularFireAuth,
              private mainServ: MainService,
              private userServ: UserService) { }

  ngOnInit() {
    this.af.authState.subscribe(
      res =>  {
        console.log(res);
        this.userServ.getUserFromDB(res.uid);
      },
      error => console.log(error)
    );
  }

}
