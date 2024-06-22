import 'reflect-metadata';
import type { Handle } from '@sveltejs/kit';
import { DataSource } from 'typeorm';
import { Staff, Ingredient, Recipe, Modifier, Location } from '$lib/types';

const AppDataSource = new DataSource({
	type: 'sqlite',
	database: `data/db.sqlite`,
	entities: [Staff, Ingredient, Recipe, Modifier, Location],
	synchronize: true,
	logging: false
});
const db = await AppDataSource.initialize();
export const handle: Handle = async ({ event, resolve }) => {
	if (!event.locals.db) {
		// Set the db as our events.db variable.
		event.locals.db = db;
	}
	const resp = await resolve(event);
	return resp;
};
