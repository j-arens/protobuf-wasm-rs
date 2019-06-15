import * as wasm from './wasm';
import Stats from './Stats';
import * as state from './state';
import * as view from './view';
import { actions } from './actions';
import stateBuffer from './StateBuffer';
import Memory from './Memory';

const stats = new Stats();
const stateBuff = new stateBuffer();

const wasmConf = {
  env: {
    push_byte: stateBuff.push,
  },
};

wasm.load(wasmConf).then(instance => {
  const inst = instance as wasm.WasmInstance;
  const mem = new Memory(inst);

  const onclick = (e: MouseEvent) => {
    const target = e.target as HTMLButtonElement;

    if (!('action' in target.dataset)) {
      console.error('action not found in target dataset');
      return;
    }

    stats.start(); // timer

    // @ts-ignore
    const action = actions[target.dataset.action];
  
    // alloc & import state and action protos in wasm memory buffer
    const [actionAlloc, stateAlloc] = mem.import(action, state.get());
  
    // call into wasm, derive next state
    // @ts-ignore
    inst.exports.compute_state(...actionAlloc, ...stateAlloc);
  
    // free memory
    mem.free(actionAlloc, stateAlloc);
  
    // get & set update state
    const newState = stateBuff.bytes;
    stateBuff.reset();
    state.set(newState);
    const decoded = state.decode(newState);
  
    stats.stop() // timer
    
    // update view
    view.update(decoded, stats.format());
  };

  view.bindBtns(onclick);
})
.catch(err => console.error(err));
