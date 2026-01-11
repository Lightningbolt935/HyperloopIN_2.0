'use client';

/**
 * Sponsors Component - OUR SPONSORS + MORE ABOUT US sections
 * EXACT sponsors and contact info from brochure - WHITE TEXT
 */

const sponsors = [
    {
        name: 'Ansys',
        logo: 'A',
        website: 'https://www.ansys.com',
        color: 'text-red-400'
    },
    {
        name: 'Solid Works',
        logo: 'SOLIDWORKS',
        website: 'https://www.solidworks.com',
        color: 'text-red-500'
    },
    {
        name: 'Altium',
        logo: 'Altium Designer',
        website: 'https://www.altium.com',
        color: 'text-yellow-400'
    },
    {
        name: 'Bender',
        logo: 'BENDER',
        website: 'https://www.bender.de',
        color: 'text-green-400'
    },
];

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
                                className="flex items-center gap-8 glass-card rounded-3xl p-10 hover:bg-white/10 transition-all duration-300 hover-trigger group"
                            >
                                <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center">
                                    <i className="fa-regular fa-circle-dot text-blue-400 text-xl" />
                                </div>
                                <div className="flex items-center gap-8 flex-1">
                                    <span className="text-3xl font-medium text-white w-40">{sponsor.name}</span>
                                    <span className={`text-4xl font-bold heading-font ${sponsor.color} group-hover:text-white transition-colors`}>
                                        {sponsor.logo}
                                    </span>
                                </div>
                                <i className="fa-solid fa-arrow-up-right-from-square text-2xl text-white/50 group-hover:text-white transition-colors" />
                            </a>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
