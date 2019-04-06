import {Injectable} from '@angular/core';
import {Subject} from 'rxjs';
import {AngularFireDatabase, AngularFireList, AngularFireObject} from 'angularfire2/database';
import {Attributes} from '../Models/attributes.model';
import {UserComment} from '../Models/comment.model';

@Injectable()

export class DatabaseService {
  usersRef: AngularFireList<any>;
  attributesRef: AngularFireList<any>;
  commentsRef: AngularFireList<any>;
  constructor(private db: AngularFireDatabase) {
    this.attributesRef = this.db.list('attributes');
    this.commentsRef = this.db.list('comments');
  }
  getUsersObserver(role: string) {
    this.usersRef = this.db.list(role);
    // Use snapshotChanges().map() to store the key
    return this.usersRef.valueChanges();
  }
  addAttribute(attributes: Attributes) {
    this.attributesRef.push(attributes);
  }
  addComment(comment: UserComment) {
    this.commentsRef.push(comment);
  }
}
