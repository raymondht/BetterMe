import { Component, OnInit } from '@angular/core';
import {AngularFireDatabase, AngularFireObject} from "angularfire2/database";
import {Student} from '../Share/Models/student.model';

import {firebaseConfig, firebaseDevConfig} from "../../environments/firebase.config"
import {environment} from '../../environments/environment.prod';
import {HttpClient} from '@angular/common/http';
import { UserComment} from '../Share/Models/comment.model';
import {Attributes} from '../Share/Models/attributes.model';
import {NavigationService} from '../Share/Services/navigation.service';
import {Router} from '@angular/router';
import Database = firebase.database.Database;
import {DatabaseService} from '../Share/Services/database.service';

@Component({
  selector: 'app-my-profile',
  templateUrl: './my-profile.component.html',
  styleUrls: ['./my-profile.component.css']
})
export class MyProfileComponent implements OnInit {
  studentRef: AngularFireObject<any>;
  student: Student;
  attributeData = []; // in order;
  comments : UserComment[];
  attributeDataOrder = ['contributor', 'leader', 'independent', 'teamPlayer', 'listener', 'talker', 'set', 'flexibility', 'calm', 'energetic' ];
  private firebaseCon =  environment.production ? firebaseConfig : firebaseDevConfig;

  constructor(private dbServ: DatabaseService,
              private db: AngularFireDatabase,
              private httpClient: HttpClient,
              private navServ: NavigationService,
              private router: Router) {
    this.studentRef = db.object('students/-LbkwIR1U8WV4jRIopE2');
    // Get attributes
    this.studentRef.valueChanges().subscribe(
      (student) => {
        this.student = student;
        // Get attributes
        this.getAttributes(student.studId);
        // Get comments
        this.getComments(student.studId);
      }
    );
  }

  ngOnInit() {
    this.navServ.onNavigate.next(this.router.url);

    const student = new Student(
      'testingEmail',
      'student',
      27439607,
      'http://www.atlantichousefm.com/assets/img/CATLEY_LAKEMAN-Russell.jpg',
      'Steven Rogers',
      ['falcuty 1', 'falculty 2']
    );

  }
  getAttributes(id: number) {
    this.dbServ.getAttributesObservable(this.student.studId).subscribe(
      (attributes) => {
        const dataAttributes = attributes.reduce((newArr, attribute) => {
          return newArr.concat(attribute.data);
        }, []);
        // Create an object whose keys are the average.
        const averageObj = {...dataAttributes[0]};
        for (let i = 1; i < dataAttributes.length; i++) {
          for (const key of Object.keys(averageObj)) {
            averageObj[key] += dataAttributes[i][key];
            // Calculate the average when this is the last item of dataAttribute
            if (i === dataAttributes.length - 1 ) {
              averageObj[key] = averageObj[key] / dataAttributes.length;
            }
          }
        }
        // Map the value into an array in a correct order
        for (let i = 0; i < this.attributeDataOrder.length; i ++) {
          this.attributeData.push(averageObj[this.attributeDataOrder[i]]);
        }
      }
    );
  }
  getComments(id: number) {
    this.dbServ.getCommentsObservable(id).subscribe(
      (comments) => {
        console.log('comments: ', comments);
        this.comments = comments;
      }
    );
  }
}
