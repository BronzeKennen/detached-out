import { writable } from "svelte/store";

export const selectedProfile = writable(null);
export const friendStore = writable(null);
export const jobStore = writable([]);
export const current = writable('');