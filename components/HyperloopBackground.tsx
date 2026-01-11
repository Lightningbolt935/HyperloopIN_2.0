'use client';

import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer.js';
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass.js';
import { UnrealBloomPass } from 'three/examples/jsm/postprocessing/UnrealBloomPass.js';


import { ShaderPass } from 'three/examples/jsm/postprocessing/ShaderPass.js';
import { RGBShiftShader } from 'three/examples/jsm/shaders/RGBShiftShader.js';

/**
 * HyperloopBackground Component
 * 
 * Cinematic dark Three.js tunnel animation with:
 * - Realistic tunnel geometry with rings, bolts, and pipes
 * - Dynamic lighting with passing overhead lights
 * - Post-processing effects (bloom, bokeh, film grain, RGB shift)
 * - Mouse interaction for subtle camera movement
 */

export default function HyperloopBackground() {
    const containerRef = useRef<HTMLDivElement>(null);
    const animationRef = useRef<number | null>(null);
    const mouseRef = useRef({ x: 0, y: 0 });

    useEffect(() => {
        if (!containerRef.current) return;

        const container = containerRef.current;

        // --- TEXTURES ---
        function createBumpMap() {
            const size = 1024;
            const canvas = document.createElement('canvas');
            canvas.width = size;
            canvas.height = size;
            const ctx = canvas.getContext('2d');
            if (!ctx) return null;

            ctx.fillStyle = '#666';
            ctx.fillRect(0, 0, size, size);
            for (let i = 0; i < 80000; i++) {
                const v = Math.random() * 150;
                ctx.fillStyle = `rgba(${v},${v},${v},0.08)`;
                ctx.fillRect(Math.random() * size, Math.random() * size, 3, 3);
            }
            const tex = new THREE.CanvasTexture(canvas);
            tex.wrapS = tex.wrapT = THREE.RepeatWrapping;
            tex.repeat.set(3, 3);
            return tex;
        }
        const bumpMap = createBumpMap();

        // --- SCENE ---
        const scene = new THREE.Scene();
        scene.fog = new THREE.FogExp2(0x010101, 0.02);

        const camera = new THREE.PerspectiveCamera(
            90,
            window.innerWidth / window.innerHeight,
            0.1,
            2000
        );
        camera.position.set(0, 0, 4);

        const renderer = new THREE.WebGLRenderer({
            antialias: false,
            powerPreference: 'high-performance',
            alpha: true,
        });
        renderer.setSize(window.innerWidth, window.innerHeight);
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
        renderer.toneMapping = THREE.ACESFilmicToneMapping;
        renderer.toneMappingExposure = 1.5;
        container.appendChild(renderer.domElement);

        // --- LIGHTING ---
        const ambientLight = new THREE.AmbientLight(0x222233, 0.6);
        scene.add(ambientLight);

        const headLamp = new THREE.SpotLight(0xffeedd, 5.0, 100, 0.6, 0.5, 1);
        headLamp.position.set(0, 0, 0);
        headLamp.target.position.set(0, 0, -40);
        scene.add(headLamp);
        scene.add(headLamp.target);

        // --- MATERIALS ---
        const wallMat = new THREE.MeshStandardMaterial({
            color: 0x222222,
            roughness: 0.8,
            roughnessMap: bumpMap,
            bumpMap: bumpMap,
            bumpScale: 0.05,
            side: THREE.BackSide,
        });

        const ringMat = new THREE.MeshStandardMaterial({
            color: 0xaaaaaa,
            roughness: 0.4,
            metalness: 0.7,
            roughnessMap: bumpMap,
            bumpMap: bumpMap,
            bumpScale: 0.02,
            emissive: 0x111111,
            emissiveIntensity: 0.5,
        });

        const cableMat = new THREE.MeshStandardMaterial({
            color: 0x111111,
            roughness: 0.9,
            bumpMap: bumpMap,
        });

        const volMat = new THREE.MeshBasicMaterial({
            color: 0xffffff,
            transparent: true,
            opacity: 0.0,
            side: THREE.DoubleSide,
            blending: THREE.AdditiveBlending,
            depthWrite: false,
        });

        const neonRed = new THREE.MeshBasicMaterial({ color: 0xff3333 });
        const boltMat = new THREE.MeshStandardMaterial({ color: 0x444444, roughness: 0.6 });

        // --- GEOMETRY ---
        const tunnelGroup = new THREE.Group();
        scene.add(tunnelGroup);

        const segmentLength = 12;
        const numSegments = 16;
        const radius = 10;

        const tubeGeo = new THREE.CylinderGeometry(radius, radius, segmentLength, 48, 1, true);
        const ringGeo = new THREE.TorusGeometry(10.0, 1.0, 24, 64);
        const ceilGeo = new THREE.BoxGeometry(6, 0.3, 5);
        const volGeo = new THREE.ConeGeometry(8, radius * 1.9, 32, 1, true);
        const trackGeo = new THREE.BoxGeometry(8, 0.5, segmentLength);
        const conduitGeo = new THREE.CylinderGeometry(0.5, 0.5, segmentLength, 16);
        const lightStripGeo = new THREE.BoxGeometry(0.2, 4.0, 0.1);
        const boltGeo = new THREE.CylinderGeometry(0.25, 0.25, 0.4, 8);

        interface SegmentUserData {
            hasLight: boolean;
            light?: THREE.PointLight;
            mesh?: THREE.Mesh;
            vol?: THREE.Mesh;
        }

        function createSegment(zPos: number, index: number): THREE.Group {
            const seg = new THREE.Group();

            // Tube
            const tube = new THREE.Mesh(tubeGeo, wallMat);
            tube.rotation.x = -Math.PI / 2;
            seg.add(tube);

            // Ring & Bolts
            const ringGroup = new THREE.Group();
            const ring = new THREE.Mesh(ringGeo, ringMat);
            ringGroup.add(ring);
            for (let b = 0; b < 20; b++) {
                const angle = (b / 20) * Math.PI * 2;
                const bolt = new THREE.Mesh(boltGeo, boltMat);
                bolt.position.set(Math.cos(angle) * 9.0, Math.sin(angle) * 9.0, 0);
                bolt.rotation.z = angle;
                bolt.rotation.x = Math.PI / 2;
                ringGroup.add(bolt);
            }
            ringGroup.position.z = -segmentLength / 2;
            seg.add(ringGroup);

            // Pipes
            const pipeL = new THREE.Mesh(conduitGeo, cableMat);
            pipeL.rotation.x = -Math.PI / 2;
            pipeL.position.set(-6, -radius + 1.8, 0);
            seg.add(pipeL);
            const pipeR = new THREE.Mesh(conduitGeo, cableMat);
            pipeR.rotation.x = -Math.PI / 2;
            pipeR.position.set(6, -radius + 1.8, 0);
            seg.add(pipeR);

            // Ceiling Light
            if (index % 4 === 0) {
                const ceilMesh = new THREE.Mesh(
                    ceilGeo,
                    new THREE.MeshBasicMaterial({ color: 0xaaaaaa })
                );
                ceilMesh.position.set(0, radius - 0.2, 0);
                seg.add(ceilMesh);

                const ceilPl = new THREE.PointLight(0xffeedd, 0, 45, 1.8);
                ceilPl.position.set(0, radius - 3.0, 0);
                seg.add(ceilPl);

                const volCone = new THREE.Mesh(volGeo, volMat.clone());
                volCone.position.set(0, radius - 4.0, 0);
                volCone.rotation.x = Math.PI;
                seg.add(volCone);

                (seg.userData as SegmentUserData) = {
                    hasLight: true,
                    light: ceilPl,
                    mesh: ceilMesh,
                    vol: volCone,
                };
            } else {
                (seg.userData as SegmentUserData) = { hasLight: false };
            }

            // Track
            const track = new THREE.Mesh(
                trackGeo,
                new THREE.MeshStandardMaterial({
                    color: 0x111111,
                    roughness: 0.6,
                    bumpMap: bumpMap,
                })
            );
            track.position.set(0, -radius + 0.5, 0);
            seg.add(track);

            // Side Lights
            if (index % 2 === 0) {
                const wallR = new THREE.Mesh(lightStripGeo, neonRed);
                wallR.position.set(radius - 1.5, 0, 0);
                wallR.rotation.y = Math.PI / 2;
                seg.add(wallR);
                const wallL = new THREE.Mesh(lightStripGeo, neonRed);
                wallL.position.set(-(radius - 1.5), 0, 0);
                wallL.rotation.y = Math.PI / 2;
                seg.add(wallL);
            }

            seg.position.z = zPos;
            return seg;
        }

        const segments: THREE.Group[] = [];
        for (let i = 0; i < numSegments; i++) {
            const s = createSegment(-i * segmentLength, i);
            segments.push(s);
            tunnelGroup.add(s);
        }

        // --- POST PROCESSING ---
        const composer = new EffectComposer(renderer);
        composer.addPass(new RenderPass(scene, camera));

        const bloomPass = new UnrealBloomPass(
            new THREE.Vector2(window.innerWidth, window.innerHeight),
            1.5,
            0.4,
            0.85
        );
        bloomPass.threshold = 0.3;
        bloomPass.strength = 0.8;
        bloomPass.radius = 0.6;
        composer.addPass(bloomPass);

        const rgbShift = new ShaderPass(RGBShiftShader);
        rgbShift.uniforms['amount'].value = 0.002;
        composer.addPass(rgbShift);



        // --- ANIMATION ---
        const speed = 0.4; // Reduced from 0.75 for smoother, slower travel
        let time = 0;

        const handleMouseMove = (e: MouseEvent) => {
            mouseRef.current.x = (e.clientX - window.innerWidth / 2) * 0.0005;
            mouseRef.current.y = (e.clientY - window.innerHeight / 2) * 0.0005;
        };
        window.addEventListener('mousemove', handleMouseMove);

        function animate() {
            animationRef.current = requestAnimationFrame(animate);
            time += 0.01;

            segments.forEach((seg) => {
                seg.position.z += speed;
                if (seg.position.z > 5) seg.position.z -= numSegments * segmentLength;

                const userData = seg.userData as SegmentUserData;
                if (userData.hasLight && userData.light && userData.mesh && userData.vol) {
                    const dist = Math.abs(seg.position.z - 5);
                    const range = 25;
                    let intensity = 0;
                    if (dist < range) {
                        intensity = Math.pow(1 - dist / range, 2.5);
                    }

                    const baseLux = 40;
                    const flashLux = 600;
                    userData.light.intensity = baseLux + flashLux * intensity;

                    (userData.mesh.material as THREE.MeshBasicMaterial).color.setScalar(
                        0.8 + 3.0 * intensity
                    );

                    (userData.vol.material as THREE.MeshBasicMaterial).opacity =
                        0.01 + 0.05 * intensity;
                    userData.vol.rotation.y = Math.sin(time + seg.position.z) * 0.1;
                }
            });

            // Reduced shake for smoother feel
            const shake = (Math.random() - 0.5) * 0.005;
            // Softer camera interpolation (0.04 -> 0.02)
            camera.rotation.y += (-mouseRef.current.x * 0.2 - camera.rotation.y) * 0.02;
            camera.rotation.x += (-mouseRef.current.y * 0.2 - camera.rotation.x) * 0.02;
            camera.position.y = Math.sin(time * 0.5) * 0.05 + shake; // Slower bob
            camera.position.x = Math.cos(time * 0.4) * 0.05 + shake / 2;

            headLamp.position.copy(camera.position);
            headLamp.target.position.set(camera.position.x, camera.position.y, camera.position.z - 40);

            composer.render();
        }
        animate();

        // --- RESIZE ---
        const handleResize = () => {
            camera.aspect = window.innerWidth / window.innerHeight;
            camera.updateProjectionMatrix();
            renderer.setSize(window.innerWidth, window.innerHeight);
            composer.setSize(window.innerWidth, window.innerHeight);
        };
        window.addEventListener('resize', handleResize);

        // --- CLEANUP ---
        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
            window.removeEventListener('resize', handleResize);
            if (animationRef.current) {
                cancelAnimationFrame(animationRef.current);
            }
            renderer.dispose();
            composer.dispose();
            if (container.contains(renderer.domElement)) {
                container.removeChild(renderer.domElement);
            }
        };
    }, []);

    return (
        <>
            {/* Canvas container */}
            <div
                ref={containerRef}
                className="absolute inset-0 z-0"
                style={{ background: '#000' }}
            />

            {/* Cinematic bars overlay */}
            <div className="absolute top-0 left-0 right-0 h-[11vh] bg-[#010101] z-[5]" />
            <div className="absolute bottom-0 left-0 right-0 h-[11vh] bg-[#010101] z-[5]" />

            {/* Dark gradient overlays for text readability */}
            <div className="absolute inset-0 bg-gradient-to-r from-black/20 via-transparent to-black/20 z-[3]" />
            <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/20 z-[3]" />
        </>
    );
}
