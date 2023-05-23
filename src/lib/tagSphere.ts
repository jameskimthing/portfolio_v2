import * as THREE from 'three';
import { TextGeometry } from 'three/examples/jsm/geometries/TextGeometry.js';
import { FontLoader } from 'three/examples/jsm/loaders/FontLoader.js';

const skills = [
	'JavaScript (ES6)',
	'TypeScript',
	'pnpm',
	'npm',
	'Github',
	'Flutter',
	'CSS',
	'Svelte',
	'Firebase',
	'Supabase',
	'SvelteKit',
	'REST',
	'Git',
	'JSON',
	'Tailwind',
	'HTML',
	'Three js',
	'Matter js',
	'SQL',
	'AWS'
];

let mouseX: number = 0.5;
let mouseY: number = 0.5;
let container: HTMLDivElement;

function setMouseSphereLocation(e: any) {
	const rect = container.getBoundingClientRect();
	mouseX = ((e.x - rect.left) / rect.width) * 2 - 1;
	mouseY = ((e.y - rect.top) / rect.height) * 2 - 1;
}

const radius = 2;
const renderer = new THREE.WebGLRenderer();
const scene = new THREE.Scene();
const loader = new FontLoader();
const textMaterial = new THREE.MeshBasicMaterial({ color: 0xfffbeb });

let camera: THREE.PerspectiveCamera | null;
let continueAnimation: boolean = true;

function initializeSphere(con: HTMLDivElement) {
	container = con;

	const r = container.clientWidth / container.clientHeight;
	camera = new THREE.PerspectiveCamera(75, r, 0.1, 1000);
	camera.position.z = 4;

	// renderer = new THREE.WebGLRenderer();
	renderer.setPixelRatio(window.devicePixelRatio);
	renderer.setSize(container.clientWidth, container.clientHeight);
	renderer.setClearColor(0x000814, 1);
	container.appendChild(renderer.domElement);

	// Add sphere
	const sphereGeometry = new THREE.SphereGeometry(radius, 8, 8);
	const sphereMaterial = new THREE.MeshBasicMaterial({
		color: 0x000000,
		transparent: true,
		opacity: 0
	});
	const sphere = new THREE.Mesh(sphereGeometry, sphereMaterial);
	scene.add(sphere);

	// Add text

	const textMeshes: THREE.Mesh[] = [];

	const numTexts = skills.length;
	for (let i = 0; i < numTexts; i++) {
		const theta = Math.acos(-1 + (2 * i) / (numTexts - 1));
		const phi = Math.sqrt(numTexts * Math.PI) * theta;
		const x = radius * Math.sin(theta) * Math.cos(phi);
		const y = radius * Math.sin(theta) * Math.sin(phi);
		const z = radius * Math.cos(theta);

		// loader.load('https://threejs.org/examples/fonts/helvetiker_regular.typeface.json', (font) => {
		loader.load('/play.json', (font) => {
			const textGeometry = new TextGeometry(skills[i], {
				font: font,
				size: 0.17,
				height: 0
			});
			textGeometry.center();
			const textMesh = new THREE.Mesh(textGeometry, textMaterial);
			textMesh.position.set(x, y, z);
			textMeshes.push(textMesh);
			sphere.add(textMesh);
		});
	}
	// }

	// Add controls
	const dummyCamera = new THREE.Object3D();
	dummyCamera.position.set(0, 0, 1000);
	camera.add(dummyCamera);

	function animate() {
		if (!continueAnimation) return (continueAnimation = true);
		requestAnimationFrame(animate);
		renderer.render(scene, camera!);

		// Rotate sphere
		const axis = new THREE.Vector3(mouseY, mouseX, 0);
		const angle = axis.length();
		if (angle > 0) {
			axis.normalize();
			sphere.rotateOnAxis(axis, angle * 0.03);
		}

		for (const textMesh of textMeshes) {
			const worldPosition = new THREE.Vector3();
			dummyCamera.localToWorld(worldPosition);
			textMesh.lookAt(worldPosition);
		}
	}
	animate();
}

function removeSphere() {
	if (!camera) return;

	mouseX = 0.5;
	mouseY = 0.5;
	continueAnimation = false;

	scene.children.forEach(function (object) {
		scene.remove(object);
		if (object instanceof THREE.Mesh) {
			if (object.geometry) object.geometry.dispose();
			if (object.material) object.material.dispose();
		}
	});
	scene.children = [];

	scene.remove(camera);
	camera = null;
}

export { initializeSphere, setMouseSphereLocation, removeSphere };
