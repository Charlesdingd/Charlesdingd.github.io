// Apply the saved theme before the page paints. Storage can be blocked in private browsing.
try { const saved = localStorage.getItem('wd-theme'); if (saved === 'dark' || saved === 'light') document.documentElement.dataset.theme = saved; else if (window.matchMedia('(prefers-color-scheme: dark)').matches) document.documentElement.dataset.theme = 'dark'; } catch (_) {}
