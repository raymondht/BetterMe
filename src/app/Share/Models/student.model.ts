import {User} from './user.model';

export class Student extends User {
    constructor(
      public email,
      public role,
      public studId: number,
      public imageURL: string,
      public studName: string,
      public faculties: string[],
    ) {
      super(email, role);
    }
}

