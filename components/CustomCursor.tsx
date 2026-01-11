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
    const dotRef = useRef<HTMLDivElement>(null);
    const outlineRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const dot = dotRef.current;
        const outline = outlineRef.current;

        if (!dot || !outline) return;

        const handleMouseMove = (e: MouseEvent) => {
            const posX = e.clientX;
            const posY = e.clientY;

            // Dot follows instantly
            dot.style.left = `${posX}px`;
            dot.style.top = `${posY}px`;

            // Outline follows with lag using Web Animation API
            outline.animate({
                left: `${posX}px`,
                top: `${posY}px`
            }, { duration: 500, fill: 'forwards' });
        };

        const handleMouseEnter = () => {
            outline.classList.add('hovering');
            dot.style.display = 'none';
        };

        const handleMouseLeave = () => {
            outline.classList.remove('hovering');
            dot.style.display = 'block';
        };

        // Add mouse move listener
        window.addEventListener('mousemove', handleMouseMove);

        // Add hover listeners to interactive elements
        const triggers = document.querySelectorAll('a, button, .hover-trigger, [role="button"]');
        triggers.forEach(trigger => {
            trigger.addEventListener('mouseenter', handleMouseEnter);
            trigger.addEventListener('mouseleave', handleMouseLeave);
        });

        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
            triggers.forEach(trigger => {
                trigger.removeEventListener('mouseenter', handleMouseEnter);
                trigger.removeEventListener('mouseleave', handleMouseLeave);
            });
        };
    }, []);

    return (
        <>
            <div ref={dotRef} className="cursor-dot" />
            <div ref={outlineRef} className="cursor-outline" />
        </>
    );
}
