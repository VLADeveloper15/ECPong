// Получаем элементы
const startButton = document.getElementById('main-menu-button-start');
const modal = document.querySelector('.modal');
const exitButton = document.querySelector('.modal-window-button-exit');
const player1Input = document.getElementById('input-1');
const player2Input = document.getElementById('input-2');
const slider = document.getElementById('mySlider');
const valueDisplay = document.getElementById('valueDisplay');

// Функция для очистки данных формы
function clearFormData() {
    if (player1Input) player1Input.value = '';
    if (player2Input) player2Input.value = '';
    if (slider) slider.value = '1';
    if (valueDisplay) valueDisplay.textContent = '1';
}

// Функция для сброса всех ошибок
function resetErrors() {
    // Очищаем текст ошибок
    if (player1Error) player1Error.textContent = '';
    if (player2Error) player2Error.textContent = '';
    if (formError) formError.textContent = '';
    
    // Убираем красную обводку с инпутов
    if (player1Input) removeRedBorder(player1Input);
    if (player2Input) removeRedBorder(player2Input);
}

// Функция для блокировки фокуса
function trapFocus(e) {
    if (!modal.classList.contains('display')) return;
    
    // Получаем все фокусируемые элементы в модальном окне
    const focusableElements = modal.querySelectorAll(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );
    
    if (focusableElements.length === 0) return;
    
    const firstFocusable = focusableElements[0];
    const lastFocusable = focusableElements[focusableElements.length - 1];
    
    // Ловушка фокуса
    if (e.key === 'Tab') {
        if (e.shiftKey) { // Shift + Tab
            if (document.activeElement === firstFocusable) {
                lastFocusable.focus();
                e.preventDefault();
            }
        } else { // Tab
            if (document.activeElement === lastFocusable) {
                firstFocusable.focus();
                e.preventDefault();
            }
        }
    }
}

// Функция для блокировки фокуса на элементах вне модалки
function disableOutsideFocus() {
    const allFocusable = document.querySelectorAll(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );
    
    allFocusable.forEach(element => {
        // Если элемент не внутри модалки, блокируем его
        if (!modal.contains(element)) {
            element.setAttribute('data-tabindex', element.getAttribute('tabindex') || '');
            element.setAttribute('tabindex', '-1');
        }
    });
}

// Функция для восстановления фокуса
function enableOutsideFocus() {
    const allElements = document.querySelectorAll('[data-tabindex]');
    allElements.forEach(element => {
        const oldTabindex = element.getAttribute('data-tabindex');
        if (oldTabindex) {
            element.setAttribute('tabindex', oldTabindex);
            element.removeAttribute('data-tabindex');
        } else {
            element.removeAttribute('tabindex');
        }
    });
}

// Функция открытия модального окна
function openModal() {
    modal.classList.add('display');
    document.body.classList.add('modal-open');
    
    // Сбрасываем ошибки при открытии
    resetErrors();
    
    // Блокируем фокус на элементах вне модалки
    disableOutsideFocus();
    
    // Устанавливаем фокус на первый input в модалке
    setTimeout(() => {
        const firstInput = modal.querySelector('input, button');
        if (firstInput) firstInput.focus();
    }, 100);
}

// Функция закрытия модального окна
function closeModal() {
    modal.classList.remove('display');
    document.body.classList.remove('modal-open');
    
    // Очищаем данные формы
    clearFormData();
    
    // Сбрасываем ошибки при закрытии
    resetErrors();
    
    // Восстанавливаем фокус на элементах вне модалки
    enableOutsideFocus();
    
    // Возвращаем фокус на кнопку, которая открыла модалку
    if (startButton) {
        startButton.focus();
    }
}

// Открытие модального окна по кнопке
if (startButton) {
    startButton.addEventListener('click', openModal);
}

// Закрытие модального окна по кнопке Exit
if (exitButton) {
    exitButton.addEventListener('click', closeModal);
}

// Закрытие по клику на фон (на серую область)
if (modal) {
    modal.addEventListener('click', function(e) {
        if (e.target === modal) {
            closeModal();
        }
    });
}

// Ловушка фокуса при нажатии Tab
document.addEventListener('keydown', trapFocus);

// Закрытие по клавише Escape
document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape' && modal && modal.classList.contains('display')) {
        closeModal();
    }
});

// Убеждаемся, что модальное окно закрыто при загрузке страницы
document.addEventListener('DOMContentLoaded', function() {
    // Принудительно закрываем модальное окно
    modal.classList.remove('display');
    document.body.classList.remove('modal-open');
    
    // Очищаем данные формы
    clearFormData();
    
    // Сбрасываем ошибки
    resetErrors();
    
    // Восстанавливаем фокус
    enableOutsideFocus();
});

// ----------------------------------------------------------------------------------------------------

// Получаем элементы формы
const form = document.querySelector('.modal-window-players');
const submitButton = document.querySelector('.modal-window-players-button');

// Создаем элементы для отображения ошибок
const player1Error = document.createElement('div');
const player2Error = document.createElement('div');
const formError = document.createElement('div');

// Добавляем стили для ошибок
player1Error.style.color = 'red';
player1Error.style.fontSize = '12px';
player1Error.style.textShadow = 'none';

player2Error.style.color = 'red';
player2Error.style.fontSize = '12px';
player2Error.style.textShadow = 'none';

formError.style.color = 'red';
formError.style.fontSize = '14px';
formError.style.textAlign = 'center';
formError.style.textShadow = 'none';

// Добавляем элементы ошибок после инпутов (с проверкой на существование)
if (player1Input && player1Input.parentNode) {
    player1Input.parentNode.insertBefore(player1Error, player1Input.nextSibling);
}
if (player2Input && player2Input.parentNode) {
    player2Input.parentNode.insertBefore(player2Error, player2Input.nextSibling);
}
if (form && submitButton) {
    form.insertBefore(formError, submitButton.nextSibling);
}

// Функция для проверки длины имени
function validateNameLength(name) {
    return name.length <= 35;
}

// Функция для проверки совпадения имен
function validateNamesDifferent(name1, name2) {
    return name1.trim().toLowerCase() !== name2.trim().toLowerCase();
}

// Функция для проверки пустых полей
function validateNotEmpty(value) {
    return value.trim().length > 0;
}

// Функция для удаления красной обводки
function removeRedBorder(input) {
    if (input) input.style.border = '2px solid #1E40FF';
}

// Функция для добавления красной обводки
function addRedBorder(input) {
    if (input) input.style.border = '2px solid red';
}

// Функция валидации первого игрока
function validatePlayer1() {
    if (!player1Input) return false;
    
    const name = player1Input.value;
    let isValid = true;
    
    if (!validateNotEmpty(name)) {
        player1Error.textContent = 'Поле не может быть пустым';
        addRedBorder(player1Input);
        isValid = false;
    } else if (!validateNameLength(name)) {
        player1Error.textContent = 'Имя не должно превышать 35 символов';
        addRedBorder(player1Input);
        isValid = false;
    } else {
        player1Error.textContent = '';
        removeRedBorder(player1Input);
    }
    
    return isValid;
}

// Функция валидации второго игрока
function validatePlayer2() {
    if (!player2Input) return false;
    
    const name = player2Input.value;
    let isValid = true;
    
    if (!validateNotEmpty(name)) {
        player2Error.textContent = 'Поле не может быть пустым';
        addRedBorder(player2Input);
        isValid = false;
    } else if (!validateNameLength(name)) {
        player2Error.textContent = 'Имя не должно превышать 35 символов';
        addRedBorder(player2Input);
        isValid = false;
    } else {
        player2Error.textContent = '';
        removeRedBorder(player2Input);
    }
    
    return isValid;
}

// Функция проверки совпадения имен
function validateNamesMatch() {
    if (!player1Input || !player2Input) return true;
    
    const name1 = player1Input.value.trim();
    const name2 = player2Input.value.trim();
    
    if (name1 && name2 && !validateNamesDifferent(name1, name2)) {
        player1Error.textContent = 'Имена участников не должны совпадать';
        player2Error.textContent = 'Имена участников не должны совпадать';
        addRedBorder(player1Input);
        addRedBorder(player2Input);
        return false;
    }
    
    // Если ошибка совпадения была, но имена разные - очищаем
    if (validateNamesDifferent(name1, name2)) {
        if (player1Error.textContent === 'Имена участников не должны совпадать') {
            player1Error.textContent = '';
            player2Error.textContent = '';
            removeRedBorder(player1Input);
            removeRedBorder(player2Input);
            
            // Повторно валидируем каждое поле
            validatePlayer1();
            validatePlayer2();
        }
    }
    
    return true;
}

// Функция валидации всей формы
function validateForm() {
    const isPlayer1Valid = validatePlayer1();
    const isPlayer2Valid = validatePlayer2();
    const isNamesDifferent = validateNamesMatch();
    
    // Очищаем общую ошибку
    if (formError) formError.textContent = '';
    
    return isPlayer1Valid && isPlayer2Valid && isNamesDifferent;
}

// Функция сохранения имен в localStorage (только для перехода в игру)
function savePlayerNames(name1, name2) {
    localStorage.setItem('player1Name', name1.trim());
    localStorage.setItem('player2Name', name2.trim());
}

// Функция перехода на страницу игры
function startGame() {
    if (validateForm()) {
        const player1Name = player1Input.value.trim();
        const player2Name = player2Input.value.trim();
        
        // Сохраняем имена (только для передачи в игру)
        savePlayerNames(player1Name, player2Name);
        
        // Переходим на страницу game.html
        window.location.href = './game.html';
    } else {
        // Проверяем, заполнены ли поля
        const name1 = player1Input ? player1Input.value.trim() : '';
        const name2 = player2Input ? player2Input.value.trim() : '';
        
        if (!name1 || !name2) {
            if (formError) formError.textContent = 'Пожалуйста, заполните все поля';
        } else if (name1 === name2) {
            if (formError) formError.textContent = 'Имена участников не должны совпадать';
        } else {
            if (formError) formError.textContent = 'Пожалуйста, исправьте ошибки в форме';
        }
    }
}

// Добавляем обработчики событий (с проверкой на существование)
if (player1Input) {
    player1Input.addEventListener('input', () => {
        validatePlayer1();
        validateNamesMatch();
        if (formError) formError.textContent = '';
    });
    
    player1Input.addEventListener('blur', () => {
        validatePlayer1();
        validateNamesMatch();
    });
    
    // Ограничение длины ввода 35 символов
    player1Input.addEventListener('input', () => {
        if (player1Input.value.length > 35) {
            player1Input.value = player1Input.value.slice(0, 35);
            validatePlayer1();
        }
    });
    
    player1Input.addEventListener('focus', () => {
        removeRedBorder(player1Input);
        if (player1Error.textContent !== 'Имена участников не должны совпадать') {
            player1Error.textContent = '';
        }
    });
}

if (player2Input) {
    player2Input.addEventListener('input', () => {
        validatePlayer2();
        validateNamesMatch();
        if (formError) formError.textContent = '';
    });
    
    player2Input.addEventListener('blur', () => {
        validatePlayer2();
        validateNamesMatch();
    });
    
    // Ограничение длины ввода 35 символов
    player2Input.addEventListener('input', () => {
        if (player2Input.value.length > 35) {
            player2Input.value = player2Input.value.slice(0, 35);
            validatePlayer2();
        }
    });
    
    player2Input.addEventListener('focus', () => {
        removeRedBorder(player2Input);
        if (player2Error.textContent !== 'Имена участников не должны совпадать') {
            player2Error.textContent = '';
        }
    });
}

// Обработчик отправки формы
if (form) {
    form.addEventListener('submit', (event) => {
        event.preventDefault();
        startGame();
    });
}

// Обработчик кнопки
if (submitButton) {
    submitButton.addEventListener('click', (event) => {
        event.preventDefault();
        startGame();
    });
}