import { WasmInstance, WasmMemory } from './wasm';

export type Allocation = number[];

class Memory {
  constructor(wasm: WasmInstance) {
    const { exports: { memory, alloc, free } } = wasm;
    this._memory = memory;
    this._alloc = alloc;
    this._free = free;

    // this._view = null;
  }

  protected _memory: WasmMemory;
  protected _alloc: (size: number) => number;
  protected _free: (ptr: number, size: number) => void;


  import(...protos: Uint8Array[]) {
    return protos.map(proto => {
      const alloc = this.alloc(proto);
      const view = new Uint8Array(this._memory.buffer);
      view.set(proto, alloc[0]);
      // this._view.set(proto, alloc[0]);
      return alloc;
    });
  }

  alloc(proto: Uint8Array): Allocation {
    const size = proto.byteLength;
    const ptr = this._alloc(size);
    return [ptr, size];
  }

  free(...allocs: Allocation[]) {
    while(allocs.length) {
      // @ts-ignore
      this._free(...allocs.pop());
    }
  }
}

export default Memory;
