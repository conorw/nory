import { Staff } from '$lib/types';
import type { PageServerLoad } from './$types';


export const load: PageServerLoad = async ({ locals }) => {
	const db = locals.db;
	const rows = await db.getRepository(Staff).query('SELECT * FROM staff');

	return {
		users: rows || []
	};
};
