// src/STLViewer.js
import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { STLLoader } from 'three/examples/jsm/loaders/STLLoader';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

const STLViewer = ({ file }) => {
    const mountRef = useRef(null);

    useEffect(() => {
        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
        const renderer = new THREE.WebGLRenderer({ antialias: true });
        const controls = new OrbitControls(camera, renderer.domElement);
        renderer.setSize(window.innerWidth, window.innerHeight);
        mountRef.current.appendChild(renderer.domElement);

        const light = new THREE.DirectionalLight(0xffffff);
        light.position.set(0, 1, 1).normalize();
        scene.add(light);

        const loader = new STLLoader();

        // Load the STL file
        loader.load(file, (geometry) => {
            const material = new THREE.MeshNormalMaterial();
            const mesh = new THREE.Mesh(geometry, material);
            scene.add(mesh);
            mesh.position.set(0, 0, 0);
            animate();
        });

        camera.position.z = 5;

        const animate = () => {
            requestAnimationFrame(animate);
            renderer.render(scene, camera);
        };

        controls.enableDamping = true;
        controls.dampingFactor = 0.25;

        return () => {
            mountRef.current.removeChild(renderer.domElement);
        };
    }, [file]);

    return <div ref={mountRef} />;
};

export default STLViewer;