import { State } from './proto/generated';

const { State: { create, encode, decode } } = State;

export type state = State.State;
export { decode };

let state = encode(create({ mode: 0 })).finish();

export const get = (): Uint8Array => state;

export const set = (updated: Uint8Array) => {
  state = updated;
};

