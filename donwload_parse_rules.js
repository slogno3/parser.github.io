async function getSettings() {
    try {
        const response = await fetch(`${CONFIG.host}/api/ParseRules`); // Замените на ваш реальный URL
        if (!response.ok) {
            throw new Error(`HTTP ошибка: ${response.status}`);
        }

        return await response.json(); // Преобразуем ответ в JSON
    } catch (error) {
        console.error('Ошибка:', error.message);
    }
}

async function saveSettings(jsonData, selectedIndex) {
    //узнаем, какие сейчас выбраны настройки: для вакансий или для резюме
    const selectedSite = jsonData[selectedIndex];
    //узнаем, какие сейчас выбраны настройки: для вакансий или для резюме
    vacancySettingsButton = document.getElementById('vacancy_setting');
    resumeSettingsButton = document.getElementById('resume_setting');

    const container = document.getElementById('settings-containter');

    // Находим все элементы .setting_item
    const settingItems = container.querySelectorAll('.setting_item');

    settingItems.forEach(item => {
        const titleElement = item.querySelector('.item_title'); // Находим элемент с текстом
        const inputElement = item.querySelector('.item_input input'); // Находим input

        const titleText = titleElement.textContent.trim().slice(0, -1); // название насйтроуи
        const inputValue = inputElement.value; // значение настройки

        if (vacancySettings.classList.contains('active')) {
            vacancyPageRules = selectedSite.vacancyParseRule;
            pageWithVacancies = selectedSite.pageWithVacanciesParseRule
            // Перебираем каждый .setting_item
            if (titleElement && inputElement) {
                if (titleText in vacancyPageRules) {
                    vacancyPageRules[titleText] = inputValue;
                }
                if (titleText in pageWithVacancies) {
                    pageWithVacancies[titleText] = inputValue;
                }
            }
        }
        else {
            resumePageRules = selectedSite.resumeParseRule;
            pageWithResumes = selectedSite.pageWithResumesParseRule
            // Перебираем каждый .setting_item
            if (titleElement && inputElement) {
                if (titleText in resumePageRules) {
                    resumePageRules[titleText] = inputValue;
                }
                if (titleText in pageWithResumes) {
                    pageWithResumes[titleText] = inputValue;
                }
            }
        }
    });

    //Отпрвка запроса
    const url = `${CONFIG.host}/api/ParseRules`;
    fetch(url, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json' // Указываем, что тело в формате JSON
        },
        body: JSON.stringify(selectedSite) // Преобразуем объект в JSON-строку
    })
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP ошибка: ${response.status}`);
            }
        })
        .then(result => {
            console.log('Настройки успешно сохранены:');
        })
        .catch(error => {
            console.error('Ошибка при запросе:', error.message);
        });
}

//выводит список настроек
function drawSettings(jsonData, selectedIndex) {
    const listContainer = document.getElementById('settings-containter');

    //узнаем, какие сейчас выбраны настройки: для вакансий или для резюме
    vacancySettings = document.getElementById('vacancy_setting');
    resumeSettings = document.getElementById('resume_setting');

    const selectedSite = jsonData[selectedIndex];

    // Очищаем старые данные
    listContainer.innerHTML = '';

    // Выводим данные по настройке для выбранного сайта
    if (vacancySettings.classList.contains('active')) {
        for (key in selectedSite.pageWithVacanciesParseRule) {
            const divSettingItem = document.createElement('div')
            divSettingItem.classList.add('setting_item')

            const divItemTitle = document.createElement('div')
            divItemTitle.textContent = `${key}: `
            divItemTitle.classList.add('item_title')

            const divItemInput = document.createElement('div')
            divItemInput.classList.add('item_input')

            const inputValue = document.createElement('input')
            inputValue.value = selectedSite.pageWithVacanciesParseRule[key];
            inputValue.dataset.key = key;

            listContainer.appendChild(divSettingItem);
            divSettingItem.appendChild(divItemTitle)
            divSettingItem.appendChild(divItemInput)
            divItemInput.appendChild(inputValue)
        }
        for (key in selectedSite.vacancyParseRule) {
            const divSettingItem = document.createElement('div')
            divSettingItem.classList.add('setting_item')

            const divItemTitle = document.createElement('div')
            divItemTitle.textContent = `${key}: `
            divItemTitle.classList.add('item_title')

            const divItemInput = document.createElement('div')
            divItemInput.classList.add('item_input')

            const inputValue = document.createElement('input')
            inputValue.value = selectedSite.vacancyParseRule[key];
            inputValue.dataset.key = key;

            listContainer.appendChild(divSettingItem);
            divSettingItem.appendChild(divItemTitle)
            divSettingItem.appendChild(divItemInput)
            divItemInput.appendChild(inputValue)
        }
    }
    else {
        for (key in selectedSite.pageWithResumesParseRule) {
            const divSettingItem = document.createElement('div')
            divSettingItem.classList.add('setting_item')

            const divItemTitle = document.createElement('div')
            divItemTitle.textContent = `${key}: `
            divItemTitle.classList.add('item_title')

            const divItemInput = document.createElement('div')
            divItemInput.classList.add('item_input')

            const inputValue = document.createElement('input')
            inputValue.value = selectedSite.pageWithResumesParseRule[key];
            inputValue.dataset.key = key;

            listContainer.appendChild(divSettingItem);
            divSettingItem.appendChild(divItemTitle)
            divSettingItem.appendChild(divItemInput)
            divItemInput.appendChild(inputValue)
        }
        for (key in selectedSite.resumeParseRule) {
            const divSettingItem = document.createElement('div')
            divSettingItem.classList.add('setting_item')

            const divItemTitle = document.createElement('div')
            divItemTitle.textContent = `${key}: `
            divItemTitle.classList.add('item_title')

            const divItemInput = document.createElement('div')
            divItemInput.classList.add('item_input')

            const inputValue = document.createElement('input')
            inputValue.value = selectedSite.resumeParseRule[key];
            inputValue.dataset.key = key;

            listContainer.appendChild(divSettingItem);
            divSettingItem.appendChild(divItemTitle)
            divSettingItem.appendChild(divItemInput)
            divItemInput.appendChild(inputValue)
        }
    }
}

// Ваша функция для работы с данными
async function init() {

    const jsonData = await getSettings()

    // Сортировка по полю siteName
    jsonData.sort((a, b) => {
        // Сравниваем строковые значения поля siteName
        if (a.siteName < b.siteName) {
            return -1;
        }
        if (a.siteName > b.siteName) {
            return 1;
        }
        return 0;
    });

    const dropdown = document.getElementById('site-dropdown');
    // Заполняем выпадающий список
    jsonData.forEach((site, index) => {
        const option = document.createElement('option');
        option.value = index; // Сохраняем индекс сайта
        option.textContent = site.siteName;
        dropdown.appendChild(option);
    });

    //Выводим настройки
    drawSettings(jsonData, 0)

    // Событие при изменении значения в dropdown
    dropdown.addEventListener('change', () => {
        selectedIndex = dropdown.value; // Получаем индекс выбранного сайта
        drawSettings(jsonData, selectedIndex)
    });


    vacancySettings = document.getElementById('vacancy_setting');
    resumeSettings = document.getElementById('resume_setting');

    vacancySettings.addEventListener('click', () => {
        resumeSettings.classList.remove('active');
        vacancySettings.classList.add('active');
        selectedIndex = document.getElementById('site-dropdown').value;
        drawSettings(jsonData, selectedIndex)
    });

    resumeSettings.addEventListener('click', () => {
        vacancySettings.classList.remove('active');
        resumeSettings.classList.add('active');
        selectedIndex = document.getElementById('site-dropdown').value;
        drawSettings(jsonData, selectedIndex)
    });

    const saveButton = document.getElementById('save_btn')
    saveButton.addEventListener('click', () => {
        selectedIndex = dropdown.value;
        saveSettings(jsonData, dropdown.value);
        location.reload();
    });
}

init()

