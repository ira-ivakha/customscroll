$(document).ready(function(){
    var barHeight;
    $('<div class="bar"></div>').appendTo('.scroller-bar');
	var containerHeight =parseInt($('.scroller').css('height'));/*высота контейнера*/
    var textHeight;
    textHeight = parseInt($('.container').height());/*высота текста для скроллинга*/

    barHeight = (containerHeight / textHeight) * containerHeight;/*высота скроллбара*/
    console.log('containerHeight', containerHeight);
    console.log('barHeight', barHeight      );
    console.log('textHeight', textHeight     );
    $('.bar').css('height', barHeight);
	
   $('.scroller').mouseover(function(){
		var containerPositionTop=parseInt($('.container').position().top);
       console.log('containerPositionTop', parseInt($('.container').position().top));
		//var barPositionTop=containerHeight-containerHeight*(textHeight+containerPositionTop)/textHeight;
       //var barPositionTop=containerHeight*(-1*containerPositionTop)/textHeight;
       var barPositionTop=Math.abs(containerPositionTop)*(barHeight/containerHeight);
       console.log('barPositionTop', barPositionTop);
		$('.bar').css('top', barPositionTop );
		/*alert('высота текста для скроллинга' + textHeight + ', высота контейнера' + containerHeight + ', высота скроллбара' + 
		barHeight + ', позиция текста' + containerPositionTop+ 'позиция скроллбара' + barPositionTop);*/
    });

    $('.container').keyup(function(){
        var containerPositionTop=parseInt($('.container').position().top);
        var barPositionTop=containerHeight*(-1*containerPositionTop)/textHeight;
        console.log(barPositionTop);
        $('.bar').css('top', barPositionTop );
        /*alert('высота текста для скроллинга' + textHeight + ', высота контейнера' + containerHeight + ', высота скроллбара' +
         barHeight + ', позиция текста' + containerPositionTop+ 'позиция скроллбара' + barPositionTop);*/
    });
    $('.scroller-bar').click(function(e) {
        var offset = $(this).offset();
        var relativeY = parseInt(e.pageY - offset.top);
        var offsetContainer = $('.scroll-wrapper').offset();
        var yContainer=parseInt(offsetContainer.top);
        var barContainer = $('.scroller-bar').offset();
        var barXContainer=parseInt(barContainer.left);

        var xContainer=parseInt(offsetContainer.left);
        var relativeY = parseInt(e.pageY - offset.top);
        if ((containerHeight-barHeight)<relativeY) { relativeY = containerHeight-barHeight;}
        $('.bar').offset({top:relativeY+yContainer, left:barXContainer});
        console.log('relativeY ', relativeY);
        $(".container").offset({top:(-1)*relativeY*textHeight/containerHeight, left:xContainer});
    });
    $('.scroller-bar').mouseup(function(e) {
        var offset = $(this).offset();
        var relativeY = parseInt(e.pageY - offset.top);
        var offsetContainer = $('.scroll-wrapper').offset();
        var yContainer=parseInt(offsetContainer.top);
        var xContainer=parseInt(offsetContainer.left);
        var barContainer = $('.scroller-bar').offset();
        var barXContainer=parseInt(barContainer.left);
        if ((containerHeight-barHeight)<relativeY) { relativeY = containerHeight-barHeight;}
        $('.bar').offset({top:relativeY+yContainer, left:Math.ceil(barXContainer)});
        console.log('relativeY ', relativeY);
        $(".container").offset({top:(-1)*relativeY*containerHeight/barHeight, left:xContainer});
    });
});