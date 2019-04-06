export class UserComment  {
  constructor(
    public giverId: number,
    public receiverId: number,
    public date: string,
    public pros: string,
    public cons: string
  ) {}
}
