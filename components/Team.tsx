'use client';

import SpotlightCard from './SpotlightCard';

export default function Team() {
    const leadership = [
        { name: 'Hruday Divakaran', role: 'President', image: '/images/team/Pres.jpg' },
        { name: 'Dennis Abraham', role: 'Vice President', image: '/images/team/vice_president.jpg' },
    ];

    const leads = [
        { name: 'Amish Roopesh', role: 'Structural and Design Lead', image: '/images/team/Amish.jpg' },
        { name: 'Tanishk Maharana', role: 'Propulsion and Braking Lead', image: '/images/team/tanishk_2.jpg' },
        { name: 'Vaibhav Aiyer', role: 'Embedded Systems Lead', image: '/images/team/Vai.jpg' },
        { name: 'Snehil Sahay', role: 'Software Configurations Lead', image: '/images/team/Snehil.jpg' },
        { name: 'Dhruv Malu', role: 'Corporate Lead', image: '/images/team/Dhruv.jpg' },
    ];

    const members = [
        { name: 'Naman Vedh K S', role: 'Corporate', image: '/images/team/Naman.jpg' },
        { name: 'Telu Swayambhu', role: 'Corporate', image: '/images/team/Swayambhu.jpg' },
        { name: 'Sidhant Sairam Mohan', role: 'Structural and Design', image: '/images/team/Siddhant.jpg' },
        { name: 'Allen Mathews', role: 'Structural and Design', image: null },
        { name: 'Revant Lenka', role: 'Embedded Systems', image: '/images/team/Revant.jpg' },
        { name: 'Jayananthan G', role: 'Embedded Systems', image: '/images/team/Jay.jpg' },
    ];

    return (
        <section id="team" className="py-24 px-6 md:px-12 bg-[#050505]">
            <div className="max-w-[95vw] mx-auto">
                <div className="mb-16 border-b border-white/10 pb-8 flex justify-between items-end">
                    <h2 className="heading-lg tracking-tight text-white">THE TEAM</h2>
                    <p className="text-2xl text-gray-400 max-w-md text-right hidden md:block pb-2">
                        The Minds Behind the Machine
                    </p>
                </div>

                {/* Leadership Section */}
                <div className="mb-12">
                    <h3 className="text-2xl font-bold text-white mb-6 uppercase tracking-wide">Leadership</h3>
                    <div className="grid md:grid-cols-2 gap-6 max-w-3xl mx-auto">
                        {leadership.map((member, index) => (
                            <SpotlightCard key={index} className="glass-card rounded-3xl overflow-hidden group hover-trigger aspect-[3/4] relative">
                                <div className="absolute inset-0 bg-white/5 group-hover:bg-white/10 transition" />

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

                {/* Leads Section */}
                <div className="mb-12">
                    <h3 className="text-2xl font-bold text-white mb-6 uppercase tracking-wide">Team Leads</h3>
                    <div className="grid md:grid-cols-4 gap-6">
                        {leads.map((member, index) => (
                            <SpotlightCard key={index} className="glass-card rounded-3xl overflow-hidden group hover-trigger aspect-[3/4] relative">
                                <div className="absolute inset-0 bg-white/5 group-hover:bg-white/10 transition" />

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

                {/* Members Section */}
                <div>
                    <h3 className="text-2xl font-bold text-white mb-6 uppercase tracking-wide">Team Members</h3>
                    <div className="grid md:grid-cols-4 gap-6">
                        {members.map((member, index) => (
                            <SpotlightCard key={index} className="glass-card rounded-3xl overflow-hidden group hover-trigger aspect-[3/4] relative">
                                <div className="absolute inset-0 bg-white/5 group-hover:bg-white/10 transition" />

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
            </div>
        </section>
    );
}
