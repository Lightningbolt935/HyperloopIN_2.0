import { Html, Head, Main, NextScript } from 'next/document';

/**
 * Custom Document
 * 
 * Sets up HTML structure with:
 * - Language attribute
 * - External fonts (Satoshi, Clash Display)
 * - Font Awesome icons
 * - GSAP animation library
 */
export default function Document() {
    return (
        <Html lang="en" className="scroll-smooth">
            <Head>
                {/* Preconnect to external domains for performance */}
                <link rel="preconnect" href="https://fonts.googleapis.com" />
                <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
                <link rel="preconnect" href="https://api.fontshare.com" />

                {/* Fontshare Fonts (Satoshi + Clash Display) */}
                <link
                    href="https://api.fontshare.com/v2/css?f[]=satoshi@900,700,500,400&f[]=clash-display@400,600,700&display=swap"
                    rel="stylesheet"
                />

                {/* Font Awesome Icons */}
                <link
                    rel="stylesheet"
                    href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css"
                />

                {/* GSAP Animation Library */}
                <script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/gsap.min.js" defer />
                <script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/ScrollTrigger.min.js" defer />

                {/* Favicon */}
                {/* Favicon */}
                <link rel="icon" href="/images/hyp.jpg" />
                <link rel="apple-touch-icon" href="/images/hyp.jpg" />
                <link rel="manifest" href="/manifest.json" />

                {/* PWA theme color - Dark theme */}
                <meta name="theme-color" content="#030303" />
            </Head>
            <body className="antialiased">
                <Main />
                <NextScript />
            </body>
        </Html>
    );
}
