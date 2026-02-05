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
    renderer.setClearColor(0x0a0a0a, 0);
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
            mesh = createAbstractObject();
            break;
        case 1:
            mesh = createTennis();
            break;
        case 2:
            mesh = createCar();
            break;
        case 3:
            mesh = createHardware();
            break;
        default:
            mesh = createLaptop();
    }

    mesh.castShadow = true;
    mesh.receiveShadow = true;
    scene.add(mesh);

    // Add floating particles

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


function createAbstractObject() {
    const group = new THREE.Group();
    if (loader) {
        loader.load('Objects/abstract_shape.glb', (gltf) => {
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
            console.error('Error loading abstract_shape.glb:', error);
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

// Create different 3D shapes
function createLaptop() {
    const group = new THREE.Group();
    if (loader) {
        loader.load('Objects/audi_a7_55_tfsi.glb', (gltf) => {
            const model = gltf.scene;
            // Scale and position the model
            model.scale.set(.7, .7, .7);
            model.position.set(1, -1, 0);
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

function createTennis() {
    const group = new THREE.Group();
    let modelLoaded = false;
    
    if (loader) {
        loader.load('Objects/Racket-compressed.glb', (gltf) => {
            const model = gltf.scene;
            console.log('Tennis racket loaded successfully:', model);
            modelLoaded = true;
            // Scale and position the model
            model.scale.set(7, 7, 7);
            model.position.set(1.5, -5, 0);
            model.rotation.y = 0;
            model.rotation.z = 0;
            model.rotation.x = 0;
            // model.rotation.y = 0;
            // model.rotation.z = 0; // Rotate 90 degrees around the X-axis
            // Ensure all children cast shadows
            model.traverse((child) => {
                if (child.isMesh) {
                    child.castShadow = true;
                    child.receiveShadow = true;
                }
            });
            group.add(model);
        }, (progress) => {
            console.log('Loading tennis racket:', Math.round(progress.loaded / progress.total * 100) + '%');
        }, (error) => {
            console.error('Error loading Racket-compressed.glb:', error);
            // Load fallback if model fails
            createFallbackMesh(group, 0xa78bfa);
        });
        
        // Timeout fallback after 5 seconds
        setTimeout(() => {
            if (!modelLoaded && group.children.length === 0) {
                console.warn('Tennis model did not load within 5 seconds, using fallback');
                createFallbackMesh(group, 0xa78bfa);
            }
        }, 5000);
    } else {
        console.error('GLTFLoader not initialized');
        createFallbackMesh(group, 0xa78bfa);
    }
    return group;
}

function createFallbackMesh(group, color) {
    const geometry = new THREE.BoxGeometry(2, 2, 2);
    const material = new THREE.MeshPhongMaterial({
        color: color,
        emissive: 0x2a4a5a,
        shininess: 100
    });
    group.add(new THREE.Mesh(geometry, material));
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
        loader.load('Objects/audi_com.glb', (gltf) => {
            const model = gltf.scene;
            // Scale and position the model
            model.scale.set(.7, .7, .7);
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

function createHardware() {
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
        // sceneData.mesh.rotation.y = scrollRotation * 1.5 + Math.cos(Date.now() * 0.0005) * 0.3;

        // Bobbing animation
        sceneData.mesh.position.y = Math.sin(Date.now() * 0.005) * 0.05;

        if (sceneData.sectionIndex === 1) {
            const canvas = document.getElementById(`canvas-${index}`);
            const rect = canvas.getBoundingClientRect();

            // eenvoudige progress: 0 wanneer onder viewport, 1 wanneer top van canvas bij top viewport
            let progress = 1 - (rect.top / window.innerHeight);
            progress = Math.max(0, Math.min(1, progress));

            // target rotatie
            const targetZ = 1.1 * progress;
            const targetY = -0.4 * progress;
            const targetX = 0.3 * progress;

            const startX= 3;
            const endX = -1;
            const targetPositionX = startX + (endX - startX) * progress;

            // soepele interpolatie (lerp)
            sceneData.mesh.rotation.z += (targetZ - (sceneData.mesh.rotation.z || 0)) * 0.12;
            sceneData.mesh.rotation.y += (targetY - (sceneData.mesh.rotation.y || 0)) * 0.12;
            sceneData.mesh.rotation.x += (targetX - (sceneData.mesh.rotation.x || 0)) * 0.12;

            // Update position
            sceneData.mesh.position.x += (targetPositionX - sceneData.mesh.position.x || 0) * 0.12;
        }

        // Update particle positions
        // const positionAttribute = sceneData.particles.geometry.getAttribute('position');
        // const posArray = positionAttribute.array;

        // for (let i = 1; i < posArray.length; i += 3) {
        //     posArray[i] += Math.sin(Date.now() * 0.0001 + i) * 0.001;
        // }
        // positionAttribute.needsUpdate = true;

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

