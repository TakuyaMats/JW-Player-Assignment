initializePlayer = () => {
    // Set object references
    vid = document.getElementById('player');
    playBtn = document.getElementById('playPauseBtn');
    autoBtn = document.getElementById('autoPlay');
    disableAutoBtn = document.getElementById('disableAutoPlay');
    volumeControl = document.getElementById('vol-control');
    volume = document.getElementById('volume');
    mute = document.getElementById('mute');
    fullScreen = document.getElementById('fullScreen');
    playBackState = document.getElementById('playBackState');
    currentTime = document.getElementById("currentTime");
    getHeight = document.getElementById("getHeight");
    getWidth = document.getElementById("getWidth");
    getViewability = document.getElementById("getViewability");
    progressBar = document.getElementById('progress-bar');
    seek = document.getElementById('seek');

    // Add event listeners
    playBtn.addEventListener("click", playPause, false);
    autoBtn.addEventListener("click", autoPlay, false);
    disableAutoBtn.addEventListener("click", disableAutoPlay, false);
    volumeControl.addEventListener("click", setVolume, false);
    mute.addEventListener("click", mutePlayer, false);
    fullScreen.addEventListener("click", setFullScreen, false);
    vid.addEventListener("playing", getPlaybackState, false);
    vid.addEventListener("pause", getPauseBackState, false);
    vid.addEventListener("ended", getEndedBackState, false);
    vid.addEventListener("timeupdate", setTimeUpdate, false);
    vid.addEventListener('timeupdate', updateProgress, false);
    seek.addEventListener('mousemove', updateSeekTooltip, false);
    seek.addEventListener('input', skipAhead, false);

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


// Mute video
mutePlayer = () => {
    if (vid.muted === false) {
        vid.muted = true;
        mute.innerHTML = "UnMute"
    } else {
        vid.muted = false;
        mute.innerHTML = "Mute"
    }
}


// Fullscreen Mode
setFullScreen = () => {
    if (vid.requestFullscreen) {
        vid.requestFullscreen();
    } else if (vid.mozRequestFullScreen) {
        vid.mozRequestFullScreen();
    } else if (vid.webkitRequestFullscreen) {
        vid.webkitRequestFullscreen();
    } else if (vid.msRequestFullscreen) {
        vid.msRequestFullscreen();
    }
}


// Playback status
getPlaybackState = () => {
    if (vid.play()) {
        playBackState.innerHTML = "Playing";
    }
}
getPauseBackState = () => {
    if (vid.paused) {
        playBackState.innerHTML = "Paused";
    }
}
getEndedBackState = () => {
    if (vid.ended) {
        playBackState.innerHTML = "Video Ended"
    }
}


// Time of video
function setTimeUpdate() {
    var curmins = Math.floor(vid.currentTime / 60);
    var cursecs = Math.floor(vid.currentTime - curmins * 60);
    var durmins = Math.floor(vid.duration / 60);
    var dursecs = Math.floor(vid.duration - durmins * 60);

    if (cursecs < 10) {
        cursecs = "0" + cursecs;
    }
    if (dursecs < 10) {
        dursecs = "0" + dursecs;
    }
    if (curmins < 10) {
        curmins = "0" + curmins;
    }
    if (durmins < 10) {
        durmins = "0" + durmins;
    }
    currentTime.innerHTML = (curmins + ":" + cursecs + " / " + durmins + ":" + dursecs);
}


// Intersection Observer
const cVideo = document.getElementById('c-video');

const optionsViewPort = {
    root: null,
    rootMargin: '0px',
    threshold: [0, 0.15, 0.25, 0.35, 0.45, 0.5, 0.65, 0.75, 0.85, 0.95, 1]
}

let callback = (entries) => {
    entries.forEach(entry => {
        let percentage = Math.round(entry.intersectionRatio * 100)
        getViewability.innerHTML = ("Viewability: " + percentage + "%")
    });
};
// observes the given element for changes
let observerViewport = new IntersectionObserver(callback, optionsViewPort);
observerViewport.observe(cVideo);


// Player Size
let resizeObserver = new ResizeObserver((entries) => {
    for (entry of entries) {

        let h = Math.round(entry.contentRect.height);
        let w = Math.round(entry.contentRect.width);

        getHeight.innerHTML = ('Height: ' + h + 'px');
        getWidth.innerHTML = ('Width: ' + w + 'px');
    }
});
// observes the given element for changes
resizeObserver.observe(cVideo);


// Video Progress Bar
function updateProgress() {
    seek.value = Math.floor(vid.currentTime);
    progressBar.value = Math.floor(vid.currentTime);
}
