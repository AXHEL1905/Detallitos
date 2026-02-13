import React, { useState, useRef } from 'react';
import { Gift, Heart } from 'lucide-react';

export default function CajaRegalo() {
    const [isOpen, setIsOpen] = useState(false);
    const [ribbonPosition, setRibbonPosition] = useState(0);
    const [isDragging, setIsDragging] = useState(false);
    const [showCard, setShowCard] = useState(false);
    const [ribbonOpacity, setRibbonOpacity] = useState(1);
    const ribbonRef = useRef(null);
    const startPosRef = useRef(0);

    const handleStart = (clientY) => {
        setIsDragging(true);
        startPosRef.current = clientY - ribbonPosition;
    };

    const handleMove = (clientY) => {
        if (!isDragging) return;

        const newPos = clientY - startPosRef.current;
        const clampedPos = Math.max(0, Math.min(150, newPos));
        setRibbonPosition(clampedPos);

        // Fade out ribbon as it's pulled
        const opacity = Math.max(0, 1 - (clampedPos / 120));
        setRibbonOpacity(opacity);

        if (clampedPos > 100 && !isOpen) {
            setIsOpen(true);
            setTimeout(() => setShowCard(true), 600);
        }
    };

    const handleEnd = () => {
        setIsDragging(false);
        if (ribbonPosition < 100 && !isOpen) {
            setRibbonPosition(0);
            setRibbonOpacity(1);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-amber-50 via-yellow-50 to-orange-50 p-8 overflow-hidden relative">
            {/* Decorative elements */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-20 left-20 w-32 h-32 bg-amber-200/20 rounded-full blur-3xl animate-pulse"></div>
                <div className="absolute bottom-20 right-20 w-40 h-40 bg-yellow-200/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
                <div className="absolute top-1/2 left-1/4 w-24 h-24 bg-orange-200/20 rounded-full blur-2xl animate-pulse" style={{ animationDelay: '0.5s' }}></div>
            </div>

            <div className="relative z-10 text-center">
                <h1 className="text-5xl font-bold mb-4 bg-gradient-to-r from-amber-700 via-orange-600 to-amber-800 bg-clip-text text-transparent"
                    style={{ fontFamily: "'Playfair Display', serif" }}>
                    {!isOpen ? '¡Desliza el listón!' : '¡Sorpresa!'}
                </h1>
                <p className="text-amber-800 mb-12 text-lg" style={{ fontFamily: "'Crimson Pro', serif" }}>
                    {!isOpen ? 'Arrastra el listón hacia abajo para abrir tu regalo' : 'Hay un mensaje especial para ti'}
                </p>

                {/* Gift box container */}
                <div className="relative inline-block">
                    {/* Ribbon that wraps around - vertical */}
                    <div
                        ref={ribbonRef}
                        className={`absolute left-1/2 -translate-x-1/2 w-10 cursor-grab active:cursor-grabbing z-20 ${isDragging ? 'scale-110' : ''
                            } transition-all duration-300`}
                        style={{
                            top: `${-25 + ribbonPosition}px`,
                            opacity: ribbonOpacity,
                            pointerEvents: isOpen ? 'none' : 'auto'
                        }}
                        onMouseDown={(e) => handleStart(e.clientY)}
                        onMouseMove={(e) => handleMove(e.clientY)}
                        onMouseUp={handleEnd}
                        onMouseLeave={handleEnd}
                        onTouchStart={(e) => handleStart(e.touches[0].clientY)}
                        onTouchMove={(e) => handleMove(e.touches[0].clientY)}
                        onTouchEnd={handleEnd}
                    >
                        {/* Vertical ribbon part */}
                        <div className="absolute left-1/2 -translate-x-1/2 w-10 h-60 bg-gradient-to-b from-red-600 via-red-500 to-red-600 shadow-xl"
                            style={{
                                boxShadow: '0 4px 20px rgba(220, 38, 38, 0.4), inset 2px 0 4px rgba(255,255,255,0.3), inset -2px 0 4px rgba(0,0,0,0.2)'
                            }}>
                        </div>

                        {/* Bow on top */}
                        <div className="absolute -top-5 left-1/2 -translate-x-1/2">
                            <div className="relative">
                                <div className="w-14 h-9 bg-gradient-to-br from-red-500 to-red-600 rounded-full shadow-lg transform -rotate-45"></div>
                                <div className="absolute top-0 left-0 w-14 h-9 bg-gradient-to-br from-red-500 to-red-600 rounded-full shadow-lg transform rotate-45"></div>
                                <div className="absolute top-2 left-1/2 -translate-x-1/2 w-7 h-7 bg-gradient-to-br from-red-600 to-red-700 rounded-full shadow-md"></div>
                            </div>
                        </div>
                    </div>

                    {/* Horizontal ribbon that wraps around the box */}
                    <div
                        className="absolute top-1/2 left-0 right-0 h-10 bg-gradient-to-r from-red-600 via-red-500 to-red-600 shadow-lg z-10 transition-all duration-700"
                        style={{
                            opacity: ribbonOpacity,
                            boxShadow: '0 4px 15px rgba(220, 38, 38, 0.3), inset 0 2px 4px rgba(255,255,255,0.3), inset 0 -2px 4px rgba(0,0,0,0.2)'
                        }}
                    ></div>

                    {/* Gift box */}
                    <div className="relative">
                        {/* Box lid */}
                        <div
                            className={`relative bg-gradient-to-br from-amber-100 via-yellow-100 to-amber-200 w-48 h-16 rounded-t-2xl shadow-2xl transition-all duration-700 ${isOpen ? 'translate-y-[-200px] rotate-[-15deg] opacity-0' : ''
                                }`}
                            style={{
                                boxShadow: '0 10px 40px rgba(180, 83, 9, 0.2), inset 0 -2px 10px rgba(0,0,0,0.1)'
                            }}
                        >
                            {/* Lid texture */}
                            <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent rounded-t-2xl"></div>
                        </div>

                        {/* Box body */}
                        <div
                            className={`bg-gradient-to-br from-amber-50 via-yellow-50 to-amber-100 w-48 h-40 rounded-b-2xl shadow-2xl transition-all duration-500 ${isOpen ? 'scale-95 opacity-80' : ''
                                }`}
                            style={{
                                boxShadow: '0 20px 60px rgba(180, 83, 9, 0.25), inset 0 2px 10px rgba(255,255,255,0.4)'
                            }}
                        >
                            {/* Box texture */}
                            <div className="absolute inset-0 bg-gradient-to-br from-white/30 to-transparent rounded-b-2xl"></div>

                            {/* Decorative pattern */}
                            <div className="absolute inset-0 opacity-10">
                                {[...Array(4)].map((_, i) => (
                                    <div key={i} className="absolute" style={{
                                        top: `${20 + i * 30}px`,
                                        left: '50%',
                                        transform: 'translateX(-50%)',
                                        width: '120px',
                                        height: '1px',
                                        background: '#92400e'
                                    }}></div>
                                ))}
                            </div>
                        </div>

                        {/* Card that emerges */}
                        <div
                            className={`absolute left-1/2 -translate-x-1/2 transition-all duration-1000 ${showCard ? 'bottom-12 opacity-100 scale-100' : 'bottom-0 opacity-0 scale-75'
                                }`}
                            style={{
                                transformOrigin: 'bottom center'
                            }}
                        >
                            <div className="bg-gradient-to-br from-white to-amber-50 w-96 rounded-2xl shadow-2xl p-10 relative border border-amber-200/50"
                                style={{
                                    boxShadow: '0 25px 70px rgba(0,0,0,0.2), 0 0 0 1px rgba(180, 83, 9, 0.1)'
                                }}>
                                <div className="absolute -top-6 left-1/2 -translate-x-1/2 bg-gradient-to-br from-red-500 to-red-600 w-16 h-16 rounded-full flex items-center justify-center shadow-xl">
                                    <Heart className="w-8 h-8 text-white fill-white" />
                                </div>

                                <div className="mt-6 space-y-5">
                                    <h2 className="text-4xl font-bold text-amber-800 text-center"
                                        style={{ fontFamily: "'Playfair Display', serif" }}>
                                        ¡Para ti!
                                    </h2>

                                    <p className="text-amber-900 leading-relaxed text-center text-lg"
                                        style={{ fontFamily: "'Crimson Pro', serif" }}>
                                        Este es un momento especial. Que este regalo traiga alegría a tu día y una sonrisa a tu corazón.
                                    </p>

                                    <p className="text-amber-700 text-base text-center italic"
                                        style={{ fontFamily: "'Crimson Pro', serif" }}>
                                        Con mucho cariño ❤️
                                    </p>
                                </div>

                                {/* Decorative corners */}
                                <div className="absolute top-3 left-3 w-8 h-8 border-t-2 border-l-2 border-amber-300 rounded-tl-lg"></div>
                                <div className="absolute top-3 right-3 w-8 h-8 border-t-2 border-r-2 border-amber-300 rounded-tr-lg"></div>
                                <div className="absolute bottom-3 left-3 w-8 h-8 border-b-2 border-l-2 border-amber-300 rounded-bl-lg"></div>
                                <div className="absolute bottom-3 right-3 w-8 h-8 border-b-2 border-r-2 border-amber-300 rounded-br-lg"></div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Instructions */}
                {!isOpen && (
                    <div className="mt-12 flex items-center justify-center gap-2 text-amber-700 animate-bounce">
                        <Gift className="w-5 h-5" />
                        <span style={{ fontFamily: "'Crimson Pro', serif" }}>Toca y arrastra el listón ↓</span>
                    </div>
                )}
            </div>

            <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700&family=Crimson+Pro:wght@400;600&display=swap');
        
        * {
          -webkit-tap-highlight-color: transparent;
        }
      `}</style>
        </div>
    );
}