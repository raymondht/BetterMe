import {Injectable} from '@angular/core';
import {Subject} from 'rxjs';

@Injectable()

export class NavigationService {
  onNavigate = new Subject<string>();
}
