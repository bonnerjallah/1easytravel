import { atom } from 'jotai';

export const userLocationAtom = atom({
  latitude: null,
  longitude: null,
  timestamp: null,
});
