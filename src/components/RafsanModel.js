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
        model, // Our character
        neck, // Reference to the neck bone in the skeleton
        waist, // Reference to the waist bone in the skeleton
        mixer, // THREE.js animations mixer
        idle, // Idle, the default state our character returns to
        clock = new THREE.Clock(); // Used for anims, which run to a clock instead of frame rate

      init();

      function init() {
        //const MODEL_PATH = "models/a_windy_day.glb";
        const MODEL_PATH = "models/windy-day/model.gltf";

        // Init the scene
        scene = new THREE.Scene();
        scene.fog = null;

        // Init the renderer
        renderer = new THREE.WebGLRenderer({
          alpha: true
        });
        renderer.shadowMap.enabled = true;
        renderer.setSize(0.8 * window.innerWidth, 0.8 * window.innerHeight);
        var container = document.getElementById("rafsan-model");
        container.appendChild(renderer.domElement);

        // Add a camera
        camera = new THREE.PerspectiveCamera(
          65,
          window.innerWidth / window.innerHeight,
          0.1,
          1000
        );
        camera.position.z = 30;
        camera.position.x = 0;
        camera.position.y = -3;

        const stacy_mtl = new THREE.MeshPhongMaterial({
          color: 0xccd6f6,
          skinning: true
        });

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
          model.position.y = 0;
          scene.add(model);

          mixer = new THREE.AnimationMixer(model);

          console.log("Animations:", fileAnimations.map(a => a.name));

          // Try to find 'idle' animation, otherwise use the first one
          let idleAnim = THREE.AnimationClip.findByName(fileAnimations, "idle");
          if (idleAnim) {
            mixer.clipAction(idleAnim).play();
          } else {
            // If no "idle" animation name exists, just play the first available
            mixer.clipAction(fileAnimations[0]).play();
          }
          const action = mixer.clipAction(idleAnim || fileAnimations[0]);
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
      document.addEventListener("mousemove", function (e) {
        var mousecoords = getMousePos(e);
        if (neck && waist) {
          moveJoint(mousecoords, neck, 50);
          moveJoint(mousecoords, waist, 30);
        }
      });

      function getMousePos(e) {
        return {
          x: e.clientX,
          y: e.clientY
        };
      }

      function moveJoint(mouse, joint, degreeLimit) {
        let degrees = getMouseDegrees(mouse.x, mouse.y, degreeLimit);
        joint.rotation.y = THREE.Math.degToRad(degrees.x);
        joint.rotation.x = THREE.Math.degToRad(degrees.y);
      }

      function getMouseDegrees(x, y, degreeLimit) {
        let dx = 0,
          dy = 0,
          xdiff,
          xPercentage,
          ydiff,
          yPercentage;

        let w = {
          x: window.innerWidth,
          y: window.innerHeight
        };

        // Left (Rotates neck left between 0 and -degreeLimit)

        // 1. If cursor is in the left half of screen
        if (x <= w.x / 2) {
          // 2. Get the difference between middle of screen and cursor position
          xdiff = w.x / 2 - x;
          // 3. Find the percentage of that difference (percentage toward edge of screen)
          xPercentage = (xdiff / (w.x / 2)) * 100;
          // 4. Convert that to a percentage of the maximum rotation we allow for the neck
          dx = ((degreeLimit * xPercentage) / 100) * -1;
        }
        // Right (Rotates neck right between 0 and degreeLimit)
        if (x >= w.x / 2) {
          xdiff = x - w.x / 2;
          xPercentage = (xdiff / (w.x / 2)) * 100;
          dx = (degreeLimit * xPercentage) / 100;
        }
        // Up (Rotates neck up between 0 and -degreeLimit)
        if (y <= w.y / 2) {
          ydiff = w.y / 2 - y;
          yPercentage = (ydiff / (w.y / 2)) * 100;
          // Note that I cut degreeLimit in half when she looks up
          dy = ((degreeLimit * 0.5 * yPercentage) / 100) * -1;
        }

        // Down (Rotates neck down between 0 and degreeLimit)
        if (y >= w.y / 2) {
          ydiff = y - w.y / 2;
          yPercentage = (ydiff / (w.y / 2)) * 100;
          dy = (degreeLimit * yPercentage) / 100;
        }
        return {
          x: dx,
          y: dy
        };
      }
    })();
  }
  render() {
  return <div id="rafsan-model" />;
  }
}
export default ThreeJSAnimation;
