import { Component, OnInit } from '@angular/core';
import {NavigationService} from '../Share/Services/navigation.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-setting',
  templateUrl: './setting.component.html',
  styleUrls: ['./setting.component.css']
})
export class SettingComponent implements OnInit {

  constructor(private navServ: NavigationService,
              private router: Router) { }

  ngOnInit() {
    this.navServ.onNavigate.next(this.router.url);
  }

}
