<script lang="ts">
	import { enhance } from '$app/forms';
	import { user_id } from '$lib/store';
	import {confetti} from '@neoconfetti/svelte';

	export let data;
	export let form;

	// add quantity field to each ingredient
	data.items = data.items.map((i) => ({ ...i, quantity: 0 }));

	let date = new Date().toISOString().split('T')[0];
	let filterText = '';
</script>

<svelte:head>
	<title>Record Delivery</title>
	<meta name="description" content="Record a delivery" />
</svelte:head>

<div class="text-column">
	{#if form?.success}
		<div use:confetti />
		<p>Your delivery has been recorded</p>
		<p>
			<a href="/delivery">Record another delivery</a>
		</p>
		<p>
			<a href="/">Return to home</a>
		</p>
	{:else}
		<h1>Record Delivery</h1>
		<form
			method="POST"
			use:enhance={({ formData, cancel }) => {
				const itemsWithQty = data.items
					.filter((i) => i.quantity && Number(i.quantity) > 0)
					.map((t) => {
						return {
							ingredient_id: t.ingredient_id,
							quantity: t.quantity
						};
					});
				if (!itemsWithQty.length) {
					// cancel the form submission
					cancel();
					alert('Please enter at least one item to record a delivery.');
					return;
				}
				formData.append('ingredients', JSON.stringify(itemsWithQty));

				Object.keys(Object.fromEntries(formData.entries())).forEach((key) => {
					if (key.startsWith('ingredient_quantity_')) {
						formData.delete(key);
					}
				});
			}}
		>
			<!-- Hidden field for staff_id -->
			<input type="hidden" name="staff_id" value={$user_id} />

			<!-- Delivery Date -->
			<label for="delivery_date">Delivery Date:</label>
			<input type="date" bind:value={date} id="delivery_date" name="delivery_date" required />

			<div>
				<input type="text" placeholder="Filter ingredients" bind:value={filterText} />
			</div>

			{#each data.items.filter((t) => {
				if (filterText === '') return true;
				return t.name.toLowerCase().includes(filterText.toLowerCase());
			}) as ingredient}
				<!-- Ingredient Name -->
				<h3>{ingredient.name}</h3>

				<!-- Ingredient Quantity -->
				<label for="ingredient_quantity_{ingredient.ingredient_id}"
					>Quantity ({ingredient.unit}):</label
				>
				<input
					type="number"
					id="ingredient_quantity_{ingredient.ingredient_id}"
					name="ingredient_quantity_{ingredient.ingredient_id}"
					bind:value={ingredient.quantity}
				/>

				<hr />
			{/each}

			<div style="border-radius:4px;border-style:dotted;border-width:3px; color:red">
				<h4>Delivery Summary</h4>
				{#each data.items as ingredient}
					{#if ingredient.quantity > 0}
						<p>
							{ingredient.name}: {ingredient.quantity}
							{ingredient.unit}
						</p>
					{/if}
				{/each}
			</div>
			{#if form?.error}
				<p style="color: red;">{form.error}</p>
			{/if}
			<button style="width: 100%; height: 3em; font-size: 1.5em;" type="submit">Submit</button>
		</form>
	{/if}
</div>
