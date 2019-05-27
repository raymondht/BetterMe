import {Component, OnDestroy, OnInit} from '@angular/core';
import {AngularFireAuth} from 'angularfire2/auth';
import {MainService} from './main.service';
import {UserService} from '../Share/Services/user.service';
import {Router} from '@angular/router';
import {Subscription} from 'rxjs';
import {AttributeService} from '../Share/Services/attribute.service';
import {CommentService} from '../Share/Services/comment.service';
import {User} from '../Share/Models/user.model';
import {AuthService} from '../authentication/auth.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit, OnDestroy {
  authStateSub: Subscription;
  constructor(private af: AngularFireAuth,
              private mainServ: MainService,
              private userServ: UserService,
              private attributeServ: AttributeService,
              private commentServ: CommentService,
              private authServ: AuthService) { }

  ngOnInit() {
    this.authStateSub = this.af.authState.subscribe(
      (res: any) =>  {
        if (res) {
          const tokenExpirationTime = res.h.c;
          // Check if the token is expired
          const currentTime = Date.now();
          if (currentTime < tokenExpirationTime ) {
            this.userServ.getUserFromDB(res.uid);
          } else {
            alert('Your token has been expired, please login again');
            this.authServ.logOut();
          }
        } else {
          this.authServ.logOut();
          window.location.href = '/';
        }
      },
      error => console.log(error)
    );
    this.userServ.onUserInited.subscribe(
      (user: User) => {
        // Get attributes
        this.attributeServ.getAttributesFromDB(user.role);
        // Get comments
        this.commentServ.getCommentsFromDB();
      }
    );
  }
  ngOnDestroy() {
    this.authStateSub.unsubscribe();
  }

}
