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

@Component({
  selector: 'app-my-profile',
  templateUrl: './my-profile.component.html',
  styleUrls: ['./my-profile.component.css']
})
export class MyProfileComponent implements OnInit {
  studentRef: AngularFireObject<any>;
  student: Student;
  private firebaseCon =  environment.production ? firebaseConfig : firebaseDevConfig;

  constructor(private db: AngularFireDatabase,
              private httpClient: HttpClient,
              private navServ: NavigationService,
              private router: Router) {
    this.studentRef = db.object('students/-LbkwIR1U8WV4jRIopE2');
    // Use snapshotChanges().map() to store the key
    this.studentRef.valueChanges().subscribe(
      (student) => this.student = student
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
    // this.studentsRef.push(student);
  }
}
