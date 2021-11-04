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
    getViewability = document.getElementById("getViewability");
    reSize = document.getElementById("reSize");
    // timeline = document.getElementById('.timeline');

    // Add event listeners
    playBtn.addEventListener("click", playPause, false);
    autoBtn.addEventListener("click", autoPlay, false);
    disableAutoBtn.addEventListener("click", disableAutoPlay, false);
    volumeControl.addEventListener("click", setVolume, false);
    mute.addEventListener("click", mutePlayer, false);
    fullScreen.addEventListener("click", setFullScreen, false);
    reSize.addEventListener("click", setResize, false);
    vid.addEventListener("playing", getPlaybackState, false);
    vid.addEventListener("pause", getPauseBackState, false);
    vid.addEventListener("ended", getEndedBackState, false);
    // seekslider.addEventListener("change",vidSeek,false);
    vid.addEventListener("timeupdate", seektimeupdate, false);
    // vid.addEventListener("resize", videoSize, false);
    // window.addEventListener("load", viewAbility, false);
    // vid.addEventListener('play', stretch, false);
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
    console.log(curmins, cursecs, durmins, dursecs);
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

// Player's Width & Height;
// videoSize = () => {
//     let w = vid.videoWidth;
//     let h = vid.videoHeight;

//     if (w && h) {
//         vid.style.width = w;
//         getWidth.innerHTML = ('Width: ' + w + 'px');
//         vid.style.height = h;
//         getHeight.innerHTML = ('Height: ' + h + 'px');
//     }
// }

// Intersection Observer
const cVideo = document.getElementById('c-video');

const optionsViewPort = {
    root: null,
    rootMargin: '0px',
    threshold: [0, 0.15, 0.25, 0.35, 0.45, 0.5, 0.65, 0.75, 0.85, 0.95, 1]
}

let callback = (entries, observer) => {
    entries.forEach(entry => {
        let percentage = Math.round(entry.intersectionRatio * 100)
        getViewability.innerHTML = ("Viewability: " + percentage + "%")
    });
};

let observerViewport = new IntersectionObserver(callback, optionsViewPort);
observerViewport.observe(cVideo);


// Player Size
let resizeObserver = new ResizeObserver((entries) => {
    for (entry of entries) {
        let h = Math.round(entry.contentRect.height);
        let w = Math.round(entry.contentRect.width);
        // get the height and width of the element
        // console.log('Height: ', entry.contentRect.height);
        getHeight.innerHTML = ('Height: ' + h + 'px');
        // console.log('Width:', entry.contentRect.width);
        getWidth.innerHTML = ('Width: ' + w + 'px');
    }
});

// observe the given element for changes
resizeObserver.observe(cVideo);


// video Duration
// vid.ontimeupdate = function () {
//     const percentagePosition = (100*vid.currentTime) / vid.duration;
//     timeline.style.backgroundSize = `${percentagePosition}% 100%`;
//     timeline.value = percentagePosition;
// }

// timeline.addEventListener('change', function () {
//     const time = (timeline.value * vid.duration) / 100;
//     vid.currentTime = time;
// });


// reSize
var littleSize = false;
setResize = () => {
    vid.width = littleSize ? 800 : 400;
    littleSize = !littleSize; //toggle boolean
}

vid.addEventListener('click', function init() {
    vid.removeEventListener('click', init, false);
    vid.className = vid.className + ' resizable';
    var resizer = document.createElement('div');
    resizer.className = 'resizer';
    vid.appendChild(resizer);
    resizer.addEventListener('mousedown', initDrag, false);
}, false);

var startX, startY, startWidth, startHeight;

function initDrag(e) {
    startX = e.clientX;
    startY = e.clientY;
    startWidth = parseInt(document.defaultView.getComputedStyle(vid).width, 10);
    startHeight = parseInt(document.defaultView.getComputedStyle(vid).height, 10);
    document.documentElement.addEventListener('mousemove', doDrag, false);
    document.documentElement.addEventListener('mouseup', stopDrag, false);
}

function doDrag(e) {
    vid.style.width = (startWidth + e.clientX - startX) + 'px';
    vid.style.height = (startHeight + e.clientY - startY) + 'px';
}

function stopDrag(e) {
    document.documentElement.removeEventListener('mousemove', doDrag, false);
    document.documentElement.removeEventListener('mouseup', stopDrag, false);
} 