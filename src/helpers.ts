import { Action } from './proto/generated';

export const readableMode = (mode: Action.ActionType): string => {
  switch (mode) {
    case 0: {
      return 'Create';
    }
    case 1: {
      return 'Read';
    }
    case 2: {
      return 'Update';
    }
    case 3: {
      return 'Delete';
    }
    default: {
      return 'Unknown';
    }
  }
};
