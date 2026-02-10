import * as THREE from 'https://unpkg.com/three@0.150.1/build/three.module.js';

const canvas = document.getElementById("gameCanvas");
const renderer = new THREE.WebGLRenderer({ canvas, antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(50, window.innerWidth / window.innerHeight, 0.1, 100);

camera.position.set(0, 6, 12);
camera.lookAt(0, 0, 0);

const textureLoader = new THREE.TextureLoader();
const boardTexture = textureLoader.load("Objects/monopoly_board.png");

const board = new THREE.Mesh(
    new THREE.PlaneGeometry(10, 10),
    new THREE.MeshBasicMaterial({ map: boardTexture, side: THREE.DoubleSide })
);
board.rotation.x = Math.PI / 2;
scene.add(board);
