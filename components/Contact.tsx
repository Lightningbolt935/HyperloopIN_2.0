'use client';

/**
 * Contact Component - "Let's Connect"
 * Replicates the reference site's contact section layout.
 * Left: Contact Details (Address, Phone, Email, Socials)
 * Right: Contact Form (Name, Email, Subject, Message)
 */
export default function Contact() {
    return (
        <section id="contact" className="py-24 px-6 md:px-12 bg-[#0a0a0a] relative overflow-hidden">
            {/* Background Element */}
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-600/10 rounded-full blur-[120px] pointer-events-none" />

            <div className="max-w-[95vw] mx-auto">
                <div className="mb-16 border-b border-white/10 pb-8">
                    <h2 className="heading-lg tracking-tight text-white">
                        LET'S CONNECT
                    </h2>
                </div>

                <div className="grid lg:grid-cols-2 gap-16 lg:gap-24">
                    {/* Left Column: Contact Info */}
                    <div className="space-y-12">
                        <div>
                            <h3 className="text-3xl font-bold text-white mb-6">Get in Touch</h3>
                            <p className="text-gray-400 text-lg leading-relaxed">
                                Have questions or want to collaborate? Reach out to us. We are always looking for new partners and team members to join our journey.
                            </p>
                        </div>

                        <div className="space-y-8">
                            <div className="flex items-start gap-6">
                                <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center shrink-0">
                                    <i className="fa-solid fa-location-dot text-blue-400 text-xl" />
                                </div>
                                <div>
                                    <h4 className="text-white font-bold text-lg mb-1">Address</h4>
                                    <p className="text-gray-400">SRM Institute of Science and Technology,<br />Kattankulathur, Chennai 603203</p>
                                </div>
                            </div>

                            <div className="flex items-start gap-6">
                                <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center shrink-0">
                                    <i className="fa-solid fa-envelope text-blue-400 text-xl" />
                                </div>
                                <div>
                                    <h4 className="text-white font-bold text-lg mb-1">Email</h4>
                                    <a href="mailto:hploop25@gmail.com" className="text-gray-400 hover:text-white transition">hploop25@gmail.com</a>
                                </div>
                            </div>

                            <div className="flex items-start gap-6">
                                <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center shrink-0">
                                    <i className="fa-solid fa-phone text-blue-400 text-xl" />
                                </div>
                                <div>
                                    <h4 className="text-white font-bold text-lg mb-1">Phone</h4>
                                    <p className="text-gray-400">+91 72084 83644</p>
                                </div>
                            </div>
                        </div>

                        <div className="pt-8 border-t border-white/10">
                            <h4 className="text-white font-bold text-lg mb-6">Follow Us</h4>
                            <div className="flex gap-4">
                                <a href="#" className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center text-white hover:bg-white hover:text-black transition duration-300">
                                    <i className="fa-brands fa-instagram text-xl" />
                                </a>
                                <a href="#" className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center text-white hover:bg-white hover:text-black transition duration-300">
                                    <i className="fa-brands fa-linkedin-in text-xl" />
                                </a>
                                <a href="#" className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center text-white hover:bg-white hover:text-black transition duration-300">
                                    <i className="fa-brands fa-twitter text-xl" />
                                </a>
                            </div>
                        </div>
                    </div>

                    {/* Right Column: Form */}
                    <div className="bg-white/5 rounded-3xl p-8 md:p-12 border border-white/10 backdrop-blur-sm">
                        <form className="space-y-6">
                            <div className="grid md:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <label htmlFor="name" className="text-sm font-medium text-gray-400 uppercase tracking-wider">Name</label>
                                    <input
                                        type="text"
                                        id="name"
                                        className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 transition"
                                        placeholder="John Doe"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label htmlFor="email" className="text-sm font-medium text-gray-400 uppercase tracking-wider">Email</label>
                                    <input
                                        type="email"
                                        id="email"
                                        className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 transition"
                                        placeholder="john@example.com"
                                    />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label htmlFor="subject" className="text-sm font-medium text-gray-400 uppercase tracking-wider">Subject</label>
                                <input
                                    type="text"
                                    id="subject"
                                    className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 transition"
                                    placeholder="Partnership Inquiry"
                                />
                            </div>

                            <div className="space-y-2">
                                <label htmlFor="message" className="text-sm font-medium text-gray-400 uppercase tracking-wider">Message</label>
                                <textarea
                                    id="message"
                                    rows={5}
                                    className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 transition resize-none"
                                    placeholder="Write your message here..."
                                />
                            </div>

                            <button
                                type="submit"
                                className="w-full bg-white text-black font-bold uppercase tracking-widest py-4 rounded-lg hover:bg-blue-500 hover:text-white transition duration-300 mt-4"
                            >
                                Send Message
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    );
}
