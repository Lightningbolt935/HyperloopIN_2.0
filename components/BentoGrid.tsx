'use client';

import { useEffect, useRef } from 'react';
import SpotlightCard from './SpotlightCard';

/**
 * BentoGrid Component
 * 
 * Technology/Engineering section with bento grid layout
 * Features glass cards with specs and images
 */

const specs = [
    {
        id: 'drag',
        icon: 'fa-solid fa-wind',
        iconColor: 'text-blue-500',
        value: '0.21 Cd',
        label: 'Drag Coefficient',
    },
    {
        id: 'speed',
        icon: 'fa-solid fa-bolt',
        iconColor: 'text-yellow-500',
        value: '120 km/h',
        label: 'Top Speed (Simulated)',
    },
    {
        id: 'mass',
        icon: 'fa-solid fa-weight-hanging',
        iconColor: 'text-red-500',
        value: '250 kg',
        label: 'Total Mass',
    },
];

export default function BentoGrid() {
    const sectionRef = useRef<HTMLElement>(null);

    useEffect(() => {
        // GSAP animation on scroll
        if (typeof window !== 'undefined' && (window as any).gsap) {
            const gsap = (window as any).gsap;
            const ScrollTrigger = (window as any).ScrollTrigger;

            if (gsap && ScrollTrigger) {
                gsap.registerPlugin(ScrollTrigger);

                if (sectionRef.current) {
                    const cards = sectionRef.current.querySelectorAll('.glass-card');

                    gsap.from(cards, {
                        scrollTrigger: {
                            trigger: sectionRef.current,
                            start: 'top 60%',
                        },
                        y: 100,
                        opacity: 0,
                        duration: 1,
                        stagger: 0.2,
                        ease: 'power3.out'
                    });
                }
            }
        }
    }, []);

    return (
        <section
            ref={sectionRef}
            id="technology"
            className="max-w-[95vw] mx-auto py-24 bg-[#050505]"
        >
            {/* Header */}
            <div className="mb-16 border-b border-white/10 pb-6 flex justify-between items-end">
                <h2 className="heading-lg">The Engineering</h2>
                <p className="text-xl text-gray-400 max-w-md text-right hidden md:block">
                    Validated via Industry Standard Simulation Suites. <br /> Powered by Ansys & Solidworks.
                </p>
            </div>

            {/* Bento Grid */}
            {/* Bento Grid */}
            <div className="bento-grid">
                {/* Main Feature Card */}
                <SpotlightCard className="col-span-12 md:col-span-8 row-span-2 glass-card rounded-3xl p-10 relative overflow-hidden group hover-trigger" spotlightColor="rgba(37, 99, 235, 0.15)">
                    <div className="absolute inset-0 bg-gradient-to-br from-blue-900/20 to-transparent" />
                    <img
                        src="https://images.unsplash.com/photo-1628650261962-3105a1257897?q=80&w=1920&auto=format&fit=crop"
                        alt="CAD Design"
                        className="absolute right-[-10%] bottom-[-10%] w-[80%] opacity-60 group-hover:scale-105 group-hover:opacity-80 transition duration-700 ease-out"
                    />

                    <h3 className="text-5xl font-bold relative z-10 heading-font">Carbon Fiber Monocoque</h3>
                    <p className="text-gray-400 mt-4 max-w-2xl text-2xl relative z-10">
                        Aerospace-grade chassis designed in Solidworks for optimal strength-to-weight ratio. Withstanding 3G loads.
                    </p>
                    <div className="absolute bottom-8 left-8 border border-white/30 px-6 py-2 rounded-full text-sm uppercase z-10">
                        Gen-1 Prototype
                    </div>
                </SpotlightCard>

                {/* Drag Coefficient */}
                <SpotlightCard className="col-span-6 md:col-span-4 glass-card rounded-3xl p-10 flex flex-col justify-between hover:bg-white/5 transition hover-trigger">
                    <div className="relative z-10">
                        <i className={`${specs[0].icon} text-6xl ${specs[0].iconColor} mb-8 block`} />
                        <div>
                            <div className="text-7xl font-bold heading-font">{specs[0].value}</div>
                            <div className="text-xl text-gray-400 uppercase tracking-wider mt-2">{specs[0].label}</div>
                        </div>
                    </div>
                </SpotlightCard>

                {/* CFD Card */}
                <SpotlightCard className="col-span-12 md:col-span-4 glass-card rounded-3xl overflow-hidden relative group hover-trigger">
                    <img
                        src="https://images.unsplash.com/photo-1635070041078-e363dbe005cb?q=80&w=1920&auto=format&fit=crop"
                        alt="CFD Analysis"
                        className="absolute inset-0 w-full h-full object-cover opacity-50 group-hover:scale-110 transition duration-700"
                    />
                    <div className="absolute inset-0 bg-black/40" />
                    <div className="absolute bottom-8 left-8 z-10">
                        <h3 className="text-3xl font-bold heading-font">Fluid Dynamics</h3>
                        <p className="text-lg text-gray-300">Verified in Ansys Fluent</p>
                    </div>
                    <div className="absolute top-4 right-4 bg-yellow-500 text-black text-[12px] font-bold px-3 py-1 rounded z-10">
                        ANSYS
                    </div>
                </SpotlightCard>

                {/* Speed */}
                <SpotlightCard className="col-span-6 md:col-span-4 glass-card rounded-3xl p-10 flex flex-col justify-between hover:bg-white/5 transition hover-trigger">
                    <div className="relative z-10">
                        <i className={`${specs[1].icon} text-6xl ${specs[1].iconColor} mb-8 block`} />
                        <div>
                            <div className="text-7xl font-bold heading-font">{specs[1].value}</div>
                            <div className="text-xl text-gray-400 uppercase tracking-wider mt-2">{specs[1].label}</div>
                        </div>
                    </div>
                </SpotlightCard>

                {/* Mass */}
                <SpotlightCard className="col-span-6 md:col-span-4 glass-card rounded-3xl p-10 flex flex-col justify-between hover:bg-white/5 transition hover-trigger">
                    <div className="relative z-10">
                        <i className={`${specs[2].icon} text-6xl ${specs[2].iconColor} mb-8 block`} />
                        <div>
                            <div className="text-7xl font-bold heading-font">{specs[2].value}</div>
                            <div className="text-xl text-gray-400 uppercase tracking-wider mt-2">{specs[2].label}</div>
                        </div>
                    </div>
                </SpotlightCard>
            </div>
        </section>
    );
}
