import { browser } from '$app/environment';
import { writable } from 'svelte/store';

export const user_id = writable<string>(
	browser ? window.localStorage.getItem('user_id') || '' : ''
);

user_id.subscribe((value) => {
	if (browser && value) {
		window.localStorage.setItem('user_id', value);
	}
});
