const themeButton = document.querySelector('.theme-toggle');
function updateThemeButton() {
  const dark = document.documentElement.dataset.theme === 'dark';
  themeButton.setAttribute('aria-pressed', String(dark));
  themeButton.setAttribute('aria-label', dark ? 'Switch to light mode' : 'Switch to dark mode');
}
themeButton.addEventListener('click', () => {
  const theme = document.documentElement.dataset.theme === 'dark' ? 'light' : 'dark';
  document.documentElement.dataset.theme = theme;
  try { localStorage.setItem('wd-theme', theme); } catch (_) {}
  updateThemeButton();
});
updateThemeButton();
const menuButton = document.querySelector('.menu-toggle');
const navigation = document.querySelector('#primary-nav');
function closeNavigation(){navigation.classList.remove('open');menuButton.setAttribute('aria-expanded','false');menuButton.setAttribute('aria-label','Open navigation');}
menuButton.addEventListener('click', () => {
  const open = navigation.classList.toggle('open');
  menuButton.setAttribute('aria-expanded', String(open));
  menuButton.setAttribute('aria-label', open ? 'Close navigation' : 'Open navigation');
});
navigation.addEventListener('click', event => {if(event.target.closest('a')) closeNavigation();});
document.addEventListener('keydown', event => {
  if (event.key === 'Escape' && navigation.classList.contains('open')) {closeNavigation();menuButton.focus();}
});
const searchDialog = document.querySelector('#site-search');
const searchInput = document.querySelector('#search-input');
const searchResults = document.querySelector('#search-results');
const searchButton = document.querySelector('.search-toggle');
function showResults() {
  searchResults.replaceChildren();
  const words = searchInput.value.trim().toLowerCase().split(/\s+/).filter(Boolean);
  const matches = (window.SITE_SEARCH || []).filter(item => words.every(word => (item.title + ' ' + item.text).toLowerCase().includes(word)));
  if (!words.length || !matches.length) {
    const hint = document.createElement('p');hint.className = 'search-hint';
    hint.textContent = words.length ? 'No results found. Try another term.' : 'Try “GMI Cloud”, “EMNLP”, or “post-training”.';
    searchResults.append(hint);return;
  }
  matches.forEach(item => {
    const link = document.createElement('a');link.className = 'search-result';link.href = item.url;link.textContent = item.title;
    const section = document.createElement('small');section.textContent = item.url.split('.')[0].replace('index','Home').replace(/^./,letter => letter.toUpperCase());
    link.append(section);link.addEventListener('click', () => searchDialog.close());searchResults.append(link);
  });
}
searchButton.addEventListener('click', () => {searchDialog.showModal();showResults();searchInput.focus();});
document.querySelector('.search-close').addEventListener('click', () => searchDialog.close());
searchDialog.addEventListener('close', () => searchButton.focus());
searchInput.addEventListener('input', showResults);
