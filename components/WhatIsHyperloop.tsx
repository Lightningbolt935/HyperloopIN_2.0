'use client';

import { useEffect, useRef } from 'react';
import SpotlightCard from './SpotlightCard';

/**
 * WhatIsHyperloop Component - WHAT IS HYPERLOOP? section
 * EXACT text from brochure - WHITE TEXT
 * Removed opacity:0 animation to ensure visibility
 */
export default function WhatIsHyperloop() {
    return (
        <section
            id="hyperloop"
            className="py-32 px-6 md:px-12 relative overflow-hidden"
        >
            {/* Background Gradient */}
            <div className="absolute inset-0 bg-gradient-to-br from-blue-900/20 via-transparent to-purple-900/20" />

            <div className="hyperloop-content max-w-[90vw] mx-auto relative z-10">
                {/* Section Title - EXACT from brochure */}
                <div className="mb-20 border-b border-white/10 pb-8 flex justify-between items-end">
                    <h2 className="heading-lg tracking-tight text-white">
                        WHAT IS HYPERLOOP?
                    </h2>
                    <p className="text-2xl text-gray-400 max-w-md text-right hidden md:block pb-2">
                        Speed, Sustainability, & Silence
                    </p>
                </div>

                {/* Main Description - EXACT text from brochure - WHITE TEXT */}
                {/* Content Layout */}
                <div className="flex flex-col gap-16">
                    {/* Top Row: Text & Image */}
                    <div className="grid lg:grid-cols-2 gap-12 items-center">
                        <div className="space-y-12">
                            <p className="text-2xl md:text-4xl leading-relaxed text-white">
                                Imagine flying at airplane speed... but on the ground, inside a magic vacuum tube,
                                in a levitating pod that whooshes silently at <span className="text-blue-400 font-bold">over 1000 km/h</span>,
                                faster than a jet, smoother than a train, greener than a Tesla.
                            </p>

                            <div className="py-6">
                                <p className="text-3xl md:text-5xl text-white">
                                    🌀🌍 It's not sci-fi <span className="text-blue-400 font-bold">it's Hyperloop</span>:
                                </p>
                            </div>

                            <blockquote className="border-l-8 border-purple-500 pl-10 py-4">
                                <p className="text-3xl md:text-4xl text-white italic leading-relaxed">
                                    "A floating capsule racing through an airless tunnel, powered by magnets and dreams."
                                </p>
                            </blockquote>

                            <div className="space-y-4 text-white/90 text-2xl md:text-3xl">
                                <p>No traffic. No turbulence. Just pure, futuristic <span className="text-blue-400 font-bold">teleportation vibes</span>.</p>
                                <p>From city to city <span className="text-blue-400 font-bold">in minutes</span> not hours.</p>
                            </div>

                            {/* Tagline - EXACT from brochure */}
                            <p className="text-4xl md:text-6xl font-bold heading-font text-white mt-12">
                                Welcome aboard the future.
                            </p>
                        </div>

                        {/* Pod Image */}
                        <div className="relative group perspective-1000">
                            <div className="absolute inset-0 bg-blue-500/20 blur-[100px] rounded-full opacity-50 group-hover:opacity-75 transition-opacity duration-700" />
                            <img
                                src="/images/hyperloopinpod.png"
                                alt="Hyperloop Pod"
                                className="w-full h-auto object-contain drop-shadow-[0_0_50px_rgba(59,130,246,0.3)] transform group-hover:scale-105 group-hover:-translate-y-2 transition-all duration-700 ease-out"
                            />
                        </div>
                    </div>

                    {/* Bottom Row: Feature Cards */}
                    <div className="grid md:grid-cols-3 gap-8">
                        <SpotlightCard className="glass-card rounded-3xl p-10 hover:bg-white/10 transition hover-trigger" spotlightColor="rgba(37, 99, 235, 0.2)">
                            <div className="flex items-center gap-8 relative z-10">
                                <div className="w-24 h-24 rounded-2xl bg-blue-500/20 flex items-center justify-center">
                                    <i className="fa-solid fa-gauge-high text-5xl text-blue-400" />
                                </div>
                                <div>
                                    <div className="text-5xl font-bold heading-font text-white mb-2">1000+ km/h</div>
                                    <div className="text-xl text-white/70">Maximum Speed</div>
                                </div>
                            </div>
                        </SpotlightCard>

                        <SpotlightCard className="glass-card rounded-3xl p-10 hover:bg-white/10 transition hover-trigger" spotlightColor="rgba(34, 197, 94, 0.2)">
                            <div className="flex items-center gap-8 relative z-10">
                                <div className="w-24 h-24 rounded-2xl bg-green-500/20 flex items-center justify-center">
                                    <i className="fa-solid fa-leaf text-5xl text-green-400" />
                                </div>
                                <div>
                                    <div className="text-5xl font-bold heading-font text-white mb-2">Greener</div>
                                    <div className="text-xl text-white/70">Than a Tesla</div>
                                </div>
                            </div>
                        </SpotlightCard>

                        <SpotlightCard className="glass-card rounded-3xl p-10 hover:bg-white/10 transition hover-trigger" spotlightColor="rgba(168, 85, 247, 0.2)">
                            <div className="flex items-center gap-8 relative z-10">
                                <div className="w-24 h-24 rounded-2xl bg-purple-500/20 flex items-center justify-center">
                                    <i className="fa-solid fa-clock text-5xl text-purple-400" />
                                </div>
                                <div>
                                    <div className="text-5xl font-bold heading-font text-white mb-2">In Minutes</div>
                                    <div className="text-xl text-white/70">City to City, Not Hours</div>
                                </div>
                            </div>
                        </SpotlightCard>
                    </div>
                </div>
            </div>
        </section>
    );
}
