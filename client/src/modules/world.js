'use strict';

const { light, skybox, keyboardControls, audio } = require('ebabel');

// Default renderer clear color.
const _color = 0x0e0727;
const _opacity = 1;

// Setup the 3D world.
const world = (input) => {
  const {
    THREE,
    THREEx,
    EG,
    color = _color,
    opacity = _opacity
  } = input;

  // Setup main clock that accurately calculates delta in animations.
  const clock = new THREE.Clock();
  clock.start();

  // Setup main 3D scene where all meshes, sprites, and 3D objects will live.
  const scene = new THREE.Scene();
  scene.name = 'underwater-game-world';

  // Setup camera as the subjective first person point of view of current player.
  const camera = new THREE.PerspectiveCamera(45, window.innerWidth/window.innerHeight, 0.1, 100000);
  camera.name = 'player-first-view-camera';
  camera.position.set(...EG.dataStore.player.position);
  camera.rotation.set(...EG.dataStore.player.rotation);

  // Setup keyboard controls.
  const controls = keyboardControls(EG.dataStore);

  // Setup main theme music.
  const defaultTheme = audio({
    THREE,
    camera,
    volume: EG.dataStore.defaultVolume,
    url: 'assets/music/ambient2-nautilus.ogg',
    name: 'default-theme',
    autostart: true,
    loop: true,
  });
  scene.add(defaultTheme);

  // Combat music.
  const combatTheme = audio({
    THREE,
    camera,
    volume: 0.2,
    url: 'assets/music/hold-the-line.ogg',
    name: 'combat-theme',
    loop: true,
  });
  scene.add(combatTheme);

  // Setup main renderer for WebGL graphics.
  const renderer = new THREE.WebGLRenderer({ antialias: true });
  renderer.setClearColor(color, opacity);
  renderer.setSize(window.innerWidth, window.innerHeight);
  document.body.appendChild(renderer.domElement);

  // When the window resizes, adjust the renderer and camera.
  const windowResize = new THREEx.WindowResize(renderer, camera);

  // Light.
  light({ THREE, scene });

  // Skybox.
  skybox({
    THREE,
    scene,
    directions:  ['ft', 'bk', 'up', 'dn', 'rt', 'lf']
      .map((direction) => `../assets/whirlpool/webp/whirlpool_${direction}.webp`)
  });

  return {
    clock,
    scene,
    camera,
    renderer,
    controls,
    windowResize,
  };
};

module.exports = world;
