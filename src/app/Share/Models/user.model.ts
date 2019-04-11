export class User {
  constructor(
    public uid: string,
    public email: string,
    public name: string,
    public imageURL: string,
    public role: string, // student, teacher
    public id: number,
    public faculties: string[]
  ) {}
  getId() {
    const copiedId = this.id;
    return copiedId;
  }
}
