<script>
	import logo from '$lib/images/weird-salads.webp';
	let location = 'Default Location';
	let user = 'Default User';
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
		Weird Salads
	</h1>
	<h2>{location}</h2>
	<h3>
		Welcome, {user}!
	</h3>

	<!-- Add a list of big buttons here to navigate to other pages. -->
</section>

<style>
	section {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		flex: 0.6;
	}

	h1 {
		width: 100%;
	}


	.corner img {
		width: 4em;
		height: 4em;
		object-fit: contain;
	}
</style>
