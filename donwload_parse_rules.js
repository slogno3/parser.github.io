async function sendRequest() {
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

    const jsonData = await sendRequest()

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
}

init()

