<script lang="ts">
	import { elementToPhysics } from '$lib/matter';
	import { onMount } from 'svelte';

	console.log('Hello there, to begin with');

	let intro: HTMLElement;
	let intro2: HTMLElement;
	let intro3: HTMLElement;
	onMount(async () => {
		await new Promise((r) => setTimeout(r, 1000));
		elementToPhysics(intro);
		elementToPhysics(intro2);
		elementToPhysics(intro3);
	});
</script>

<div class="flex flex-col px-96 py-48">
	<div bind:this={intro} class="text-as-chars text-white ml-2 text-4xl">Hello! I am</div>
	<div bind:this={intro2} class="text-as-chars text-8xl font-bold" style="color: #ffc300">
		James Kim,
	</div>
	<div bind:this={intro3} class="text-as-chars text-6xl text-amber-100 font-bold whitespace-nowrap">
		a software developer.
	</div>
</div>
