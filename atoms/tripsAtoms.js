import { atom } from 'jotai';

export const userTripsAtom = atom({
    pickup: null,
    dropoff: null,
    distance: null,
    price: null
});
export const userTripsLoadingAtom = atom(true);
export const userTripsErrorAtom = atom(null);