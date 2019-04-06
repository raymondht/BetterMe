import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {NavigationService} from '../Share/Services/navigation.service';
import {AngularFireDatabase, AngularFireList} from 'angularfire2/database';

@Component({
  selector: 'app-feedback',
  templateUrl: './feedback.component.html',
  styleUrls: ['./feedback.component.css']
})
export class FeedbackComponent implements OnInit {
  role = null;
  usersRef: AngularFireList<any>;
  users: any[];
  constructor(private router: Router,
              private navServ: NavigationService,
              private route: ActivatedRoute,
              private db: AngularFireDatabase) {

  }

  ngOnInit() {
    this.role = this.route.snapshot.params.role;
    if (this.role) {
      this.getUsers(this.role);
    }
  }
  onSelectRole(role: string) {
    this.router.navigate([role], {relativeTo: this.route});
  }

  getUsers(role: string) {
    this.usersRef = this.db.list(role);
    // Use snapshotChanges().map() to store the key
    this.usersRef.valueChanges().subscribe(
      (users) => {
        this.users = users;
      }
    );
  }

}
