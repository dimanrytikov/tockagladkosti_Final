import React from 'react';

const Hero: React.FC = () => {

    const handleScrollLink = (event: React.MouseEvent<HTMLAnchorElement>) => {
        event.preventDefault();
        const targetId = event.currentTarget.getAttribute('href')?.substring(1);
        if (!targetId) return;

        const targetElement = document.getElementById(targetId);
        if (targetElement) {
            const headerElement = document.querySelector('header');
            const headerHeight = headerElement ? headerElement.offsetHeight : 70; // fallback height
            const elementPosition = targetElement.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.scrollY - headerHeight;

            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
        }
    };


    return (
        <section className="relative pt-32 pb-16 lg:pt-48 lg:pb-24 min-h-screen flex items-center justify-center text-center bg-primary overflow-hidden">
            <div className="absolute inset-0 z-0">
                <img src="https://images.unsplash.com/photo-1598422860884-245c34336f73?q=80&w=1200&auto=format&fit=crop" alt="Абстрактное изображение косметических средств на темном фоне." className="w-full h-full object-cover opacity-20"/>
            </div>
            <div className="relative z-10 container mx-auto px-4">
                <h1 className="font-heading font-normal text-4xl sm:text-5xl lg:text-7xl tracking-tight text-text-main leading-tight animate-fade-in-up">
                    Где гладкость
                    <br />
                    становится <span className="text-accent">искусством</span>
                </h1>
                
                <p className="text-lg sm:text-xl mt-6 max-w-2xl mx-auto text-text-muted font-sans animate-fade-in-up [animation-delay:200ms]">
                    Косметология и диодная лазерная эпиляция в Грановщине
                </p>

                <div className="mt-16 max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6 text-left">
                    {/* Offer Card 1: Laser Hair Removal */}
                    <a href="#price-calc" onClick={handleScrollLink} className="block p-6 bg-secondary rounded-xl shadow-lg transition-transform duration-300 hover:-translate-y-1 animate-fade-in-up [animation-delay:400ms]">
                        <div className="flex items-center mb-3">
                            <span className="fas fa-bolt text-accent text-2xl mr-4 w-8 text-center" aria-hidden="true"></span>
                            <h3 className="font-heading text-xl font-semibold text-text-main">Скидки на Лазер</h3>
                        </div>
                        <p className="text-text-muted text-sm leading-relaxed">
                            <strong className="text-accent">СКИДКА 40%</strong> на первый визит и до <strong className="text-accent">25%</strong> на комплексы от 2-х зон.
                        </p>
                    </a>

                    {/* Offer Card 2: Treatment Courses */}
                    <a href="#services" onClick={handleScrollLink} className="block p-6 bg-secondary rounded-xl shadow-lg transition-transform duration-300 hover:-translate-y-1 animate-fade-in-up [animation-delay:600ms]">
                        <div className="flex items-center mb-3">
                            <span className="fas fa-spa text-accent text-2xl mr-4 w-8 text-center" aria-hidden="true"></span>
                            <h3 className="font-heading text-xl font-semibold text-text-main">Выгодные Курсы</h3>
                        </div>
                        <p className="text-text-muted text-sm leading-relaxed">
                            <strong className="text-accent">СКИДКА 10%</strong> при покупке курса от 5-ти уходовых процедур. Экономия и результат.
                        </p>
                    </a>
                    
                    {/* Offer Card 3: Home Care Products */}
                    <a href="#cosmetics" onClick={handleScrollLink} className="block p-6 bg-secondary rounded-xl shadow-lg transition-transform duration-300 hover:-translate-y-1 animate-fade-in-up [animation-delay:800ms]">
                        <div className="flex items-center mb-3">
                            <span className="fas fa-shopping-bag text-accent text-2xl mr-4 w-8 text-center" aria-hidden="true"></span>
                            <h3 className="font-heading text-xl font-semibold text-text-main">Уход Дома -10%</h3>
                        </div>
                        <p className="text-text-muted text-sm leading-relaxed">
                            <strong className="text-accent">СКИДКА 10%</strong> на всю косметику при покупке в день процедуры. Продлите эффект.
                        </p>
                    </a>
                </div>
            </div>
        </section>
    );
};

export default Hero;