
//Функция, которая возвращает функцию
function addItemToList(inputField, list) {

    const value = inputField.value.trim();
    if (!value) return;

    // Новый элемент li
    const li = document.createElement('li');

    // Кнопка, с помощью которой можно удалить новый элемент li
    const removeButton = document.createElement('button');
    removeButton.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="35" height="35" viewBox="0 0 35 35" fill="none">
                                    <rect x="0.5" y="0.5" width="34" height="34" rx="9.5" fill="#333746" stroke="#525357"/>
                                    <rect x="31" y="15" width="5" height="27" rx="2.5" transform="rotate(90 31 15)" fill="#F5F7F9"/>
                                </svg>`;
    removeButton.addEventListener('click', () => li.remove());

    // span, который содержит внутри текст
    const span = document.createElement('span');
    span.innerText = value;


    li.appendChild(removeButton);
    li.appendChild(span)

    list.appendChild(li);

    inputField.value = '';
    inputField.focus();
}

// Поле для ввода ключевых слов
const inputKeyWord = document.getElementById('keyWordsInput');
const addButtonKeyWord = document.getElementById('addKeyWordButton');
const listKeyWords = document.getElementById('keyWordsList');

addButtonKeyWord.addEventListener("click", (event) => {
    addItemToList(inputKeyWord, listKeyWords);
});
inputKeyWord.addEventListener("keydown", (event) => {
    if (event.key === "Enter") addItemToList(inputKeyWord, listKeyWords);
});


// Поле для ввода регионов
const inputRegion = document.getElementById("regionsInput");
const addButtonRegion = document.getElementById("addRegionButton");
const listRegions = document.getElementById("regionsList");

addButtonRegion.addEventListener("click", (event) => {
    addItemToList(inputRegion, listRegions);
});
inputRegion.addEventListener("keydown", (event) => {
    if (event.key === "Enter") addItemToList(inputRegion, listRegions);
});