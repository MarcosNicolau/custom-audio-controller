//Get elements from the DOM
const audio = document.querySelector('audio');
const currentDuration = document.querySelector('.current-duration');
const totalDuration = document.querySelector('.total-duration');
const range = document.querySelector('.range');
const playPause = document.querySelector('.play-pause');
const next = document.querySelector('.next');
const back = document.querySelector('.back');

//Songs
const songs = ['./audio/ncs.mp3', './audio/epic.mp3'];
let currentSongIndex = 0;

//FUNCTIONS

//Parse seconds to minutes
const secondsToMinutes = (time) => {
    const minutes = parseInt(time / 60);
    let seconds = parseInt(time % 60);
    if (seconds < 10) seconds = `0${seconds}`;
    return { minutes, seconds };
};

//Set song total duration
const setTotalDuration = () => {
    const audioTotalDuration = secondsToMinutes(audio.duration);
    totalDuration.innerText = `${audioTotalDuration.minutes}:${audioTotalDuration.seconds}`;
};

//Set the max value of input range
const setRangeMax = () => range.setAttribute('max', audio.duration);

//Set next or back song
const nextBackSong = (number) => {
    if (!songs[currentSongIndex + number]) return;
    audio.src = songs[currentSongIndex + number];
    currentSongIndex += number;
};

//EVENT LISTENERS

//Play and pause song
playPause.addEventListener('click', () => {
    if (audio.paused) {
        playPause.src = './assets/pause.svg';
        return audio.play();
    } else {
        playPause.src = './assets/play.svg';
        return audio.pause();
    }
});

//Update song values
audio.addEventListener('loadedmetadata', () => {
    setTotalDuration();
    setRangeMax();
});

//Set the song current time
audio.addEventListener('timeupdate', () => {
    const audioCurrentTime = secondsToMinutes(audio.currentTime);
    currentDuration.innerText = `${audioCurrentTime.minutes}:${audioCurrentTime.seconds}`;
    range.value = audio.currentTime;
});

//Skip song
range.addEventListener('change', (e) => {
    audio.currentTime = e.target.value;
});

//Next song
next.addEventListener('click', () => nextBackSong(1));

//Back song
back.addEventListener('click', () => nextBackSong(-1));

setTotalDuration();
setRangeMax();
