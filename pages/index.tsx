import { NextSeo } from 'next-seo';
import dynamic from 'next/dynamic';

// Static Components
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import SponsorTicker from '@/components/SponsorTicker';
import About from '@/components/About';
import Domains from '@/components/Domains';
import WhatIsHyperloop from '@/components/WhatIsHyperloop';
import Team from '@/components/Team';
import Gallery from '@/components/Gallery';
import Mentors from '@/components/Mentors';
import Sponsors from '@/components/Sponsors';
import Contact from '@/components/Contact';
import Footer from '@/components/Footer';

// Dynamic Components (client-side only)
const Preloader = dynamic(() => import('@/components/Preloader'), {
    ssr: false,
    loading: () => <div className="fixed inset-0 z-[10000] bg-black" />
});


/**
 * Homepage - DesignX2 Style + Brochure Content
 * 
 * Complete redesign with:
 * - Dark futuristic aesthetic
 * - Replicates reference site structure
 * - GSAP animations
 */
export default function Home() {
    return (
        <>
            <NextSeo
                title="HYPERLOOPIN | Where Innovation Meets Velocity"
                description="A student-led technical club at SRM working to design, build, and innovate Hyperloop pods for global competitions like the European Hyperloop Week."
            />

            {/* Preloader */}
            <Preloader />



            <main className="relative bg-[#030303]">
                {/* Navigation */}
                <Navbar />

                {/* Hero Section */}
                <Hero />

                {/* Sponsor Ticker */}
                <SponsorTicker />

                {/* What Is Hyperloop Section */}
                <WhatIsHyperloop />

                {/* About Section */}
                <About />

                {/* Domains Section */}
                <Domains />

                {/* Team Section */}
                <Team />

                {/* Gallery Section */}
                <Gallery />

                {/* Mentors Section */}
                <Mentors />

                {/* Sponsors Section */}
                <Sponsors />

                {/* Contact Section - Lets Connect */}
                <Contact />

                {/* Footer */}
                <Footer />
            </main>
        </>
    );
}
