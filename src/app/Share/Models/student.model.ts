import {User} from './user.model';

export class Student extends User {
    constructor(
      public userId,
      public email,
      public role,
      public studId: number,
      public imageURL: string,
      public studName: string,
      public faculties: string[],
    ) {
      super(userId, email, role);
    }
}

