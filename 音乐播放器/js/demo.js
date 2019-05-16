(function (){
    var audioElemet = document.createElement('audio');
    var timeLen = $('.player_timeLineBar').get(0).offsetWidth;
    var t = new TimelineMax();
    t.to('.player_cdData',3,{
        rotation: '360deg',
        ease: Power0.easeNone,
        repeat: -1
    },"-=0.2s")
    t.pause();
    function changeSongName(){
        $('.songName').text($('.active_song').attr('data-song'));
        
    }
    $('.player_play').click(function(){
        if($('.player').hasClass('play')){
            $('.player').removeClass('play');
             TweenMax.to(
                '.player_cdData', 0.2,
                {
                    scale: 1,
                    ease: Power0.easeNone
                }
            );
            TweenMax.to(
                '.back_Mask', 0.2,
                {
                    top: 0,
                    ease: Power0.easeNone
                }
            );
            t.pause();
            audioElemet.pause();
        }else{
             $('.player').addClass('play');
            TweenMax.to(
                '.player_cdData', 0.2,
                {
                    scale: 1.1,
                    ease: Power0.easeNone
                }
            );
            TweenMax.to(
                '.back_Mask', 0.2,
                {
                    top: '-50%',
                    ease: Power0.easeNone
                }
            );
            t.play();
            audioPlay();
            changeSongName();
            changeLine();
        }
    })
    $('.player_prev').click(function(){
        if($('.player .player_cdData.active_song').is(':first-child')){
            $('.player .player_cdData.active_song').removeClass('active_song');
            $('.player .player_cdData:last-child').addClass('active_song');
        }else{
            $('.player .player_cdData.active_song').removeClass('active_song').prev().addClass('active_song');
        }
        audioPlay();
        changeSongName();
        changeLine();
    })
    $('.player_next').click(function(){
        if($('.player .player_cdData.active_song').is(':last-child')){
            $('.player .player_cdData.active_song').removeClass('active_song');
            $('.player .player_cdData:first-child').addClass('active_song');
        }else{
            $('.player .player_cdData.active_song').removeClass('active_song').next().addClass('active_song');
        }
        audioPlay();
        changeSongName();
        changeLine(); 
        
    })
    function audioPlay(){
        if($('.player').hasClass('play')){
            audioElemet.setAttribute('src',$('.active_song').attr('data-origin'));
            audioElemet.play();
        }
    }
    function changeLine(){
        audioElemet.addEventListener('timeupdate',function(){
            var duration = this.duration //整首歌的长度s为单位；
            var currTime = this.currentTime //当前时间s为单位
            var percent = currTime/duration; // 时间比例

            $('.player_duration').css({
                width:parseInt(percent*timeLen)+'px'
            })
        })
    }
    
})()