import { checkRecipeIngredientStock, updateStock } from '$lib/server/service';
import {
	Delivery,
	DeliveryItem,
	Ingredient,
	Menu,
	Modifier,
	Recipe,
	Staff,
	Stock,
	Location
} from '$lib/types';
import { DataSource, Repository } from 'typeorm';
import { describe, it, expect, beforeAll } from 'vitest';

describe('Sales', () => {
	const AppDataSource = new DataSource({
		type: 'sqlite',
		database: `test.db.sqlite`,
		entities: [Staff, Ingredient, Recipe, Modifier, Location, Delivery, DeliveryItem, Stock, Menu],
		synchronize: true,
		logging: false
	});
	let db: DataSource = null;
	let menuRepo: Repository<Menu>;
	let stockRepo: Repository<Stock>;
	let ingredientRepo: Repository<Ingredient>;
	let locationRepo: Repository<Location>;
	let recipeRepo: Repository<Recipe>;

	async function setupTestData(location_id: number) {
		// Save location
		await locationRepo.save({
			location_id,
			name: 'Location' + location_id,
			address: 'Address' + location_id
		});

		// Save ingredient
		await ingredientRepo.save({
			ingredient_id: 1,
			name: `Ingredient ${1}`,
			unit: 'kg',
			cost: 5.0
		});
		await ingredientRepo.save({
			ingredient_id: 2,
			name: `Ingredient ${2}`,
			unit: 'kg',
			cost: 5.0
		});

		// Save recipe
		await recipeRepo.save({
			recipe_id: 1,
			name: `Recipe ${1}`,
			quantity: 1, // Example variation for quantity
			ingredient_id: 1
		});

		await recipeRepo.save({
			recipe_id: 2,
			name: `Recipe ${2}`,
			quantity: 1, // Example variation for quantity
			ingredient_id: 1
		});
		await recipeRepo.save({
			recipe_id: 2,
			name: `Recipe ${2}`,
			quantity: 1, // Example variation for quantity
			ingredient_id: 2
		});

		// Save menu
		await menuRepo.save({
			menu_id: 1,
			name: `Menu ${1}`,
			price: 10, // Example variation for price
			location_id,
			recipe_id: 1
		});
		await menuRepo.save({
			menu_id: 2,
			name: `Menu ${2}`,
			price: 10, // Example variation for price
			location_id,
			recipe_id: 2
		});

		// Save stock
		await stockRepo.save({
			stock_id: 1,
			location_id,
			ingredient_id: 1,
			quantity: 1
		});
		await stockRepo.save({
			stock_id: 2,
			location_id,
			ingredient_id: 2,
			quantity: 1
		});
	}

	beforeAll(async () => {
		console.log('beforeAll');
		// scaffold the sqlite database
		db = await AppDataSource.initialize();

		// create a location
		menuRepo = db.getRepository(Menu);
		stockRepo = db.getRepository(Stock);
		ingredientRepo = db.getRepository(Ingredient);
		recipeRepo = db.getRepository(Recipe);
		locationRepo = db.getRepository(Location);

		await setupTestData(1);
	});

	it('there should be stock for menu 1', async () => {
		// 1 ingredient with 100 quantity
		const checkStock = await checkRecipeIngredientStock('1', 1, 1, db);
		console.log('checkStock', checkStock);
		expect(checkStock.length).toBeTruthy();
	});

	it('there should NOT be stock for 2x menu 1', async () => {
		expect(
			(async () => {
				await checkRecipeIngredientStock('1', 1, 2, db);
			})()
		).rejects.toThrow();
	});

	it('there should be stock for menu 2', async () => {
		// 2 ingredient with 100 quantity
		const checkStock = await checkRecipeIngredientStock('1', 2, 1, db);
		console.log('checkStock', checkStock);
		expect(checkStock.length).toBeTruthy();
	});
	it('there should NOT be stock for 2x menu 2', async () => {
		// expect an exception for 2 quantity
		expect(
			(async () => {
				await checkRecipeIngredientStock('1', 2, 2, db);
			})()
		).rejects.toThrow();
	});
	describe('when ingredient 2 is sold out', () => {
		beforeAll(async () => {
      await updateStock('1', 2, 1, db);
		});
		it('there should NOT be stock for menu 2', async () => {
			expect(
				(async () => {
					await checkRecipeIngredientStock('1', 2, 1, db);
				})()
			).rejects.toThrow();
		});
	});
});
