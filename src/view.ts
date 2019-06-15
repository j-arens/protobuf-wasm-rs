import { readableMode } from './helpers';
import { state } from './state';

const btns = document.querySelectorAll('button');
const results = document.getElementById('results');

export const bindBtns = (onClick: (e: MouseEvent) => any) => {
  btns.forEach(btn => {
    btn.addEventListener('click', onClick);
    btn.disabled = false;
  });
};

export const update = (state: state, time: string = '0') => {
  if (!results) {
    console.error('failed to query results element');
    return;
  }
  const markup = `
    <p>
      State mode: ${readableMode(state.mode)}
    </p>
    <p>
      Encoding state + memory alloc/dealloc + call into WASM + decoding state time: ${time}
    </p>
  `;
  results.innerHTML = markup;
};
