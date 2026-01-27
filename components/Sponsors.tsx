'use client';

/**
 * Sponsors Component - OUR SPONSORS + MORE ABOUT US sections
 * EXACT sponsors and contact info from brochure - WHITE TEXT
 */

import { sponsors } from '../data/sponsors';

export default function Sponsors() {
    return (
        <section id="sponsors" className="py-32 px-6 md:px-12">
            <div className="max-w-[95vw] mx-auto">

                {/* OUR SPONSORS - EXACT from brochure */}
                <div className="mb-32">
                    <div className="mb-20 border-b border-white/10 pb-8 flex justify-between items-end">
                        <h2 className="heading-lg tracking-tight text-white">
                            OUR SPONSORS
                        </h2>
                    </div>

                    {/* Sponsor List */}
                    <div className="grid md:grid-cols-2 gap-8">
                        {sponsors.map((sponsor) => (
                            <a
                                key={sponsor.name}
                                href={sponsor.website}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center gap-8 glass-card rounded-3xl p-10 hover:bg-white/10 transition-all duration-300 hover-trigger group h-48"
                            >
                                <div className="flex items-center justify-center w-full h-full relative">
                                    <img
                                        src={sponsor.logo}
                                        alt={sponsor.name}
                                        className="max-h-24 max-w-full object-contain transition-all duration-300 hover:scale-105"
                                    />
                                    <div className="absolute top-0 right-0">
                                        <i className="fa-solid fa-arrow-up-right-from-square text-2xl text-white/50 group-hover:text-white transition-colors" />
                                    </div>
                                </div>
                            </a>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
