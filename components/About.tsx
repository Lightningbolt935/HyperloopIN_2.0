'use client';

import { useEffect, useRef } from 'react';

/**
 * About Component - WHO ARE WE? section
 * EXACT text from brochure - WHITE TEXT
 * Removed opacity:0 animation to ensure visibility
 */
export default function About() {
    return (
        <section
            id="about"
            className="min-h-[80vh] flex items-center justify-center px-6 md:px-20 py-24"
        >
            <div className="max-w-[90vw] w-full">
                {/* Section Title - EXACT from brochure */}
                <div className="mb-20 border-b border-white/10 pb-8 flex justify-between items-end">
                    <h2 className="heading-lg tracking-tight text-white">
                        WHO ARE WE?
                    </h2>
                    <p className="text-2xl text-gray-400 max-w-md text-right hidden md:block pb-2">
                        Defining the Future of Transport
                    </p>
                </div>

                {/* Main Content - EXACT text from brochure - WHITE TEXT */}
                <div className="space-y-10 text-2xl md:text-4xl leading-relaxed text-white max-w-[85vw]">
                    <p>
                        We are a <span className="text-blue-400 font-bold">student-led technical club at SRM</span> working
                        to design, build, and innovate <span className="text-blue-400 font-bold">Hyperloop pods</span> for
                        global competitions like the <span className="text-blue-400 font-bold">European Hyperloop Week</span>.
                    </p>

                    <p className="text-white/80">
                        From mechanical design and propulsion to AI, simulation, and electronics, we cover it all.
                    </p>
                </div>

                {/* Mission Statement - EXACT from brochure */}
                <div className="mt-20 border-l-8 border-blue-500 pl-10">
                    <p className="text-4xl md:text-6xl text-white font-medium">
                        Our mission is to <span className="text-blue-400 font-bold">build, innovate, compete and empower</span>.
                    </p>
                </div>
            </div>
        </section>
    );
}
