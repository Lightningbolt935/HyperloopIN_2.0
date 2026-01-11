'use client';

import { useEffect, useRef } from 'react';
import Link from 'next/link';
import gsap from 'gsap';
import HyperloopBackground from './HyperloopBackground';

/**
 * Hero Component - HYPERLOOPIN WHERE INNOVATION MEETS VELOCITY
 * Exact brochure heading with dark theme
 */
export default function Hero() {
    const subtitleRef = useRef<HTMLParagraphElement>(null);
    const title1Ref = useRef<HTMLHeadingElement>(null);
    const title2Ref = useRef<HTMLHeadingElement>(null);
    const title3Ref = useRef<HTMLHeadingElement>(null);
    const bgRef = useRef<HTMLImageElement>(null);

    useEffect(() => {
        // Ensure starting state is consistent (in case CSS opacity-0 is missing or overridden)
        gsap.set([subtitleRef.current, title1Ref.current, title2Ref.current, title3Ref.current], {
            opacity: 0,
            y: 50 // Ensure consistent starting Y position
        });

        setTimeout(() => {
            const tl = gsap.timeline();

            tl.to(subtitleRef.current, {
                y: 0,
                opacity: 1,
                duration: 1,
                ease: 'power4.out'
            })
                .to(title1Ref.current, {
                    y: 0,
                    opacity: 1,
                    duration: 1,
                    ease: 'power4.out'
                }, '-=0.8')
                .to(title2Ref.current, {
                    y: 0,
                    opacity: 1,
                    duration: 1,
                    ease: 'power4.out'
                }, '-=0.8')
                .to(title3Ref.current, {
                    y: 0,
                    opacity: 1,
                    duration: 1,
                    ease: 'power4.out'
                }, '-=0.8');

            // Background scale animation (if ref exists)
            if (bgRef.current) {
                tl.from(bgRef.current, {
                    scale: 1.2,
                    duration: 2
                }, '-=1.5');
            }
        }, 1800); // Sync with preloader
    }, []);

    return (
        <section
            id="home"
            className="h-screen w-full relative flex items-center justify-center overflow-hidden"
        >
            {/* 3D Tunnel Background */}
            <HyperloopBackground />

            {/* Content - EXACT brochure text */}
            <div className="z-10 text-center px-6 md:px-0">
                <div className="overflow-hidden">
                    <p
                        ref={subtitleRef}
                        className="text-blue-500 font-bold tracking-[0.4em] text-xs uppercase mb-4 translate-y-full opacity-0"
                    >
                        SRM Institute of Science & Technology
                    </p>
                </div>
                <div className="overflow-hidden">
                    <h1
                        ref={title1Ref}
                        className="heading-xl translate-y-full opacity-0"
                    >
                        HYPERLOOPIN
                    </h1>
                </div>
                <div className="overflow-hidden mt-4">
                    <h2
                        ref={title2Ref}
                        className="text-4xl md:text-6xl font-bold heading-font text-gray-400 translate-y-full opacity-0"
                    >
                        WHERE
                    </h2>
                </div>
                <div className="overflow-hidden">
                    <h2
                        ref={title3Ref}
                        className="text-4xl md:text-6xl font-bold heading-font text-transparent bg-clip-text bg-gradient-to-r from-gray-500 to-white translate-y-full opacity-0"
                    >
                        INNOVATION MEETS VELOCITY
                    </h2>
                </div>
            </div>

            {/* Scroll Indicator */}
            <div className="absolute bottom-10 right-10 flex flex-col items-end gap-2 text-xs text-gray-400">
                <span className="uppercase tracking-widest">Scroll to Explore</span>
                <div className="w-20 h-[1px] bg-gray-600" />
            </div>
        </section>
    );
}
