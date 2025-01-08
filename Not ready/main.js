function addText() {
    const input = document.getElementById('textInput');
    const text = input.value.trim();
    
    if (text) {
        const list = document.getElementById('textList');
        const listItemContainer = document.createElement('div');
        listItemContainer.classList.add('list-item-container');

        const listItem = document.createElement('li');
        listItem.textContent = ` # ${text}`;  // Добавляем # перед текстом

        const deleteButton = document.createElement('span');
        deleteButton.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="35" height="35" viewBox="0 0 35 35" fill="none"> <rect x="0.5" y="0.5" width="34" height="34" rx="9.5" fill="#333746" stroke="#525357"/><rect x="31" y="15" width="5" height="27" rx="2.5" transform="rotate(90 31 15)" fill="#F5F7F9"/></svg>';
        deleteButton.classList.add('delete-button');
        deleteButton.onclick = function() {
            list.removeChild(listItemContainer);
        };

        listItemContainer.appendChild(deleteButton);
        listItemContainer.appendChild(listItem);
        list.appendChild(listItemContainer);
        input.value = '';
    } else {
        alert('Введите текст!');
    }
}

const inputField = document.getElementById('inputField');
const dropdownList = document.getElementById('dropdownList');
const addedCitiesList = document.getElementById('addedCitiesList');

const cities = [
    "Адлер", "Адыгейск", "Азов", "Алагир", "Алапаевск", "Алдан", "Александров",
    "Александров Гай", "Александровск", "Александровск-Сахалинский", "Алексин", "Алупка",
    "Алушта", "Амдерма", "Амурск", "Анадырь", "Анапа", "Ангарск", "Андреаполь", "Анива",
    "Апатиты", "Апрелевка", "Апшеронск", "Аргаяш", "Ардон", "Арзамас", "Армавир", "Арсеньев",
    "Артем", "Архангельск"
];

inputField.addEventListener('focus', () => {
    if (inputField.value.trim() !== "") {
        dropdownList.style.display = 'block';
    }
});

inputField.addEventListener('blur', () => {
    setTimeout(() => dropdownList.style.display = 'none', 200);
});

dropdownList.addEventListener('click', (e) => {
    if (e.target.tagName === 'DIV') {
        inputField.value = e.target.textContent;
        dropdownList.style.display = 'none';
    }
});

function filterFunction() {
    const filter = inputField.value.toUpperCase();
    dropdownList.innerHTML = "";  // Очищаем список перед каждой фильтрацией
    
    const filteredOptions = cities.filter(option => 
        option.toUpperCase().indexOf(filter) > -1
    );

    filteredOptions.forEach(option => {
        const div = document.createElement('div');
        div.textContent = option;
        dropdownList.appendChild(div);
    });

    // Показываем dropdown, если есть элементы
    dropdownList.style.display = filteredOptions.length > 0 ? 'block' : 'none';
}

function addNewOption() {
    const newCity = inputField.value.trim();
    if (newCity && !isCityExists(newCity)) {
        // Добавляем новый город в список добавленных городов
        const newCityItem = document.createElement('li');
        
        // Создаём кнопку для удаления города
        const deleteButton = document.createElement('button');
        deleteButton.className = 'delete-button';
        deleteButton.innerHTML = ` 
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 35 35" fill="none">
                <rect x="0.5" y="0.5" width="34" height="34" rx="9.5" fill="#333746" stroke="#525357"/>
                <rect x="31" y="15" width="5" height="27" rx="2.5" transform="rotate(90 31 15)" fill="#F5F7F9"/>
            </svg>`;
        deleteButton.onclick = () => removeCity(newCityItem);

        // Создаём текст с городом и добавляем # перед ним
        const cityText = document.createElement('span');
        cityText.className = 'city-text';
        cityText.textContent = `# ${newCity}`;

        // Добавляем кнопку удаления и текст города в элемент города
        newCityItem.appendChild(deleteButton);
        newCityItem.appendChild(cityText);

        addedCitiesList.appendChild(newCityItem);

        // Очищаем поле ввода
        inputField.value = '';
        dropdownList.style.display = 'none';
    } else {
        alert('Город уже существует или введено пустое значение!');
    }
}

function isCityExists(cityName) {
    const addedCities = addedCitiesList.getElementsByTagName('li');
    for (let i = 0; i < addedCities.length; i++) {
        if (addedCities[i].textContent.replace(/\s+/g, '') === `#${cityName.replace(/\s+/g, '')}`) {
            return true;
        }
    }
    return false;
}

function removeCity(cityElement) {
    addedCitiesList.removeChild(cityElement);
}
