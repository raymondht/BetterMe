import { Component, OnInit } from '@angular/core';
import {NavigationService} from '../Share/Services/navigation.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  currentPage: string;
  constructor(private navService: NavigationService,
              private router: Router) { }

  ngOnInit() {
    this.navService.onNavigate.subscribe(
      (page: string) => {
        if (page === '/') {
          this.currentPage = 'Home';
        } else {
          this.currentPage = page.split('').slice(1).join('');
        }
      }
  );
  }

}
