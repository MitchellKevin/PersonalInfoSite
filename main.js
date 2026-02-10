// Import Three.js and GLTFLoader
// import * as THREE from 'three';
// import { GLTFLoader } from 'https://cdn.jsdelivr.net/npm/three@0.128.0/examples/jsm/loaders/GLTFLoader.js';
// Loading screen


// Array to store scenes and their renderers
const scenes = [];
const renderers = [];

// Initilze scenes for each section
function initScene(sectionIndex) {
    const canvas = document.getElementById(`gameCanvas`);
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, canvas.clientWidth / canvas.clientHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true });

    renderer.setSize(canvas.clientWidth, canvas.clientHeight);
    renderer.setClearColor(0x0a0a0a, 0);
    renderer.shadowMap.enabled = true;

    camera.position.set(0, 6, 12);
    camera.lookAt(0, 0, 0);

    // Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 1.2);
    scene.add(ambientLight);

    const pointLight1 = new THREE.PointLight(0x64c8ff, 1, 100);
    pointLight1.position.set(5, 5, 5);
    pointLight1.castShadow = true;
    scene.add(pointLight1);

    const pointLight2 = new THREE.PointLight(0xa78bfa, 0.8, 100);
    pointLight2.position.set(-5, -5, 5);
    scene.add(pointLight2);

    let mesh;
    mesh = createBoard();

    mesh.castShadow = true;
    mesh.receiveShadow = true;
    scene.add(mesh);

    scenes.push({
        scene,
        camera,
        mesh,
        rotationX: 0,
        rotationY: 0,
        sectionIndex
    });

    renderers.push(renderer);

    return { scene, camera, renderer, mesh };
}

function createBoard() {
  const textureLoader = new THREE.TextureLoader();
  const boardTexture = textureLoader.load('Objects/monopoly_board.png');

  const boardGeometry = new THREE.BoxGeometry(13, .2, 13);
  const boardMaterial = new THREE.MeshStandardMaterial({
    map: boardTexture
  });

  const board = new THREE.Mesh(boardGeometry, boardMaterial);
  board.rotation.x = -Math.PI / 1.1;
  board.rotation.y = Math.PI / .1;

  board.receiveShadow = true;

  return board;
}


function animate() {
  requestAnimationFrame(animate);

  scenes.forEach(({ scene, camera }, index) => {
    renderers[index].render(scene, camera);
  });
}


document.addEventListener('DOMContentLoaded', () => {
    for (let i = 0; i < 4; i++) {
        initScene(i);
    }
    animate();
});

