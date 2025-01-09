const regionInput = document.getElementById("regionsInput");
const dropdown = document.getElementById("dropdown");

// Список городов и областей
const cities = [
  "Москва",
  "Санкт-Петербург",
  "Новосибирск",
  "Екатеринбург",
  "Казань",
  "Нижний Новгород",
  "Челябинск",
  "Самара",
  "Омск",
  "Ростов-на-Дону",
  "Красноярск",
  "Воронеж",
  "Владивосток",
  "Сочи",
  "Татарстан",
  "Алтайский край",
  "Краснодарский край",
];

// Функция фильтрации списка
function filterCities(query) {
  return cities.filter((city) =>
    city.toLowerCase().includes(query.toLowerCase())
  );
}

// Функция отображения дропдаун-листа
function showDropdown(items) {
  dropdown.innerHTML = ""; // Очистка старых элементов
  dropdown.style.display = items.length ? "block" : "none"; // Показать/скрыть

  items.forEach((item) => {
    const li = document.createElement("li");
    li.textContent = item;

    // Добавление события клика
    li.addEventListener("click", () => {
      regionInput.value = item; // Установить значение в input
      dropdown.style.display = "none"; // Скрыть дропдаун
    });

    dropdown.appendChild(li);
  });
}

// Событие на ввод текста
regionInput.addEventListener("input", () => {
  const query = regionInput.value.trim();
  if (query) {
    const filteredCities = filterCities(query);
    showDropdown(filteredCities);
  } else {
    dropdown.style.display = "none"; // Скрыть дропдаун, если поле пустое
  }
});

// Закрытие дропдауна при клике вне
document.addEventListener("click", (event) => {
  if (!event.target.closest(".autocomplete-container")) {
    dropdown.style.display = "none";
  }
});