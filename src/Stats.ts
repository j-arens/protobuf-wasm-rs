class Stats {
  constructor() {
    this._start = 0;
    this._end = 0;
  }

  protected _start: number;
  protected _end: number;

  start() {
    this._start = performance.now();
  }

  stop() {
    this._end = performance.now();
  }

  time(): number {
    return this._end - this._start;
  }

  format(): string {
    return `${this.time().toFixed(2)} MS`;
  }
}

export default Stats;
