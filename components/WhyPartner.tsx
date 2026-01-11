'use client';

import { useEffect, useRef } from 'react';

/**
 * WhyPartner Component - WHY PARTNER WITH US section
 * EXACT text from brochure - WHITE TEXT
 * Removed opacity:0 animation to ensure visibility
 */
export default function WhyPartner() {
    return (
        <section
            id="partner"
            className="py-32 px-6 md:px-12 bg-[#050505]"
        >
            <div className="partner-content max-w-[95vw] mx-auto">
                {/* Section Title - EXACT from brochure */}
                <div className="mb-20 border-b border-white/10 pb-8 flex justify-between items-end">
                    <h2 className="heading-lg tracking-tight text-white italic">
                        WHY PARTNER WITH US
                    </h2>
                </div>

                {/* EXACT paragraph from brochure - WHITE TEXT */}
                <div className="max-w-[90vw] grid lg:grid-cols-2 gap-20">
                    <div>
                        <p className="text-3xl md:text-5xl leading-tight text-white font-light">
                            By partnering with us, companies gain <span className="text-blue-400 font-bold">strong brand visibility</span> across
                            team gear, documents, and media promotions.
                        </p>

                        <div className="mt-12">
                            <a
                                href="#contact"
                                className="inline-flex items-center gap-4 border border-blue-500 text-blue-400 px-10 py-5 rounded-full text-lg uppercase tracking-widest hover:bg-blue-500 hover:text-white transition-all duration-300 hover-trigger"
                            >
                                <span>Become a Partner</span>
                                <i className="fa-solid fa-arrow-right" />
                            </a>
                        </div>
                    </div>

                    <div className="space-y-12 text-2xl md:text-3xl text-white/80 leading-relaxed">
                        <p>
                            Prominent exposure at national and international stages such as <span className="text-blue-400 font-bold">GHC IITM</span> and
                            the <span className="text-blue-400 font-bold">European Hyperloop Week</span>. Our collaboration offers direct engagement
                            with talented students, faculty, and industry peers through exclusive meets and technical demos.
                        </p>

                        <p>
                            Sponsors also become associated with <span className="text-blue-400 font-bold">innovative Hyperloop prototypes</span> and{' '}
                            <span className="text-blue-400 font-bold">IoT showcases</span> that highlight cutting edge engineering.
                            Additionally, we offer <span className="text-blue-400 font-bold">flexible co-branding opportunities</span> including
                            workshops, campaigns, and formal acknowledgments.
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
}
