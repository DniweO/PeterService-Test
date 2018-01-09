// Loads the IFrame Player API code asynchronously.
var tag = document.createElement('script');
tag.src = "https://www.youtube.com/player_api";
var firstScriptTag = document.getElementsByTagName('script')[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

// Replaces the 'ytplayer' element with an <iframe> and
// YouTube player after the API code downloads.
var player;
var fullSceenVideo;
var videoWidth = $('#ytplayer').parent().width();
function onYouTubePlayerAPIReady() {
    player = new YT.Player('ytplayer', {
        width: videoWidth,
        height: (videoWidth*9) /16 ,
        videoId: 'J1X6bM2Ttcw',
        playerVars: {
            autoplay: 1,
            controls: 1,
            disablekb: 1,
            hl: 'ru-ru',
            loop: 1,
            modestbranding: 1,
            showinfo: 0,
            autohide: 1,
            color: 'white',
            iv_load_policy: 3,
            theme: 'light',
            rel: 0
        },
        events: {
            'onReady': onPlayerReady,
        }
    });

    fullSceenVideo  = new YT.Player('full-scrn-video', {});
}

function onPlayerReady(){
    player.mute();
}

function pauseFullScreenVideo(){
    fullSceenVideo.pauseVideo();
}
