import { PUBLIC_LOCATION_ID } from '$env/static/public';
import { createDelivery } from '$lib/server/service';
import { Delivery, Ingredient } from '$lib/types';

/** @type {import('./$types').PageServerLoad} */
export async function load({ locals }) {
	// return all the ingredients from the DB for that location
	const db = locals.db;

	// show all ingredients. even if its not on the menu at that location, the chef might be "experimenting"
	// TODO: filter by location if required
	const items = await db
		.getRepository(Ingredient)
		.createQueryBuilder('ingredient')
		.select('ingredient.*')
		.orderBy('name')
		.getRawMany();

	return { items };
}

/** @type {import('./$types').Actions} */
export const actions = {
	default: async ({ request, locals }) => {
		const data = await request.formData();
		const db = locals.db;

		const delivery: Delivery = {
			location_id: Number(PUBLIC_LOCATION_ID),
			staff_id: Number(data.get('staff_id')),
			delivery_date: new Date(data.get('delivery_date')?.toString() || Date.now().toString())
		};
		const deliveryItems = JSON.parse(data.get('ingredients')?.toString() || '[]');

		console.log(deliveryItems);

		try {
			const newDelivery = await createDelivery(delivery, deliveryItems, db);
			return { success: !!newDelivery, id: newDelivery };
		} catch (e) {
			console.error(e);
			return { success: false, error: 'Unable to complete. Please try again' };
		}
	}
};
