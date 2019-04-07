import { Component, OnInit } from '@angular/core';
import {AngularFireDatabase, AngularFireObject, AngularFireList} from "angularfire2/database";
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
  studentsRef: AngularFireList<any>;
  student: Student;
  attributeData = []; // in order;
  comments: UserComment[];
  attributeDataOrder = ['realistic', 'independent', 'listener', 'dedicated', 'calm',
                        'optimistic', 'teamplayer', 'speaker', 'flexible', 'energetic' ];
  noOfFeedback: number;

  constructor(private dbServ: DatabaseService,
              private db: AngularFireDatabase,
              private httpClient: HttpClient,
              private navServ: NavigationService,
              private router: Router) {
    this.studentRef = db.object('students/-LboU8dsHcrvy0_BPP7_');
    this.studentsRef = db.list('students');

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
      'testing@gmail.com',
      'student',
      27312625,
      'https://images.askmen.com/1080x540/2016/01/25-021526-facebook_profile_picture_affects_chances_of_getting_hired.jpg',
      'Tester',
      ['Faculty of MonHack']
    );
    // this.studentsRef.push(student);
  }
  getAttributes(id: number) {
    this.dbServ.getAttributesObservable(id).subscribe(
      (attributes) => {
        console.log('before', attributes);
        this.noOfFeedback = attributes.length;
        if (this.attributeData.length > 0) {
          this.attributeData = [];
        }
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
        console.log('fasd', this.attributeData);
      }
    );
  }
  getComments(id: number) {
    this.dbServ.getCommentsObservable(id).subscribe(
      (comments) => {
        if (comments.length > 0) {
          this.comments = comments.reverse().slice(0, 5);
        }
      }
    );
  }
}
