export class User {
  constructor(
    public userId: string,
    public email: string,
    public role: string, // student, teacher
  ) {}
}
