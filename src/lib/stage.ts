import Matter from 'matter-js';
import { writable, type Writable } from 'svelte/store';
import { engine } from './matter';
import { character } from './character';

type Stages = 'initialLoading' | 'intro' | 'moveStart';
const stage: Writable<Stages> = writable('initialLoading');

const stageUnit: Writable<number> = writable(0);

function initializeStages() {
	Matter.Events.on(engine, 'beforeUpdate', () => {
		const pos = character.position;
		stageUnit.set(Math.floor(pos.x / (window.innerWidth / 3)));
	});
}

export { stage, stageUnit, initializeStages };
