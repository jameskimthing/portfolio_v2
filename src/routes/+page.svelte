<script lang="ts">
	import Character from '$lib/components/Character.svelte';
	import { initializeMatter } from '$lib/matter';
	import { onMount } from 'svelte';
	import Introduction from './Introduction.svelte';
	import Stats from '$lib/components/Stats.svelte';
	import Loading from '$lib/components/Loading.svelte';
	import { stageUnit } from '$lib/stage';
	import About from './About.svelte';

	let canvas: HTMLElement;
	let isLoading: boolean = true;
	onMount(async () => {
		await initializeMatter(canvas);
		isLoading = false;
	});
</script>

<div class="w-screen h-screen overflow-hidden" bind:this={canvas} />
<Loading {isLoading} />

{#if !isLoading}
	<Stats />
	<Character />
{/if}

<img class="absolute inset-0 -z-50 object-contain" alt="none?" src="/background/background-1.jpg" />

<div class="absolute top-0 left-0">
	<Introduction />
	{#if $stageUnit >= 2}
		<About />
	{/if}
</div>
