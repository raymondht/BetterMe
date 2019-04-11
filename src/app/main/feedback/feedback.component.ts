import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {NavigationService} from '../../Share/Services/navigation.service';
import {AngularFireDatabase, AngularFireList} from 'angularfire2/database';
import {Student} from '../../Share/Models/student.model';
import {parseSelectorToR3Selector} from '@angular/compiler/src/core';
import {FeedbackService} from './feedback.service';
import {Attributes} from '../../Share/Models/attributes.model';
import {UserComment} from '../../Share/Models/comment.model';
import * as firebase from 'firebase';
import {UserService} from '../../Share/Services/user.service';
import {Location} from '@angular/common';
import {Subscription} from 'rxjs';
import {MatSnackBar} from '@angular/material';

@Component({
  selector: 'app-feedback',
  templateUrl: './feedback.component.html',
  styleUrls: ['./feedback.component.css']
})
export class FeedbackComponent implements OnInit, OnDestroy {
  onGetUserSub: Subscription;
  selectedRole: string;
  selectedId: number = null;
  users: any[];
  receiver: any = null;
  studentAttributeName = Student.attributeNames;
  studentAttributePayload: Attributes = {
    giverId: null,
    receiverId: null,
    date: null,
    data: {
     ...Student.getAttributeDataObj()
    }
  };
  teacherAttributeName = Student.attributeNames;
  teacherAttributePayload: Attributes = {
    giverId: null,
    receiverId: null,
    date: null,
    data: {
      ...Student.getAttributeDataObj()
    }
  };
  commentPayload: UserComment;
  pros = '';
  cons = '';
  filterUser = '';
  constructor(private router: Router,
              private navServ: NavigationService,
              private route: ActivatedRoute,
              private db: AngularFireDatabase,
              private feedbackServ: FeedbackService,
              private dbServ: UserService,
              private snackBar: MatSnackBar,
              private _location: Location,
              private userServ: UserService
  ) {
  }

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      this.selectedRole = params['role'];
      this.selectedId = +params['id'];
      if (this.selectedRole && !this.selectedId) {
        this.dbServ.getUsersObserver().subscribe(
          (users) => {
            const currentUserId = this.userServ.getUserId();
            console.log(currentUserId);
            this.users = users.filter(user => user.id !== 27439607 && user.role === this.selectedRole);
            console.log(this.users);
          }
        );
      } else if (this.selectedId) {
        this.onGetUserSub = this.dbServ.getUsersObserver().subscribe(
          (users) => {
            this.users = users.filter(user => user.id !== 27439707 && user.role === this.selectedRole);
            this.getUser(this.selectedId);
          }
        );
      } else {
        this.selectedRole = null;
        this.receiver = null;
        this.selectedId = null;
      }
    });

    this.feedbackServ.onAttributeValueChange.subscribe(
      (attribute: any) => {
        this.studentAttributePayload.data[attribute.targetName] = +attribute.targetValue;
        this.studentAttributePayload.data[attribute.nonTargetName] = +attribute.nonTargetValue;
      }
    );
  }

  onSelectRole(role: string) {
    this.router.navigate([], {queryParams: {role: role}, relativeTo: this.route});
  }
  selectUser(id: number) {
    this.router.navigate( [], {queryParams: {id: id}, queryParamsHandling: 'merge', relativeTo: this.route});
  }

  getUser(id: number) {
      this.receiver = this.users.filter(user =>  user.id === id )[0];
  }

  submitFeedback() {
    const date = new Date();
    const Day = `${date.getMonth() + 1}/${ date.getDate()}/${date.getFullYear()}`;
    if (this.pros.replace(/\s/g,"").length > 0 &&
      this.cons.replace(/\s/g,"").length > 0 ) {
      if (this.selectedRole === 'student') {
        this.studentAttributePayload.giverId = 27312625;
        this.studentAttributePayload.receiverId = this.selectedId;
        this.studentAttributePayload.date = Day;
        this.dbServ.addAttribute(this.studentAttributePayload);
      } else {
        this.teacherAttributePayload.giverId = 27312625;
        this.teacherAttributePayload.receiverId = this.selectedId;
        this.teacherAttributePayload.date = Day;
        this.dbServ.addAttribute(this.teacherAttributePayload);
      }
      this.commentPayload = new UserComment(27312625, this.selectedId, Day, this.pros, this.cons);
      this.dbServ.addComment(this.commentPayload);
      this._location.back();
      this.pros = null;
      this.cons = null;
      this.snackBar.open('Success! Feedback sent', undefined, {
        duration: 2000
      });
      this.receiver = null;
    } else {
      alert('Please leave your comments to help the receiver improve');
    }
  }

  ngOnDestroy() {
    if (this.onGetUserSub) {
      this.onGetUserSub.unsubscribe();
    }
  }

}
