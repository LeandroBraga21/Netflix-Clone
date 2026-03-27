import { categories } from './data.js';
import { createCarousel } from './components/Carousel.js';

document.addEventListener('DOMContentLoaded', () => {
    const nomePerfil = localStorage.getItem('perfilAtivoNome');
    const imagemPerfil = localStorage.getItem('perfilAtivoImagem');

    if (nomePerfil && imagemPerfil) {
        const kidsLink = document.querySelector('.kids-link');
        const profileIcon = document.querySelector('.profile-icon');

        if (kidsLink) kidsLink.textContent = nomePerfil;
        if (profileIcon) profileIcon.src = imagemPerfil;
    }

    const container = document.getElementById('main-content');

    if (container) {
        categories.forEach(category => {
            const carousel = createCarousel(category);
            container.appendChild(carousel);
        });
    }

    const profileThemeKey = 'netflix-theme';
    const themeToggleBtn = document.getElementById('theme-toggle');

    function applyTheme(theme) {
        document.body.classList.toggle('light-mode', theme === 'light');
        if (themeToggleBtn) {
            if (theme === 'light') {
                themeToggleBtn.textContent = '🌙';
                themeToggleBtn.setAttribute('aria-label', 'Ativar modo escuro');
            } else {
                themeToggleBtn.textContent = '☀️';
                themeToggleBtn.setAttribute('aria-label', 'Ativar modo claro');
            }
        }
        localStorage.setItem(profileThemeKey, theme);
    }

    if (themeToggleBtn) {
        const savedTheme = localStorage.getItem(profileThemeKey) || 'dark';
        applyTheme(savedTheme);

        themeToggleBtn.addEventListener('click', () => {
            const nextTheme = document.body.classList.contains('light-mode') ? 'dark' : 'light';
            applyTheme(nextTheme);
        });
    }
});
