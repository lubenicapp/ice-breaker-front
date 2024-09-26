import { writable } from "svelte/store";

export const userPassPhrase = writable('')
export const network = writable({})
export const memberAdded = writable(0);
