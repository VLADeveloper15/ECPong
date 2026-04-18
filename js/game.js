// Загружаем имена игроков на странице игры
document.addEventListener('DOMContentLoaded', () => {
    const player1Name = localStorage.getItem('player1Name');
    const player2Name = localStorage.getItem('player2Name');
    
    const player1NameElement = document.querySelector('.game-content-button-name-1');
    const player2NameElement = document.querySelector('.game-content-button-name-2');
    
    if (player1NameElement) {
        player1NameElement.textContent = player1Name || 'Игрок 1';
    }
    
    if (player2NameElement) {
        player2NameElement.textContent = player2Name || 'Игрок 2';
    }
    
    // Загружаем сохраненные счета
    loadScores();
});

// ----------------------------------------------------------------------------------------------------
// Функционал для работы со счетами

// Получаем элементы счетов
const scoreElement1 = document.querySelector('.game-content-button-num-1');
const scoreElement2 = document.querySelector('.game-content-button-num-2');

// Получаем кнопки игроков
const playerButton1 = document.querySelector('.game-content-button-1');
const playerButton2 = document.querySelector('.game-content-button-2');

// Получаем кнопки уменьшения счета
const stepBackButton1 = document.querySelector('.game-content-step-back-1');
const stepBackButton2 = document.querySelector('.game-content-step-back-2');

// Ключи для localStorage
const SCORE_KEY_1 = 'player1_score';
const SCORE_KEY_2 = 'player2_score';

// Функция для загрузки счетов из localStorage
function loadScores() {
    if (scoreElement1) {
        const savedScore1 = localStorage.getItem(SCORE_KEY_1);
        if (savedScore1 !== null && !isNaN(parseInt(savedScore1, 10))) {
            scoreElement1.textContent = savedScore1;
        } else {
            scoreElement1.textContent = '0';
            localStorage.setItem(SCORE_KEY_1, '0');
        }
    }
    
    if (scoreElement2) {
        const savedScore2 = localStorage.getItem(SCORE_KEY_2);
        if (savedScore2 !== null && !isNaN(parseInt(savedScore2, 10))) {
            scoreElement2.textContent = savedScore2;
        } else {
            scoreElement2.textContent = '0';
            localStorage.setItem(SCORE_KEY_2, '0');
        }
    }
}

// Функция для сохранения счетов в localStorage
function saveScores(score1, score2) {
    localStorage.setItem(SCORE_KEY_1, score1.toString());
    localStorage.setItem(SCORE_KEY_2, score2.toString());
}

// Функция для увеличения счета игрока 1
function incrementScore1() {
    if (scoreElement1) {
        let currentScore = parseInt(scoreElement1.textContent, 10);
        if (isNaN(currentScore)) {
            currentScore = 0;
        }
        const newScore = currentScore + 1;
        scoreElement1.textContent = newScore;
        const currentScore2 = scoreElement2 ? parseInt(scoreElement2.textContent, 10) : 0;
        saveScores(newScore, currentScore2);
    }
}

// Функция для увеличения счета игрока 2
function incrementScore2() {
    if (scoreElement2) {
        let currentScore = parseInt(scoreElement2.textContent, 10);
        if (isNaN(currentScore)) {
            currentScore = 0;
        }
        const newScore = currentScore + 1;
        scoreElement2.textContent = newScore;
        const currentScore1 = scoreElement1 ? parseInt(scoreElement1.textContent, 10) : 0;
        saveScores(currentScore1, newScore);
    }
}

// Функция для уменьшения счета игрока 1
function decrementScore1() {
    if (scoreElement1) {
        let currentScore = parseInt(scoreElement1.textContent, 10);
        if (isNaN(currentScore)) {
            currentScore = 0;
        }
        if (currentScore > 0) {
            const newScore = currentScore - 1;
            scoreElement1.textContent = newScore;
            const currentScore2 = scoreElement2 ? parseInt(scoreElement2.textContent, 10) : 0;
            saveScores(newScore, currentScore2);
        }
    }
}

// Функция для уменьшения счета игрока 2
function decrementScore2() {
    if (scoreElement2) {
        let currentScore = parseInt(scoreElement2.textContent, 10);
        if (isNaN(currentScore)) {
            currentScore = 0;
        }
        if (currentScore > 0) {
            const newScore = currentScore - 1;
            scoreElement2.textContent = newScore;
            const currentScore1 = scoreElement1 ? parseInt(scoreElement1.textContent, 10) : 0;
            saveScores(currentScore1, newScore);
        }
    }
}

// Обработчик для кнопки игрока 1 (увеличение счета)
if (playerButton1) {
    playerButton1.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        incrementScore1();
    });
}

// Обработчик для кнопки игрока 2 (увеличение счета)
if (playerButton2) {
    playerButton2.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        incrementScore2();
    });
}

// Обработчик для кнопки step-back-1 (уменьшение счета игрока 1)
if (stepBackButton1) {
    stepBackButton1.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        decrementScore1();
    });
}

// Обработчик для кнопки step-back-2 (уменьшение счета игрока 2)
if (stepBackButton2) {
    stepBackButton2.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        decrementScore2();
    });
}

// ----------------------------------------------------------------------------------------------------
// Остальной код модального окна (без изменений)

// Получаем элементы
const exitButton = document.querySelector('.game-content-exit-button');
const modal = document.querySelector('.modal');
const modalNoButton = document.querySelector('.modal-window-button-no');
const modalExitButton = document.querySelector('.modal-window-button-exit');
const modalYesButton = document.querySelector('.modal-window-button-yes');
const modalWindow = document.querySelector('.modal-window');

// Сохраняем элемент, который имел фокус до открытия модального окна
let previouslyFocusedElement = null;

// Все фокусируемые элементы внутри модального окна
const getFocusableElements = () => {
    if (!modalWindow) return [];
    return modalWindow.querySelectorAll(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );
};

// Функция для открытия модального окна
function openModal() {
    // Сохраняем текущий элемент с фокусом
    previouslyFocusedElement = document.activeElement;
    
    modal.classList.add('display');
    
    // Блокируем фокус на модальном окне
    document.body.style.overflow = 'hidden';
    
    // Устанавливаем атрибут inert для основного контента (современный подход)
    const gameContent = document.querySelector('.game-content');
    if (gameContent) {
        gameContent.setAttribute('inert', 'true');
    }
    
    // Также блокируем все остальные интерактивные элементы вне модального окна
    const allInteractiveElements = document.querySelectorAll('button, [href], input, select, textarea, [tabindex]');
    allInteractiveElements.forEach(element => {
        if (!modal.contains(element)) {
            element.setAttribute('data-tabindex-original', element.getAttribute('tabindex') || '');
            element.setAttribute('tabindex', '-1');
            element.setAttribute('aria-hidden', 'true');
        }
    });
    
    // Фокусируемся на первом фокусируемом элементе внутри модального окна
    const focusableElements = getFocusableElements();
    if (focusableElements.length > 0) {
        focusableElements[0].focus();
    } else if (modalWindow) {
        modalWindow.setAttribute('tabindex', '-1');
        modalWindow.focus();
    }
    
    // Добавляем обработчик для перехвата фокуса
    document.addEventListener('focus', trapFocus, true);
    document.addEventListener('keydown', handleTabKey);
}

// Функция для закрытия модального окна
function closeModal() {
    modal.classList.remove('display');
    
    // Восстанавливаем прокрутку
    document.body.style.overflow = '';
    
    // Убираем атрибут inert
    const gameContent = document.querySelector('.game-content');
    if (gameContent) {
        gameContent.removeAttribute('inert');
    }
    
    // Восстанавливаем все интерактивные элементы
    const allInteractiveElements = document.querySelectorAll('button, [href], input, select, textarea, [tabindex]');
    allInteractiveElements.forEach(element => {
        const originalTabindex = element.getAttribute('data-tabindex-original');
        if (originalTabindex !== null) {
            if (originalTabindex === '') {
                element.removeAttribute('tabindex');
            } else {
                element.setAttribute('tabindex', originalTabindex);
            }
            element.removeAttribute('data-tabindex-original');
        }
        element.removeAttribute('aria-hidden');
    });
    
    // Удаляем обработчики
    document.removeEventListener('focus', trapFocus, true);
    document.removeEventListener('keydown', handleTabKey);
    
    // Возвращаем фокус на предыдущий элемент
    if (previouslyFocusedElement && previouslyFocusedElement.focus) {
        previouslyFocusedElement.focus();
    }
}

// Функция для ловушки фокуса
function trapFocus(event) {
    if (!modal.classList.contains('display')) return;
    
    // Если фокус пытается уйти на элемент вне модального окна
    if (!modal.contains(event.target)) {
        const focusableElements = getFocusableElements();
        if (focusableElements.length > 0) {
            event.preventDefault();
            focusableElements[0].focus();
        } else if (modalWindow) {
            event.preventDefault();
            modalWindow.focus();
        }
    }
}

// Функция для обработки клавиши Tab
function handleTabKey(event) {
    if (event.key !== 'Tab' || !modal.classList.contains('display')) return;
    
    const focusableElements = getFocusableElements();
    if (focusableElements.length === 0) return;
    
    const firstFocusable = focusableElements[0];
    const lastFocusable = focusableElements[focusableElements.length - 1];
    
    // Если нажат Shift + Tab и фокус на первом элементе - перемещаем на последний
    if (event.shiftKey && document.activeElement === firstFocusable) {
        event.preventDefault();
        lastFocusable.focus();
    }
    // Если нажат Tab и фокус на последнем элементе - перемещаем на первый
    else if (!event.shiftKey && document.activeElement === lastFocusable) {
        event.preventDefault();
        firstFocusable.focus();
    }
}

// Обработчик нажатия на кнопку "Выход"
if (exitButton) {
    exitButton.addEventListener('click', openModal);
}

// Обработчик нажатия на кнопку "Нет"
if (modalNoButton) {
    modalNoButton.addEventListener('click', closeModal);
}

// Обработчик нажатия на крестик
if (modalExitButton) {
    modalExitButton.addEventListener('click', closeModal);
}

// Обработчик нажатия на фон модального окна
if (modal) {
    modal.addEventListener('click', function(e) {
        if (e.target === modal) {
            closeModal();
        }
    });
}

// Обработчик нажатия на кнопку "Да"
if (modalYesButton) {
    modalYesButton.addEventListener('click', function() {
        window.location.href = 'index.html';
    });
}

// Блокируем клавишу Escape для закрытия модального окна (опционально)
document.addEventListener('keydown', function(event) {
    if (event.key === 'Escape' && modal.classList.contains('display')) {
        closeModal();
    }
});

// ----------------------------------------------------------------------------------------------------