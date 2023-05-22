<script lang="ts">
	import { initializeSphere, setMouseSphereLocation } from '$lib/tagSphere';
	import { onMount } from 'svelte';
	import { fly } from 'svelte/transition';

	let sphere: HTMLDivElement;
	onMount(async () => {
		initializeSphere(sphere);
	});
</script>

<div
	class="fixed inset-0 grid place-items-center text-white"
	transition:fly={{ x: -100, duration: 500 }}
>
	<div class="flex flex-col border-2 bg-black border-slate-500 rounded-xl p-8 mx-2 w-min">
		<div class="text-xl md:text-3xl text-yellow font-bold text-center mb-3">My Skills</div>
		<div class="text-sm md:text-base text-slate-300 text-center">
			I am a software developer who specializes in building web applications using SvelteKit,
			TypeScript, and Tailwind CSS. Alongside this, I have experience using Flutter for mobile app
			development, and both Firebase and Supabase for building the backends of web and mobile
			applications.
		</div>
		<div
			bind:this={sphere}
			class="rounded w-64 h-52 md:w-[600px] md:h-[450px] lg:w-[800px] lg:h-[500px] mx-auto"
			on:mousemove={setMouseSphereLocation}
		/>
		<div />
	</div>
</div>
