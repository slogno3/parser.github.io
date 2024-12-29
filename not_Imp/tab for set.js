// Находим элементы
const tabsButton = document.querySelector('.tabs-button');
const tabsList = document.querySelector('.tabs-list');

// Обработчик клика для открытия/закрытия списка вкладок
tabsButton.addEventListener('click', (event) => {
  event.stopPropagation(); // Предотвращаем закрытие из-за клика вне меню
  const isVisible = tabsList.style.display === 'block';
  tabsList.style.display = isVisible ? 'none' : 'block';
});

// Обработка кликов на вкладках
tabsList.addEventListener('click', (event) => {
  if (event.target.tagName === 'A') {
    event.preventDefault(); // Убираем действие по умолчанию для ссылки
    // Удаление класса "active" у всех вкладок
    document.querySelectorAll('.tabs-list a').forEach(tab => tab.classList.remove('active'));
    // Добавление класса "active" к выбранной вкладке
    event.target.classList.add('active');
    // Обновление текста кнопки
    tabsButton.textContent = event.target.textContent;
    // Закрытие списка
    tabsList.style.display = 'none';
  }
});

// Закрытие списка вкладок при клике вне его
document.addEventListener('click', (event) => {
  if (!tabsList.contains(event.target) && !tabsButton.contains(event.target)) {
    tabsList.style.display = 'none';
  }
});
