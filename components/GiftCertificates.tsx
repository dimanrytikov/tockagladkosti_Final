import React, { useState, useRef, useEffect } from 'react';
import { ModalData } from '../types';

interface GiftCertificatesProps {
    onOpenModal: (data: ModalData) => void;
}

const GiftCertificates: React.FC<GiftCertificatesProps> = ({ onOpenModal }) => {
    const [amount, setAmount] = useState<number | string>(5000);
    const [customAmount, setCustomAmount] = useState('');

    const sectionRef = useRef<HTMLElement>(null);
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsVisible(true);
                    observer.unobserve(entry.target);
                }
            },
            { threshold: 0.1 }
        );

        const currentRef = sectionRef.current;
        if (currentRef) {
            observer.observe(currentRef);
        }

        return () => {
            if (currentRef) {
                observer.unobserve(currentRef);
            }
        };
    }, []);

    const handleAmountSelect = (value: number) => {
        setAmount(value);
        setCustomAmount('');
    };

    const handleCustomAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value.replace(/\D/g, '');
        setCustomAmount(value);
        setAmount(value);
    };

    const handleBookCertificate = () => {
        const finalAmount = Number(amount);
        if (finalAmount > 0) {
            onOpenModal({
                name: `Подарочный сертификат`,
                price: finalAmount,
                isComplex: false,
            });
        }
    };
    
    const presetAmounts = [3000, 5000, 10000];

    return (
        <section id="gift-certificates" ref={sectionRef} className="py-16 sm:py-24 bg-primary overflow-hidden">
            <div className="container mx-auto px-4">
                <div className={`transition-all duration-700 ease-out ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
                    <h2 className="font-heading text-4xl sm:text-5xl font-normal text-center mb-4">Подарочные Сертификаты</h2>
                    <p className="text-lg text-center text-text-muted font-sans mb-12 max-w-3xl mx-auto">
                        Лучший подарок — это забота. Подарите своим близким сертификат на любую услугу или косметику в "Точке Гладкости".
                    </p>
                </div>
                
                {/* Changed to a two-column layout for a more dynamic feel */}
                <div className={`grid lg:grid-cols-2 gap-12 items-center max-w-5xl mx-auto transition-all duration-700 ease-out ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`} style={{ transitionDelay: '200ms' }}>
                    
                    {/* Column 1: Interactive 3D Certificate */}
                    <div className="group [perspective:1200px]">
                        <div
                            className="w-full aspect-[1.6/1] rounded-2xl p-6 shadow-2xl transition-transform duration-500 [transform-style:preserve-3d] group-hover:[transform:rotateY(15deg)_rotateX(-10deg)] border border-accent/30 flex flex-col justify-between relative overflow-hidden"
                            // New background for a more luxurious feel
                            style={{ 
                                background: 'linear-gradient(145deg, #222 0%, #111 100%)',
                            }}
                        >
                            {/* Gold vein effect */}
                            <div className="absolute top-0 left-0 w-full h-full opacity-20" style={{background: 'url(https://www.transparenttextures.com/patterns/cracks.png)', mixBlendMode: 'overlay', filter: 'invert(1) brightness(1.5) contrast(1.5)'}}></div>
                            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,_var(--tw-gradient-stops))] from-accent/20 via-transparent to-transparent opacity-50"></div>
                            
                            {/* Embossed Logo */}
                            <div className="absolute -bottom-10 -right-10 w-48 h-48 font-heading text-9xl text-accent/10 opacity-50 select-none [transform:rotate(-20deg)]" style={{textShadow: '1px 1px 2px rgba(0,0,0,0.5)'}}>ТГ</div>
                            
                            <div className="relative z-10">
                                <h4 className="font-heading text-accent text-2xl" style={{textShadow: '0 0 10px rgba(192, 152, 46, 0.5)'}}>Подарочный Сертификат</h4>
                                <p className="text-text-muted text-sm">от студии "Точка Гладкости"</p>
                            </div>
                            <div className="relative z-10 text-right">
                                <p className="text-text-muted text-sm">Номинал</p>
                                <p className="font-sans font-bold text-5xl text-text-main tracking-wider transition-all duration-300">
                                    {Number(amount) > 0 ? `${Number(amount).toLocaleString('ru-RU')} ₽` : '---- ₽'}
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Column 2: Form Controls */}
                    <div className="text-center lg:text-left">
                        <h3 className="font-heading text-2xl sm:text-3xl font-normal text-text-main mb-6">Выберите или введите номинал:</h3>
                        <div className="grid grid-cols-3 gap-3 mb-4">
                            {presetAmounts.map(preset => (
                                <button
                                    key={preset}
                                    onClick={() => handleAmountSelect(preset)}
                                    className={`p-3 rounded-lg text-lg font-bold transition-all duration-200 border-2 transform hover:-translate-y-1 ${amount === preset && customAmount === '' ? 'bg-accent text-text-on-accent border-accent shadow-lg' : 'bg-surface border-transparent text-text-main hover:border-accent'}`}
                                >
                                    {preset.toLocaleString('ru-RU')}
                                </button>
                            ))}
                        </div>
                        
                        <div className="relative">
                            <input
                                id="custom-amount"
                                type="text"
                                inputMode="numeric"
                                placeholder="Своя сумма"
                                value={customAmount}
                                onChange={handleCustomAmountChange}
                                className="w-full p-3 pl-10 pr-4 border-2 border-surface rounded-lg shadow-sm focus:outline-none focus:ring-2 bg-primary placeholder:text-text-muted focus:border-accent focus:ring-accent text-lg font-bold text-center"
                            />
                            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-text-muted text-lg font-bold">
                                ₽
                            </span>
                        </div>


                        <p className="text-xs text-text-muted my-6 lg:text-left">
                            Сертификат действует на все услуги и товары. Все акции и скидки также применяются.
                        </p>

                        <button
                            onClick={handleBookCertificate}
                            disabled={!amount || Number(amount) <= 0}
                            className="w-full cta-button px-8 py-4 text-lg disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                        >
                             <span className="fas fa-gift" aria-hidden="true"></span>
                            Оформить Сертификат
                        </button>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default GiftCertificates;