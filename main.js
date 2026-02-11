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
let cameraAngle = 0; // in radialen
let targetCameraAngle = 0;


const renderer = new THREE.WebGLRenderer({ canvas, antialias: true });
renderer.setClearColor(0x0a0a0a, 0);
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.shadowMap.enabled = true;

// === TILE DATA OPHALEN VIA API ===
async function getTileData(currentTile) {
    try {
        const response = await fetch('cardsInfo.json'); 
        const allTiles = await response.json();

        const tile = allTiles.find(t => t.id === currentTile);

        return tile || { name: "Onbekend", info: "Geen info", streat: "Onbekend" };
    } catch (err) {
        // console.error("Kon tile data niet ophalen:", err);
        // return { name: "Onbekend", info: "Geen info", streat: "Onbekend" };
    }
}



// === LIGHTING ===
scene.add(new THREE.AmbientLight(0xffffff, 1.9));
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

const boardMin = -5.8;
const boardMax = 5.8;
const cornerSize = 1.5; // grootte van hoekvak
const y = 0.2;

// ruimte tussen hoeken
const innerMin = boardMin + cornerSize;
const innerMax = boardMax - cornerSize;
const normalStep = (innerMax - innerMin) / 8; // 9 normale tiles

// ===== LINKERKANT (boven → onder) =====
tiles.push(new THREE.Vector3(boardMin, y, boardMax)); // hoek linksboven

for (let i = 0; i < 9; i++) {
  tiles.push(new THREE.Vector3(
    boardMin,
    y,
    innerMax - normalStep * i
  ));
}

tiles.push(new THREE.Vector3(boardMin, y, boardMin)); // hoek linksonder

// ===== ONDERKANT (links → rechts) =====
tiles.push(new THREE.Vector3(boardMin, y, boardMin)); // hoek linksonder (logisch, maar niet dubbel tellen)

for (let i = 0; i < 9; i++) {
  tiles.push(new THREE.Vector3(
    innerMin + normalStep * i,
    y,
    boardMin
  ));
}

tiles.push(new THREE.Vector3(boardMax, y, boardMin)); // hoek rechtsonder

// ===== RECHTERKANT (onder → boven) =====
for (let i = 0; i < 9; i++) {
  tiles.push(new THREE.Vector3(
    boardMax,
    y,
    innerMin + normalStep * i
  ));
}

tiles.push(new THREE.Vector3(boardMax, y, boardMax)); // hoek rechtsboven

// ===== BOVENKANT (rechts → links) =====
for (let i = 0; i < 9; i++) {
  tiles.push(new THREE.Vector3(
    innerMax - normalStep * i,
    y,
    boardMax
  ));
}


// === PAWN (3D SHAPES) ===
const pawnGroup = new THREE.Group();
const baseGeom = new THREE.CylinderGeometry(0.3, 0.3, 0.6, 32);
const baseMat = new THREE.MeshStandardMaterial({ color: 0xff0000 });
const baseMesh = new THREE.Mesh(baseGeom, baseMat);
baseMesh.position.y = 0.2;
pawnGroup.add(baseMesh);

const headGeom = new THREE.SphereGeometry(0.2, 32, 32);
const headMat = new THREE.MeshStandardMaterial({ color: 0xff0000 });
const headMesh = new THREE.Mesh(headGeom, headMat);
headMesh.position.y = 0.65;
pawnGroup.add(headMesh);

let currentTile = tiles.length - 10;
pawnGroup.position.copy(tiles[currentTile]);
scene.add(pawnGroup);

let moving = false;

// === CAMERA CONTROLS ===
function updateCamera() {
  cameraAngle += (targetCameraAngle - cameraAngle) * 0.08;

  const radius = 12;
  camera.position.x = Math.sin(cameraAngle) * radius;
  camera.position.z = Math.cos(cameraAngle) * radius;
  camera.position.y = 7;

  camera.lookAt(0, 0, 0);
}

// === DICE SETUP ===
const diceSize = 0.5;

// 2 dobbelstenen
const dice1 = new THREE.Mesh(
  new THREE.BoxGeometry(diceSize,diceSize,diceSize),
  new THREE.MeshStandardMaterial({color:0x000000})
);
dice1.position.set(-1,2,0);
scene.add(dice1);

const dice2 = new THREE.Mesh(
  new THREE.BoxGeometry(diceSize,diceSize,diceSize),
  new THREE.MeshStandardMaterial({color:0x000000})
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
  const targetFace = Math.floor(Math.random()*6);
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
        resolve(targetFace+1);
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
  updateCamera();
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
function showPropertyCard(tileInfo) {
    const card = document.getElementById('cardPopup');
    card.querySelector('.card-title').textContent = tileInfo.name;
    card.querySelector('.rent-main').textContent = tileInfo.info;
    card.querySelector('.card-title-small').textContent = tileInfo.streat;
    card.classList.add('visible');

    setTimeout(() => {
        card.classList.remove('visible');
    }, 20000);
}



function movePawn(steps) {
    if (moving) return;
    moving = true;
    let remaining = steps;

    function step() {
        if (remaining <= 0) {
            moving = false;

            getTileData(currentTile).then(titleInfo => {

            // === POP-UP ALS PAWN OP TILE STAAT ===

            showPropertyCard(titleInfo);
             if(currentTile === 32 || currentTile === 34) {
        document.getElementsByClassName('card-header')[0].style.background = '#c56b04';
      }else if(currentTile === 37 || currentTile === 39 || currentTile === 40){
        document.getElementsByClassName('card-header')[0].style.background = '#86e3ff';
      }else if(currentTile === 1 || currentTile === 3 || currentTile === 4){
        document.getElementsByClassName('card-header')[0].style.background = '#ff6ecf';
      }else if(currentTile === 6 || currentTile === 8 || currentTile === 9){
        document.getElementsByClassName('card-header')[0].style.background = '#ff9838';
      }else if(currentTile === 12 || currentTile === 14 || currentTile === 15){
        document.getElementsByClassName('card-header')[0].style.background = '#c50000';
      }else if(currentTile === 17 || currentTile === 18 || currentTile === 20){
        document.getElementsByClassName('card-header')[0].style.background = '#fffb00';
      }else if(currentTile === 22 || currentTile === 23 || currentTile === 25){
        document.getElementsByClassName('card-header')[0].style.background = '#8bc768';
      }else if(currentTile === 28 || currentTile === 30){
        document.getElementsByClassName('card-header')[0].style.background = '#0569ff';
      }else{
        document.getElementsByClassName('card-header')[0].style.background = '#ffffff';
      }

            });
            return;
        }

        const nextIndex = (currentTile + 1) % tiles.length;
        const target = tiles[nextIndex];

        function animateStep() {
            console.log(currentTile)
            pawnGroup.position.lerp(target, 0.12);
            pawnGroup.lookAt(target.x, pawnGroup.position.y, target.z);

            if (currentTile >27 && currentTile < 37) {
                  targetCameraAngle = 0; // 0 graden draaien
      }else if (currentTile > 0 && currentTile < 10) {
                  targetCameraAngle = Math.PI / -2; // 90 graden draaien
      }else if (currentTile > 9 && currentTile < 19) {
                  targetCameraAngle = Math.PI; // 180 graden draaien
      }else if (currentTile > 18 && currentTile < 28) {
                  targetCameraAngle = -Math.PI / -2; // -90 graden draaien
      }


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

