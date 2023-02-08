export class HelloQuery {
  public async hello(_: unknown, data: { name: string}) {
    return data.name + " world";
  }
}

