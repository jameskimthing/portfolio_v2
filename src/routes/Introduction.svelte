<script lang="ts">
	import Transition from '$lib/components/Transition.svelte';
	import { elementToPhysics } from '$lib/matter';
	import { stage } from '$lib/stage';
	import { onMount } from 'svelte';
	import { fly } from 'svelte/transition';

	let intro: HTMLElement;
	let intro2: HTMLElement;
	let intro3: HTMLElement;

	let showBackground: boolean = true;

	onMount(async () => {
		await new Promise((r) => setTimeout(r, 2000));
		showBackground = false;
		stage.set('intro');
		await new Promise((r) => setTimeout(r, 1400));
		elementToPhysics(intro);
		elementToPhysics(intro2);
		elementToPhysics(intro3);
		stage.set('moveStart');
	});
</script>

{#if showBackground}
	<div
		out:fly={{ y: '-100%', duration: 1000, opacity: 1 }}
		class="absolute inset-0 bg-black w-screen h-screen box-content border-b-8 border-slate-400"
	/>
{/if}
<div class="absolute w-screen h-screen flex flex-col px-32 py-32">
	<Transition delay={300}>
		<div bind:this={intro} class="text-as-chars text-white ml-2 text-3xl pb-3">Hello! I am</div>
	</Transition>

	<Transition delay={450}>
		<div bind:this={intro2} class="text-as-chars text-8xl text-yellow-0 font-bold">James Kim,</div>
	</Transition>

	<Transition delay={600}>
		<div
			bind:this={intro3}
			class="text-as-chars text-7xl text-amber-100 font-bold whitespace-nowrap"
		>
			a software developer.
		</div>
	</Transition>
</div>
