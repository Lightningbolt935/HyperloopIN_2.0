'use client';

import SpotlightCard from './SpotlightCard';

export default function Team() {
    return (
        <section id="team" className="py-24 px-6 md:px-12 bg-[#050505]">
            <div className="max-w-[95vw] mx-auto">
                <div className="mb-16 border-b border-white/10 pb-8 flex justify-between items-end">
                    <h2 className="heading-lg tracking-tight text-white">THE TEAM</h2>
                    <p className="text-2xl text-gray-400 max-w-md text-right hidden md:block pb-2">
                        The Minds Behind the Machine
                    </p>
                </div>

                <div className="grid md:grid-cols-4 gap-6">
                    {/* Team Members List */}
                    {[
                        { name: 'Hruday Divakaran', role: 'President', image: '/images/team/president.jpg' },
                        { name: 'Dennis Abraham', role: 'Vice President', image: '/images/team/vice_president.jpg' },
                        { name: 'Amish Roopesh', role: 'Structural and Design Lead', image: '/images/team/amish.jpg' },
                        { name: 'Tanishk Maharana', role: 'Propulsion and Braking Lead', image: null },
                        { name: 'Vaibhav Aiyer', role: 'Embedded Systems Lead', image: null },
                        { name: 'Snehil Sahay', role: 'Software Cofigurations Lead', image: null },
                        { name: 'Dhruv Malu', role: 'Corporate Lead', image: null },
                    ].map((member, index) => (
                        <SpotlightCard key={index} className="glass-card rounded-3xl overflow-hidden group hover-trigger aspect-[3/4] relative">
                            <div className="absolute inset-0 bg-white/5 group-hover:bg-white/10 transition" />

                            {/* Member Image or Placeholder */}
                            {member.image ? (
                                <img
                                    src={member.image}
                                    alt={member.name}
                                    className="absolute inset-0 w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity duration-500"
                                />
                            ) : (
                                <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-50" />
                            )}

                            <div className="absolute bottom-0 left-0 w-full p-6 bg-gradient-to-t from-black/90 via-black/60 to-transparent">
                                <h3 className="text-xl font-bold text-white">{member.name}</h3>
                                <p className="text-blue-400 text-sm">{member.role}</p>
                            </div>
                        </SpotlightCard>
                    ))}
                </div>
            </div>
        </section>
    );
}
