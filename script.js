// const player = document.getElementsByClassName('player');

// console.log(player);

// video.addEventListener('play', (e) => {

// })

playPause = (btn, vid) => {
    var vid = document.getElementById(vid);

    if (vid.paused) {
        vid.play();
        btn.innerHTML = "Pause";
    } else {
        vid.pause();
        btn.innerHTML = "Play";
    }
}