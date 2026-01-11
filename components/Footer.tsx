'use client';

import Link from 'next/link';

/**
 * Footer Component - WHITE TEXT for visibility
 */
export default function Footer() {
    return (
        <footer id="contact" className="py-20 border-t border-white/20 bg-black">
            <div className="container mx-auto px-6 flex flex-col md:flex-row justify-between items-start">
                {/* Brand */}
                <div className="mb-10 md:mb-0">
                    <h2 className="text-3xl font-bold uppercase mb-4 heading-font text-white">Hyperloopin</h2>
                    <p className="text-white/80 max-w-sm">
                        Designing the future at SRM Institute of Science & Technology.
                    </p>

                    {/* Contact Info */}
                    <div className="mt-6 space-y-2 text-sm text-white/90">
                        <p>
                            <i className="fa-solid fa-envelope mr-2 text-blue-400" />
                            hploop25@gmail.com
                        </p>
                        <p>
                            <i className="fa-brands fa-instagram mr-2 text-pink-400" />
                            @hyperloopinsrm
                        </p>
                        <p>
                            <i className="fa-solid fa-phone mr-2 text-green-400" />
                            +91 72084 83644
                        </p>
                    </div>
                </div>

                {/* Links */}
                <div className="grid grid-cols-2 gap-16">
                    <div>
                        <h4 className="text-xs uppercase text-white/70 tracking-widest mb-4">Sitemap</h4>
                        <ul className="space-y-2 text-sm text-white">
                            <li>
                                <Link href="/#home" className="hover:text-blue-400 transition hover-trigger">
                                    Home
                                </Link>
                            </li>
                            <li>
                                <Link href="/#technology" className="hover:text-blue-400 transition hover-trigger">
                                    Technology
                                </Link>
                            </li>
                            <li>
                                <Link href="/#team" className="hover:text-blue-400 transition hover-trigger">
                                    Team
                                </Link>
                            </li>
                        </ul>
                    </div>
                    <div>
                        <h4 className="text-xs uppercase text-white/70 tracking-widest mb-4">Socials</h4>
                        <ul className="space-y-2 text-sm text-white">
                            <li>
                                <a
                                    href="https://linkedin.com"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="hover:text-blue-400 transition hover-trigger"
                                >
                                    LinkedIn
                                </a>
                            </li>
                            <li>
                                <a
                                    href="https://instagram.com/hyperloopinsrm"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="hover:text-blue-400 transition hover-trigger"
                                >
                                    Instagram
                                </a>
                            </li>
                            <li>
                                <a
                                    href="mailto:hploop25@gmail.com"
                                    className="hover:text-blue-400 transition hover-trigger"
                                >
                                    Email
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>

            {/* Copyright */}
            <div className="text-center mt-20 text-white/60 text-xs uppercase">
                © 2025 Team Hyperloopin. All rights reserved.
            </div>
        </footer>
    );
}
