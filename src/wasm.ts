export interface WasmMemory {
  buffer: ArrayBuffer;
}

interface WasmInstanceExports {
  memory: WasmMemory;
  alloc(size: number): number;
  free(ptr: number, size: number): void;
  compute_state(a_ptr: number, a_size: number, s_ptr: number, s_size: number): void;
}

export interface WasmInstance {
  exports: WasmInstanceExports;
}

const TARGET_MODE = process.env.NODE_ENV === 'production' ? 'debug' : 'release';

export const load = (
  importObj: object,
): Promise<WebAssembly.Instance> => new Promise(async (res, rej) => {
  try {
    const wasm = `target/wasm32-unknown-unknown/${TARGET_MODE}/state_wasm.wasm`;
    const { instance } = await WebAssembly.instantiateStreaming(fetch(wasm), importObj);
    res(instance);
  } catch(err) {
    rej(new Error(err));
  }
});
