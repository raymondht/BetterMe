export class UserComment  {
  constructor(
    public giverId: number,
    public receiverId: number,
    public pros: string,
    public cons: string
  ) {}
}
