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
    contributor: 'Contributor',
    leader: 'Leader',
    independent: 'Independent',
    teamPlayer: 'Team Player',
    listener: 'Listener',
    talker: 'Talker',
    set: 'Set',
    flexibility: 'Flexibility',
    calm: 'Calm',
    energetic: 'Energetic'
  };
  studentAttributePayload: Attributes = {
    giverId: null,
    receiverId: null,
    data: {
      contributor: 0,
      leader: 0,
      independent: 0,
      teamPlayer: 0,
      listener: 0,
      talker: 0,
      set: 0,
      flexibility: 0,
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
    data: {
      contributor: 0,
      leader: 0,
      independent: 0,
      teamPlayer: 0,
      listener: 0,
      talker: 0,
      laidBack: 0,
      strict: 0,
      preacher: 0,
      collaborator: 0,
    }
  };
  commentPayload: UserComment;
  pros: string;
  cons: string;
  constructor(private router: Router,
              private navServ: NavigationService,
              private route: ActivatedRoute,
              private db: AngularFireDatabase,
              private feedbackServ: FeedbackService,
              private dbServ: DatabaseService,
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
            this.users = users;
          }
        );
      } else if (this.role && this.selectedId) {
        this.onGetUserSub = this.dbServ.getUsersObserver(this.role).subscribe(
          (users) => {
            this.users = users;
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
        console.log(this.studentAttributePayload);
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
    if (this.role === 'students') {
      this.studentAttributePayload.giverId = 27439607;
      this.studentAttributePayload.receiverId = this.selectedId;
      this.dbServ.addAttribute(this.studentAttributePayload);
    } else {
      this.teacherAttributePayload.giverId = 27439607;
      this.teacherAttributePayload.receiverId = this.selectedId;
      this.dbServ.addAttribute(this.teacherAttributePayload);
    }
    this.commentPayload = new UserComment(27439607, this.selectedId, this.pros, this.cons);
    this.dbServ.addComment(this.commentPayload);
    this._location.back();
    this.pros = null;
    this.cons = null;
  }
  ngOnDestroy() {
    this.onGetUserSub.unsubscribe();
  }

}
