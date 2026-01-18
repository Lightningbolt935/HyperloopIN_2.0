'use client';

import SpotlightCard from './SpotlightCard';

const galleryImages = [
    '/images/gallery/grp.jpeg',
    '/images/gallery/g0.jpeg',
    '/images/gallery/G1.jpg',
    'https://images.unsplash.com/photo-1534972195531-d756b9bfa9f2?q=80&w=1000&auto=format&fit=crop', // Keeping one attractive Unsplash fallback for balance
];

export default function Gallery() {
    return (
        <section id="gallery" className="py-24 px-6 md:px-12 bg-[#050505]">
            <div className="max-w-[95vw] mx-auto">
                <div className="mb-16 border-b border-white/10 pb-8 flex justify-between items-end">
                    <h2 className="heading-lg tracking-tight text-white">GALLERY</h2>
                    <p className="text-2xl text-gray-400 max-w-md text-right hidden md:block pb-2">
                        Capturing Innovation
                    </p>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
                    {galleryImages.map((src, index) => (
                        <SpotlightCard key={index} className="glass-card rounded-2xl overflow-hidden aspect-square relative group">
                            <img
                                src={src}
                                alt={`Gallery ${index + 1}`}
                                className="object-cover w-full h-full opacity-70 group-hover:opacity-100 group-hover:scale-110 transition duration-700"
                            />
                        </SpotlightCard>
                    ))}
                </div>
            </div>
        </section>
    );
}
