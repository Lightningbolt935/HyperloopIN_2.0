'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

/**
 * Navbar Component - DesignX2 Style
 * 
 * Minimal floating navigation with:
 * - Mix-blend-mode: difference effect
 * - Logo uppercase
 * - Clean navigation links
 * - CTA button
 */
export default function Navbar() {
    const [isScrolled, setIsScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const scrollToSection = (id: string) => {
        const element = document.querySelector(id);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
        }
    };

    return (
        <nav className={`fixed top-0 w-full z-50 px-8 py-4 flex justify-between items-center transition-all duration-300 border-b border-blue-500/50 shadow-[0_0_25px_rgba(59,130,246,0.8)] ${isScrolled ? 'bg-black/80 backdrop-blur-md py-2' : 'py-4'
            }`}>
            {/* Logo */}
            <Link
                href="/"
                className="hover-trigger"
            >
                <div className="bg-white rounded-lg px-4 py-1">
                    <img
                        src="/images/logo.png"
                        alt="Hyperloopin"
                        className="h-24 w-auto object-contain"
                    />
                </div>
            </Link>

            {/* Navigation Links */}
            <div className="hidden lg:flex gap-8 text-sm font-medium uppercase tracking-widest text-gray-300">
                <button onClick={() => scrollToSection('#about')} className="hover:text-white transition hover-trigger">About</button>
                <button onClick={() => scrollToSection('#team')} className="hover:text-white transition hover-trigger">Team</button>
                <button onClick={() => scrollToSection('#gallery')} className="hover:text-white transition hover-trigger">Gallery</button>
                <button onClick={() => scrollToSection('#mentors')} className="hover:text-white transition hover-trigger">Mentors</button>
                <button onClick={() => scrollToSection('#sponsors')} className="hover:text-white transition hover-trigger">Sponsors</button>
                <button onClick={() => scrollToSection('#contact')} className="hover:text-white transition hover-trigger">Contact</button>
            </div>

            {/* CTA Button */}
            <a
                href="https://forms.gle/recruitment_form" // Placeholder link
                target="_blank"
                rel="noopener noreferrer"
                className="border border-white/20 px-8 py-3 rounded-full text-xs font-bold uppercase tracking-widest text-white hover:bg-white hover:text-black transition duration-300 hover-trigger"
            >
                Join Us
            </a>
        </nav>
    );
}
