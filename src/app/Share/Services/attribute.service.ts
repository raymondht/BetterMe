import { Injectable } from '@angular/core';
import {AngularFireDatabase, AngularFireList, AngularFireObject} from 'angularfire2/database';
import {Attributes} from '../Models/attributes.model';
import {Student} from '../Models/student.model';
import {Teacher} from '../Models/teacher.model';
import {map} from 'rxjs/operators';
import {Subject} from 'rxjs';
import {UserService} from './user.service';



@Injectable({
  providedIn: 'root'
})
export class AttributeService {
  attributesRef: AngularFireList<any>;
  noOfFeedback: number;
  attributeData = [];
  studentAttributeDataOrder = [Student.attributeNames[0], Student.attributeNames[2], Student.attributeNames[4], Student.attributeNames[6], Student.attributeNames[8],
    Student.attributeNames[1], Student.attributeNames[3], Student.attributeNames[5], Student.attributeNames[7], Student.attributeNames[9]];
  teacherAttributeDataOrder = [Teacher.attributeNames[0], Teacher.attributeNames[2], Teacher.attributeNames[4], Teacher.attributeNames[6], Teacher.attributeNames[8],
    Teacher.attributeNames[1], Teacher.attributeNames[3], Teacher.attributeNames[5], Teacher.attributeNames[7], Teacher.attributeNames[9]];
  onAttributesReady = new Subject();
  constructor(private db: AngularFireDatabase,
              private userServ: UserService) {
    this.attributesRef = this.db.list('attributes');
  }
  getAttributes() {
    const copiedAttributes = [...this.attributeData];
    return copiedAttributes;
  }

  addAttributes(attributes: Attributes, receiverKey: string) {
    const attributeRef = this.db.list(`attributes/${receiverKey}`);
    attributeRef.push(attributes);
  }

  // Get attribute that only belongs to the given id
  getAttributesFromDB(userRole: string) {
    const userKey = this.userServ.getUserKey();
    this.attributesRef = this.db.list(`attributes/${userKey}`);
      this.attributesRef.snapshotChanges().pipe(
        map(changes =>
          changes.map(c => ({ key: c.payload.key, ...c.payload.val() }))
        )
      ).subscribe(
        (attributes: any[]) => {
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
                averageObj[key] = averageObj[key] / attributes.length;
              }
            }
          }
          // Map the value into an array in a correct order
          const attributeDataOrder = userRole === 'student' ? this.studentAttributeDataOrder : this.teacherAttributeDataOrder;
          console.log(averageObj);
          for (let i = 0; i < attributeDataOrder.length; i ++) {
            this.attributeData.push(averageObj[attributeDataOrder[i]]);
          }
          this.onAttributesReady.next(this.attributeData);
        });
    }
}
