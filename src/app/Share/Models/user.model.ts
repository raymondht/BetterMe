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
  getRole() {
    const copiedRole = this.role;
    return copiedRole;
  }
  updateName(name: string) {
    this.name = name;
  }
  updateImageURL(imageURL: string) {
    this.imageURL = imageURL;
  }
  addFaculty(faculty: string) {
    if (!this.faculties) {
      this.faculties = [];
    }
    this.faculties.push(faculty);
    console.log(this.faculties)
  }
}
