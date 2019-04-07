import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {NavigationService} from '../Share/Services/navigation.service';
import {AngularFireDatabase, AngularFireList} from 'angularfire2/database';
import {Student} from '../Share/Models/student.model';
import {parseSelectorToR3Selector} from '@angular/compiler/src/core';
import {FeedbackService} from './feedback.service';
import {Attributes} from '../Share/Models/attributes.model';
import {UserComment} from '../Share/Models/comment.model';
import * as firebase from 'firebase';
import {DatabaseService} from '../Share/Services/database.service';
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
  role: string = null;
  usersRef: AngularFireList<any>;
  selectedId: number = null;
  users: any[];
  receiver: any;
  studentAttributeName = {
    attribute1: 'realistic',
    attribute2: 'optimistic',
    attribute3: 'independent',
    attribute4: 'teamPlayer',
    attribute5: 'listener',
    attribute6: 'speaker',
    attribute7: 'dedicated',
    attribute8: 'flexible',
    attribute9: 'calm',
    attribute10: 'energetic'
  };
  studentAttributePayload: Attributes = {
    giverId: null,
    receiverId: null,
    date: null,
    data: {
      realistic: 0,
      optimistic: 0,
      independent: 0,
      teamplayer: 0,
      listener: 0,
      speaker: 0,
      dedicated: 0,
      flexible: 0,
      calm: 0,
      energetic: 0
    }
  };

  teacherAttributeName = {
    slowPaced: 'Slow Paced',
    fastPaced: 'Fast Paced',
    oldFashioned: 'Old Fashioned',
    teachSavvy: 'Tech Savvy',
    quietLoud: 'Quiet',
    loud: 'Loud',
    laidBack: 'Laid Back',
    strict: 'Strict',
    preacher: 'Preacher',
    collaborator: 'Collaborator'
  };
  teacherAttributePayload: Attributes = {
    giverId: null,
    receiverId: null,
    date: null,
    data: {
      contributor: 0,
      leader: 0,
      independent: 0,
      teamplayer: 0,
      listener: 0,
      talker: 0,
      laidBack: 0,
      strict: 0,
      preacher: 0,
      collaborator: 0,
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
              private dbServ: DatabaseService,
              private snackBar: MatSnackBar,
              private _location: Location) {
  }

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      this.role = params['role'];
      this.selectedId = +params['id'];
      if (this.role && !this.selectedId) {
        this.dbServ.getUsersObserver(this.role).subscribe(
          (users) => {
            this.receiver ? this.receiver = null : this.receiver = null;
            this.users = users.filter(user => user.studId !== 27312625);
          }
        );
      } else if (this.role && this.selectedId) {
        this.onGetUserSub = this.dbServ.getUsersObserver(this.role).subscribe(
          (users) => {
            this.users = users.filter(user => user.studId !== 27312625);
            this.getUser(this.selectedId);
          }
        );
      } else {
        this.role = null;
        this.receiver = null;
        this.selectedId = null;
      }
    });

    this.feedbackServ.onAttributeValueChange.subscribe(
      (attribute: any) => {
        this.studentAttributePayload.data[attribute.targetName] = +attribute.targetValue;
        this.studentAttributePayload.data[attribute.nonTargetName] = +attribute.nonTargetValue;
        console.log('attribute here: ', this.studentAttributePayload);
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
      this.receiver = this.users.filter(user =>  user.studId === id )[0];
  }

  submitFeedback() {
    const date = new Date();
    const Day = `${date.getMonth() + 1}/${ date.getDate()}/${date.getFullYear()}`;
    if (this.pros.replace(/\s/g,"").length > 0 && this.cons.replace(/\s/g,"").length > 0 ){
      if (this.role === 'students') {
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
