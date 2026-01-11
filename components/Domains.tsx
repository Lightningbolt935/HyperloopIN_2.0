'use client';

import { useEffect, useRef } from 'react';
import SpotlightCard from './SpotlightCard';

/**
 * Domains Component - OUR DOMAINS section
 * EXACT text from brochure - WHITE TEXT
 * Removed opacity:0 animation to ensure visibility
 */

const domains = [
    {
        id: 'structural',
        icon: 'fa-solid fa-cubes',
        iconColor: 'text-blue-400',
        bgColor: 'bg-blue-500/20',
        title: 'Structural & Design',
        description: 'This domain handles chassis, shell, stability, wheels, suspension, and manufacturing.',
    },
    {
        id: 'propulsion',
        icon: 'fa-solid fa-bullseye',
        iconColor: 'text-orange-400',
        bgColor: 'bg-orange-500/20',
        title: 'Propulsion & Braking',
        description: 'Ensures speed efficiency, minimal energy use, and safety.',
    },
    {
        id: 'embedded',
        icon: 'fa-solid fa-microchip',
        iconColor: 'text-green-400',
        bgColor: 'bg-green-500/20',
        title: 'Embedded Systems',
        description: 'Supplies power, codes control, and integrates sensors.',
    },
    {
        id: 'software',
        icon: 'fa-solid fa-code',
        iconColor: 'text-purple-400',
        bgColor: 'bg-purple-500/20',
        title: 'Software',
        description: 'Designs digital brain, builds GUIs, develops AI controls.',
    },
    {
        id: 'corporate',
        icon: 'fa-solid fa-handshake',
        iconColor: 'text-pink-400',
        bgColor: 'bg-pink-500/20',
        title: 'Corporate',
        description: 'Manages sponsorships, finances, fundraising, and social presence.',
    },
];

export default function Domains() {
    return (
        <section
            id="domains"
            className="px-6 md:px-12 py-24 bg-[#050505]"
        >
            {/* Header - EXACT from brochure */}
            <div className="max-w-[95vw] mx-auto mb-20 border-b border-white/10 pb-8 flex justify-between items-end">
                <h2 className="heading-lg tracking-tight text-white">OUR DOMAINS</h2>
                <p className="text-2xl text-gray-400 max-w-md text-right hidden md:block pb-2">
                    Specialized Teams, Unified Goal
                </p>
            </div>

            {/* Domain Cards */}
            <div className="max-w-[95vw] mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {domains.map((domain) => (
                    <SpotlightCard
                        key={domain.id}
                        className="domain-card glass-card rounded-3xl p-10 hover:bg-white/10 transition-all duration-300 hover-trigger group"
                        spotlightColor="rgba(37, 99, 235, 0.2)"
                    >
                        <div className="flex flex-col gap-6" style={{ position: 'relative', zIndex: 1 }}>
                            <div className={`w-20 h-20 rounded-2xl ${domain.bgColor} flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform`}>
                                <i className={`${domain.icon} text-4xl ${domain.iconColor}`} />
                            </div>
                            <div>
                                <h3 className="text-3xl font-bold mb-4 heading-font text-white">{domain.title}</h3>
                                <p className="text-white/80 text-xl leading-relaxed italic">{domain.description}</p>
                            </div>
                        </div>
                    </SpotlightCard>
                ))}
            </div>
        </section>
    );
}
