declare module 'youch' {
  export default class Youch {
    constructor(err: object, req: object)

    toJSON(): Promise<object>
  }
}
