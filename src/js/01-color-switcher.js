document.querySelector('button[data-start]').style.margin = "15% 0 0 40%";

const startButton = document.querySelector('button[data-start]');
const stopButton = document.querySelector('button[data-stop]');

startButton.addEventListener('click', onStartClick);
stopButton.addEventListener('click', onStopClick);

stopButton.disabled = true;

function onStartClick() {
    startButton.disabled = true;
    stopButton.disabled = false;
    changeBackground();
}

function changeBackground() {
    timerId = setInterval(() => {
        document.body.style.backgroundColor = getRandomHexColor();
    }, 1000);
}

function onStopClick() {
    startButton.disabled = false;
    stopButton.disabled = true;
    clearInterval(timerId);
}

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}