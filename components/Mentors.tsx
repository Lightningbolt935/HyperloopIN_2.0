'use client';

import SpotlightCard from './SpotlightCard';

const mentors = [
    { 
        name: 'Dr.S.Prabhu', 
        role: 'Mentor', 
        department: 'Mechanical Engineering',
        about: 'With extensive experience in aerospace engineering and UAV design, Dr. Prabhu brings invaluable expertise to our team. His research focuses on aerodynamics and structural optimization, guiding us through complex technical challenges with precision and innovation.'
    },
    { 
        name: 'Dr.I. Infanta Mary Priya', 
        role: 'Mentor', 
        department: 'Mechanical Engineering',
        about: 'Dr. Infanta Mary Priya specializes in advanced materials and manufacturing processes. Her guidance in composite material selection and fabrication techniques has been instrumental in achieving our design goals while maintaining structural integrity and performance standards.'
    },
];

export default function Mentors() {
    return (
        <section id="mentors" className="py-24 px-6 md:px-12 bg-[#050505]">
            <div className="max-w-[95vw] mx-auto">
                <div className="mb-16 border-b border-white/10 pb-8 flex justify-between items-end">
                    <h2 className="heading-lg tracking-tight text-white">MENTORS</h2>
                    <p className="text-2xl text-gray-400 max-w-md text-right hidden md:block pb-2">
                        Guiding the Vision
                    </p>
                </div>

                <div className="grid md:grid-cols-2 gap-8">
                    {mentors.map((mentor, index) => (
                        <SpotlightCard key={index} className="glass-card rounded-3xl p-8 text-center hover:bg-white/5 transition hover-trigger">
                            <div className="w-32 h-32 mx-auto bg-white/10 rounded-full mb-6 flex items-center justify-center">
                                <i className="fa-solid fa-user-tie text-4xl text-white/50" />
                            </div>
                            <h3 className="text-2xl font-bold text-white mb-2">{mentor.name}</h3>
                            <p className="text-blue-400 font-medium mb-1">{mentor.role}</p>
                            <p className="text-gray-400 text-sm mb-4">{mentor.department}</p>
                            <p className="text-gray-300 text-sm leading-relaxed max-w-lg mx-auto">
                                {mentor.about}
                            </p>
                        </SpotlightCard>
                    ))}
                </div>
            </div>
        </section>
    );
}