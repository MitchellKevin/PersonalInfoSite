// Wait for global THREE to be available, then initialize the app
(function waitForThree() {
  if (typeof THREE === 'undefined') {
    console.warn('THREE not defined yet, retrying...');
    setTimeout(waitForThree, 50);
    return;
  }

// ============================================================================
// SCENE SETUP
// ============================================================================

const scene = new THREE.Scene();
scene.background = new THREE.Color(0x87ceeb); // Sky blue

// ============================================================================
// RENDERER SETUP (FULLSCREEN)
// ============================================================================

const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.BasicShadowMap; // faster, simpler shadows
renderer.setClearColor(0x87ceeb, 1);
document.body.appendChild(renderer.domElement);

// ============================================================================
// CAMERA SETUP
// ============================================================================

const camera = new THREE.PerspectiveCamera(
  70,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);
camera.position.set(0, 10, 18); // slightly lower and closer for arcade feel
camera.lookAt(0, 2, 0);

// ============================================================================
// LIGHTING
// ============================================================================

// Stylized cartoon lighting
const hemi = new THREE.HemisphereLight(0xfff5d6, 0x6b8cff, 0.9); // warm sky, cool ground
scene.add(hemi);

// Soft key light for color and contrast
const key = new THREE.DirectionalLight(0xffffff, 0.8);
key.position.set(30, 60, 30);
key.castShadow = true;
key.shadow.mapSize.width = 512;
key.shadow.mapSize.height = 512;
scene.add(key);

// Rim light (colored) for cartoon pop
const rim = new THREE.PointLight(0x00d4ff, 0.6, 200);
rim.position.set(-30, 30, -30);
scene.add(rim);

// ============================================================================
// GROUND PLANE
// ============================================================================

// Stylized flat ground with wide stripes (cartoon feel)
const groundGeometry = new THREE.PlaneGeometry(1000, 1000);
const gCanvas = document.createElement('canvas');
gCanvas.width = 512;
gCanvas.height = 512;
const gctx = gCanvas.getContext('2d');
// Draw horizontal stripes
gctx.fillStyle = '#4dd964';
gctx.fillRect(0, 0, 512, 512);
gctx.fillStyle = '#2bbf3a';
for (let i = 0; i < 6; i++) {
  gctx.fillRect(0, i * 85, 512, 42);
}
const gTexture = new THREE.CanvasTexture(gCanvas);
gTexture.wrapS = THREE.RepeatWrapping;
gTexture.wrapT = THREE.RepeatWrapping;
gTexture.repeat.set(4, 4);
const groundMaterial = new THREE.MeshToonMaterial({ map: gTexture, color: 0x4dd964 });
const ground = new THREE.Mesh(groundGeometry, groundMaterial);
ground.rotation.x = -Math.PI / 2;
ground.position.y = 0;
ground.receiveShadow = true;
scene.add(ground);

// ============================================================================
// CAR OBJECT
// ============================================================================

const car = {
  mesh: null,
  position: new THREE.Vector3(0, 1, 0),
  velocity: new THREE.Vector3(0, 0, 0),
  rotation: 0, // Y-axis rotation in radians
  
  // Movement parameters
  acceleration: 0.4,
  maxSpeed: 0.5,
  friction: 0.92,
  rotationSpeed: 0.08,
  
  init() {
    // Create car body (box) - toon material, flat shading
    const bodyGeometry = new THREE.BoxGeometry(2, 1.5, 4);
    const bodyMaterial = new THREE.MeshToonMaterial({ color: 0xff3b3b });
    this.mesh = new THREE.Mesh(bodyGeometry, bodyMaterial);
    this.mesh.position.copy(this.position);
    this.mesh.castShadow = true;
    this.mesh.receiveShadow = true;
    scene.add(this.mesh);
    
    // Add wheels for visual appeal
    this.addWheels();
  },
  
  addWheels() {
    const wheelGeometry = new THREE.CylinderGeometry(0.5, 0.5, 0.4, 8);
    const wheelMaterial = new THREE.MeshToonMaterial({ color: 0x111111 });
    
    const wheelPositions = [
      [-1, 0.5, 1],   // Front left
      [1, 0.5, 1],    // Front right
      [-1, 0.5, -1],  // Back left
      [1, 0.5, -1]    // Back right
    ];
    
    wheelPositions.forEach(pos => {
      const wheel = new THREE.Mesh(wheelGeometry, wheelMaterial);
      wheel.rotation.z = Math.PI / 2;
      wheel.position.set(pos[0], pos[1], pos[2]);
      wheel.castShadow = false;
      wheel.receiveShadow = false;
      this.mesh.add(wheel);
    });
  },
  
  update(keys) {
    // Handle input
    let accelerating = false;
    let decelerating = false;
    let turningLeft = false;
    let turningRight = false;
    
    if (keys['W'] || keys['w']) accelerating = true;
    if (keys['S'] || keys['s']) decelerating = true;
    if (keys['A'] || keys['a']) turningLeft = true;
    if (keys['D'] || keys['d']) turningRight = true;
    
    // Apply acceleration/deceleration
    if (accelerating) {
      this.velocity.z -= this.acceleration;
    }
    if (decelerating) {
      this.velocity.z += this.acceleration * 0.5; // Slower when reversing
    }
    
    // Apply friction
    this.velocity.z *= this.friction;
    
    // Clamp speed
    if (this.velocity.z > this.maxSpeed) this.velocity.z = this.maxSpeed;
    if (this.velocity.z < -this.maxSpeed * 0.6) this.velocity.z = -this.maxSpeed * 0.6;
    
    // Apply rotation (steering)
    if (turningLeft) {
      this.rotation += this.rotationSpeed;
    }
    if (turningRight) {
      this.rotation -= this.rotationSpeed;
    }
    
    // Calculate movement in car's local coordinate system
    const moveX = Math.sin(this.rotation) * this.velocity.z;
    const moveZ = Math.cos(this.rotation) * this.velocity.z;
    
    // Update position
    this.position.x += moveX;
    this.position.z += moveZ;
    
    // Clamp position to ground bounds
    const bounds = 240;
    if (this.position.x > bounds) this.position.x = bounds;
    if (this.position.x < -bounds) this.position.x = -bounds;
    if (this.position.z > bounds) this.position.z = bounds;
    if (this.position.z < -bounds) this.position.z = -bounds;
    
    // Update mesh
    this.mesh.position.copy(this.position);
    this.mesh.rotation.y = this.rotation;
  }
};

car.init();

// ============================================================================
// INPUT HANDLING
// ============================================================================

const keys = {};

window.addEventListener('keydown', (e) => {
  keys[e.key] = true;
});

window.addEventListener('keyup', (e) => {
  keys[e.key] = false;
});

// ============================================================================
// CAMERA FOLLOW (LERP)
// ============================================================================

const cameraOffset = new THREE.Vector3(0, 15, 25);

function updateCameraFollow() {
  // Target position is offset from car position
  const targetX = car.position.x + Math.sin(car.rotation) * cameraOffset.z;
  const targetY = car.position.y + cameraOffset.y;
  const targetZ = car.position.z + Math.cos(car.rotation) * cameraOffset.z;
  
  const targetPosition = new THREE.Vector3(targetX, targetY, targetZ);
  
  // Smooth camera follow using lerp
  const lerpFactor = 0.1;
  camera.position.lerp(targetPosition, lerpFactor);
  
  // Make camera look at car with slight upward offset
  const lookAtPoint = car.position.clone();
  lookAtPoint.y += 2;
  camera.lookAt(lookAtPoint);
}

// ============================================================================
// WINDOW RESIZE HANDLING
// ============================================================================

window.addEventListener('resize', () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});

// ============================================================================
// ANIMATION LOOP
// ============================================================================

function animate() {
  requestAnimationFrame(animate);
  
  // Update car
  car.update(keys);
  
  // Update camera
  updateCameraFollow();
  
  // Render
  renderer.render(scene, camera);
}

animate();
})();
