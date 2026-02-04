// Import Three.js and GLTFLoader as ES modules
import * as THREE from 'three';
import { GLTFLoader } from 'https://cdn.jsdelivr.net/npm/three@0.128.0/examples/jsm/loaders/GLTFLoader.js';

// Array to store scenes and their renderers
const scenes = [];
const renderers = [];
const loader = new GLTFLoader();

// Initialize scenes for each section
function initScene(sectionIndex) {
    const canvas = document.getElementById(`canvas-${sectionIndex}`);
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, canvas.clientWidth / canvas.clientHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true });

    renderer.setSize(canvas.clientWidth, canvas.clientHeight);
    renderer.setClearColor(0x0a0a0a, 0.1);
    renderer.shadowMap.enabled = true;

    camera.position.z = 5;

    // Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
    scene.add(ambientLight);

    const pointLight1 = new THREE.PointLight(0x64c8ff, 1, 100);
    pointLight1.position.set(5, 5, 5);
    pointLight1.castShadow = true;
    scene.add(pointLight1);

    const pointLight2 = new THREE.PointLight(0xa78bfa, 0.8, 100);
    pointLight2.position.set(-5, -5, 5);
    scene.add(pointLight2);

    // Create different 3D objects based on section
    let mesh;
    switch(sectionIndex) {
        case 0:
            mesh = createMe();
            break;
        case 1:
            mesh = createLaptop();
            break;
        case 2:
            mesh = createRunning();
            break;
        case 3:
            mesh = createCamera();
            break;
        default:
            mesh = createLaptop();
    }

    mesh.castShadow = true;
    mesh.receiveShadow = true;
    scene.add(mesh);

    // Add floating particles
    const particles = createParticles();
    scene.add(particles);

    scenes.push({
        scene,
        camera,
        mesh,
        particles,
        rotationX: 0,
        rotationY: 0
    });

    renderers.push(renderer);

    return { scene, camera, renderer, mesh, particles };
}

// Create different 3D shapes
function createLaptop() {
    const group = new THREE.Group();
    if (loader) {
        loader.load('Objects/Laptop.glb', (gltf) => {
            const model = gltf.scene;
            // Scale and position the model
            model.scale.set(2, 2, 2);
            model.position.set(0, -1, 0);
            // Ensure all children cast shadows
            model.traverse((child) => {
                if (child.isMesh) {
                    child.castShadow = true;
                    child.receiveShadow = true;
                }
            });
            group.add(model);
        }, undefined, (error) => {
            console.error('Error loading Laptop.glb:', error);
        });
    } else {
        console.error('GLTFLoader not initialized');
        // Fallback: create a simple cube
        const geometry = new THREE.BoxGeometry(2, 2, 2);
        const material = new THREE.MeshPhongMaterial({
            color: 0x64c8ff,
            emissive: 0x2a4a5a,
            shininess: 100
        });
        group.add(new THREE.Mesh(geometry, material));
    }
    return group;
}

function createMe() {
    const group = new THREE.Group();
    if (loader) {
        loader.load('Objects/Me.glb', (gltf) => {
            const model = gltf.scene;
            // Scale and position the model
            model.scale.set(.05, .05, .05);
            model.position.set(0, -2, 0);
            // Ensure all children cast shadows
            model.traverse((child) => {
                if (child.isMesh) {
                    child.castShadow = true;
                    child.receiveShadow = true;
                }
            });
            group.add(model);
        }, undefined, (error) => {
            console.error('Error loading Me.glb:', error);
        });
    } else {
        console.error('GLTFLoader not initialized');
        // Fallback: create a simple cube
        const geometry = new THREE.BoxGeometry(2, 2, 2);
        const material = new THREE.MeshPhongMaterial({
            color: 0x64c8ff,
            emissive: 0x2a4a5a,
            shininess: 100
        });
        group.add(new THREE.Mesh(geometry, material));
    }
    return group;
}

function createCar() {
    const group = new THREE.Group();
    if (loader) {
        loader.load('Objects/Car.glb', (gltf) => {
            const model = gltf.scene;
            // Scale and position the model
            model.scale.set(1.2, 1.2, 1.2);
            model.position.set(0, -.5, 0);
            // Ensure all children cast shadows
            model.traverse((child) => {
                if (child.isMesh) {
                    child.castShadow = true;
                    child.receiveShadow = true;
                }
            });
            group.add(model);
        }, undefined, (error) => {
            console.error('Error loading Laptop.glb:', error);
        });
    } else {
        console.error('GLTFLoader not initialized');
        // Fallback: create a simple cube
        const geometry = new THREE.BoxGeometry(2, 2, 2);
        const material = new THREE.MeshPhongMaterial({
            color: 0x64c8ff,
            emissive: 0x2a4a5a,
            shininess: 100
        });
        group.add(new THREE.Mesh(geometry, material));
    }
    return group;
}

function createRunning() {
    const group = new THREE.Group();
    if (loader) {
        loader.load('Objects/Running.glb', (gltf) => {
            const model = gltf.scene;
            // Scale and position the model
            model.scale.set(2, 2, 2);
            model.position.set(0, 0, 0);
            // Ensure all children cast shadows
            model.traverse((child) => {
                if (child.isMesh) {
                    child.castShadow = true;
                    child.receiveShadow = true;
                }
            });
            group.add(model);
        }, undefined, (error) => {
            console.error('Error loading Laptop.glb:', error);
        });
    } else {
        console.error('GLTFLoader not initialized');
        // Fallback: create a simple cube
        const geometry = new THREE.BoxGeometry(2, 2, 2);
        const material = new THREE.MeshPhongMaterial({
            color: 0x64c8ff,
            emissive: 0x2a4a5a,
            shininess: 100
        });
        group.add(new THREE.Mesh(geometry, material));
    }
    return group;
}

function createCamera() {
    const group = new THREE.Group();
    if (loader) {
        loader.load('Objects/Camera.glb', (gltf) => {
            const model = gltf.scene;
            // Scale and position the model
            model.scale.set(.8, .8, .8);
            model.position.set(0, -1, 0);
            // Ensure all children cast shadows
            model.traverse((child) => {
                if (child.isMesh) {
                    child.castShadow = true;
                    child.receiveShadow = true;
                }
            });
            group.add(model);
        }, undefined, (error) => {
            console.error('Error loading Camera.glb:', error);
        });
    } else {
        console.error('GLTFLoader not initialized');
        // Fallback: create a simple cube
        const geometry = new THREE.BoxGeometry(2, 2, 2);
        const material = new THREE.MeshPhongMaterial({
            color: 0x64c8ff,
            emissive: 0x2a4a5a,
            shininess: 100
        });
        group.add(new THREE.Mesh(geometry, material));
    }
    return group;
}

function createParticles() {
    const particlesGeometry = new THREE.BufferGeometry();
    const particlesCount = 50;
    const posArray = new Float32Array(particlesCount * 3);

    for (let i = 0; i < particlesCount * 3; i += 3) {
        posArray[i] = (Math.random() - 0.5) * 8;
        posArray[i + 1] = (Math.random() - 0.5) * 8;
        posArray[i + 2] = (Math.random() - 0.5) * 8;
    }

    particlesGeometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3));

    const particlesMaterial = new THREE.PointsMaterial({
        size: 0.05,
        color: 0xa78bfa,
        sizeAttenuation: true,
        transparent: true,
        opacity: 0.6
    });

    return new THREE.Points(particlesGeometry, particlesMaterial);
}

// Handle scroll events
let scrollProgress = 0;
window.addEventListener('scroll', () => {
    scrollProgress = window.scrollY / (document.documentElement.scrollHeight - window.innerHeight);
});

// Handle window resize
window.addEventListener('resize', () => {
    scenes.forEach((sceneData, index) => {
        const canvas = document.getElementById(`canvas-${index}`);
        const width = canvas.clientWidth;
        const height = canvas.clientHeight;
        
        sceneData.camera.aspect = width / height;
        sceneData.camera.updateProjectionMatrix();
        renderers[index].setSize(width, height);
    });
});

// Animation loop
function animate() {
    requestAnimationFrame(animate);

    // Get scroll position for rotation calculation
    const scrollRotation = window.scrollY * 0.005;

    scenes.forEach((sceneData, index) => {
        // Update rotation based on scroll
        // sceneData.mesh.rotation.x = scrollRotation + Math.sin(Date.now() * 0.0005) * 0.2;
        sceneData.mesh.rotation.y = scrollRotation * 1.5 + Math.cos(Date.now() * 0.0005) * 0.3;

        // Bobbing animation
        sceneData.mesh.position.y = Math.sin(Date.now() * 0.0005) * 0.15;

        // Animate particles
        sceneData.particles.rotation.x += 0.0001;
        sceneData.particles.rotation.y += 0.0002;

        // Update particle positions
        const positionAttribute = sceneData.particles.geometry.getAttribute('position');
        const posArray = positionAttribute.array;

        for (let i = 1; i < posArray.length; i += 3) {
            posArray[i] += Math.sin(Date.now() * 0.0001 + i) * 0.001;
        }
        positionAttribute.needsUpdate = true;

        // Render
        renderers[index].render(sceneData.scene, sceneData.camera);
    });
}

// Initialize all scenes
document.addEventListener('DOMContentLoaded', () => {
    for (let i = 0; i < 4; i++) {
        initScene(i);
    }
    animate();
});

