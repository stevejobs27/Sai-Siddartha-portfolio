import React, { Component } from "react";
import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";

class ThreeJSAnimation extends Component {
  componentDidMount() {
    (function () {
      // Set our main variables
      let scene,
        renderer,
        camera,
        model, // Globe Model
        mixer, // THREE.js animations mixer
        idle, // default animation
        clock = new THREE.Clock(); // Used for anims, which run to a clock instead of frame rate

      init();

      function init() {
        const MODEL_PATH = "models/a_windy_day.glb";

        // Init the scene
        scene = new THREE.Scene();
        scene.fog = null;

        // Init the renderer
        renderer = new THREE.WebGLRenderer({
          alpha: true
        });
        renderer.shadowMap.enabled = true;
        renderer.setSize(1 * window.innerWidth, 1 * window.innerHeight);
        var container = document.getElementById("globe-model");
        container.appendChild(renderer.domElement);

        // Add a camera
        camera = new THREE.PerspectiveCamera(
          25,
          window.innerWidth / window.innerHeight,
          0.5,
          100
        );
        camera.position.z = 30;
        camera.position.x = 0;
        camera.position.y = 3.2;


        var loader = new GLTFLoader();

        loader.load(
          MODEL_PATH,
          function (gltf) {
            model = gltf.scene;
            let fileAnimations = gltf.animations;

          model.traverse(o => {
            if (o.isMesh) {
              o.castShadow = true;
              o.receiveShadow = true;
            }
          });

          model.scale.set(3, 3, 3);
          model.position.y = 6;
          scene.add(model);

          mixer = new THREE.AnimationMixer(model);

          console.log("Animations:", fileAnimations.map(a => a.name));

          // Try to find 'idle' animation, otherwise use the first one
          let idle = THREE.AnimationClip.findByName(fileAnimations, "idle");
          if (idle) {
            mixer.clipAction(idle).play();
          } else {
            // If no "idle" animation name exists, just play the first available
            mixer.clipAction(fileAnimations[0]).play();
          }
          const action = mixer.clipAction(idle || fileAnimations[0]);
          action.play();
        },
        undefined,
        function (error) {
          console.error(error);
        }
      );
      }

      function update() {
        if (mixer) {
          mixer.update(clock.getDelta());
        }
        if (resizeRendererToDisplaySize(renderer)) {
          const canvas = renderer.domElement;
          camera.aspect = canvas.clientWidth / canvas.clientHeight;
          camera.updateProjectionMatrix();
        }
        renderer.render(scene, camera);
        requestAnimationFrame(update);
      }
      update();

      function resizeRendererToDisplaySize(renderer) {
        const canvas = renderer.domElement;
        let width = window.innerWidth;
        let height = window.innerHeight;
        let canvasPixelWidth = canvas.width / window.devicePixelRatio;
        let canvasPixelHeight = canvas.height / window.devicePixelRatio;

        const needResize =
          canvasPixelWidth !== width || canvasPixelHeight !== height;
        if (needResize) {
          renderer.setSize(width, height, false);
        }
        return needResize;
      }

    })();
  }
  render() {
  return <div id="globe-model" />;
  }
}
export default ThreeJSAnimation;