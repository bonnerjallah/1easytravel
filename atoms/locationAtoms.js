import { atom } from 'jotai';

// Store raw coordinates
export const userLocationAtom = atom({
  latitude: null,
  longitude: null,
  timestamp: null,
});

// Store resolved address (from reverse geocoding)
export const userPickUpLocation = atom(null);
