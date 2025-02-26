const downloadVananciesButton = document.getElementById('download_vacancies_btn');
const keyWordsList = document.getElementById('keyWordsList');
const regionsList = document.getElementById('regionsList');


downloadVananciesButton.addEventListener('click', async () => {
    const keyWords = getValuesFromUl(keyWordsList)
    const regions = getValuesFromUl(regionsList)

    const params = new URLSearchParams({
        keyWords: keyWords.join(','),
        regions:  regions.join(','),
        publicationAtMonth: getSelectedMonthValue()
    });
    
    // Формируем URL с параметрами
    const url = `${CONFIG.host}/api/Vacancy/parse?${params.toString()}`;

    // Открываем ссылку в новой вкладке
    window.open(url, '_blank');
});



// Получение элементов из списка ul
function getValuesFromUl(ul) {
    const listItems = ul.querySelectorAll("li"); // Находим все элементы <li> внутри <ul>
    const values = Array.from(listItems).map(item => item.textContent.trim());
    return values
}


//Получение выбранного значения из радио кнопок
function getSelectedMonthValue() {
    const radioButtons = document.querySelectorAll('input[name="month_item"]');
    let selectedValue = null;
    
    radioButtons.forEach(radio => {
        if (radio.checked) {
            selectedValue = radio.value; // Получаем value выбранной радио-кнопки
        }
    });

    return selectedValue;
}



