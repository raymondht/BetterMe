import {Component, Input, OnInit} from '@angular/core';

import { UserComment} from '../../Share/Models/comment.model';
import {Router} from '@angular/router';
import {UserService} from '../../Share/Services/user.service';
import {User} from '../../Share/Models/user.model';
import {AttributeService} from '../../Share/Services/attribute.service';
import {CommentService} from '../../Share/Services/comment.service';
import { AmazonService } from '../../Share/Services/amazon.service';

@Component({
  selector: 'app-my-profile',
  templateUrl: './my-profile.component.html',
  styleUrls: ['./my-profile.component.css']
})
export class MyProfileComponent implements OnInit {
  user: User;
  attributeData = []; // in order;
  comments: UserComment[] = [];
  noOfFeedback: number;

  constructor(private userServ: UserService,
              private attributeServ: AttributeService,
              private commentServ: CommentService,
              private router: Router,
              private awsServ: AmazonService) {
  }


  ngOnInit() {
      this.userServ.onUserInited.subscribe(
        (user: User) => {
          this.user = user;
        }
      );
      this.attributeServ.onAttributesReady.subscribe(
        (attributeData: any[]) => {
          this.noOfFeedback = this.attributeServ.getNumberOfFeedback();
          this.attributeData = attributeData;
        }
      );
      this.commentServ.onCommentsReady.subscribe(
        (comments: UserComment[]) => {
          this.comments = comments.reverse();
        }
      );
    if (this.userServ.getUser())  {
      this.user = this.userServ.getUser();
      // Get attributes
      this.attributeData = this.attributeServ.getAttributes();
      // Get comments
      this.comments = this.commentServ.getComments();
    }
  }

}
