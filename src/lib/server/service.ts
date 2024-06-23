import { Delivery, DeliveryItem } from '$lib/types';
import type { DataSource } from 'typeorm';

// TODO: add test for this function
export const createDelivery = async (
	delivery: Delivery,
	deliveryItems: DeliveryItem[],
	db: DataSource
) => {
	// return the new delivery id
	let newDeliveryId: number | undefined;
	await db.transaction(async (manager) => {
		const deliveryRepo = manager.getRepository(Delivery);
		const deliveryItemRepo = manager.getRepository(DeliveryItem);

		const deliveryResult = await deliveryRepo.save(delivery);
		const deliveryId = deliveryResult.order_id;

		for (const item of deliveryItems) {
			await deliveryItemRepo.save({
				order_id: deliveryId,
				ingredient_id: item.ingredient_id,
				quantity: item.quantity
			});
		}
		newDeliveryId = deliveryId;
	});

	return newDeliveryId;
};
