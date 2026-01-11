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
        renderer.shadowMap.enabled = true; // Visibility: Re-enable shadows
        renderer.shadowMap.type = THREE.PCFSoftShadowMap; // Softer shadows
        renderer.toneMapping = THREE.ACESFilmicToneMapping;
        renderer.toneMappingExposure = 1.2;
        container.appendChild(renderer.domElement);

        // ...

        // --- 3. LIGHTING ---
        const ambientLight = new THREE.AmbientLight(0x334455, 0.4); // Boosted from 0.2
        scene.add(ambientLight);

        // ...

        const baseMetalMaterial = new THREE.MeshStandardMaterial({
            color: 0x556677, roughness: 0.5, metalness: 0.6, // Reduced from 0.8 for better contrast
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
                const flashOverlay = document.getElementById('golden-flash');
                if (flashOverlay) {
                    // Ramp up opacity as doors open
                    const flashOpacity = Math.pow(eased, 3); // Exponential ramp
                    flashOverlay.style.opacity = flashOpacity.toString();

                    // Optional: Scale effect via CSS transform if we wanted, but opacity is good for light burst
                }

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

            {/* Instruction Text (Removed since it's automatic now) */}
        </div>
    );
}
