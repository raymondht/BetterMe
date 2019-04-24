import {Component, Input, OnInit} from '@angular/core';
import {AngularFireDatabase, AngularFireObject, AngularFireList} from "angularfire2/database";

import { UserComment} from '../../Share/Models/comment.model';
import {Router} from '@angular/router';
import {UserService} from '../../Share/Services/user.service';
import {User} from '../../Share/Models/user.model';
import {AttributeService} from '../../Share/Services/attribute.service';
import {CommentService} from '../../Share/Services/comment.service';

@Component({
  selector: 'app-my-profile',
  templateUrl: './my-profile.component.html',
  styleUrls: ['./my-profile.component.css']
})
export class MyProfileComponent implements OnInit {
  userRef: AngularFireObject<any>;
  usersRef: AngularFireList<any>;
  user: User;
  attributeData = []; // in order;
  comments: UserComment[] = [];
  noOfFeedback: number;

  constructor(private userServ: UserService,
              private attributeServ: AttributeService,
              private commentServ: CommentService,
              private router: Router) {
  }

  ngOnInit() {
      this.userServ.onUserInited.subscribe(
        (user: User) => {
          this.user = user;
          // Get attributes
          this.attributeServ.getAttributesFromDB(this.user.role);
          // Get comments
          this.commentServ.getCommentsFromDB();
        }
      );
      this.attributeServ.onAttributesReady.subscribe(
        (attributeData: any[]) => {
          console.log('attribute update');
          this.attributeData = attributeData;
        }
      );
      this.commentServ.onCommentsReady.subscribe(
        (comments: UserComment[]) => {
          console.log('comments update');
          this.comments = comments;
        }
      );
    if (this.userServ.getUser())  {
      this.user = this.userServ.getUser();
      this.attributeData = this.attributeServ.getAttributes();
      // Get attributes
      // Get comments
      this.comments = this.commentServ.getComments();
    }
  }
}
