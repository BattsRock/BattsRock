function setLanguage(language) {
  document.documentElement.lang = language;

  const spanishButton = document.getElementById('btn-es');
  const englishButton = document.getElementById('btn-en');

  spanishButton.classList.toggle('active', language === 'es');
  englishButton.classList.toggle('active', language === 'en');

  document.title = language === 'es'
    ? 'Revisión de Riesgo de Seguridad | Zentra'
    : 'Security Risk Review | Zentra';
}

setLanguage('es');
