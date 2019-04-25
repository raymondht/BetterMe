import { Component, OnInit } from '@angular/core';
import {NavigationService} from '../../Share/Services/navigation.service';
import {Router} from '@angular/router';
import {AuthService} from '../../authentication/auth.service';

@Component({
  selector: 'app-setting',
  templateUrl: './setting.component.html',
  styleUrls: ['./setting.component.css']
})
export class SettingComponent implements OnInit {

  constructor(private navServ: NavigationService,
              private router: Router,
              private authServ: AuthService) { }

  ngOnInit() {
    this.navServ.onNavigate.next(this.router.url);
  }
  logOut() {
    this.authServ.logOut();
  }

}
