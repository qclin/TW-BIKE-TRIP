$(document).ready(function(){
    if(window.innerWidth > 768){
        $('.imageWrapper').click(function(e){
            $('.imgModal').css('top', '0');
            $(e.target).clone().prependTo('.imgModal');
            // sharing link not possible yet with s3 bucket
            var imgSrc = $(e.target).attr('src');
            $('.imgModal a').attr("href", `https://www.facebook.com/sharer/sharer.php?u＝${location.host}/share/${encodeURIComponent(imgSrc)}`);
        });
        $('.closeModal').click(function(e){
            $('.imgModal').css('top', '-100vh');
            $('.imgModal').find('img').remove();
        });
    }
});
