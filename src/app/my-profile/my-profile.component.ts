import { Component, OnInit } from '@angular/core';
import {AngularFireDatabase, AngularFireObject} from "angularfire2/database";
import {Student} from '../Share/Models/student.model';

import {firebaseConfig, firebaseDevConfig} from "../../environments/firebase.config"
import {environment} from '../../environments/environment.prod';
import {HttpClient} from '@angular/common/http';
import { UserComment} from '../Share/Models/comment.model';
import {Attribute} from '../Share/Models/attribute.model';
import {NavigationService} from '../Share/Services/navigation.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-my-profile',
  templateUrl: './my-profile.component.html',
  styleUrls: ['./my-profile.component.css']
})
export class MyProfileComponent implements OnInit {
  studentRef: AngularFireObject<any>;
  student: any;
  private firebaseCon =  environment.production ? firebaseConfig : firebaseDevConfig;

  constructor(private db: AngularFireDatabase,
              private httpClient: HttpClient,
              private navServ: NavigationService,
              private router: Router) {
    this.studentRef = db.object('students/-LbkwIR1U8WV4jRIopE2');
    // Use snapshotChanges().map() to store the key
    this.student = this.studentRef.valueChanges().subscribe(
      (student) => console.log(student)
    );
  }

  ngOnInit() {
    this.navServ.onNavigate.next(this.router.url);

    const student = new Student(
      '3243232g',
      'testingEmail',
      'student',
      27439607,
      'http://www.atlantichousefm.com/assets/img/CATLEY_LAKEMAN-Russell.jpg',
      'Steven Rogers',
      ['falcuty 1', 'falculty 2']
    );
    const attribute = new Attribute(
      '32214214214',
      '3243232g',
      'Focus',
      80
    );
    const comment = new UserComment(
      '32214214214',
      '3243232g',
      'Good',
      'Bad'
    );
    // this.studentsRef.push(student);
  }
}
