import { useEffect } from 'react';

const SmoothScroll = () => {
    useEffect(() => {
        const smoothScroll = (e) => {
            if (e.target.closest('.row__posters')) {
                e.preventDefault();
                const container = e.target.closest('.row__posters');
                const scrollAmount = e.deltaY > 0 ? 300 : -300;
                container.scrollBy({
                    left: scrollAmount,
                    behavior: 'smooth'
                });
            }
        };

        document.addEventListener('wheel', smoothScroll, { passive: false });
        return () => document.removeEventListener('wheel', smoothScroll);
    }, []);

    return null;
};

export default SmoothScroll;