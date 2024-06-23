import { PRIVATE_LOCATION_ID } from '$env/static/private';
import { sellItems } from '$lib/server/service';
import { Menu } from '$lib/types';

/** @type {import('./$types').PageServerLoad} */
export async function load({ locals }) {
	// return all the ingredients from the DB for that location
	const db = locals.db;

	// show all ingredients. even if its not on the menu at that location, the chef might be "experimenting"
	// TODO: filter by location if required
	const items = await db
		.getRepository(Menu)
		.createQueryBuilder('menu')
		.select('menu.*, recipe.*')
		.innerJoin('menu.recipe', 'recipe')
		.where('location_id=:location_id', { location_id: PRIVATE_LOCATION_ID })
		.orderBy('name')
		.getRawMany();

	return { items };
}

/** @type {import('./$types').Actions} */
export const actions = {
	default: async ({ request, locals }) => {
		const data = await request.formData();
		const db = locals.db;

		const sales = JSON.parse(data.get('sales')?.toString() || '[]');

		console.log(sales);

		try {
			const success = await sellItems(PRIVATE_LOCATION_ID, sales, db);
			return { success };
		} catch (e) {
			console.error(e);
			return { success: false, error: 'Unable to complete. Please try again:' + e};
		}
	}
};
