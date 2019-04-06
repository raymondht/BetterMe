import { Component, OnInit } from '@angular/core';
import {NavigationService} from '../Share/Services/navigation.service';

@Component({
  selector: 'app-tab-menu',
  templateUrl: './tab-menu.component.html',
  styleUrls: ['./tab-menu.component.css']
})
export class TabMenuComponent implements OnInit {

  constructor(private navServ: NavigationService) { }

  ngOnInit() {
  }
  onNavigateToPage(pageTitle: string) {
    this.navServ.onNavigate.next(pageTitle);
  }

}
