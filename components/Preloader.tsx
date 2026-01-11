'use client';

import { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer.js';
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass.js';
import { UnrealBloomPass } from 'three/examples/jsm/postprocessing/UnrealBloomPass.js';

/**
 * Preloader Component - Sci-Fi Door Sequence
 * 
 * Interactive 3D preloader using Three.js:
 * 1. Loads a detailed sci-fi door scene.
 * 2. Waits for user click ("Initiate Sequence").
 * 3. Animates doors opening with physics and camera shake.
 * 4. Fades out to reveal the main website.
 */
export default function Preloader() {
    const containerRef = useRef<HTMLDivElement>(null);
    const [isActive, setIsActive] = useState(false);
    const [isHidden, setIsHidden] = useState(false);
    const [isFading, setIsFading] = useState(false); // Controls opacity fade out

    useEffect(() => {
        if (!containerRef.current) return;

        const container = containerRef.current;
        let animationFrameId: number;

        // --- 1. SCENE & CAMERA ---
        const scene = new THREE.Scene();
        scene.background = new THREE.Color(0x000000); // Pure black background
        scene.fog = new THREE.FogExp2(0x0a0c10, 0.02);

        const camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 100);
        camera.position.set(0, 1.5, 12);

        const renderer = new THREE.WebGLRenderer({ antialias: false, powerPreference: "high-performance" });
        renderer.setSize(window.innerWidth, window.innerHeight);
        renderer.setPixelRatio(1); // Performance: Cap at 1
        renderer.shadowMap.enabled = true; // Visibility: Enable shadows
        renderer.shadowMap.type = THREE.PCFSoftShadowMap;
        renderer.toneMapping = THREE.ACESFilmicToneMapping;
        renderer.toneMappingExposure = 1.2;
        container.appendChild(renderer.domElement);

        // GOLDEN FLASH REF (2D Overlay control)
        const flashOverlay = document.getElementById('golden-flash');

        // --- 2. POST-PROCESSING (Bloom) ---
        const composer = new EffectComposer(renderer);
        const renderPass = new RenderPass(scene, camera);
        composer.addPass(renderPass);

        const bloomPass = new UnrealBloomPass(new THREE.Vector2(window.innerWidth, window.innerHeight), 1.5, 0.4, 0.85);
        bloomPass.threshold = 0.2;
        bloomPass.strength = 1.0;
        bloomPass.radius = 0.5;
        composer.addPass(bloomPass);

        // --- 3. LIGHTING ---
        const ambientLight = new THREE.AmbientLight(0x334455, 0.4); // Boosted Ambient
        scene.add(ambientLight);

        // Helper to create ceiling lights with shadows
        const createCeilingLight = (x: number, y: number, z: number) => {
            const strip = new THREE.Mesh(
                new THREE.BoxGeometry(2.5, 0.1, 0.5),
                new THREE.MeshStandardMaterial({ color: 0xffffff, emissive: 0xffffff, emissiveIntensity: 1 })
            );
            strip.position.set(x, y, z);
            scene.add(strip);

            const light = new THREE.PointLight(0xffffff, 1.2, 15);
            light.position.set(x, y - 0.5, z + 0.5);
            light.castShadow = true;
            light.shadow.mapSize.set(1024, 1024);
            light.shadow.bias = -0.001;
            scene.add(light);
        };

        createCeilingLight(-3, 6, 2);
        createCeilingLight(0, 6, 2);
        createCeilingLight(3, 6, 2);

        // Interior Tunnel Light (Hidden initially) - GOLDEN LIGHT
        const tunnelLight = new THREE.PointLight(0xffaa00, 0, 30);
        tunnelLight.position.set(0, 4, -10);
        scene.add(tunnelLight);

        // --- 4. MATERIALS & TEXTURES ---
        const createBumpMap = () => {
            const canvas = document.createElement('canvas');
            canvas.width = 1024; canvas.height = 1024;
            const ctx = canvas.getContext('2d');
            if (ctx) {
                ctx.fillStyle = '#808080'; ctx.fillRect(0, 0, 1024, 1024);
                for (let i = 0; i < 100000; i++) {
                    const shade = Math.floor(Math.random() * 255);
                    ctx.fillStyle = `rgb(${shade},${shade},${shade})`;
                    const size = Math.random() * 2 + 1;
                    ctx.fillRect(Math.random() * 1024, Math.random() * 1024, size, size);
                }
            }
            const tex = new THREE.CanvasTexture(canvas);
            tex.wrapS = tex.wrapT = THREE.RepeatWrapping;
            tex.repeat.set(2, 2);
            return tex;
        };

        const bumpTexture = createBumpMap();
        const baseMetalMaterial = new THREE.MeshStandardMaterial({
            color: 0x556677, roughness: 0.5, metalness: 0.6, // Reduced metalness
            bumpMap: bumpTexture, bumpScale: 0.02, side: THREE.DoubleSide
        });
        const darkerMetalMaterial = new THREE.MeshStandardMaterial({
            color: 0x334455, roughness: 0.7, metalness: 0.6,
            bumpMap: bumpTexture, bumpScale: 0.02
        });

        // --- 5. GEOMETRY ---
        // Frame
        const frameShape = new THREE.Shape();
        frameShape.moveTo(-6, 7); frameShape.lineTo(6, 7);
        frameShape.lineTo(8, 5); frameShape.lineTo(8, -5);
        frameShape.lineTo(6, -7); frameShape.lineTo(-6, -7);
        frameShape.lineTo(-8, -5); frameShape.lineTo(-8, 5);
        frameShape.lineTo(-6, 7);

        const holePath = new THREE.Shape();
        holePath.moveTo(-5, 6); holePath.lineTo(5, 6); holePath.lineTo(7, 4); holePath.lineTo(7, -4);
        holePath.lineTo(5, -6); holePath.lineTo(-5, -6); holePath.lineTo(-7, -4); holePath.lineTo(-7, 4);
        holePath.lineTo(-5, 6);
        frameShape.holes.push(holePath);

        const frame = new THREE.Mesh(
            new THREE.ExtrudeGeometry(frameShape, { depth: 2, bevelEnabled: true, bevelSegments: 4, bevelSize: 0.1, bevelThickness: 0.1 }),
            baseMetalMaterial
        );
        frame.castShadow = true; frame.receiveShadow = true;
        scene.add(frame);

        // Doors helper
        const createComplexDoorShape = (isRight: boolean) => {
            const shape = new THREE.Shape(); const w = 5, h = 6;
            if (isRight) {
                shape.moveTo(0, h); shape.lineTo(w, h); shape.lineTo(w + 2, h - 2); shape.lineTo(w + 2, -h + 2); shape.lineTo(w, -h); shape.lineTo(0, -h);
                shape.lineTo(0, -1.5); shape.lineTo(1.5, -2.5); shape.lineTo(1.5, 2.5); shape.lineTo(0, 1.5); shape.lineTo(0, h);
            } else {
                shape.moveTo(0, h); shape.lineTo(0, 1.5); shape.lineTo(-1.5, 2.5); shape.lineTo(-1.5, -2.5); shape.lineTo(0, -1.5);
                shape.lineTo(0, -h); shape.lineTo(-w, -h); shape.lineTo(-w - 2, -h + 2); shape.lineTo(-w - 2, h - 2); shape.lineTo(-w, h); shape.lineTo(0, h);
            }
            return shape;
        };

        const doorSettings = { depth: 0.6, bevelEnabled: true, bevelSegments: 3, bevelSize: 0.05, bevelThickness: 0.05 };

        const doorRight = new THREE.Mesh(new THREE.ExtrudeGeometry(createComplexDoorShape(true), doorSettings), baseMetalMaterial);
        doorRight.position.z = 0.5; doorRight.castShadow = true; doorRight.receiveShadow = true;
        scene.add(doorRight);

        const doorLeft = new THREE.Mesh(new THREE.ExtrudeGeometry(createComplexDoorShape(false), doorSettings), baseMetalMaterial);
        doorLeft.position.z = 0.5; doorLeft.castShadow = true; doorLeft.receiveShadow = true;
        scene.add(doorLeft);

        // Keypad
        const keypad = new THREE.Group();
        const padBase = new THREE.Mesh(new THREE.BoxGeometry(1, 1.5, 0.2), new THREE.MeshStandardMaterial({ color: 0x111111, roughness: 0.2 }));
        const redLight = new THREE.Mesh(new THREE.PlaneGeometry(0.2, 0.2), new THREE.MeshStandardMaterial({ color: 0xff0000, emissive: 0xff0000, emissiveIntensity: 2 }));
        redLight.position.set(0.25, 0.4, 0.11);
        const greenLight = new THREE.Mesh(new THREE.PlaneGeometry(0.2, 0.2), new THREE.MeshStandardMaterial({ color: 0x00ff00, emissive: 0x00ff00, emissiveIntensity: 0.5 }));
        greenLight.position.set(0.25, 0.1, 0.11);
        padBase.add(redLight); padBase.add(greenLight);
        keypad.add(padBase); keypad.position.set(4.5, 0, 0.8);
        doorRight.add(keypad);

        // --- TEXT LABELS ("HYPERLOOPIN") ---
        const createTextTexture = (text: string) => {
            const canvas = document.createElement('canvas');
            canvas.width = 512; canvas.height = 256;
            const ctx = canvas.getContext('2d');
            if (ctx) {
                ctx.fillStyle = 'rgba(0,0,0,0)'; // Transparent
                ctx.fillRect(0, 0, 512, 256);
                ctx.fillStyle = '#ffffff'; // White text
                ctx.font = 'bold 100px Arial'; // Industrial font
                ctx.textAlign = 'center';
                ctx.textBaseline = 'middle';
                ctx.fillText(text, 256, 128);
            }
            const tex = new THREE.CanvasTexture(canvas);
            tex.minFilter = THREE.LinearFilter;
            return tex;
        };

        const labelGeo = new THREE.PlaneGeometry(4, 2);
        const hyperMat = new THREE.MeshBasicMaterial({ map: createTextTexture('HYPER'), transparent: true, opacity: 0.8, side: THREE.DoubleSide });
        const loopinMat = new THREE.MeshBasicMaterial({ map: createTextTexture('LOOPIN'), transparent: true, opacity: 0.8, side: THREE.DoubleSide });

        const hyperLabel = new THREE.Mesh(labelGeo, hyperMat);

        // Correcting positions based on door geometry
        // Moving Z to 0.75 to clear bevel
        // Moving X to -2.0 so right edge (at +2.0 relative) is at 0.
        hyperLabel.position.set(-2.0, 0, 0.75);
        doorLeft.add(hyperLabel);

        const loopinLabel = new THREE.Mesh(labelGeo, loopinMat);
        // Moving X to 2.0 so left edge (at -2.0 relative) is at 0.
        loopinLabel.position.set(2.0, 0, 0.75);
        doorRight.add(loopinLabel);


        // GOLDEN PORTAL (The visible light source)
        const portalGeo = new THREE.SphereGeometry(4, 32, 32);
        const portalMat = new THREE.MeshBasicMaterial({ color: 0xffaa00, transparent: true, opacity: 0 }); // Start hidden
        const portal = new THREE.Mesh(portalGeo, portalMat);
        portal.position.set(0, 1.5, -5); // Behind doors
        scene.add(portal);

        // Tunnel
        const tunnelGeo = new THREE.BoxGeometry(16, 1, 50);
        const floor = new THREE.Mesh(tunnelGeo, darkerMetalMaterial); floor.position.set(0, -7.5, -25); floor.receiveShadow = true; scene.add(floor);
        const ceiling = new THREE.Mesh(tunnelGeo, darkerMetalMaterial); ceiling.position.set(0, 7.5, -25); scene.add(ceiling);

        // --- 6. ANIMATION LOGIC ---
        const gameState = {
            doorOpenProgress: 0,
            hasTriggered: false
        };

        const easeInOutCubic = (t: number) => t < .5 ? 4 * t * t * t : (t - 1) * (2 * t - 2) * (2 * t - 2) + 1;

        // Auto-trigger sequence after a short delay
        setTimeout(() => {
            document.body.classList.add('preloader-active');
        }, 500);

        const animate = () => {
            animationFrameId = requestAnimationFrame(animate);

            // Handheld Camera Physics (Breathing)
            const time = Date.now() * 0.0005;
            let camY = 1.5 + Math.sin(time) * 0.01;
            let camX = Math.cos(time * 0.7) * 0.01;
            let camZ = 12;

            // Trigger Transition from React State
            if (document.body.classList.contains('preloader-active')) {
                gameState.hasTriggered = true;
            }

            if (gameState.hasTriggered) {
                // Phase 1: Opening Doors
                if (gameState.doorOpenProgress < 1) {
                    gameState.doorOpenProgress += 0.006;
                    if (gameState.doorOpenProgress >= 1) {
                        gameState.doorOpenProgress = 1;
                        // Start Warp Dissolve
                        setIsFading(true);

                        // Unmount after fade completes
                        setTimeout(() => {
                            setIsHidden(true);
                            cancelAnimationFrame(animationFrameId);
                        }, 800);
                    }
                }

                // Phase 2: Continuous Fly-Through (Even after doors open)
                const eased = easeInOutCubic(gameState.doorOpenProgress);
                const maxOpen = 6.5;

                // Door Vibration (Grinding)
                const grind = Math.sin(Date.now() * 0.8) * 0.01 * (1 - eased);

                doorLeft.position.x = (-maxOpen * eased) + grind;
                doorRight.position.x = (maxOpen * eased) - grind;

                // Reveal Interior Light & Light Burst
                const lightBurst = Math.pow(eased, 8) * 50.0;
                tunnelLight.intensity = (eased * 1.5) + lightBurst;

                // Drive 2D Golden Flash
                if (flashOverlay) {
                    // Ramp up opacity as doors open
                    const flashOpacity = Math.pow(eased, 3); // Exponential ramp
                    flashOverlay.style.opacity = flashOpacity.toString();
                }

                // Animate Portal Mesh (Expand to engulf camera)
                portalMat.opacity = Math.pow(eased, 3); // Fade in
                const portalScale = 1 + (eased * 10);
                portal.scale.set(portalScale, portalScale, portalScale);

                // CAMERA PHYSICS
                // 1. Initial Pull In (0 to -3)
                const warpSpeed = Math.pow(eased, 4) * 5;
                let baseZ = 12 - ((eased * 10) + warpSpeed);

                // 2. Extra Fly-Through Momentum (when fully open)
                if (gameState.doorOpenProgress >= 1) {
                    // Move exponentially faster into the void
                    baseZ -= 0.5; // continuous forward movement per frame
                }

                camZ = baseZ;

                // Camera Shake - Increases with speed
                const currentShake = (0.03 + (warpSpeed * 0.01)) * Math.sin(eased * Math.PI);
                camX += (Math.random() - 0.5) * currentShake;
                camY += (Math.random() - 0.5) * currentShake;
            }

            camera.position.set(camX, camY, camZ);
            camera.lookAt(0, 1.5, 0); // Keep focus down the tunnel

            composer.render();
        };

        animate();

        // --- RESIZE ---
        const handleResize = () => {
            camera.aspect = window.innerWidth / window.innerHeight;
            camera.updateProjectionMatrix();
            renderer.setSize(window.innerWidth, window.innerHeight);
            composer.setSize(window.innerWidth, window.innerHeight);
        };
        window.addEventListener('resize', handleResize);

        return () => {
            cancelAnimationFrame(animationFrameId);
            window.removeEventListener('resize', handleResize);

            // Manual Resource Disposal
            renderer.dispose();
            composer.dispose();
            scene.traverse((object) => {
                if (object instanceof THREE.Mesh) {
                    object.geometry.dispose();
                    if (object.material instanceof THREE.Material) {
                        object.material.dispose();
                    }
                }
            });

            if (container.contains(renderer.domElement)) {
                container.removeChild(renderer.domElement);
            }
        };
    }, []);

    if (isHidden) return null;

    return (
        <div
            className="fixed inset-0 z-[100] bg-black select-none pointer-events-none"
        >
            {/* Canvas Container */}
            <div ref={containerRef} className="absolute inset-0 block" />

            {/* Overlays */}
            <div className="absolute inset-0 pointer-events-none z-10"
                style={{ background: 'radial-gradient(circle at center, transparent 40%, rgba(0,0,0,0.9) 110%)' }} />

            {/* GOLDEN FLASH OVERLAY - Guaranteed Visibility */}
            <div
                id="golden-flash"
                className="absolute inset-0 pointer-events-none z-20 opacity-0 transition-opacity duration-75"
                style={{
                    background: 'radial-gradient(circle at center, rgba(255, 170, 0, 1) 0%, rgba(255, 200, 50, 0.8) 20%, rgba(0,0,0,0) 70%)',
                    mixBlendMode: 'screen'
                }}
            />

            {/* Grain */}
            <div className="absolute inset-0 pointer-events-none opacity-[0.06] z-11 mix-blend-overlay"
                style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")` }} />
        </div>
    );
}
