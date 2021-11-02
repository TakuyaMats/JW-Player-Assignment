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
    // seekslider = document.getElementById("seekslider");
    curtimetext = document.getElementById("curtimetext");
    durtimetext = document.getElementById("durtimetext");
    getHeight = document.getElementById("getHeight");
    getWidth = document.getElementById("getWidth");

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
    // seekslider.addEventListener("change",vidSeek,false);
    vid.addEventListener("timeupdate", seektimeupdate, false);
    vid.addEventListener("resize", videoSize, false);
    vid.addEventListener("resize", videoDimensions, false);
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

// function vidSeek(){
// 	var seekto = vid.duration * (seekslider.value / 100);
// 	vid.currentTime = seekto;
// }

function seektimeupdate() {
    var nt = vid.currentTime * (100 / vid.duration);
    // seekslider.value = nt;
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
    curtimetext.innerHTML = (curmins + ":" + cursecs + "/" + durmins + ":" + dursecs)
}

videoSize = () => {
    let w = vid.videoWidth;
    let h = vid.videoHeight;

    if (w && h) {
        vid.style.width = w;
        getWidth.innerHTML = ('Width: ' + w);
        vid.style.height = h;
        getHeight.innerHTML = ('Height: ' + h);
    }
}