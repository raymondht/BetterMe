import { Injectable } from '@angular/core';
import {UserComment} from '../Models/comment.model';
import {map} from 'rxjs/operators';
import {AngularFireDatabase, AngularFireList, AngularFireObject} from 'angularfire2/database';
import {Subject} from 'rxjs';
import {UserService} from './user.service';

@Injectable({
  providedIn: 'root'
})
export class CommentService {
  comments: UserComment[] = [];
  commentsRef: AngularFireList<any>;
  onCommentsReady = new Subject<UserComment[]>();

  constructor(private db: AngularFireDatabase,
              private userServe: UserService) {
    this.commentsRef = this.db.list('comments');
  }
  getCommentsFromDB() {
    const userKey = this.userServe.getUserKey();
    this.commentsRef = this.db.list(`comments/${userKey}`);
    return this.commentsRef.snapshotChanges().pipe(
      map(changes =>
        changes.map(c => ({ key: c.payload.key, ...c.payload.val() }))
      )
    ).subscribe(
      (comments) => {
        if (comments.length > 0) {
          this.comments = comments.reverse().slice(0, 5);
          this.onCommentsReady.next(this.comments);
        } else {
          this.onCommentsReady.next([]);
        }
      }
    );
  }
  addComment(comment: UserComment, receiverKey: string) {
    const commentRef = this.db.list(`comments/${receiverKey}`);
    commentRef.push(comment);
  }
  getComments() {
    return [...this.comments];
  }
}
