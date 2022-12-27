$(document).ready(function(){
    if(window.innerWidth > 768){
        $('.imageWrapper').click(function(e){
            $('#modal').addClass('top-0');
            $(e.target).clone().prependTo('#modal')
            .removeClass('grayscale-0 md:grayscale md:hover:grayscale-0');

            $('body').addClass('overflow-hidden')
        });
        $('#close').click(function(e){
            $('#modal').removeClass('top-0');
            $('#modal').find('img').remove();
            $('body').removeClass('overflow-hidden')
        });
    }
});
