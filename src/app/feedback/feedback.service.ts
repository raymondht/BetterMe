import {Injectable} from '@angular/core';
import {Subject} from 'rxjs';

@Injectable()

export class FeedbackService {
  onAttributeValueChange = new Subject<any>();
}
