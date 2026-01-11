'use client';

/**
 * SponsorTicker Component
 * 
 * Infinite scrolling marquee displaying sponsor logos
 * Opacity increases on hover for emphasis
 */
const sponsors = [
    'Ansys',
    'Solidworks',
    'Altium',
    'MathWorks',
    'SRM IST',
];

export default function SponsorTicker() {
    // Duplicate sponsors for seamless loop
    const allSponsors = [...sponsors, ...sponsors];

    return (
        <div className="w-full py-10 border-y border-white/5 bg-black/50 overflow-hidden">
            <div className="whitespace-nowrap flex gap-20 items-center animate-marquee opacity-50 hover:opacity-100 transition duration-500">
                <div className="flex gap-24 items-center text-4xl font-bold text-gray-700 uppercase heading-font">
                    {allSponsors.map((sponsor, index) => (
                        <span key={`${sponsor}-${index}`} className="hover-trigger">
                            {sponsor}
                        </span>
                    ))}
                </div>
            </div>
        </div>
    );
}
