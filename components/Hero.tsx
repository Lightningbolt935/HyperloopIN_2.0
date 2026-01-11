'use client';

import { useEffect, useRef } from 'react';
import Link from 'next/link';
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
        if (typeof window !== 'undefined' && (window as any).gsap) {
            const gsap = (window as any).gsap;

            setTimeout(() => {
                const tl = gsap.timeline();

                tl.to(subtitleRef.current, {
                    y: 0,
                    duration: 1,
                    ease: 'power4.out'
                })
                    .to(title1Ref.current, {
                        y: 0,
                        duration: 1,
                        ease: 'power4.out'
                    }, '-=0.8')
                    .to(title2Ref.current, {
                        y: 0,
                        duration: 1,
                        ease: 'power4.out'
                    }, '-=0.8')
                    .to(title3Ref.current, {
                        y: 0,
                        duration: 1,
                        ease: 'power4.out'
                    }, '-=0.8')
                    .from(bgRef.current, {
                        scale: 1.2,
                        duration: 2
                    }, '-=1.5');
            }, 2500);
        }
    }, []);

    return (
        <section
            id="home"
            className="h-screen w-full relative flex items-center justify-center overflow-hidden"
        >
            {/* 3D Tunnel Background */}
            <HyperloopBackground />

            {/* Content - EXACT brochure text */}
            <div className="z-10 text-center px-4">
                <div className="overflow-hidden">
                    <p
                        ref={subtitleRef}
                        className="text-blue-500 font-bold tracking-[0.4em] text-xs uppercase mb-4 translate-y-full"
                    >
                        SRM Institute of Science & Technology
                    </p>
                </div>
                <div className="overflow-hidden">
                    <h1
                        ref={title1Ref}
                        className="heading-xl translate-y-full"
                    >
                        HYPERLOOPIN
                    </h1>
                </div>
                <div className="overflow-hidden mt-4">
                    <h2
                        ref={title2Ref}
                        className="text-4xl md:text-6xl font-bold heading-font text-gray-400 translate-y-full"
                    >
                        WHERE
                    </h2>
                </div>
                <div className="overflow-hidden">
                    <h2
                        ref={title3Ref}
                        className="text-4xl md:text-6xl font-bold heading-font text-transparent bg-clip-text bg-gradient-to-r from-gray-500 to-white translate-y-full"
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
