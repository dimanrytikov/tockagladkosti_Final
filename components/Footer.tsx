import React, { useState, useRef, useEffect } from 'react';
import { CONTACT_PHONE, CONTACT_PHONE_DISPLAY, SOCIAL_LINKS } from '../constants';

export const Footer: React.FC = () => {
    const [isCopied, setIsCopied] = useState(false);

    const handleCopyPhone = () => {
        // Используем чистую версию номера для буфера обмена
        navigator.clipboard.writeText(CONTACT_PHONE).then(() => {
            setIsCopied(true);
            setTimeout(() => {
                setIsCopied(false);
            }, 2000); // Подсказка исчезает через 2 секунды
        }).catch(err => {
            console.error('Не удалось скопировать номер: ', err);
        });
    };

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

    return (
        <footer id="contacts" ref={sectionRef} className="pt-16 sm:pt-24 bg-secondary">
            <div className="container mx-auto px-4">
                <div className={`transition-all duration-700 ease-out ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
                    <h2 className="font-heading text-4xl sm:text-5xl font-normal text-center mb-12">Жду Вас в "Точке Гладкости"</h2>
                    <div className="max-w-6xl mx-auto pb-12">
                        <div className="grid lg:grid-cols-2 gap-12 items-start font-sans">
                            {/* Column 1: Contact Details */}
                            <div className="space-y-6 text-lg">
                                <div className="flex items-start">
                                    <span className="fas fa-map-marker-alt text-accent text-2xl w-8 mt-1" aria-hidden="true"></span>
                                    <div>
                                        <strong className="text-text-main">Адрес:</strong>
                                        <a href={SOCIAL_LINKS.gis} target="_blank" rel="noopener noreferrer" className="text-text-muted hover:text-accent transition-colors duration-200 block" aria-label="Открыть адрес в 2ГИС">
                                            д. Грановщина, ул. Георгия Буркова, 2
                                        </a>
                                    </div>
                                </div>
                                <div className="flex items-start">
                                    <span className="fas fa-clock text-accent text-2xl w-8 mt-1" aria-hidden="true"></span>
                                    <div>
                                        <strong className="text-text-main">Часы работы:</strong>
                                        <p className="text-text-muted">Понедельник - Суббота: 09:00 – 20:00</p>
                                        <p className="text-text-muted">Воскресенье: Выходной</p>
                                    </div>
                                </div>
                                <div className="flex items-start">
                                    <span className="fas fa-phone-alt text-accent text-2xl w-8 mt-1" aria-hidden="true"></span>
                                    <div>
                                        <strong className="text-text-main">Телефон (Екатерина):</strong>
                                        <div className="relative flex items-center gap-x-3">
                                            <a href={`tel:${CONTACT_PHONE}`} className="text-text-muted hover:text-accent transition-colors duration-200">{CONTACT_PHONE_DISPLAY}</a>
                                            <button onClick={handleCopyPhone} title="Копировать номер" className="text-text-muted hover:text-accent transition-colors duration-200 text-base">
                                                <span className="far fa-copy" aria-hidden="true"></span>
                                            </button>
                                            {isCopied && (
                                                <div className="absolute -top-9 left-1/2 -translate-x-1/2 whitespace-nowrap px-3 py-1 bg-text-main text-primary text-xs rounded-md shadow-lg">
                                                    Скопировано!
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Column 2: Embedded Map */}
                            <div className="w-full h-[350px] bg-surface rounded-2xl overflow-hidden shadow-lg">
                                <iframe
                                    src="https://yandex.ru/map-widget/v1/-/CLGy5W9H"
                                    width="100%"
                                    height="100%"
                                    frameBorder="0"
                                    allowFullScreen={true}
                                    title="Карта проезда до Точки Гладкости"
                                    loading="lazy"
                                    style={{ filter: 'invert(90%) hue-rotate(180deg)' }}
                                ></iframe>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="py-8 bg-primary border-t border-gray-800">
                 <div className="container mx-auto px-4 flex flex-col sm:flex-row justify-between items-center text-center">
                     <p className="text-text-muted text-sm mb-4 sm:mb-0">&copy; {new Date().getFullYear()} Точка Гладкости. Все права защищены.</p>
                     <div className="flex justify-center space-x-5 text-xl text-text-muted">
                        <a href={SOCIAL_LINKS.whatsapp} target="_blank" rel="noopener noreferrer" className="hover:text-accent transition-colors duration-200" aria-label="Написать в WhatsApp"><span className="fab fa-whatsapp" aria-hidden="true"></span></a>
                        <a href={SOCIAL_LINKS.telegram} target="_blank" rel="noopener noreferrer" className="hover:text-accent transition-colors duration-200" aria-label="Перейти в Telegram"><span className="fab fa-telegram-plane" aria-hidden="true"></span></a>
                        <a href={SOCIAL_LINKS.instagram} target="_blank" rel="noopener noreferrer" className="hover:text-accent transition-colors duration-200" aria-label="Перейти в Instagram"><span className="fab fa-instagram" aria-hidden="true"></span></a>
                        <a href={SOCIAL_LINKS.gis} target="_blank" rel="noopener noreferrer" className="hover:text-accent transition-colors duration-200" aria-label="Перейти в 2ГИС"><span className="fas fa-map-marked-alt" aria-hidden="true"></span></a>
                    </div>
                 </div>
            </div>
        </footer>
    );
};