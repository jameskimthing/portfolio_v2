<script lang="ts">
	import {
		CHARACTER_HEIGHT,
		CHARACTER_WIDTH,
		characterKeyDown,
		characterKeyUp,
		characterPosition,
		initializeCharacter,
		movingStates
	} from '$lib/character';
	import { onMount } from 'svelte';

	let characterFrames: string[] = [];
	let currentFrame = 0;

	onMount(async () => {
		characterFrames = await initializeCharacter();
		const airFrames: number[] = [2, 5, 8];

		movingStates.subscribe((states) => {
			if (states.size === 0) currentFrame = 0;

			const right: boolean = states.has('right');
			const left: boolean = states.has('left');
			const air: boolean = states.has('air');

			function getFrame(): number {
				if (right && left) return air ? 2 : 0;
				if (right) return air ? 5 : 3;
				if (left) return air ? 8 : 6;

				return air ? 2 : 0;
			}

			currentFrame = isInSame(getFrame());
		});

		function isInSame(frame: number) {
			if (airFrames.includes(frame)) return frame;

			if (currentFrame + 1 === frame && !airFrames.includes(frame)) return currentFrame;
			if (currentFrame - 1 === frame && !airFrames.includes(frame)) return currentFrame;
			return frame;
		}
		while (true) {
			await new Promise((r) => setTimeout(r, 1400));
			if (!airFrames.includes(currentFrame)) {
				currentFrame++;
				if (airFrames.includes(currentFrame)) currentFrame -= 2;
			}
		}
	});
</script>

<div class="">
	<img
		class="absolute box-border"
		src={characterFrames[currentFrame]}
		alt="Character Frame"
		style={`image-rendering: pixelated; width: ${CHARACTER_WIDTH}px; height: ${CHARACTER_HEIGHT}; top: ${$characterPosition.y}px; left: ${$characterPosition.x}px`}
	/>
</div>

<svelte:window
	on:keydown|preventDefault={characterKeyDown}
	on:keyup|preventDefault={characterKeyUp}
/>
