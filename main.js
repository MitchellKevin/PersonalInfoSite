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
const baseGeom = new THREE.CylinderGeometry(0.3, 0.3, 0.4, 32);
const baseMat = new THREE.MeshStandardMaterial({ color: 0xff0000 });
const baseMesh = new THREE.Mesh(baseGeom, baseMat);
baseMesh.position.y = 0.2;
pawnGroup.add(baseMesh);

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

// === DICE SETUP ===
const diceSize = 0.5;

// 2 dobbelstenen
const dice1 = new THREE.Mesh(
  new THREE.BoxGeometry(diceSize,diceSize,diceSize),
  new THREE.MeshStandardMaterial({color:0xffffff})
);
dice1.position.set(-1,2,0);
scene.add(dice1);

const dice2 = new THREE.Mesh(
  new THREE.BoxGeometry(diceSize,diceSize,diceSize),
  new THREE.MeshStandardMaterial({color:0xffffff})
);
dice2.position.set(1,2,0);
scene.add(dice2);

// === DICE ROLL FUNCTION (over bord) ===
function rollDiceOverBoard(diceMesh){
  const steps = 60; // frames animatie (~1 sec)
  let count = 0;
  
  // random eindpositie op bord
  const minPos = -5; const maxPos = 5;
  const targetPos = new THREE.Vector3(
    Math.random()*(maxPos-minPos)+minPos,
    2,
    Math.random()*(maxPos-minPos)+minPos
  );

  // random eindface
  const targetFace = Math.floor(Math.random()*6); // 0-5
  const targetEuler = new THREE.Euler(
    [0,Math.PI/2,-Math.PI/2,Math.PI,0,0][targetFace],
    [0,0,0,0,Math.PI/2,-Math.PI/2][targetFace],
    0
  );

  const startPos = diceMesh.position.clone();
  const startRot = diceMesh.rotation.clone();

  return new Promise((resolve)=>{
    function animateStep(){
      count++;
      // positie lerp
      diceMesh.position.lerp(targetPos, 0.1);
      // rotatie willekeurig + richting eindface
      diceMesh.rotation.x += (targetEuler.x - diceMesh.rotation.x)*0.1 + Math.random()*0.3;
      diceMesh.rotation.y += (targetEuler.y - diceMesh.rotation.y)*0.1 + Math.random()*0.3;
      diceMesh.rotation.z += (targetEuler.z - diceMesh.rotation.z)*0.1 + Math.random()*0.3;

      if(count<steps){
        requestAnimationFrame(animateStep);
      } else {
        diceMesh.position.copy(targetPos);
        diceMesh.rotation.copy(targetEuler);
        resolve(targetFace+1); // 1-6
      }
    }
    animateStep();
  });
}

// === DICE BUTTON ===
document.getElementById('rollDiceBtn').onclick = async () => {
  if(moving) return;

  const roll1 = rollDiceOverBoard(dice1);
  const roll2 = rollDiceOverBoard(dice2);

  const [value1, value2] = await Promise.all([roll1, roll2]);
  const total = value1 + value2;

  // Toon de 2D dobbelsteen afbeeldingen
  showDiceEyesImages(value1, value2);

  movePawn(total);
};

function showDiceEyesImages(value1, value2) {
    const overlay = document.createElement('div');
    overlay.className = 'dice-eyes-overlay';

    // Dobbelsteen 1
    const dice1Img = document.createElement('img');
    dice1Img.src = `Objects/diceFaces/dice${value1}.png`;
    dice1Img.className = 'dice-face-img';
    overlay.appendChild(dice1Img);

    // Dobbelsteen 2
    const dice2Img = document.createElement('img');
    dice2Img.src = `Objects/diceFaces/dice${value2}.png`;
    dice2Img.className = 'dice-face-img';
    overlay.appendChild(dice2Img);

    document.body.appendChild(overlay);

    setTimeout(() => {
        overlay.style.transition = 'opacity 0.5s';
        overlay.style.opacity = '0';
        setTimeout(() => document.body.removeChild(overlay), 500);
    }, 2000);
}


// === FUNCTIE OM RESULTAAT TE TONEN ===
function showDiceResult(value1, value2) {
    const overlay = document.createElement('div');
    overlay.className = 'dice-result-overlay';
    overlay.innerHTML = `
        <div style="font-size:3em; color:#fff; text-align:center;">
            Dobbelsteen 1: ${value1} <br>
            Dobbelsteen 2: ${value2} <br>
            <strong>Totaal: ${value1+value2}</strong>
        </div>
    `;
    document.body.appendChild(overlay);

    // fade out na 2 seconden
    setTimeout(() => {
        overlay.style.transition = 'opacity 0.5s';
        overlay.style.opacity = '0';
        setTimeout(() => document.body.removeChild(overlay), 500);
    }, 2000);
}

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

// === KAART POP-UP ===
function showPropertyCard(data) {
  const card = document.getElementById('cardPopup');

  card.querySelector('.card-title').textContent = data.name;
  card.querySelector('.rent-main').textContent = `RENT $${data.rent}`;

  const rows = card.querySelectorAll('.rent-list div span:last-child');
  rows[0].textContent = `$${data.house1}`;
  rows[1].textContent = `$${data.house2}`;
  rows[2].textContent = `$${data.house3}`;
  rows[3].textContent = `$${data.hotel}`;

  card.classList.add('visible');

  setTimeout(() => {
    card.classList.remove('visible');
  }, 10000);
}

showPropertyCard({
  name: "PETERPAN VILLA",
  rent: 160,
  house1: 200,
  house2: 600,
  house3: 1400,
  hotel: 2000
});

function movePawn(steps) {
    if (moving) return;
    moving = true;
    let remaining = steps;

    function step() {
        if (remaining <= 0) {
            moving = false;

            // === POP-UP ALS PAWN OP TILE STAAT ===
            const info = {
                name: `Tile #${currentTile}`,
                rent: 0,
                house1: 0,
                house2: 0,
                house3: 0,
                hotel: 0
            };
            showPropertyCard(info);

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
