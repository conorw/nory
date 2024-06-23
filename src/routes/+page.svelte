<script>
	import logo from '$lib/images/weird-salads.webp';
	import { user_id } from '$lib/store';

	export let data;

	let location = data.location?.name;
</script>

<svelte:head>
	<title>Home</title>
	<meta name="description" content="Weird Salads" />
</svelte:head>

<section>
	<div class="corner">
		<img src={logo} alt="Weird Salads" />
	</div>
	<h1>
		Weird Salads ({location})
	</h1>
	<h2>
		Welcome, <select bind:value={$user_id}>
			{#each data.users as u}
				<option value={u.staff_id.toString()}>{u.name}</option>
			{/each}
		</select>
	</h2>

	<!-- Add a list of big buttons here to navigate to other pages. -->
	<div class="button-container">
		<a href="/delivery"><button class="large-button">Record Delivery</button></a>
		<a href="/sell"><button class="large-button">Sell Item</button></a>
		<button class="large-button" disabled>Take Stock (Coming Soon)</button>
	</div>
</section>

<style>
	.button-container {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
	}

	h1 {
		width: 100%;
	}

	.corner img {
		width: 5em;
		height: 5em;
		object-fit: contain;
	}
</style>
