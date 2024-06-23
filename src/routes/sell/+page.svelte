<script lang="ts">
	import { enhance } from '$app/forms';
	import { user_id } from '$lib/store';
	import { confetti } from '@neoconfetti/svelte';

	export let data;
	export let form;

	// add quantity field to each ingredient
	data.items = data.items.map((i) => ({ ...i, sale_quantity: 0 }));

	let date = new Date().toISOString().split('T')[0];
	let filterText = '';
</script>

<svelte:head>
	<title>Sell Item</title>
	<meta name="description" content="Sell item" />
</svelte:head>

<div class="text-column">
	{#if form?.success}
		<div use:confetti />
		<p>Your sale has been recorded</p>
		<p>
			<a href="/sell">Record another sale</a>
		</p>
		<p>
			<a href="/">Return to home</a>
		</p>
	{:else}
		<h1>Sell Menu Item</h1>
		<form
			method="POST"
			use:enhance={({ formData, cancel }) => {
				const itemsWithQty = data.items
					.filter((i) => i.sale_quantity && Number(i.sale_quantity) > 0)
					.map((t) => {
						return {
							recipe_id: t.recipe_id,
							sale_quantity: t.sale_quantity
						};
					});
				console.log(itemsWithQty);
				if (!itemsWithQty.length) {
					// cancel the form submission
					cancel();
					alert('Please enter at least one item to record a sale.');
					return;
				}
				formData.append('sales', JSON.stringify(itemsWithQty));

				Object.keys(Object.fromEntries(formData.entries())).forEach((key) => {
					if (key.startsWith('menu_')) {
						formData.delete(key);
					}
				});
			}}
		>
			<!-- Hidden field for staff_id -->
			<input type="hidden" name="staff_id" value={$user_id} />

			<div>
				<input type="text" placeholder="Filter menu items" bind:value={filterText} />
			</div>
			{#each data.items.filter((t) => {
				if (filterText === '') return true;
				return t.name.toLowerCase().includes(filterText.toLowerCase());
			}) as menu_item}
				<!-- Ingredient Name -->
				<h3>{menu_item.name}</h3>

				<!-- Ingredient Quantity -->
				<label for="menu_{menu_item.recipe_id}"># Items Sold</label>
				<input
					type="number"
					id="menu_{menu_item.recipe_id}"
					name="menu_{menu_item.recipe_id}"
					bind:value={menu_item.sale_quantity}
				/>

				<hr />
			{/each}
			<div
				style="border-radius:4px;border-style:dotted;border-width:3px; color:{form?.error
					? 'red'
					: 'green'}"
			>
				<h4>Sales Summary</h4>
				{#each data.items as menu_item}
					{#if menu_item.sale_quantity > 0}
						<p>
							{menu_item.name}: {menu_item.sale_quantity}
						</p>
					{/if}
				{/each}
				{#if form?.error}
					<p style="color: red;">{form.error}</p>
				{/if}
				<button style="width: 100%; height: 3em; font-size: 1.5em;" type="submit">Sell</button>
			</div>
		</form>
	{/if}
</div>
