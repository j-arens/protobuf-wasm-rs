class StateBuffer {
  constructor() {
    this.reset();
    this.push = this.push.bind(this);
  }

  protected _bytes: number[];
  protected _index: number;

  push(byte: number) {
    this._bytes[this._index] = byte;
    this._index += 1;
  }

  get bytes(): Uint8Array {
    return Uint8Array.from(this._bytes);
  }

  reset() {
    this._bytes = [];
    this._index = 0;
  }
}

export default StateBuffer;
