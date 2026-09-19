const themeButton = document.querySelector('.theme-toggle');
const chinese = document.documentElement.lang === 'zh-CN';
function updateThemeButton() {
  const dark = document.documentElement.dataset.theme === 'dark';
  themeButton.setAttribute('aria-pressed', String(dark));
  themeButton.setAttribute('aria-label', chinese ? (dark ? '切换浅色模式' : '切换深色模式') : (dark ? 'Switch to light mode' : 'Switch to dark mode'));
}
themeButton.addEventListener('click', () => {
  const theme = document.documentElement.dataset.theme === 'dark' ? 'light' : 'dark';
  document.documentElement.dataset.theme = theme;
  try { localStorage.setItem('wd-theme', theme); } catch (_) {}
  updateThemeButton();
});
updateThemeButton();
