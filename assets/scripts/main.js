$(document).ready(function(){
    if(window.innerWidth > 768){
        $('.imageWrapper').click(function(e){
            $('.imgModal').css('top', '0');
            $(e.target).clone().prependTo('.imgModal');
        });
        $('.closeModal').click(function(e){
            $('.imgModal').css('top', '-100vh');
            $('.imgModal').find('img').remove();
        });
    }
});
