import Matter from 'matter-js';
import { writable, type Writable } from 'svelte/store';
import { engine } from './matter';
import { character } from './character';

type Stages = 'initialLoading' | 'intro' | 'moveStart' | 'about';
const stage: Writable<Stages> = writable('initialLoading');
const stageUnit: Writable<number> = writable(0);

const stagePositions: Map<number, Stages> = new Map([
	[0, 'intro'],
	[2, 'moveStart'],
	[4, 'about']
]);

function initializeStages() {
	Matter.Events.on(engine, 'beforeUpdate', () => {
		const u = Math.round((character.position.x / (window.innerWidth / 3)) * 100) / 100;
		stageUnit.set(u);
	});
}

stageUnit.subscribe((u) => {
	for (const [pos, name] of stagePositions) {
		if (u < pos) {
			stage.set(name);
			break;
		}
	}
});

export { stage, stageUnit, initializeStages };
