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

    // Hide default controls
    vid.controls = false;

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
    currentTime.innerHTML = (curMins + ":" + curSecs + " / " + durMins + ":" + durSecs);
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
updateProgress = () => {
    seek.value = Math.floor(vid.currentTime);
    progressBar.value = Math.floor(vid.currentTime);
}


// reSize


var observer = new ResizeObserver(function(entries) {
    entries.forEach(function(entry) {
        console.log(entry.target.id + ': ' + JSON.stringify(entry.contentRect));
    });
});
observer.observe(cVideo);

console.log('before style change');
cVideo.style.width = '800px';
console.log('after style change');




// if (window.ResizeObserver) {
//     const h1Elem = document.querySelector('h1');
//     const pElem = document.querySelector('p');
//     const divElem = document.querySelector('body > div');
//     const slider = document.getElementById('reSize');

//     cVideo.style.width = '800px';

//     slider.addEventListener('input', () => {
//         cVideo.style.width = slider.value + 'px';
//     })

//     const resizeObserver = new ResizeObserver(entries => {
//         for (let entry of entries) {
//             if (entry.contentBoxSize) {
//                 // Checking for chrome as using a non-standard array
//                 if (entry.contentBoxSize[0]) {
//                     h1Elem.style.fontSize = Math.max(1.5, entry.contentBoxSize[0].inlineSize / 200) + 'rem';
//                     pElem.style.fontSize = Math.max(1, entry.contentBoxSize[0].inlineSize / 600) + 'rem';
//                 } else {
//                     h1Elem.style.fontSize = Math.max(1.5, entry.contentBoxSize.inlineSize / 200) + 'rem';
//                     pElem.style.fontSize = Math.max(1, entry.contentBoxSize.inlineSize / 600) + 'rem';
//                 }

//             } else {
//                 cVideo.style.width = Math.max(1.5, entry.contentRect.width / 200) + 'rem';
//                 cVideo.style.width = Math.max(1, entry.contentRect.width / 600) + 'rem';
//             }
//         }
//         console.log('Size changed');
//     });

//     resizeObserver.observe(slider);

// } else {
//     console.log('Resize observer not supported!');
// }