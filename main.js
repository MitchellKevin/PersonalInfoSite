// === BASIC SETUP ===
const canvas = document.getElementById('gameCanvas');
const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(
  60,
  window.innerWidth / window.innerHeight,
  0.1,
  100
);
camera.position.set(0, 7, 12);
camera.lookAt(0, 0, 0);

const renderer = new THREE.WebGLRenderer({ canvas, antialias: true });
renderer.setClearColor(0x0a0a0a, 0);
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.shadowMap.enabled = true;

// === LIGHTING ===
scene.add(new THREE.AmbientLight(0xffffff, 2));
const dirLight = new THREE.DirectionalLight(0xffffff, 1);
dirLight.position.set(5, 10, 5);
scene.add(dirLight);

// === BOARD ===
const boardTexture = new THREE.TextureLoader().load('Objects/monopoly_board.png');
const board = new THREE.Mesh(
  new THREE.BoxGeometry(13, 0.2, 13),
  new THREE.MeshStandardMaterial({ map: boardTexture })
);
board.rotation.x = -Math.PI / 0.5;
scene.add(board);

// === TILE POSITIES ===
const tiles = [];
const min = -5.8, max = 5.8, step = (max - min) / 9;

// Bovenkant: x van min->max, z = max
for(let i=0;i<10;i++) tiles.push(new THREE.Vector3(min + step*i,0.2,max));
// Rechterkant: x=max, z van max->min
for(let i=1;i<10;i++) tiles.push(new THREE.Vector3(max,0.2,max - step*i));
// Onderkant: x van max->min, z=min
for(let i=1;i<10;i++) tiles.push(new THREE.Vector3(max - step*i,0.2,min));
// Linkerkant: x=min, z van min->max
for(let i=1;i<10;i++) tiles.push(new THREE.Vector3(min,0.2,min + step*i));


// === PAWN (3D SHAPES) ===
const pawnGroup = new THREE.Group();

// basis cilinder
const baseGeom = new THREE.CylinderGeometry(0.3, 0.3, 0.4, 32);
const baseMat = new THREE.MeshStandardMaterial({ color: 0xff0000 });
const baseMesh = new THREE.Mesh(baseGeom, baseMat);
baseMesh.position.y = 0.2;
pawnGroup.add(baseMesh);

// hoofd bol
const headGeom = new THREE.SphereGeometry(0.2, 32, 32);
const headMat = new THREE.MeshStandardMaterial({ color: 0xff5555 });
const headMesh = new THREE.Mesh(headGeom, headMat);
headMesh.position.y = 0.55;
pawnGroup.add(headMesh);

pawnGroup.position.copy(tiles[0]);
scene.add(pawnGroup);

let currentTile = 0;
let moving = false;

// === MOVE FUNCTION ===
function movePawn(steps) {
  if (moving) return;
  moving = true;
  let remaining = steps;

  function step() {
    if (remaining <= 0) {
      moving = false;
      return;
    }
    const nextIndex = (currentTile + 1) % tiles.length;
    const target = tiles[nextIndex];

    function animateStep() {
      pawnGroup.position.lerp(target, 0.12);
      pawnGroup.lookAt(target.x, pawnGroup.position.y, target.z);

      if (pawnGroup.position.distanceTo(target) < 0.02) {
        pawnGroup.position.copy(target);
        currentTile = nextIndex;
        remaining--;
        step();
      } else {
        requestAnimationFrame(animateStep);
      }
    }
    animateStep();
  }

  step();
}

// === DICE BUTTON ===
document.getElementById('rollDiceBtn').onclick = () => {
  if (moving) return;
  const roll = Math.floor(Math.random() * 6) + 1;
  movePawn(roll);
};

// === ANIMATE LOOP ===
function animate() {
  requestAnimationFrame(animate);
  renderer.render(scene, camera);
}
animate();

// === WINDOW RESIZE ===
window.addEventListener('resize', () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});
