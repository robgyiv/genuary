// Ensure ThreeJS is in global scope for the 'examples/'
global.THREE = require('three');

// Include any additional ThreeJS examples below
require('three/examples/js/controls/OrbitControls');
// import { RectAreaLightHelper } from 'three/examples/js/helpers/RectAreaLightHelper';
require('three/examples/js/helpers/RectAreaLightHelper');
require('three/examples/js/lights/RectAreaLightUniformsLib');

const canvasSketch = require('canvas-sketch');

const settings = {
  // Make the loop animated
  animate: true,
  // Get a WebGL canvas rather than 2D
  context: 'webgl',
};

const sketch = ({ context }) => {
  // Create a renderer
  const renderer = new THREE.WebGLRenderer({
    canvas: context.canvas,
  });

  // WebGL background color
  renderer.setClearColor('#000', 1);

  // Setup a camera
  // const camera = new THREE.PerspectiveCamera(50, 1, 0.01, 100);
  // camera.position.set(0, 0, -4);
  // const camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 1, 1000);
  const frustumSize = 500;

  const aspect = window.innerWidth / window.innerHeight;
  const camera = new THREE.OrthographicCamera(
    (frustumSize * aspect) / -2,
    (frustumSize * aspect) / 2,
    frustumSize / 2,
    frustumSize / -2,
    100,
    500
  );

  camera.position.set(-200, 200, 200);
  // const camera = new THREE.OrthographicCamera(
  //   window.innerWidth / -2,
  //   window.innerWidth / 2,
  //   window.innerHeight / 2,
  //   window.innerHeight / -2,
  //   10,
  //   100
  // );
  // // camera.position.set(0, 45, -10);
  // camera.position.set(-200, 200, 200);

  // camera.lookAt(new THREE.Vector3());

  // Setup camera controller
  const controls = new THREE.OrbitControls(camera, context.canvas);

  // Setup your scene
  const scene = new THREE.Scene();
  THREE.RectAreaLightUniformsLib.init();

  const rectLight1 = new THREE.RectAreaLight(0xff0000, 5, 1, 10);
  rectLight1.position.set(-5, 5, 5);
  // rectLight1.lookAt(1, 1, 1);
  // rectLight1.lookAt(0, 0, 0);
  scene.add(rectLight1);

  const rectLight2 = new THREE.RectAreaLight(0x00ff00, 5, 1, 10);
  rectLight2.position.set(0, 5, 5);
  // rectLight2.lookAt(5, 0, 0);
  scene.add(rectLight2);

  const rectLight3 = new THREE.RectAreaLight(0x0000ff, 5, 1, 10);
  rectLight3.position.set(5, 5, 5);
  scene.add(rectLight3);

  scene.add(new THREE.RectAreaLightHelper(rectLight1));
  scene.add(new THREE.RectAreaLightHelper(rectLight2));
  scene.add(new THREE.RectAreaLightHelper(rectLight3));

  const geoFloor = new THREE.BoxGeometry(1000, 0.1, 1000);
  const matStdFloor = new THREE.MeshStandardMaterial({
    color: 0xfcfcfc,
    roughness: 0.1,
    metalness: 0,
  });
  const mshStdFloor = new THREE.Mesh(geoFloor, matStdFloor);
  scene.add(mshStdFloor);

  // draw each frame
  return {
    // Handle resize events here
    resize({ pixelRatio, viewportWidth, viewportHeight }) {
      renderer.setPixelRatio(pixelRatio);
      renderer.setSize(viewportWidth, viewportHeight, false);
      camera.aspect = viewportWidth / viewportHeight;
      camera.updateProjectionMatrix();
    },
    // Update & render your scene here
    render({ time }) {
      controls.update();
      renderer.render(scene, camera);
    },
    // Dispose of events & renderer for cleaner hot-reloading
    unload() {
      controls.dispose();
      renderer.dispose();
    },
  };
};

canvasSketch(sketch, settings);
