<script lang="ts">
	import { onMount } from 'svelte';

	export let delay: number = 0;
	export let direction: 'horizontal' | 'vertical' = 'vertical';

	let item: HTMLDivElement;
	onMount(async () => {
		direction === 'horizontal'
			? item.classList.add('-translate-x-full')
			: item.classList.add('-translate-y-full');
		await new Promise((r) => setTimeout(r, delay));
		item.classList.add('opacity-100');
		direction === 'horizontal'
			? item.classList.remove('-translate-x-full')
			: item.classList.remove('-translate-y-full');
	});
</script>

<div bind:this={item} class="transition-all duration-500 opacity-0">
	<slot />
</div>
