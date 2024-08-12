export default class Singleton {
  static _instance: any = null

  static GetInstance<T>(): T {
    if (this._instance === null) {
      this._instance = new this()
    }
    return this._instance
  }

  constructor() {}
}
