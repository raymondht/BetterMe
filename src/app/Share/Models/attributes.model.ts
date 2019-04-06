export  class Attributes {
  constructor(
    public giverId: number,
    public receiverId: number,
    public date: string,
    public data: any // [{name: string, value: number}]
  ) {}
}

