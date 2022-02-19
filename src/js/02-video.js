import Player from '@vimeo/player';
import throttle from "lodash.throttle";

const STORAGE_KEY = 'videoplayer-current-time';

const player = new Player(document.querySelector('iframe'));

setTime();

player.on('timeupdate', throttle(data => {
    localStorage.setItem(STORAGE_KEY, data.seconds);
}, 1000)); 

function setTime() {
    const getTime = localStorage.getItem(STORAGE_KEY);
    if (getTime) {
        // console.log(getTime);
        player.setCurrentTime(getTime).then(function(seconds) {
            // seconds = the actual time that the player seeked to
            }).catch(function(error) {
                switch (error.name) {
                case 'RangeError':
                // the time was less than 0 or greater than the video’s duration
                break;
                }
            });
    }
}