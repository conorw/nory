import { Delivery, DeliveryItem, Recipe, Stock } from '$lib/types';
import type { DataSource } from 'typeorm';

// TODO: absolutely need to add tests for this function!
export const sellItems = async (
	location_id: string,
	items: { recipe_id: number; sale_quantity: number }[],
	db: DataSource
) => {
	// take each item and reduce the stock
	// if the stock is not available, throw an error
	// else, reduce the stock and return success
	let success = false;
	await db.transaction(async (manager) => {
		// loop through each item
		// get the stock for each item
		// check if the stock is available

		// if the stock is not available, throw an error
		// else, reduce the stock and return success

		// loop through each menu item
		for (const item of items) {
			// find the ingredient for the recipe
			const updateItems = await checkRecipeIngredientStock(location_id, item.recipe_id, item.sale_quantity, db);
			await Promise.all(updateItems.map(async (updateItem) => {
				return await updateStock(location_id, updateItem.ingredient_id, updateItem.totalQuantity, db);
			}));
		}

		success = true;
	});
	// TODO: Record the sale in the database and who made it
	return success;
};
export const updateStock = async (location_id: string, ingredient_id: number, totalQuantity: number, db: DataSource, operator: '+' | '-' = '-') => {
	const stockRepo = db.getRepository(Stock);
	return stockRepo.createQueryBuilder('stock').update(Stock).where({
		location_id: Number(location_id),
		ingredient_id: ingredient_id
	}).set({
		quantity: () => `quantity ${operator} ${totalQuantity}`
	}).execute();
}
export const checkRecipeIngredientStock = async (location_id: string, recipe_id: number, sale_quantity: number, db: DataSource) => {
	const recipeRepo = db.getRepository(Recipe);
	const stockRepo = db.getRepository(Stock);
	const recipeIngredients = await recipeRepo.find({
		where: { recipe_id }
	});
	if (!recipeIngredients.length) {
		throw new Error('Recipe not found');
	}
	// for each ingredient, check if the stock is available
	// if the stock is not available, throw an error
	// else, reduce the stock and return success
	return Promise.all(
		recipeIngredients.map(async (ingredient) => {
			const stock = await stockRepo.findOne({
				where: { location_id: Number(location_id), ingredient_id: ingredient.ingredient_id }
			});
			// console.log('stock', stock);
			const salesQuantity = sale_quantity * ingredient.quantity;
			if (!stock) {
				throw new Error('No stock for item: ' + ingredient.name);
			} else if (stock && stock.quantity < salesQuantity) {
				throw new Error('Not enough stock for item: ' + ingredient.name);
			} else {
				return {
					ingredient_id: ingredient.ingredient_id,
					totalQuantity: salesQuantity
				};
			}
		})
	);

}



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
		const stockRepo = manager.getRepository(Stock);

		const deliveryResult = await deliveryRepo.save(delivery);
		const deliveryId = deliveryResult.order_id;

		for (const item of deliveryItems) {
			await deliveryItemRepo.save({
				location_id: delivery.location_id,
				order_id: deliveryId,
				ingredient_id: item.ingredient_id,
				quantity: item.quantity
			});
			const stock = await stockRepo.findOne({
				where: { location_id: delivery.location_id, ingredient_id: item.ingredient_id }
			});
			const quantity = stock?.quantity ? stock.quantity + item.quantity : item.quantity;
			await stockRepo.save({
				location_id: delivery.location_id,
				ingredient_id: item.ingredient_id,
				quantity
			});
			// console.log('incrementing stock', item.ingredient_id, delivery.location_id, item.quantity);
			// const updateResult = await stockRepo.increment(
			// 	{ location_id: delivery.location_id, ingredient_id: item.ingredient_id },
			// 	'quantity',
			// 	item.quantity
			// )
		}
		newDeliveryId = deliveryId;
	});

	return newDeliveryId;
};
