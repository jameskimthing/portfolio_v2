<script lang="ts">
	import { character, characterPosition } from '$lib/character';
	import { engine, render as matterRender } from '$lib/matter';
	import { stage, stageUnit } from '$lib/stage';
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

<table class="absolute z-50 bottom-0 left-0 bg-white p-2 border-separate border-spacing-2 scale-75">
	<tr>
		<th>Name</th>
		<th>Stat</th>
	</tr>
	<tr>
		<td>Character Render pos</td>
		<td>
			x: {Math.floor($characterPosition.x)} y: {Math.floor($characterPosition.y)}
		</td>
	</tr>

	<tr>
		<td>Position</td>
		<td>{JSON.stringify(position)}</td>
	</tr>

	<tr>
		<td>Render Bounds</td>
		<td>{JSON.stringify(renderBounds)}</td>
	</tr>

	<tr>
		<td>Current Stage</td>
		<td>{$stage}</td>
	</tr>

	<tr>
		<td>Stage Unit</td>
		<td>{$stageUnit}</td>
	</tr>
</table>
