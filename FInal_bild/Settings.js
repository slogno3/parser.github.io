document.addEventListener("DOMContentLoaded", (event) => {

    let settingTabs = document.querySelectorAll('.main_titles .title_link');
    settingTabs.forEach(tabBtn => {
        tabBtn.addEventListener('click', function(e){
            e.preventDefault();
            settingTabs.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active')
        })            
    });

    // Listdan itemni divga qo'shish
    $('#option_list_second li').on('click', function() {
        const value = $(this).text().trim();

        // Yangi divga qiymatni va SVG ikonkasini qo‘shish
        $('#selectedValuesSecond').append(
            `<div class="selectedItem">
                <svg xmlns="http://www.w3.org/2000/svg" width="35" height="35" viewBox="0 0 35 35" fill="none">
                    <rect x="0.5" y="0.5" width="34" height="34" rx="9.5" fill="#333746" stroke="#525357"/>
                    <rect x="31" y="15" width="5" height="27" rx="2.5" transform="rotate(90 31 15)" fill="#F5F7F9"/>
                </svg>
                <span class="itemText">${value}</span>
            </div>`
        );

        // Li elementini olib tashlash
        $(this).remove();

        // Listga qaytgan div uchun yangi listener qo'shish
        $('#option_list_second li').off('click').on('click', function() {
            const value = $(this).text().trim();
            $('#selectedValuesSecond').append(
                `<div class="selectedItem">
                    <svg xmlns="http://www.w3.org/2000/svg" width="35" height="35" viewBox="0 0 35 35" fill="none">
                        <rect x="0.5" y="0.5" width="34" height="34" rx="9.5" fill="#333746" stroke="#525357"/>
                        <rect x="31" y="15" width="5" height="27" rx="2.5" transform="rotate(90 31 15)" fill="#F5F7F9"/>
                    </svg>
                    <span class="itemText">${value}</span>
                </div>`
            );
            $(this).remove();
        });
    });

    // selectedItem bosilganida itemni listga qaytarish
    $('#selectedValuesSecond').on('click', '.selectedItem', function() {
        const itemText = $(this).find('.itemText').text().trim();
        
        // Itemni listga qaytarish
        $('#option_list_second').append(
            `<li>
                <svg xmlns="http://www.w3.org/2000/svg" width="35" height="35" viewBox="0 0 35 35" fill="none">
                    <rect x="0.5" y="0.5" width="34" height="34" rx="9.5" fill="#333746" stroke="#525357"/>
                    <rect x="31" y="15" width="5" height="27" rx="2.5" transform="rotate(90 31 15)" fill="#F5F7F9"/>
                </svg>
                <span>${itemText}</span>
            </li>`
        );
        
        // Divni olib tashlash
        $(this).remove();

        // Yangi li elementini yana bosganda ishlashi uchun event listenerni qayta yangilaymiz
        $('#option_list_second li').off('click').on('click', function() {
            const value = $(this).text().trim();
            $('#selectedValuesSecond').append(
                `<div class="selectedItem">
                    <svg xmlns="http://www.w3.org/2000/svg" width="35" height="35" viewBox="0 0 35 35" fill="none">
                        <rect x="0.5" y="0.5" width="34" height="34" rx="9.5" fill="#333746" stroke="#525357"/>
                        <rect x="31" y="15" width="5" height="27" rx="2.5" transform="rotate(90 31 15)" fill="#F5F7F9"/>
                    </svg>
                    <span class="itemText">${value}</span>
                </div>`
            );
            $(this).remove();
        });
    });


    // Listdan itemni divga qo'shish
    $('#option_list li').on('click', function() {
        const value = $(this).text().trim();

        // Yangi divga qiymatni va SVG ikonkasini qo‘shish
        $('#selectedValues').append(
            `<div class="selectedItem">
                <svg xmlns="http://www.w3.org/2000/svg" width="35" height="35" viewBox="0 0 35 35" fill="none">
                    <rect x="0.5" y="0.5" width="34" height="34" rx="9.5" fill="#333746" stroke="#525357"/>
                    <rect x="31" y="15" width="5" height="27" rx="2.5" transform="rotate(90 31 15)" fill="#F5F7F9"/>
                </svg>
                <span class="itemText">${value}</span>
            </div>`
        );

        // Li elementini olib tashlash
        $(this).remove();

        // Listga qaytgan div uchun yangi listener qo'shish
        $('#option_list li').off('click').on('click', function() {
            const value = $(this).text().trim();
            $('#selectedValues').append(
                `<div class="selectedItem">
                    <svg xmlns="http://www.w3.org/2000/svg" width="35" height="35" viewBox="0 0 35 35" fill="none">
                        <rect x="0.5" y="0.5" width="34" height="34" rx="9.5" fill="#333746" stroke="#525357"/>
                        <rect x="31" y="15" width="5" height="27" rx="2.5" transform="rotate(90 31 15)" fill="#F5F7F9"/>
                    </svg>
                    <span class="itemText">${value}</span>
                </div>`
            );
            $(this).remove();
        });
    });

    // selectedItem bosilganida itemni listga qaytarish
    $('#selectedValues').on('click', '.selectedItem', function() {
        const itemText = $(this).find('.itemText').text().trim();
        
        // Itemni listga qaytarish
        $('#option_list').append(
            `<li>
                <svg xmlns="http://www.w3.org/2000/svg" width="35" height="35" viewBox="0 0 35 35" fill="none">
                    <rect x="0.5" y="0.5" width="34" height="34" rx="9.5" fill="#333746" stroke="#525357"/>
                    <rect x="31" y="15" width="5" height="27" rx="2.5" transform="rotate(90 31 15)" fill="#F5F7F9"/>
                </svg>
                <span>${itemText}</span>
            </li>`
        );
        
        // Divni olib tashlash
        $(this).remove();

        // Yangi li elementini yana bosganda ishlashi uchun event listenerni qayta yangilaymiz
        $('#option_list li').off('click').on('click', function() {
            const value = $(this).text().trim();
            $('#selectedValues').append(
                `<div class="selectedItem">
                    <svg xmlns="http://www.w3.org/2000/svg" width="35" height="35" viewBox="0 0 35 35" fill="none">
                        <rect x="0.5" y="0.5" width="34" height="34" rx="9.5" fill="#333746" stroke="#525357"/>
                        <rect x="31" y="15" width="5" height="27" rx="2.5" transform="rotate(90 31 15)" fill="#F5F7F9"/>
                    </svg>
                    <span class="itemText">${value}</span>
                </div>`
            );
            $(this).remove();
        });
    });
    
    

    const scrollContainer = document.querySelector('#option_list');
    const boxShadow = document.querySelector('#box_shadow');

    scrollContainer.addEventListener('scroll', function () {
        const scrollTop = scrollContainer.scrollTop;
        const scrollHeight = scrollContainer.scrollHeight;
        const clientHeight = scrollContainer.clientHeight;

        if (scrollTop + clientHeight >= scrollHeight) {
            boxShadow.classList.add('hide-shadow');
        } else {
            boxShadow.classList.remove('hide-shadow');
        }
    });
    const scrollContainerSecond = document.querySelector('#option_list_second');
    const boxShadowSecond = document.querySelector('#box_shadow_second');

    scrollContainerSecond.addEventListener('scroll', function () {
        const scrollTop = scrollContainerSecond.scrollTop;
        const scrollHeight = scrollContainerSecond.scrollHeight;
        const clientHeight = scrollContainerSecond.clientHeight;

        if (scrollTop + clientHeight >= scrollHeight) {
            boxShadowSecond.classList.add('hide-shadow');
        } else {
            boxShadowSecond.classList.remove('hide-shadow');
        }
    });

    const inputField = document.getElementById('inputField');
    const dropdownList = document.getElementById('dropdownList');
    
    inputField.addEventListener('focus', () => {
        dropdownList.style.display = 'block';
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
        const options = dropdownList.getElementsByTagName('div');
        for (let i = 0; i < options.length; i++) {
            const txtValue = options[i].textContent || options[i].innerText;
            options[i].style.display = txtValue.toUpperCase().indexOf(filter) > -1 ? '' : 'none';
        }} 
});
