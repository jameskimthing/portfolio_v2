<script lang="ts">
	import Character from '$lib/components/Character.svelte';
	import { initializeMatter } from '$lib/matter';
	import { onMount } from 'svelte';
	import Introduction from './Introduction.svelte';

	let canvas: HTMLElement;
	let loadingMatter: boolean = true;
	onMount(async () => {
		await initializeMatter(canvas);
		loadingMatter = false;
	});
</script>

<div class="w-screen h-screen bg-yellow-800 overflow-hidden" bind:this={canvas} />
{#if !loadingMatter}
	<Character />
{/if}

<div class="absolute z-10 top-0 left-0">
	<Introduction />
</div>
