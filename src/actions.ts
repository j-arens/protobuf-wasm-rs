import { Action } from './proto/generated';

const { ActionType, Action: { create, encode } } = Action;

interface Actions {
  [k: string]: Uint8Array,
}

export const actions = Object.entries(ActionType).reduce((acc, [key, value]) => {
  acc[key] = encode(create({ payload: value })).finish();
  return acc;
}, {} as Actions);
