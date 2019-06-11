import { Action } from './proto/generated';

const btns = document.querySelectorAll('button');
const results = document.getElementById('results');

let instance;

const stats = {
  start: 0,
  end: 0,
};

const { ActionType, Action: { create, encode } } = Action;
const actions = {
  'CREATE': encode(create({ type: ActionType.CREATE })).finish(),
  'READ': encode(create({ type: ActionType.READ })).finish(),
  'UPDATE': encode(create({ type: ActionType.UPDATE })).finish(),
  'DELETE': encode(create({ type: ActionType.DELETE })).finish(),
};

const dispatch = action => {
  // set action message in wasm memory
  const size = action.byteLength;
  const pointer = instance.exports.alloc(size);
  const view = new Uint8Array(instance.exports.memory.buffer);
  view.set(action, pointer);

  const result = instance.exports.read_action(pointer, size);

  // free action message from wasm memory
  instance.exports.dealloc(pointer, size);

  results.innerText = result;
  stats.end = performance.now();
  console.info('TOTAL TIME: ', `${stats.end - stats.start} MS`);
};

const handleClick = ({ target }) => {
  stats.start = performance.now();
  dispatch(actions[target.dataset.action]);
};

WebAssembly.instantiateStreaming(fetch('target/wasm32-unknown-unknown/debug/state_wasm.wasm'))
  .then(wasm => {
    instance = wasm.instance;
    btns.forEach(btn => {
      btn.addEventListener('click', handleClick);
      btn.disabled = false;
    });
  })
  .catch(err => console.error(err));
