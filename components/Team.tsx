'use client';

import SpotlightCard from './SpotlightCard';

export default function Team() {
    const leadership = [
        { name: 'Hruday Divakaran', role: 'President', image: '/images/team/Pres.jpg' },
        { name: 'Dennis Abraham', role: 'Vice President', image: '/images/team/vice_president.jpg' },
    ];

    const leads = [
        { name: 'Ayush K Choudhary', role: 'Structural Lead', image: '/images/team/Ayush.jpg' },
        { name: 'Amish Roopesh', role: 'Thermal Lead', image: '/images/team/Amish.jpg' },
        { name: 'Tanishk Maharana', role: 'Traction Lead', image: '/images/team/tanishk_2.jpg' },
        { name: 'Vaibhav Aiyer', role: 'Embedded Systems Lead', image: '/images/team/Vai.jpg' },
        { name: 'Dhruv Malu', role: 'Corporate Lead', image: '/images/team/Dhruv.jpg' },
    ];

    const associateLeads = [
        { name: 'Snehil Sahay', role: 'Embedded Systems (Software)', image: '/images/team/Snehil.jpg' },
        { name: 'Archit', role: 'Structural', image: '/images/team/Archit.jpg' },
        { name: 'Naman Vedh K S', role: 'Corporate', image: '/images/team/Naman.jpg' },
        { name: 'Telu Swayambhu', role: 'Traction', image: '/images/team/Swayambhu.jpg' },
        { name: 'Allen Mathews', role: 'Thermal', image: '/images/team/Allen.jpg' },
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
                    <div className="grid grid-cols-2 gap-4 sm:gap-8 max-w-3xl mx-auto">
                        {leadership.map((member, index) => (
                            <SpotlightCard key={index} className="glass-card rounded-3xl p-4 sm:p-8 text-center hover:bg-white/5 transition hover-trigger">
                                <div className="w-24 h-24 sm:w-40 sm:h-40 mx-auto rounded-full mb-4 sm:mb-6 overflow-hidden border-2 border-white/20">
                                    <img
                                        src={member.image}
                                        alt={member.name}
                                        className="w-full h-full object-cover"
                                    />
                                </div>
                                <h3 className="text-lg sm:text-2xl font-bold text-white mb-1 sm:mb-2">{member.name}</h3>
                                <p className="text-blue-400 text-sm sm:text-base font-medium">{member.role}</p>
                            </SpotlightCard>
                        ))}
                    </div>
                </div>

                {/* Leads Section */}
                <div className="mb-12">
                    <h3 className="text-2xl font-bold text-white mb-6 uppercase tracking-wide">Team Leads</h3>
                    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 sm:gap-6">
                        {leads.map((member, index) => (
                            <SpotlightCard key={index} className="glass-card rounded-3xl p-4 sm:p-6 text-center hover:bg-white/5 transition hover-trigger">
                                <div className="w-20 h-20 sm:w-28 sm:h-28 mx-auto rounded-full mb-3 sm:mb-4 overflow-hidden border-2 border-white/20">
                                    <img
                                        src={member.image}
                                        alt={member.name}
                                        className="w-full h-full object-cover"
                                    />
                                </div>
                                <h3 className="text-sm sm:text-lg font-bold text-white mb-1">{member.name}</h3>
                                <p className="text-blue-400 text-xs sm:text-sm font-medium">{member.role}</p>
                            </SpotlightCard>
                        ))}
                    </div>
                </div>

                {/* Associate Leads Section */}
                <div>
                    <h3 className="text-2xl font-bold text-white mb-6 uppercase tracking-wide">Associate Leads</h3>
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7 gap-3 sm:gap-6">
                        {associateLeads.map((member, index) => (
                            <SpotlightCard key={index} className="glass-card rounded-3xl p-3 sm:p-5 text-center hover:bg-white/5 transition hover-trigger">
                                <div className="w-16 h-16 sm:w-24 sm:h-24 mx-auto rounded-full mb-2 sm:mb-4 overflow-hidden border-2 border-white/20">
                                    <img
                                        src={member.image}
                                        alt={member.name}
                                        className="w-full h-full object-cover"
                                    />
                                </div>
                                <h3 className="text-xs sm:text-base font-bold text-white mb-1 line-clamp-1">{member.name}</h3>
                                <p className="text-blue-400 text-xs sm:text-sm font-medium line-clamp-1">{member.role}</p>
                            </SpotlightCard>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
