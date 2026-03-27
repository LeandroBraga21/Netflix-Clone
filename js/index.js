document.addEventListener('DOMContentLoaded', () => {
	const profileThemeKey = 'netflix-theme';
	const themeToggleBtn = document.getElementById('theme-toggle');

	function applyTheme(theme) {
		document.body.classList.toggle('light-mode', theme === 'light');
		if (theme === 'light') {
			themeToggleBtn.textContent = '🌙';
			themeToggleBtn.setAttribute('aria-label', 'Ativar modo escuro');
		} else {
			themeToggleBtn.textContent = '☀️';
			themeToggleBtn.setAttribute('aria-label', 'Ativar modo claro');
		}
		localStorage.setItem(profileThemeKey, theme);
	}

	const savedTheme = localStorage.getItem(profileThemeKey) || 'dark';
	applyTheme(savedTheme);

	themeToggleBtn.addEventListener('click', () => {
		const nextTheme = document.body.classList.contains('light-mode') ? 'dark' : 'light';
		applyTheme(nextTheme);
	});

	const perfilLinks = document.querySelectorAll('.perfil');

	perfilLinks.forEach(link => {
		link.addEventListener('click', () => {
			const item = link.closest('.item-perfil');
			if (!item) return;

			const nomeEl = item.querySelector('.nome-perfil');
			const imgEl = item.querySelector('img');

			const nome = nomeEl ? nomeEl.textContent.trim() : '';
			let imgSrc = imgEl ? imgEl.getAttribute('src') : '';

			if (imgSrc && !imgSrc.startsWith('http') && !imgSrc.startsWith('/') && !imgSrc.startsWith('..')) {
				imgSrc = '../' + imgSrc;
			}

			try {
				localStorage.setItem('perfilAtivoNome', nome);
				localStorage.setItem('perfilAtivoImagem', imgSrc);
			} catch (e) {
				console.warn('Não foi possível salvar o perfil ativo no localStorage', e);
			}
		});
	});
});
