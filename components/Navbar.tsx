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
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

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
        <nav className={`fixed top-0 w-full z-50 px-8 py-3 flex justify-between items-center transition-all duration-300 border-b border-amber-500/60 shadow-[0_0_35px_rgba(245,158,11,0.9)] ${isScrolled ? 'bg-black backdrop-blur-md py-2' : 'py-5'
            }`}>
            {/* Logo */}
            <Link
                href="/"
                className="hover-trigger"
            >
                <div>
                    <img
                        src="/images/logo.png"
                        alt="Hyperloopin"
                        className="h-12 w-auto object-contain"
                    />
                </div>
            </Link>

            {/* Desktop Navigation Links */}
            <div className="hidden lg:flex gap-8 text-sm font-medium uppercase tracking-widest text-gray-300">
                <button onClick={() => scrollToSection('#about')} className="hover:text-white transition hover-trigger">About</button>
                <button onClick={() => scrollToSection('#team')} className="hover:text-white transition hover-trigger">Team</button>
                <button onClick={() => scrollToSection('#gallery')} className="hover:text-white transition hover-trigger">Gallery</button>
                <button onClick={() => scrollToSection('#mentors')} className="hover:text-white transition hover-trigger">Mentors</button>
                <button onClick={() => scrollToSection('#sponsors')} className="hover:text-white transition hover-trigger">Sponsors</button>
                <button onClick={() => scrollToSection('#contact')} className="hover:text-white transition hover-trigger">Contact</button>
            </div>

            {/* Desktop CTA Button */}
            <a
                href="https://forms.gle/recruitment_form"
                target="_blank"
                rel="noopener noreferrer"
                className="hidden lg:block border border-white/20 px-8 py-3 rounded-full text-xs font-bold uppercase tracking-widest text-white hover:bg-white hover:text-black transition duration-300 hover-trigger"
            >
                Join Us
            </a>

            {/* Mobile Menu Toggle */}
            <button
                className="lg:hidden text-white hover-trigger z-50 mix-blend-difference"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                aria-label="Toggle Menu"
            >
                <i className={`fa-solid ${isMobileMenuOpen ? 'fa-xmark' : 'fa-bars'} text-2xl`} />
            </button>

            {/* Mobile Menu Overlay */}
            <div className={`fixed inset-0 bg-black z-40 flex flex-col justify-center items-center transition-all duration-500 ${isMobileMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}>
                <div className="flex flex-col gap-8 text-2xl font-bold uppercase tracking-widest text-gray-300 text-center">
                    <button onClick={() => { scrollToSection('#about'); setIsMobileMenuOpen(false); }} className="hover:text-amber-500 transition">About</button>
                    <button onClick={() => { scrollToSection('#team'); setIsMobileMenuOpen(false); }} className="hover:text-amber-500 transition">Team</button>
                    <button onClick={() => { scrollToSection('#gallery'); setIsMobileMenuOpen(false); }} className="hover:text-amber-500 transition">Gallery</button>
                    <button onClick={() => { scrollToSection('#mentors'); setIsMobileMenuOpen(false); }} className="hover:text-amber-500 transition">Mentors</button>
                    <button onClick={() => { scrollToSection('#sponsors'); setIsMobileMenuOpen(false); }} className="hover:text-amber-500 transition">Sponsors</button>
                    <button onClick={() => { scrollToSection('#contact'); setIsMobileMenuOpen(false); }} className="hover:text-amber-500 transition">Contact</button>

                    <div className="w-12 h-[1px] bg-white/20 mx-auto my-4" />

                    <a
                        href="https://forms.gle/recruitment_form"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-amber-500"
                        onClick={() => setIsMobileMenuOpen(false)}
                    >
                        Join Us
                    </a>
                </div>
            </div>
        </nav>
    );
}
