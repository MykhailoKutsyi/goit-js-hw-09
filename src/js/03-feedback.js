import throttle from "lodash.throttle";

const STORAGE_KEY = 'feedback-form-state';

const refs = {
    form: document.querySelector('.feedback-form'),
    input: document.querySelector('.feedback-form input'),
    textarea: document.querySelector('.feedback-form textarea'),
}
// console.log(refs);

refs.form.addEventListener('submit', onFormSubmit);
refs.input.addEventListener('input', throttle(onInputText, 500));
refs.textarea.addEventListener('input', throttle(onTextareaInput, 500));


const feedback = {
    email: '',
    message: '',
};

populateForm();

function onFormSubmit(evt) {
    evt.preventDefault();

    console.log(feedback);
    evt.currentTarget.reset();
    localStorage.removeItem(STORAGE_KEY);
    feedback.email = '';
    feedback.message = '';
    // console.log(feedback);


}
/*
    Отслеживай на форме событие input, и каждый раз записывай в локальное хранилище объект с полями email и message, в которых сохраняй текущие значения полей формы. Пусть ключом для хранилища будет строка "feedback-form-state".
*/

function onInputText(evt) {
    feedback.email = evt.target.value;
    // console.log(feedback);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(feedback));
}

function onTextareaInput(evt) {
    feedback.message = evt.target.value;
    // console.log(feedback);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(feedback));
}


/*
    При загрузке страницы проверяй состояние хранилища, и если там есть сохраненные данные, заполняй ими поля формы. В противном случае поля должны быть пустыми.
*/

function populateForm() {
    const savedMessage = localStorage.getItem(STORAGE_KEY);
    // console.log(savedMessage);
    if (savedMessage) {
        // console.log(savedMessage);
        refs.input.value = JSON.parse(savedMessage).email;
        feedback.email = JSON.parse(savedMessage).email;
        refs.textarea.value = JSON.parse(savedMessage).message;
        feedback.message = JSON.parse(savedMessage).message;
    }
}

