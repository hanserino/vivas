function video(youTubeVideoId){

        video.h = '390'
        video.w = '640'
        var player;
        var tag = document.createElement('script');

        tag.src = "https://www.youtube.com/player_api";
        
        var dataLayer = [];
        var playing = false;
        var firstScriptTag = document.getElementsByTagName('script')[0];
        firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
    
        function playingAttr(state){
            document.body.dataset.promoPlaying = state;
        }
    
        function onYouTubePlayerAPIReady() {
            player = new YT.Player('player', {
                playerVars: {
                    modestbranding: true,
                    rel: 0, 
                    showinfo: 0, 
                    color: 'white',
                    ecver: 0
                },
                height: video.h,
                width: video.w,
                videoId: youTubeVideoId,
                events: {
                    'onStateChange': onPlayerStateChange,
                    'onError': onPlayerError
                }
            });
        }
        
        function onPlayerStateChange(event) {        
            switch (event.data) {
                case YT.PlayerState.PLAYING:
                    if (cleanTime() == 0) {
                        playingAttr(true);
                        dataLayer.push({
                            'event': 'youtubeChange',
                            'eventCategory': 'video',
                            'eventAction': 'started',
                            'eventLabel': video
                        });
                    } else {
                        playingAttr(true);
                        dataLayer.push({
                            'event': 'youtubeChange',
                            'eventCategory': 'video',
                            'eventAction': 'played',
                            'eventLabel': 'v: ' + video + ' | t: ' + cleanTime()
                        });
                    };
                    break;
                case YT.PlayerState.PAUSED:
                    playingAttr(false);
                    if (player.getDuration() - player.getCurrentTime() != 0) {
                        dataLayer.push({
                            'event': 'youtubeChange',
                            'eventCategory': 'video',
                            'eventAction': 'paused',
                            'eventLabel': 'v: ' + video + ' | t: ' + cleanTime()
                        });
                    };
                    break;
                case YT.PlayerState.ENDED:
                    playingAttr(false);
    
                    dataLayer.push({
                        'event': 'youtubeChange',
                        'eventCategory': 'video',
                        'eventAction': 'ended',
                        'eventLabel': video
                    });
                    break;
            };
        }
    
    
        function onPlayerError(event) {
            switch (event.data) {
                case 2:
                    dataLayer.push({
                        'event': 'youtubeChange',
                        'eventCategory': 'video',
                        'eventAction': 'invalid id',
                        'eventLabel': video
                    })
                    break;
                case 100:
                    dataLayer.push({
                        'event': 'youtubeChange',
                        'eventCategory': 'video',
                        'eventAction': 'not found',
                        'eventLabel': video
                    })
                    break;
                case 101 || 150:
                    dataLayer.push({
                        'event': 'youtubeChange',
                        'eventCategory': 'video',
                        'eventAction': 'not allowed',
                        'eventLabel': video
                    })
                    break;
            };
    };
        
    function cleanTime() {
        return Math.round(player.getCurrentTime())
    };

}