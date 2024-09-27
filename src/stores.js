import { writable } from "svelte/store";

const STORAGE_PASSPHRASE = 'passphrase';
const storedPassphrase = localStorage.getItem(STORAGE_PASSPHRASE) || null;

export const userPassPhrase = writable(storedPassphrase);
export const network = writable({})
export const memberAdded = writable(0);


userPassPhrase.subscribe((value) => {
    if (value)
        localStorage.setItem(STORAGE_PASSPHRASE, value);
    else
        localStorage.removeItem(STORAGE_PASSPHRASE);
});
