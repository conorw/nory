import { Staff, Location } from '$lib/types';
import type { PageServerLoad } from './$types';
import { PRIVATE_LOCATION_ID } from '$env/static/private';

export const load: PageServerLoad = async ({ locals }) => {
	const db = locals.db;
	const [locationUsers, location] = await Promise.all([
		db
			.getRepository(Staff)
			.createQueryBuilder('staff')
			.select('staff.*')
			.where('location_id=:location_id', {
				location_id: PRIVATE_LOCATION_ID
			})
			.orderBy('name')
			.getRawMany(),
		db
			.getRepository(Location)
			.createQueryBuilder('location')
			.select('location.*')
			.where('location_id=:location_id', { location_id: PRIVATE_LOCATION_ID })
			.getRawOne()
	]);

	return {
		users: locationUsers || [],
		location
	};
};
