import { get, writable, type Writable } from 'svelte/store';
import { engine, render } from './matter';
import Matter from 'matter-js';

let characterFrames: string[] = [];

const CHARACTER_WIDTH = 105;
const CHARACTER_HEIGHT = 161;

const characterPosition: Writable<{ x: number; y: number }> = writable({ x: 0, y: 0 });
const movingStates: Writable<Set<'right' | 'left' | 'air'>> = writable(new Set());

let character: Matter.Body;
async function initializeCharacterMatter() {
	const charPos = get(characterPosition);
	character = Matter.Bodies.rectangle(
		charPos.x + CHARACTER_WIDTH / 2,
		charPos.y + CHARACTER_HEIGHT / 2,
		CHARACTER_WIDTH * 0.6,
		CHARACTER_HEIGHT,
		{
			inertia: Infinity,
			render: {
				strokeStyle: 'transparent',
				fillStyle: 'transparent'
			}
		}
	);

	Matter.World.add(engine.world, character);
}

async function initializeCharacter(): Promise<string[]> {
	if (characterFrames.length === 9) return characterFrames;

	const w = 15;
	const h = 23;
	return new Promise((resolve, reject) => {
		const img = new Image();
		img.src = 'frames.png';
		img.onload = () => {
			const canvas = document.createElement('canvas');
			canvas.width = w;
			canvas.height = h;

			const ctx = canvas.getContext('2d')!;

			for (let i = 0; i < 3; i++) {
				for (let j = 0; j < 3; j++) {
					const y = i * h + i + 1;
					const x = j * w + j + 1;

					ctx.clearRect(0, 0, canvas.width, canvas.height);
					ctx.drawImage(img, x, y, w, h, 0, 0, w, h);

					characterFrames.push(canvas.toDataURL());
				}
			}

			let prevPrevY: number = 0;
			Matter.Events.on(engine, 'beforeUpdate', () => {
				const ms = get(movingStates);
				const prev = character.velocity;

				let x = 0;
				if (ms.has('left')) x -= 10;
				if (ms.has('right')) x += 10;
				if (x === 0) x = prev.x;

				if (Math.abs(prevPrevY) < 1 && Math.abs(prev.y) > 9) {
					movingStates.update((p) => p.add('air'));
				} else if (Math.abs(prevPrevY) > 0.5 && Math.abs(prev.y) < 0.3) {
					movingStates.update((p) => {
						p.delete('air');
						return p;
					});
				}
				prevPrevY = prev.y;

				Matter.Body.setVelocity(character, { y: prev.y, x: x });
				const pos = character.position;
				characterPosition.set({
					x: pos.x - CHARACTER_WIDTH / 2,
					y: pos.y - CHARACTER_HEIGHT / 2
				});

				Matter.Bounds.shift(render.bounds, {
					x: pos.x - window.innerWidth / 2,
					y: pos.y - window.innerHeight / 2
				});
			});
			resolve(characterFrames);
		};
	});
}

function characterKeyDown(e: any) {
	switch (e.keyCode) {
		case 38:
		case 32:
		case 87:
			const prev = character.velocity;
			Matter.Body.setVelocity(character, { x: prev.x, y: -10 });
			break;
		case 65:
		case 37:
			movingStates.update((p) => p.add('left'));
			break;
		case 68:
		case 39:
			movingStates.update((p) => p.add('right'));
			break;
	}
}

function characterKeyUp(e: any) {
	switch (e.keyCode) {
		case 65:
		case 37:
			movingStates.update((p) => {
				const prev = character.velocity;
				Matter.Body.setVelocity(character, { x: prev.x / 3, y: prev.y });
				p.delete('left');
				return p;
			});
			break;
		case 68:
		case 39:
			movingStates.update((p) => {
				const prev = character.velocity;
				Matter.Body.setVelocity(character, { x: prev.x / 3, y: prev.y });
				p.delete('right');
				return p;
			});
			break;
	}
}

export {
	initializeCharacter,
	initializeCharacterMatter,
	CHARACTER_HEIGHT,
	CHARACTER_WIDTH,
	characterPosition
};
export { movingStates, characterKeyDown, characterKeyUp };
