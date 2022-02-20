import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import { Notify } from 'notiflix/build/notiflix-notify-aio';


const refs = {
    dateTimePickerSelector: document.querySelector('#datetime-picker'),
    startButton: document.querySelector('button[data-start]'),
    spanDays: document.querySelector('span[data-days]'),
    spanHours: document.querySelector('span[data-hours]'),
    spanMinutes: document.querySelector('span[data-minutes]'),
    spanSeconds: document.querySelector('span[data-seconds]'),
};

refs.startButton.disabled = true;
let deltaTime = 0; 

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
    minuteIncrement: 1,
  
    onClose(selectedDates) {
        chooseDate(selectedDates[0]);
    },
};

flatpickr(refs.dateTimePickerSelector, options);

function chooseDate(selectedDates) {
    const date = new Date();
    const currentUnixTime = date.getTime();
    // console.log(currentUnixTime, 'currentUnixTime'); 

    const selectedUnixTime = Date.parse(selectedDates);
    // console.log(selectedUnixTime, 'selectedUnixTime');

    //past - ; future + ;
    deltaTime = selectedUnixTime - currentUnixTime;
    // console.log(deltaTime); 

    if (deltaTime > 0) {
        refs.startButton.disabled = false;
        refs.dateTimePickerSelector.disabled = true;
    } else {
        Notify.failure('Please choose a date in the future');
    }
}
    
refs.startButton.addEventListener('click', onClickStartButton);

function onClickStartButton() {
    refs.startButton.disabled = true;
    let intervalId = null;

    intervalId = setInterval(() => {
        deltaTime -= 1000;
        // console.log(deltaTime);

        //finish count at 00:00:00:00
        if (deltaTime < 0) {
            clearInterval(intervalId);
            refs.dateTimePickerSelector.disabled = false;
            return;
        }

        updateClockFace(convertMs(deltaTime));
    }, 1000)
}

function addLeadingZero(value) {
    return String(value).padStart(2, '0');
}

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = addLeadingZero(Math.floor(ms / day));
  // Remaining hours
  const hours = addLeadingZero(Math.floor((ms % day) / hour));
  // Remaining minutes
  const minutes = addLeadingZero(Math.floor(((ms % day) % hour) / minute));
  // Remaining seconds
  const seconds = addLeadingZero(Math.floor((((ms % day) % hour) % minute) / second));

  return { days, hours, minutes, seconds };
}

function updateClockFace({ days, hours, minutes, seconds }) {
    refs.spanDays.textContent = `${days}:`;
    refs.spanHours.textContent = `${hours}:`;
    refs.spanMinutes.textContent = `${minutes}:`;
    refs.spanSeconds.textContent = `${seconds}:`;
}