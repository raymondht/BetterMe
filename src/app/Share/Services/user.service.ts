import {Injectable} from '@angular/core';
import { Subject} from 'rxjs';
import {AngularFireDatabase, AngularFireList, AngularFireObject} from 'angularfire2/database';
import {Attributes} from '../Models/attributes.model';
import {UserComment} from '../Models/comment.model';
import {map} from 'rxjs/operators';
import {Student} from '../Models/student.model';
import {User} from '../Models/user.model';
import {Teacher} from '../Models/teacher.model';

import { AmazonService } from './amazon.service';

@Injectable()

export class UserService {
  private usersRef: AngularFireList<any>;
  private userRef: AngularFireObject<any>;
  private user: User;
  private userKey: string;
  onUserInited = new Subject<User>();

  constructor(private db: AngularFireDatabase,
              private awsServ: AmazonService) {
    this.usersRef = this.db.list('users');
  }
  getUsersObserver() {
    // Use snapshotChanges().map() to store the key
    return  this.usersRef.snapshotChanges().pipe(
      map(changes =>
        changes.map(c => ({ key: c.payload.key, ...c.payload.val() }))
      )
    );
  }
  getUserFromDB(uid: string) {
    const sub = this.usersRef.snapshotChanges().pipe(
      map(changes =>
        changes.map(c => ({ key: c.payload.key, ...c.payload.val() }))
      )
    ).subscribe(
      (users) => {
        const userData = users.filter((user) => user.uid === uid)[0];
        this.userKey = userData.key;
        this.userRef = this.db.object('users/' + this.userKey);
        sub.unsubscribe();
        this.userRef.valueChanges().subscribe(
          (user: User) => {
            if (user.role === 'student') {
              this.user = Student.fromJson(user);
            } else if (user.role === 'teacher') {
              this.user = Teacher.fromJson(user);
            } else {
              alert('New Type of User');
            }
            // console.log('User in UserService: ', user);
            this.onUserInited.next(user);
          });
      }
    );
  }
  getUserKey() {
    const copiedKey = this.userKey;
    return copiedKey;
  }
  getUserId() {
    return this.user.getId();
  }
  getRole() {
    return this.user.getRole();
  }
  getUser() {
    const copiedUser = this.user;
    return copiedUser;
  }
  updateName( name: string) {
    this.user.updateName(name);
    this.userRef.update({name: this.user.name});
  }
  addFaculty(faculty: string) {
    this.user.addFaculty(faculty);
    this.userRef.update({faculties: this.user.faculties});
  }

  addUser(user: User ) {
    this.usersRef.push(user);
  }

  uploadUserImage(fileInput) {
    return new Promise((resolve, reject) => {
      const file = fileInput.target.files[0];
      const fileType = fileInput.target.files[0].type;
      const bucketName = 'feedme-user-images';
      this.awsServ.uploadFileToS3Bucket(bucketName, file, fileType).then(
        (imageURL: string) => {
          this.user.updateImageURL(imageURL);
          this.userRef.update({imageURL: this.user.imageURL});
          resolve(true)
        }
      ).catch((err) => {alert(err)} )
    })
  };
}
