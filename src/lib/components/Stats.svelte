<script lang="ts">
	import { character, characterPosition } from '$lib/character';
	import { engine, render as matterRender } from '$lib/matter';
	import Matter from 'matter-js';

	let position: { x: number; y: number } = { x: 0, y: 0 };
	let renderBounds:
		| {
				min: { x: number; y: number };
				max: { x: number; y: number };
		  }
		| {} = {};
	Matter.Events.on(engine, 'beforeUpdate', () => {
		const pos = character.position;
		const rb = matterRender.bounds;

		const f = Math.floor;
		position = { x: f(pos.x), y: f(pos.y) };
		renderBounds = {
			min: { x: f(rb.min.x), y: f(rb.min.y) },
			max: { x: f(rb.max.x), y: f(rb.max.y) }
		};
	});
</script>

<div class="absolute top-0 left-0 bg-white p-2 flex flex-col">
	<div class="flex flex-row justify-between">
		<div>Character pos</div>
		<div>
			x: {Math.floor($characterPosition.x)} y: {Math.floor($characterPosition.y)}
		</div>
	</div>

	<div class="flex flex-row justify-between">
		<div>Position</div>
		<div>{JSON.stringify(position)}</div>
	</div>

	<div class="flex flex-row justify-between">
		<div class="pr-4">Render Bounds</div>
		<div>{JSON.stringify(renderBounds)}</div>
	</div>
</div>
