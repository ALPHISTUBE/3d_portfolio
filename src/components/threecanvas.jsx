'use client'
import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import * as CANNON from 'cannon-es';
import Stats from 'stats.js';
import CarComponent from './car';

const ThreeCanvas = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    var stats = new Stats();
    stats.showPanel(0); // 0: fps, 1: ms, 2: mb, 3+: custom
    document.body.appendChild(stats.dom);

    const canvas = canvasRef.current;
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0xFFFFFF); // Set background to white

    const world = new CANNON.World({
      gravity: new CANNON.Vec3(0, -9.82, 0), // m/s²
    });
    world.broadphase = new CANNON.SAPBroadphase(world);

    <CarComponent scene={scene} world={world} />

    const bodyMaterial = new CANNON.Material();
    const groundMaterial = new CANNON.Material();
    const bodyGroundContactMaterial = new CANNON.ContactMaterial(
      bodyMaterial,
      groundMaterial,
      {
        friction: 0.1,
        restitution: 0.3
      }
    );
    world.addContactMaterial(bodyGroundContactMaterial);

    const dirLight = new THREE.DirectionalLight(0xF0997D, 0.8);
    dirLight.position.set(-60, 100, -10);
    dirLight.castShadow = true;
    dirLight.shadow.camera.top = 50;
    dirLight.shadow.camera.bottom = -50;
    dirLight.shadow.camera.left = -50;
    dirLight.shadow.camera.right = 50;
    dirLight.shadow.camera.near = 0.1;
    dirLight.shadow.camera.far = 200;
    dirLight.shadow.mapSize.width = 4096;
    dirLight.shadow.mapSize.height = 4096;
    scene.add(dirLight);

    const sizes = {
      width: window.innerWidth,
      height: window.innerHeight
    };

    window.addEventListener('resize', () => {
      sizes.width = window.innerWidth;
      sizes.height = window.innerHeight;

      camera.aspect = sizes.width / sizes.height;
      camera.updateProjectionMatrix();

      renderer.setSize(sizes.width, sizes.height);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    });

    const floorGeo = new THREE.PlaneGeometry(100, 100);
    const floorMesh = new THREE.Mesh(
      floorGeo,
      new THREE.MeshToonMaterial({
        color: 0x454545
      })
    );
    floorMesh.rotation.x = -Math.PI * 0.5;
    scene.add(floorMesh);

    const floorS = new CANNON.Plane();
    const floorB = new CANNON.Body();
    floorB.mass = 0;

    floorB.addShape(floorS);
    world.addBody(floorB);

    floorB.quaternion.setFromAxisAngle(
      new CANNON.Vec3(-1, 0, 0),
      Math.PI * 0.5
    );

    const camera = new THREE.PerspectiveCamera(50, sizes.width / sizes.height, 0.1, 10000);
    camera.position.set(0, 4, 6);
    scene.add(camera);

    const controls = new OrbitControls(camera, canvas);
    controls.enableDamping = true;

    const renderer = new THREE.WebGLRenderer({
      canvas: canvas
    });
    renderer.setSize(sizes.width, sizes.height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    const timeStep = 1 / 60; // seconds
    let lastCallTime;

    const tick = () => {
      stats.begin();
      controls.update();

      const time = performance.now() / 1000; // seconds
      if (!lastCallTime) {
        world.step(timeStep);
      } else {
        const dt = time - lastCallTime;
        world.step(timeStep, dt);
      }
      lastCallTime = time;

      renderer.render(scene, camera);
      stats.end();

      window.requestAnimationFrame(tick);
    };

    tick();

    return () => {
      document.body.removeChild(stats.dom);
    };
  }, []);

  return <canvas ref={canvasRef} className="webgl"></canvas>;
};

export default ThreeCanvas;
