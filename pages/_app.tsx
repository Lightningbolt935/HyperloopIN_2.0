import type { AppProps } from 'next/app';
import { Inter, Outfit, JetBrains_Mono } from 'next/font/google';
import { DefaultSeo } from 'next-seo';
import dynamic from 'next/dynamic';
import '@/styles/globals.css';



// Font configurations
const inter = Inter({
    subsets: ['latin'],
    variable: '--font-inter',
    display: 'swap',
});

const outfit = Outfit({
    subsets: ['latin'],
    variable: '--font-outfit',
    display: 'swap',
});

const jetbrainsMono = JetBrains_Mono({
    subsets: ['latin'],
    variable: '--font-jetbrains',
    display: 'swap',
});

// Default SEO configuration
const defaultSEO = {
    titleTemplate: '%s | Hyperloopin',
    defaultTitle: 'Hyperloopin - University Hyperloop Engineering Club',
    description: 'Join Hyperloopin, a leading university engineering club pioneering hyperloop technology. Building the future of sustainable high-speed transportation.',
    canonical: 'https://hyperloopin.edu',
    openGraph: {
        type: 'website',
        locale: 'en_US',
        url: 'https://hyperloopin.edu',
        siteName: 'Hyperloopin',
        title: 'Hyperloopin - University Hyperloop Engineering Club',
        description: 'A student-led engineering team dedicated to designing and building the next generation of hyperloop transportation systems.',
        images: [
            {
                url: 'https://hyperloopin.edu/images/og-image.jpg',
                width: 1200,
                height: 630,
                alt: 'Hyperloopin - Engineering the Future of Transportation',
            },
        ],
    },
    twitter: {
        handle: '@hyperloopin',
        site: '@hyperloopin',
        cardType: 'summary_large_image',
    },
    additionalMetaTags: [
        {
            name: 'viewport',
            content: 'width=device-width, initial-scale=1',
        },
        {
            name: 'theme-color',
            content: '#133457',
        },
        {
            name: 'keywords',
            content: 'hyperloop, engineering, university club, transportation, innovation, magnetic levitation, SpaceX',
        },
    ],
    additionalLinkTags: [
        {
            rel: 'icon',
            href: '/favicon.png',
        },
        {
            rel: 'apple-touch-icon',
            href: '/apple-touch-icon.png',
            sizes: '180x180',
        },
    ],
};

/**
 * Main App Component
 * 
 * Wraps all pages with:
 * - Font configurations
 * - Default SEO settings
 * - Global animated background
 * - Global styles
 */
// Dynamic import for SmoothScroll to avoid SSR issues
const SmoothScroll = dynamic(() => import('@/components/SmoothScroll'), {
    ssr: false,
});

export default function App({ Component, pageProps }: AppProps) {
    return (
        <>
            <DefaultSeo {...defaultSEO} />
            <div className={`${inter.variable} ${outfit.variable} ${jetbrainsMono.variable} font-sans`}>
                <SmoothScroll />
                {/* Global animated background */}

                {/* Page content */}
                <div className="relative z-10">
                    <Component {...pageProps} />
                </div>
            </div>
        </>
    );
}

