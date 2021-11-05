initializePlayer = () => {
    vid = document.getElementById('player');
    playBtn = document.getElementById('playPauseBtn');
    container = document.getElementById('container');
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
    getViewAbility = document.getElementById("getViewAbility");
    progressBar = document.getElementById('progress-bar');
    seek = document.getElementById('seek');
    width = document.getElementById('width');
    height = document.getElementById('height');
    divId = document.getElementById('divId');
    loadUrl = document.getElementById('loadUrl');
    searchBtn = document.getElementById('searchBtn');

    playBtn.addEventListener("click", playPause, false);
    autoBtn.addEventListener("click", autoPlay, false);
    disableAutoBtn.addEventListener("click", disableAutoPlay, false);
    volumeControl.addEventListener("click", setVolume, false);
    mute.addEventListener("click", mutePlayer, false);
    fullScreen.addEventListener("click", setFullScreen, false);
    searchBtn.addEventListener('click', setSearch, false);
    vid.addEventListener("playing", getPlaybackState, false);
    vid.addEventListener("pause", getPauseBackState, false);
    vid.addEventListener("ended", getEndedBackState, false);
    vid.addEventListener("timeupdate", setTimeUpdate, false);
    vid.addEventListener('timeupdate', updateProgress, false);
    vid.controls = false;
};
window.onload = initializePlayer;

const vidContainer = document.getElementById('vidContainer');
vidContainer.style.display = "none";


// Toggles Player Control Display
toggleDisplay = () => {
    if (vidContainer.style.display === "none") {
        vidContainer.style.display = "block";
    }
};

// Player Setting Search
setSearch = () => {
    toggleDisplay()

    let setWidth = width.value + 'px';
    let setHeight = height.value + 'px';

    vidContainer.style.width = setWidth;
    vidContainer.style.height = setHeight;

    vid.setAttribute("src", loadUrl.value);
    vid.load();
};


// Play & Pause Button
playPause = () => {
    if (vid.paused) {
        vid.play();
        playBtn.innerHTML = "Pause";
    } else {
        vid.pause();
        playBtn.innerHTML = "Play";
    }
};


// Autoplay
autoPlay = () => {
    vid.autoplay = true;
    vid.load();
};


// Disable Autoplay
disableAutoPlay = () => {
    vid.autoplay = false;
    vid.load();
};


// Set Volume
setVolume = (val) => {
    vid.volume = val / 100;
    volume.innerHTML = ('Volume: ' + Math.floor(vid.volume * 100))
};


// Mute video
mutePlayer = () => {
    if (vid.muted === false) {
        vid.muted = true;
        mute.innerHTML = "UnMute"
    } else {
        vid.muted = false;
        mute.innerHTML = "Mute"
    }
};


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
};


// Playback status
getPlaybackState = () => {
    if (vid.play()) {
        playBackState.innerHTML = "Playing";
    }
};
getPauseBackState = () => {
    if (vid.paused) {
        playBackState.innerHTML = "Paused";
    }
};
getEndedBackState = () => {
    if (vid.ended) {
        playBackState.innerHTML = "Video Ended"
    }
};


// Time of video
setTimeUpdate = () => {
    var curMins = Math.floor(vid.currentTime / 60);
    var curSecs = Math.floor(vid.currentTime - curMins * 60);
    var durMins = Math.floor(vid.duration / 60);
    var durSecs = Math.floor(vid.duration - durMins * 60);

    if (curSecs < 10) {
        curSecs = "0" + curSecs;
    }
    if (durSecs < 10) {
        durSecs = "0" + durSecs;
    }
    if (curMins < 10) {
        curMins = "0" + curMins;
    }
    if (durMins < 10) {
        durMins = "0" + durMins;
    }

    currentTime.innerHTML = curMins + ":" + curSecs + " / " + durMins + ":" + durSecs
};


// Intersection Observer for viewAbility
const optionsViewPort = {
    root: null,
    rootMargin: '0px',
    threshold: [0, 0.15, 0.25, 0.35, 0.45, 0.5, 0.65, 0.75, 0.85, 0.95, 1]
};

let callback = (entries) => {
    entries.forEach(entry => {
        let percentage = Math.round(entry.intersectionRatio * 100)
        getViewAbility.innerHTML = ("Viewability: " + percentage + "%")
    });
};
let observerViewport = new IntersectionObserver(callback, optionsViewPort);
observerViewport.observe(vidContainer);


// Displays the Width and Height of the Player
let resizeObserver = new ResizeObserver((entries) => {
    for (entry of entries) {

        let h = Math.round(entry.contentRect.height);
        let w = Math.round(entry.contentRect.width);

        getHeight.innerHTML = ('Height: ' + h + 'px');
        getWidth.innerHTML = ('Width: ' + w + 'px');
    }
});
resizeObserver.observe(vidContainer);


// Video Progress Bar
updateProgress = () => {
    seek.value = Math.floor(vid.currentTime);
    progressBar.value = Math.floor(vid.currentTime);
};


// Resizes Video Player
if (window.ResizeObserver) {
    let slider = document.querySelector('#reSize input[type="range"]');

    vidContainer.style.width = '800px';

    slider.addEventListener('input', () => {
        vidContainer.style.width = slider.value + 'px';
        container.style.height = slider.value + 'px';
    })

    resizeObserver.observe(slider);
};