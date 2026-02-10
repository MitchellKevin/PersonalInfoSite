// Import Three.js and GLTFLoader
import * as THREE from 'three';
import { GLTFLoader } from 'https://cdn.jsdelivr.net/npm/three@0.128.0/examples/jsm/loaders/GLTFLoader.js';

// Loading screen


// Array to store scenes and their renderers
const scenes = [];
const renderers = [];
const loader = new GLTFLoader();

// Initilze scenes for each section
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

    let mesh;
    switch(sectionIndex) {
        case 0:
            mesh = createMe();
            break;
        case 1:
            mesh = createTennis();
            break;
        case 2:
            mesh = createCar();
            break;
        case 3:
            mesh = createLaptop();
            break;
        default:
            mesh = createLaptop();
    }

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


function createAbstractObject() {
    const group = new THREE.Group();
    if (loader) {
        loader.load('Objects/abstract_shape.glb', (gltf) => {
            const model = gltf.scene;
            model.scale.set(2, 2, 2);
            model.position.set(0, 0, 0);
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

function createLaptop() {
    const group = new THREE.Group();
    if (loader) {
        loader.load('Objects/Laptop.glb', (gltf) => {
            const model = gltf.scene;
            model.scale.set(1.5, 1.5, 1.5);
            model.position.set(0, -1, 0);
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
            model.scale.set(7, 7, 7);
            model.position.set(1.5, -5, 0);
            model.rotation.y = 0;
            model.rotation.z = 0;
            model.rotation.x = 0;
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
            createFallbackMesh(group, 0xa78bfa);
        });
        
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
        loader.load('Objects/none.glb', (gltf) => {
            const model = gltf.scene;
            model.scale.set(.05, .05, .05);
            model.position.set(0, -4, 0);
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
            model.scale.set(.65, .65, .65);
            model.position.set(0, -1, 0);
            model.rotation.y = 1.5;
            model.rotation.z = 0;
            model.rotation.x = 0;
            model.traverse((child) => {
                if (child.isMesh) {
                    child.castShadow = true;
                    child.receiveShadow = true;
                }
            });
            group.add(model);


            // AI assested code start

            // --- new: collect wheel meshes by name (wheel|rim|tyre|tire) and save on model ---
            const wheels = [];
            model.traverse((child) => {
                if (child.isMesh) {
                    const name = (child.name || '').toLowerCase();
                    if (/wheel|rim|tyre|tire/.test(name)) {
                        wheels.push(child);
                    }
                }
            });
            model.userData.wheels = wheels;
            if (wheels.length === 0) {
                console.warn('No wheels detected in car model. Check child names in the model (open console to inspect).');
            }
            // --- end new ---
            // AI assisted code start
        }, undefined, (error) => {
            console.error('Error loading Laptop.glb:', error);
        });
    } else {
        console.error('GLTFLoader not initialized');
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
            model.scale.set(2, 2, 2);
            model.position.set(0, 0, 0);
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
            model.scale.set(.8, .8, .8);
            model.position.set(0, -1, 0);
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

//Responisveness
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

// Animations for each object individually
function animate() {
    requestAnimationFrame(animate);

    // Get scroll position
    const scrollRotation = window.scrollY * 0.005;

    scenes.forEach((sceneData, index) => {

        // if(sceneData.sectionIndex === 0){
        //     sceneData.mesh.rotation.y = scrollRotation * 1.5 + Math.cos(Date.now() * 0.0005) * 0.03;
        // }
        // Laptop animation
        if (sceneData.sectionIndex == 3){
            sceneData.mesh.rotation.y = scrollRotation * 1.5 + Math.cos(Date.now() * 0.0005) * 0.03;
            sceneData.mesh.rotation.x = scrollRotation + Math.sin(Date.now() * 0.0005) * 0.2;
        }
 
        // Tennis animation
        if (sceneData.sectionIndex === 1) {
            const canvas = document.getElementById(`canvas-${index}`);
            const rect = canvas.getBoundingClientRect();

            let progress = 1 - (rect.top / window.innerHeight);
            progress = Math.max(0, Math.min(1, progress));

            const targetZ = 1.1 * progress;
            const targetY = -0.4 * progress;
            const targetX = 0.3 * progress;

            const startX= 3;
            const endX = -1;
            const targetPositionX = startX + (endX - startX) * progress;

            sceneData.mesh.rotation.z += (targetZ - (sceneData.mesh.rotation.z)) * 0.12;
            sceneData.mesh.rotation.y += (targetY - (sceneData.mesh.rotation.y)) * 0.12;
            sceneData.mesh.rotation.x += (targetX - (sceneData.mesh.rotation.x)) * 0.12;

            sceneData.mesh.position.x += (targetPositionX - sceneData.mesh.position.x) * 0.12;
        }

        // Car animation
        if (sceneData.sectionIndex === 2) {
            const canvas = document.getElementById(`canvas-${index}`);
            const rect = canvas.getBoundingClientRect();

            let progress = .7 - (rect.top / window.innerHeight);
            progress = Math.max(0, Math.min(1, progress));

            const targetY = -0.8 * progress;
            const targetX = 0 * progress;
            const targetZ = 0 * progress;


            const startX= -5;
            const endX = -1.5;
            const targetPositionX = startX + (endX - startX) * progress;

            sceneData.mesh.rotation.y += (targetY - (sceneData.mesh.rotation.y)) * 0.12;
            sceneData.mesh.rotation.x += (targetX - (sceneData.mesh.rotation.x)) * 0.12;
            sceneData.mesh.rotation.z += (targetZ - (sceneData.mesh.rotation.z)) * 0.12;

            sceneData.mesh.position.x += (targetPositionX - (sceneData.mesh.position.x)) * 0.12;

            const model = (sceneData.mesh && sceneData.mesh.children && sceneData.mesh.children[0]) ? sceneData.mesh.children[0] : sceneData.mesh;
            const wheels = model && model.userData ? model.userData.wheels || [] : [];
            if (wheels.length > 0) {
                const speed = 20; 
                if(progress < 1){
                wheels.forEach(w => {
                    w.rotation.x -= speed;
                });
            }
            }
        }
        renderers[index].render(sceneData.scene, sceneData.camera);
    });
}

document.addEventListener('DOMContentLoaded', () => {
    for (let i = 0; i < 4; i++) {
        initScene(i);
    }
    animate();
});


