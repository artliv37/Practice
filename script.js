class Modal {
    constructor(selector) {
        this.element = document.querySelector(selector);
        this.closeButton = this.element.querySelector('.modal-close');
        this.init();
    }

    init() {
        if (this.closeButton) {
            this.closeButton.addEventListener('click', () => this.hide());
        }
        this.element.addEventListener('click', (event) => {
            if (event.target === this.element) this.hide();
        });
    }

    show() {
        this.element.style.display = 'flex';
    }

    hide() {
        this.element.style.display = 'none';
    }
}

class LockModal extends Modal {
    constructor(selector, correctPassword) {
        super(selector);
        this.passwordInput = this.element.querySelector('#passwordInput');
        this.submitButton = this.element.querySelector('#submitPassword');
        this.correctPassword = correctPassword;
        this.initLock();
    }

    initLock() {
        this.submitButton.addEventListener('click', () => this.handlePasswordSubmit());
    }

    handlePasswordSubmit() {
        const enteredPassword = this.passwordInput.value;
        if (enteredPassword === this.correctPassword) {
            alert("Вітаю! Ви пройшли гру!");
            this.hide();
        } else {
            alert("Невірний пароль! Подумайте ще.");
            this.passwordInput.value = '';
        }
    }
}

class Game {
    constructor() {
        this.initInteractiveElements();
        this.initModals();
    }

    initInteractiveElements() {
        this.interactiveElements = {
            closedBook: document.querySelector('.closed-book'),
            pileOfPaper: document.querySelector('.pile-of-paper'),
            picture: document.querySelector('.picture'),
            book: document.querySelector('.book'),
            lock: document.querySelector('.lock'),
        };
    }

    initModals() {
        this.modals = {
            bookModal: new Modal('#modal'),
            bookModal2: new Modal('#modal4'),
            paperModal: new Modal('#modal2'),
            pictureModal: new Modal('#modal3'),
            flippedPictureModal: new Modal('#flippedPictureModal'),
            lockModal: new LockModal('#lockModal', 'Все буде Україна'),
        };

        this.interactiveElements.closedBook.addEventListener('click', () => this.modals.bookModal2.show());
        this.interactiveElements.pileOfPaper.addEventListener('click', () => this.modals.paperModal.show());
        this.interactiveElements.picture.addEventListener('click', () => this.modals.pictureModal.show());
        this.interactiveElements.book.addEventListener('click', () => this.modals.bookModal.show());
        this.interactiveElements.lock.addEventListener('click', () => this.modals.lockModal.show());

        // Add event listener for "Перевернути" button
        const flipButton = document.querySelector('#flipButton');
        flipButton.addEventListener('click', () => {
            this.modals.pictureModal.hide();
            this.modals.flippedPictureModal.show();
        });
    }
}

document.addEventListener('DOMContentLoaded', () => {
    new Game();
});
