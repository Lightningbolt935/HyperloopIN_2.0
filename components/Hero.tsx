'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import dynamic from 'next/dynamic';
import { siteConfig } from '@/lib/constants';
import HyperloopBackground from './HyperloopBackground';

/**
 * Dynamic import for 3D Canvas
 * This ensures the heavy 3D libraries are code-split
 * and only loaded when needed on the client side
 */
const PodCanvas = dynamic(() => import('./PodCanvas'), {
    ssr: false,
    loading: () => (
        <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-16 h-16 border-4 border-primary-500/30 border-t-primary-500 rounded-full animate-spin" />
        </div>
    ),
});

export default function Hero() {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true });

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.15,
                delayChildren: 0.2,
            },
        },
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 30 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.6, ease: [0.25, 0.1, 0.25, 1] },
        },
    };

    return (
        <section
            id="home"
            ref={ref}
            className="relative min-h-screen flex items-center justify-center overflow-hidden"
            aria-label="Hero section"
        >
            {/* Animated Hyperloop Background */}
            <HyperloopBackground />

            <div className="section-container relative z-10">
                <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center min-h-[80vh] py-20">
                    {/* Content */}
                    <motion.div
                        variants={containerVariants}
                        initial="hidden"
                        animate={isInView ? 'visible' : 'hidden'}
                        className="text-center lg:text-left order-2 lg:order-1"
                    >
                        {/* Badge */}
                        <motion.div
                            variants={itemVariants}
                            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary-500/10 border border-primary-500/20 mb-6"
                        >
                            <span className="w-2 h-2 rounded-full bg-primary-500 animate-pulse" />
                            <span className="text-sm font-medium text-primary-600 dark:text-primary-400">
                                Example Achievement Tag
                            </span>
                        </motion.div>

                        {/* Headline */}
                        <motion.h1
                            variants={itemVariants}
                            className="heading-xl mb-6 text-balance"
                        >
                            Engineering the{' '}
                            <span className="gradient-text">Future</span>
                            <br />
                            of Transportation
                        </motion.h1>

                        {/* Subheadline */}
                        <motion.p
                            variants={itemVariants}
                            className="text-lg md:text-xl text-neutral-600 dark:text-neutral-400 mb-8 max-w-xl mx-auto lg:mx-0 text-balance"
                        >
                            {siteConfig.description}
                        </motion.p>

                        {/* CTAs */}
                        <motion.div
                            variants={itemVariants}
                            className="flex flex-col sm:flex-row items-center gap-4 justify-center lg:justify-start"
                        >
                            <a
                                href="#about"
                                className="btn-primary w-full sm:w-auto"
                                onClick={(e) => {
                                    e.preventDefault();
                                    document.querySelector('#about')?.scrollIntoView({ behavior: 'smooth' });
                                }}
                            >
                                <span>Discover More</span>
                                <svg
                                    className="w-5 h-5 ml-2"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M19 14l-7 7m0 0l-7-7m7 7V3"
                                    />
                                </svg>
                            </a>
                            <a
                                href="#contact"
                                className="btn-secondary w-full sm:w-auto"
                                onClick={(e) => {
                                    e.preventDefault();
                                    document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' });
                                }}
                            >
                                Join the Team
                            </a>
                        </motion.div>

                        {/* Stats */}
                        <motion.div
                            variants={itemVariants}
                            className="grid grid-cols-3 gap-6 mt-12 pt-8 border-t border-neutral-200 dark:border-neutral-800"
                        >
                            {[
                                { value: '60+', label: 'Team Members' },
                                { value: '450', label: 'km/h Top Speed' },
                                { value: '5', label: 'Years of Innovation' },
                            ].map((stat) => (
                                <div key={stat.label} className="text-center lg:text-left">
                                    <div className="text-2xl md:text-3xl font-bold text-primary-600 dark:text-primary-400">
                                        {stat.value}
                                    </div>
                                    <div className="text-sm text-neutral-500 dark:text-neutral-400">
                                        {stat.label}
                                    </div>
                                </div>
                            ))}
                        </motion.div>
                    </motion.div>

                    {/* 3D Canvas */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
                        transition={{ duration: 0.8, delay: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
                        className="relative h-[400px] md:h-[500px] lg:h-[600px] order-1 lg:order-2"
                    >
                        <PodCanvas className="w-full h-full" />
                    </motion.div>
                </div>

                {/* Scroll indicator */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1.5, duration: 0.6 }}
                    className="absolute bottom-8 left-1/2 -translate-x-1/2 hidden md:flex flex-col items-center gap-2"
                >
                    <span className="text-xs text-neutral-500 dark:text-neutral-400 uppercase tracking-widest">
                        Scroll
                    </span>
                    <motion.div
                        animate={{ y: [0, 8, 0] }}
                        transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
                        className="w-6 h-10 rounded-full border-2 border-neutral-300 dark:border-neutral-700 flex justify-center pt-2"
                    >
                        <div className="w-1 h-2 rounded-full bg-neutral-400 dark:bg-neutral-600" />
                    </motion.div>
                </motion.div>
            </div>
        </section>
    );
}
