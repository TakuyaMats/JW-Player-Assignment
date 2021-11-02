initializePlayer = () => {
    // Set object references
    vid = document.getElementById('player');
    playBtn = document.getElementById('playPauseBtn');
    autoBtn = document.getElementById('autoPlay');
    disableAutoBtn = document.getElementById('disableAutoPlay');
    volumeControl = document.getElementById('vol-control');
    volume = document.getElementById('volume');

    // Add event listeners
    playBtn.addEventListener("click", playPause, false);
    autoBtn.addEventListener("click", autoPlay, false);
    disableAutoBtn.addEventListener("click", disableAutoPlay, false);
    volumeControl.addEventListener("click", setVolume, false);
}
// Makes sure html runs first before javascript
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

// Autoplay
autoPlay = () => {
    vid.autoplay = true;
    vid.load();
}

// Disable Autoplay
disableAutoPlay = () => {
    vid.autoplay = false;
    vid.load();
}

// Set Volume
setVolume = (val) => {
    vid.volume = val / 100;
    volume.innerHTML = ('Volume: ' + Math.floor(vid.volume * 100))
}