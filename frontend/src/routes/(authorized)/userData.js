// @ts-ignore
import UserData from '$lib/model/user';
import { writable } from 'svelte/store';

/** @type {import('svelte/store').Writable<UserData | null>} */
const userData = writable(null);

export default userData;
