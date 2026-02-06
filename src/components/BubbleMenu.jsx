import { useState, useRef, useEffect } from 'react';
import { gsap } from 'gsap';

import './BubbleMenu.css';

const DEFAULT_ITEMS = [
    {
        label: 'One',
        href: '#',
        ariaLabel: 'One',
        rotation: -8,
        hoverStyles: { bgColor: '#f4d03f', textColor: '#000000' }
    },
    {
        label: 'tap.',
        href: '#',
        ariaLabel: 'tap.',
        rotation: 8,
        hoverStyles: { bgColor: '#f4d03f', textColor: '#000000' }
    },
    {
        label: 'Any',
        href: '#',
        ariaLabel: 'Any',
        rotation: 8,
        hoverStyles: { bgColor: '#f4d03f', textColor: '#000000' }
    },
    {
        label: 'asset.',
        href: '#',
        ariaLabel: 'asset.',
        rotation: -8,
        hoverStyles: { bgColor: '#f4d03f', textColor: '#000000' }
    }
];

export default function BubbleMenu({
    logo,
    onMenuClick,
    className,
    style,
    menuAriaLabel = 'Toggle menu',
    menuBg = 'rgba(255, 255, 255, 0.05)',
    menuContentColor = '#f4d03f',
    useFixedPosition = false,
    items,
    animationEase = 'back.out(1.5)',
    animationDuration = 0.5,
    staggerDelay = 0.12,
    autoOpen = true
}) {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [showOverlay, setShowOverlay] = useState(false);

    const overlayRef = useRef(null);
    const bubblesRef = useRef([]);
    const labelRefs = useRef([]);

    const menuItems = items?.length ? items : DEFAULT_ITEMS;
    const containerClassName = ['bubble-menu', useFixedPosition ? 'fixed' : 'absolute', className]
        .filter(Boolean)
        .join(' ');

    const handleToggle = () => {
        const nextState = !isMenuOpen;
        if (nextState) setShowOverlay(true);
        setIsMenuOpen(nextState);
        onMenuClick?.(nextState);
    };

    useEffect(() => {
        if (autoOpen) {
            const timeout = setTimeout(() => {
                setShowOverlay(true);
                setIsMenuOpen(true);
            }, 500);
            return () => clearTimeout(timeout);
        }
    }, [autoOpen]);

    useEffect(() => {
        const overlay = overlayRef.current;
        const bubbles = bubblesRef.current.filter(Boolean);
        const labels = labelRefs.current.filter(Boolean);

        if (!overlay || !bubbles.length) return;

        if (isMenuOpen) {
            gsap.set(overlay, { display: 'flex' });
            gsap.killTweensOf([...bubbles, ...labels]);
            gsap.set(bubbles, { scale: 0, transformOrigin: '50% 50%' });
            gsap.set(labels, { y: 24, autoAlpha: 0 });

            bubbles.forEach((bubble, i) => {
                const delay = i * staggerDelay + gsap.utils.random(-0.05, 0.05);
                const tl = gsap.timeline({ delay });

                tl.to(bubble, {
                    scale: 1,
                    duration: animationDuration,
                    ease: animationEase
                });
                if (labels[i]) {
                    tl.to(
                        labels[i],
                        {
                            y: 0,
                            autoAlpha: 1,
                            duration: animationDuration,
                            ease: 'power3.out'
                        },
                        `-=${animationDuration * 0.9}`
                    );
                }
            });
        } else if (showOverlay) {
            gsap.killTweensOf([...bubbles, ...labels]);
            gsap.to(labels, {
                y: 24,
                autoAlpha: 0,
                duration: 0.2,
                ease: 'power3.in'
            });
            gsap.to(bubbles, {
                scale: 0,
                duration: 0.2,
                ease: 'power3.in',
                onComplete: () => {
                    gsap.set(overlay, { display: 'none' });
                    setShowOverlay(false);
                }
            });
        }
    }, [isMenuOpen, showOverlay, animationEase, animationDuration, staggerDelay]);

    useEffect(() => {
        const handleResize = () => {
            if (isMenuOpen) {
                const bubbles = bubblesRef.current.filter(Boolean);
                const isDesktop = window.innerWidth >= 900;

                bubbles.forEach((bubble, i) => {
                    const item = menuItems[i];
                    if (bubble && item) {
                        const rotation = isDesktop ? (item.rotation ?? 0) : 0;
                        gsap.set(bubble, { rotation });
                    }
                });
            }
        };

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, [isMenuOpen, menuItems]);

    return (
        <>
            <nav className={containerClassName} style={style} aria-label="Motto navigation">
                <div className="bubble logo-bubble" aria-label="Logo" style={{ background: menuBg, border: '1px solid rgba(255,255,255,0.1)', backdropFilter: 'blur(10px)' }}>
                    <span className="logo-content" style={{ color: '#f4d03f', fontWeight: 900, letterSpacing: '0.2em' }}>
                        MOTTO
                    </span>
                </div>

                <button
                    type="button"
                    className={`bubble toggle-bubble menu-btn ${isMenuOpen ? 'open' : ''}`}
                    onClick={handleToggle}
                    aria-label={menuAriaLabel}
                    aria-pressed={isMenuOpen}
                    style={{ background: menuBg, border: '1px solid rgba(255,255,255,0.1)', backdropFilter: 'blur(10px)' }}
                >
                    <span className="menu-line" style={{ background: menuContentColor }} />
                    <span className="menu-line short" style={{ background: menuContentColor }} />
                </button>
            </nav>
            {showOverlay && (
                <div
                    ref={overlayRef}
                    className={`bubble-menu-items ${useFixedPosition ? 'fixed' : 'absolute'}`}
                    aria-hidden={!isMenuOpen}
                >
                    <ul className="pill-list" role="menu" aria-label="Motto items">
                        {menuItems.map((item, idx) => (
                            <li key={idx} role="none" className="pill-col">
                                <div
                                    className="pill-link"
                                    style={{
                                        '--item-rot': `${item.rotation ?? 0}deg`,
                                        '--pill-bg': 'rgba(255, 255, 255, 0.03)',
                                        '--pill-color': '#ffffff',
                                        '--hover-bg': item.hoverStyles?.bgColor || '#f4d03f',
                                        '--hover-color': item.hoverStyles?.textColor || '#000000',
                                        border: '1px solid rgba(255,255,255,0.05)',
                                        backdropFilter: 'blur(10px)'
                                    }}
                                    ref={el => {
                                        if (el) bubblesRef.current[idx] = el;
                                    }}
                                >
                                    <span
                                        className="pill-label"
                                        style={{ fontFamily: 'Playfair Display, serif', fontWeight: 900 }}
                                        ref={el => {
                                            if (el) labelRefs.current[idx] = el;
                                        }}
                                    >
                                        {item.label}
                                    </span>
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </>
    );
}
