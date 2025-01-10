document.addEventListener("DOMContentLoaded", () => {
    // --- Переключение вкладок ---
    document.querySelectorAll('.main_titles .title_link').forEach(tabBtn => {
        tabBtn.addEventListener('click', function (e) {
            e.preventDefault();
            document.querySelectorAll('.main_titles .title_link').forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
        });
    });

    // --- Обработка списков ---
    function setupListHandlers(listId, selectedContainerId) {
        const list = $(`#${listId}`);
        const selectedContainer = $(`#${selectedContainerId}`);

        list.on('click', 'li', function () {
            const value = $(this).text().trim();
            selectedContainer.append(createSelectedItem(value));
            $(this).remove();
        });

        selectedContainer.on('click', '.selectedItem', function () {
            const value = $(this).find('.itemText').text().trim();
            list.append(createListItem(value));
            $(this).remove();
        });

        function createListItem(value) {
            return `<li>
                <svg xmlns="http://www.w3.org/2000/svg" width="35" height="35" viewBox="0 0 35 35" fill="none">
                    <rect x="0.5" y="0.5" width="34" height="34" rx="9.5" fill="#333746" stroke="#525357"/>
                    <rect x="31" y="15" width="5" height="27" rx="2.5" transform="rotate(90 31 15)" fill="#F5F7F9"/>
                </svg>
                <span>${value}</span>
            </li>`;
        }

        function createSelectedItem(value) {
            return `<div class="selectedItem">
                <svg xmlns="http://www.w3.org/2000/svg" width="35" height="35" viewBox="0 0 35 35" fill="none">
                    <rect x="0.5" y="0.5" width="34" height="34" rx="9.5" fill="#333746" stroke="#525357"/>
                    <rect x="31" y="15" width="5" height="27" rx="2.5" transform="rotate(90 31 15)" fill="#F5F7F9"/>
                </svg>
                <span class="itemText">${value}</span>
            </div>`;
        }
    }

    setupListHandlers('option_list', 'selectedValues');
    setupListHandlers('option_list_second', 'selectedValuesSecond');

    // --- Обработка скроллинга с тенями ---
    function setupScrollShadow(containerId, shadowId) {
        const scrollContainer = document.querySelector(`#${containerId}`);
        const boxShadow = document.querySelector(`#${shadowId}`);

        scrollContainer.addEventListener('scroll', () => {
            const { scrollTop, scrollHeight, clientHeight } = scrollContainer;
            if (scrollTop + clientHeight >= scrollHeight) {
                boxShadow.classList.add('hide-shadow');
            } else {
                boxShadow.classList.remove('hide-shadow');
            }
        });
    }

    setupScrollShadow('option_list', 'box_shadow');
    setupScrollShadow('option_list_second', 'box_shadow_second');

    // --- Обработка выпадающего списка ---
    const inputField = document.getElementById('inputField');
    const dropdownList = document.getElementById('dropdownList');

    inputField.addEventListener('focus', () => {
        dropdownList.style.display = 'block';
    });

    inputField.addEventListener('blur', () => {
        setTimeout(() => (dropdownList.style.display = 'none'), 200);
    });

    dropdownList.addEventListener('click', e => {
        if (e.target.tagName === 'DIV') {
            inputField.value = e.target.textContent;
            dropdownList.style.display = 'none';
        }
    });

    inputField.addEventListener('input', () => {
        const filter = inputField.value.toUpperCase();
        Array.from(dropdownList.getElementsByTagName('div')).forEach(option => {
            const text = option.textContent || option.innerText;
            option.style.display = text.toUpperCase().includes(filter) ? '' : 'none';
        });
    });

    // --- Сохранение данных в localStorage для Вакансий и Резюме ---
    const sections = {
        vacancy: ['job', 'salary_min', 'salary_max', 'location', 'work_schedule', 'skills'],
        resume: ['name', 'experience', 'education', 'skills_resume', 'location_resume']
    };

    // Функция восстановления и сохранения данных
    function setupStorageHandlers(sectionKey, fields) {
        fields.forEach(field => {
            const input = document.getElementById(field);
            const savedValue = localStorage.getItem(`${sectionKey}_${field}`);
            if (savedValue) input.value = savedValue;

            input.addEventListener('input', () => {
                localStorage.setItem(`${sectionKey}_${field}`, input.value);
            });
        });

        document.querySelector(`.save_btn_${sectionKey}`).addEventListener('click', event => {
            event.preventDefault();
            fields.forEach(field => {
                const input = document.getElementById(field);
                localStorage.setItem(`${sectionKey}_${field}`, input.value);
            });
            alert(`${sectionKey === 'vacancy' ? 'Вакансия' : 'Резюме'} сохранено!`);
        });
    }

    setupStorageHandlers('vacancy', sections.vacancy);
    setupStorageHandlers('resume', sections.resume);
});

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
