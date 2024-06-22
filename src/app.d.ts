// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces
import "reflect-metadata";
import { DataSource } from 'typeorm';
declare global {
	namespace App {
		// interface Error {}
		interface Locals {
			db: DataSource;
		}
		// interface PageData {}
		// interface PageState {}
		// interface Platform {}
	}
}

export {};
