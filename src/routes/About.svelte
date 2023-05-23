<script lang="ts">
	import { elementToPhysics } from '$lib/matter';
	import { stage } from '$lib/stage';
	import { initializeSphere, setMouseSphereLocation } from '$lib/tagSphere';
	import { afterUpdate } from 'svelte';
	import { fly } from 'svelte/transition';

	let title: HTMLDivElement;
	let text: HTMLDivElement;
	let sphere: HTMLDivElement;

	let loaded: boolean = false;
	$: if (!loaded && $stage === 'about') initialize();

	async function initialize() {
		loaded = true;
		let updated: boolean = false;
		afterUpdate(async () => {
			if (updated) return;
			updated = true;

			initializeSphere(sphere);
			await new Promise((r) => setTimeout(r, 1000));
			elementToPhysics(title);
			elementToPhysics(text);
			elementToPhysics(sphere);
		});
	}
</script>

{#if loaded}
	<div
		class="fixed inset-0 grid place-items-center text-white"
		transition:fly={{ x: -100, duration: 500 }}
	>
		<div>
			<div
				bind:this={title}
				class="px-4 border-2 border-slate-600 text-8xl font-bold text-yellow-0 rounded text-center"
			>
				About
			</div>

			<div
				bind:this={text}
				class="text-base bg-black rounded p-4 w-[500px] text-slate-300 text-center"
			>
				I am a software developer who specializes in building web applications using SvelteKit,
				TypeScript, and Tailwind CSS. Alongside this, I have experience using Flutter for mobile app
				development, and both Firebase and Supabase for building the backends of web and mobile
				applications.
			</div>
			<div
				bind:this={sphere}
				class="w-96 h-96 rounded border-8 border-slate-900"
				on:mousemove={setMouseSphereLocation}
			/>
		</div>
		<div />
	</div>
{/if}
