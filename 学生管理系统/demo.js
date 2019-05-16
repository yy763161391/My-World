//事件与结构的交互
(function(){
    var obj = {
        init:function(){
            this.bindEvent();
            location.hash = '#student-echarts';
        },
        bindEvent:function(){
            $('.btn').on('click',function(){
                $('.drop-list').slideToggle();
            })
            $('.drop-list').on('mouseleave',function(){
                $('.drop-list').slideUp();
            })
            $('.list-item').on('click',function(){
                var hash = $(this).attr('data-id');
                console.log(hash);
                location.hash = hash;
                $('.list-item').removeClass('active');
                $(this).addClass('active');
                return false;
            })
            $(window).on('hashchange',function(){
                var hash = location.hash;
                $('.show-list').removeClass('show-list');
                $(hash).addClass('show-list');
            })
            $('.modal').on('click',function(){
                $(this).hide();
            })
            $('#modal-content').on('click',function(){
                return false;
            })
            $('.del-modal').on('click',function(){
                $(this).hide();
            })
            $('.del-modal .con').on('click',function(){
                return false;
            })
            $('.reset-btn').on('click',function(){
                $('.del-modal').hide();
            })
        }
    }
    obj.init();
})()