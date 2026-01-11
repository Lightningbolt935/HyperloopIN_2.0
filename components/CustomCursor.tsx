'use client';

import { useEffect, useRef } from 'react';

/**
 * CustomCursor Component
 * 
 * Dual cursor effect with:
 * - Small dot that follows instantly
 * - Larger outline that follows with lag
 * - Expands on hover over interactive elements
 */
export default function CustomCursor() {
    const cursorRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const cursor = cursorRef.current;
        if (!cursor) return;

        const handleMouseMove = (e: MouseEvent) => {
            const posX = e.clientX;
            const posY = e.clientY;

            // Direct follow
            cursor.style.transform = `translate(${posX}px, ${posY}px)`;
        };

        window.addEventListener('mousemove', handleMouseMove);

        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
        };
    }, []);

    return (
        <div
            ref={cursorRef}
            className="fixed top-0 left-0 pointer-events-none z-[9999] mix-blend-difference"
            style={{
                transform: 'translate(-50%, -50%)',
                marginTop: '-12px', // Center the tip
                marginLeft: '-12px'
            }}
        >
            <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="rotate-[-45deg]" // Orient to point like a standard cursor
            >
                {/* Wide Triangle Shape */}
                <path
                    d="M23 1L1 11L11 13L13 23L23 1Z"
                    fill="white"
                    stroke="white"
                    strokeWidth="2"
                    strokeLinejoin="round"
                />
            </svg>
        </div>
    );
}
