initializePlayer = () => {
    // Set object references
    vid = document.getElementById('player');
    playBtn = document.getElementById('playPauseBtn');
    seekSlider = document.getElementById('seekSlider');

    timerWrapper = document.querySelector('.timer');
    timer = document.querySelector('.timer span');
    timerBar = document.querySelector('.timer div');

    // Add event listeners
    playBtn.addEventListener("click", playPause, false);
    timerBar.addEventListener("change", setTime, false);
    vid.addEventListener('timeupdate', setTime);
}
window.onload = initializePlayer;


// Play & Pause Button
playPause = () => {
    if (vid.paused) {
        vid.play();
        playBtn.innerHTML = "Pause";
    } else {
        vid.pause();
        playBtn.innerHTML = "Play";
    }
}