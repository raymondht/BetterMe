import {Injectable} from '@angular/core';
import {Subject} from 'rxjs';
import {AngularFireDatabase, AngularFireList, AngularFireObject} from 'angularfire2/database';
import {Attributes} from '../Models/attributes.model';
import {UserComment} from '../Models/comment.model';
import {map} from 'rxjs/operators';
import {Student} from '../Models/student.model';
import {User} from '../Models/user.model';
import {Teacher} from '../Models/teacher.model';

@Injectable()

export class UserService {
  usersRef: AngularFireList<any>;
  attributesRef: AngularFireList<any>;
  commentsRef: AngularFireList<any>;
  user: User;
  onUserInited = new Subject<User>();
  constructor(private db: AngularFireDatabase) {
    this.attributesRef = this.db.list('attributes');
    this.commentsRef = this.db.list('comments');
    this.usersRef = this.db.list('users');
  }
  getUsersObserver() {
    // Use snapshotChanges().map() to store the key
    return this.usersRef.valueChanges();
  }
  getUserFromDB(uid: string) {
    this.usersRef.valueChanges().subscribe(
      (users: User[]) => {
        const userData = users.filter((user) => user.uid === uid)[0];
        if (userData.role === 'student') {
          this.user = Student.fromJson(userData);
        } else if (userData.role === 'teacher') {
          this.user = Teacher.fromJson(userData);
        } else {
          alert('New Type of User');
        }
        this.onUserInited.next(this.user);
      }
    );
  }
  getUserId() {
    return this.user.getId();
  }
  getUser() {
    const copiedUser = this.user;
    return copiedUser;
  }

  addUser(user: User ) {
    this.usersRef.push(user);
  }
  addAttribute(attributes: Attributes) {
    this.attributesRef.push(attributes);
  }
  addComment(comment: UserComment) {
    this.commentsRef.push(comment);
  }

  // Get attribute that only belongs to the given id
  getAttributesObservable(id: number) {
    this.attributesRef = this.db.list(`attributes`);
    return this.attributesRef.snapshotChanges().pipe(
      map(changes =>
        changes.map(c => ({ key: c.payload.key, ...c.payload.val() }))
          .filter(attribute => attribute.receiverId === id)
      )
    );
  }
  getCommentsObservable(id: number) {
    this.commentsRef = this.db.list(`comments`);
    return this.commentsRef.snapshotChanges().pipe(
      map(changes =>
        changes.map(c => ({ key: c.payload.key, ...c.payload.val() }))
          .filter(attribute => attribute.receiverId === id)
      )
    );
  }

}
