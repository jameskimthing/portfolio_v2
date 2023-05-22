import * as Matter from 'matter-js';
import { initializeCharacterMatter } from './character';
import { initializeStages } from './stage';

let engine: Matter.Engine;
let render: Matter.Render;
let runner: Matter.Runner;

let matterElement: HTMLElement;

async function initializeMatter(el: HTMLElement) {
	matterElement = el;
	engine = Matter.Engine.create();
	render = Matter.Render.create({
		element: matterElement,
		engine: engine,
		options: {
			width: matterElement.clientWidth,
			height: matterElement.clientHeight,
			background: 'transparent',
			wireframes: false,
			hasBounds: true
		}
	});

	let ground = Matter.Bodies.rectangle(400, 800, 20000, 60, { isStatic: true });
	let leftWall = Matter.Bodies.rectangle(-800, 800, 500, 20000, { isStatic: true });

	initializeStages();
	initializeCharacterMatter();

	Matter.World.add(engine.world, [ground, leftWall]);
	Matter.Render.run(render);

	runner = Matter.Runner.create();
	Matter.Runner.run(runner, engine);
}

function elementToPhysics(element: HTMLElement) {
	const dummyElement = document.createElement('div');
	const style = window.getComputedStyle(element);
	dummyElement.style.width =
		element.offsetWidth + parseInt(style.marginLeft) + parseInt(style.marginRight) + 'px';
	dummyElement.style.height =
		element.offsetHeight + parseInt(style.marginTop) + parseInt(style.marginBottom) + 'px';
	dummyElement.style.opacity = '0';

	function addBody(el: HTMLElement) {
		const rect = el.getBoundingClientRect();
		const width = rect.right - rect.left;
		const height = rect.bottom - rect.top;

		const renderBounds = render.bounds;
		const body = Matter.Bodies.rectangle(
			rect.left + width / 2 + renderBounds.min.x,
			rect.top + height / 2 + renderBounds.min.y,
			width,
			height,
			{
				render: {
					strokeStyle: 'transparent',
					fillStyle: 'transparent'
				}
			}
		);

		Matter.Events.on(engine, 'beforeUpdate', () => {
			const renderBounds = render.bounds;
			const pos = body.position;
			el.style.left = pos.x - width / 2 - renderBounds.min.x + 'px';
			el.style.top = pos.y - height / 2 - renderBounds.min.y + 'px';
			el.style.transform = `rotate(${body.angle}rad)`;
		});

		return body;
	}
	if (!element.classList.contains('text-as-chars')) {
		const rect = element.getBoundingClientRect();
		element.style.position = 'absolute';
		element.style.top = `${rect.top}px`;
		element.style.left = `${rect.left}px`;
		element.style.margin = '0px';

		Matter.World.add(engine.world, [addBody(element)]);
	} else {
		const pr = element.getBoundingClientRect();
		element.style.margin = '0px';
		const characters = element.textContent?.split('') ?? [];
		element.textContent = '';

		let leftSum = 0;
		let lastWidth = 10;

		const bodies: Matter.Body[] = [];
		for (const char of characters) {
			const charElement = document.createElement('span');
			charElement.textContent = char;
			if (char === ' ') {
				leftSum += lastWidth;
				continue;
			}

			charElement.style.position = 'absolute';
			charElement.style.top = `${pr.top}px`;
			charElement.style.left = `${pr.left + leftSum}px`;
			element.appendChild(charElement);

			leftSum += charElement.clientWidth;
			lastWidth = charElement.clientWidth;
			bodies.push(addBody(charElement));
		}

		Matter.World.add(engine.world, bodies);
	}
	element.parentNode!.insertBefore(dummyElement, element);
}

export { engine, render };
export { initializeMatter, elementToPhysics, matterElement };
