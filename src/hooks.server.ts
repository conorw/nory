import 'reflect-metadata';
import type { Handle } from '@sveltejs/kit';
import { DataSource } from 'typeorm';
import { Staff, Ingredient, Recipe, Modifier, Location } from '$lib/types';

export const handle: Handle = async ({ event, resolve }) => {
	if (!event.locals.db) {
		const AppDataSource = new DataSource({
			type: 'sqlite',
			database: 'db.sqlite',
			entities: [Staff, Ingredient, Recipe, Modifier, Location],
			synchronize: true,
			logging: false
		});
		const db = await AppDataSource.initialize();
		// Set the db as our events.db variable.
		event.locals.db = db;
	}
	const resp = await resolve(event);
	return resp;
};
