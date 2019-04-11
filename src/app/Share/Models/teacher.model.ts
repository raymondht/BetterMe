import {User} from './user.model';

export class Teacher extends User {
  static attributeNames = [
    'realistic', 'optimistic', 'independent', 'teamplayer', 'listener',
    'speaker', 'dedicated', 'flexible', 'calm', 'energetic'
  ];
  constructor(
    public uid: string,
    public email: string,
    public name: string,
    public imageURL: string,
    public role: string, // student, teacher
    public id: number,
    public faculties: string[]
  ) {
    super(uid, email, name, imageURL, role, id, faculties);
  }

  static fromJson({ uid, email, name, imageURL, role, id, faculties}): Teacher {
    return new Teacher(
      uid,
      email,
      name,
      imageURL,
      role,
      id,
      faculties
    );
  }
  static getAttributeDataObj() {
    const attributeDataObj = {};
    for (const attributeName of this.attributeNames) {
      attributeDataObj[attributeName] = 0;
    }
    return attributeDataObj;
  }
}
